
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface SkillCategory {
  title: string;
  skills: string[];
}

interface SkillsData {
  categories?: SkillCategory[];
}

interface SkillsEditorProps {
  data: SkillsData;
  onSave: (data: SkillsData) => void;
}

const SkillsEditor: React.FC<SkillsEditorProps> = ({ data, onSave }) => {
  const [categories, setCategories] = useState<SkillCategory[]>(
    data.categories || [{ title: '', skills: [''] }]
  );

  useEffect(() => {
    setCategories(data.categories || [{ title: '', skills: [''] }]);
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredCategories = categories
      .filter(cat => cat.title.trim())
      .map(cat => ({
        ...cat,
        skills: cat.skills.filter(skill => skill.trim())
      }))
      .filter(cat => cat.skills.length > 0);
    
    onSave({ categories: filteredCategories });
  };

  const addCategory = () => {
    setCategories([...categories, { title: '', skills: [''] }]);
  };

  const removeCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const updateCategory = (index: number, field: 'title', value: string) => {
    const updated = [...categories];
    updated[index] = { ...updated[index], [field]: value };
    setCategories(updated);
  };

  const addSkill = (categoryIndex: number) => {
    const updated = [...categories];
    updated[categoryIndex].skills.push('');
    setCategories(updated);
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const updated = [...categories];
    updated[categoryIndex].skills = updated[categoryIndex].skills.filter((_, i) => i !== skillIndex);
    setCategories(updated);
  };

  const updateSkill = (categoryIndex: number, skillIndex: number, value: string) => {
    const updated = [...categories];
    updated[categoryIndex].skills[skillIndex] = value;
    setCategories(updated);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {categories.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="bg-white/5 border-white/10">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-gray-200">Category {categoryIndex + 1}</Label>
                {categories.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeCategory(categoryIndex)}
                    className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <Input
                value={category.title}
                onChange={(e) => updateCategory(categoryIndex, 'title', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="Category title (e.g., Programming Languages)"
              />

              <div className="space-y-2">
                <Label className="text-gray-200">Skills</Label>
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center gap-2">
                    <Input
                      value={skill}
                      onChange={(e) => updateSkill(categoryIndex, skillIndex, e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="Skill name"
                    />
                    {category.skills.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSkill(categoryIndex, skillIndex)}
                        className="border-red-500/20 text-red-400 hover:bg-red-500/10 shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addSkill(categoryIndex)}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={addCategory}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
          
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            Save Skills
          </Button>
        </div>
      </form>

      <Card className="bg-white/5 border-white/10">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
          <div className="space-y-4">
            {categories.filter(cat => cat.title.trim()).map((category, index) => (
              <div key={index}>
                <h4 className="font-medium text-gray-200 mb-2">{category.title}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.filter(skill => skill.trim()).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full text-sm text-white border border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsEditor;
