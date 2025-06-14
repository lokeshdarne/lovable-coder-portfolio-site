
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Briefcase } from 'lucide-react';

interface Experience {
  company: string;
  position: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
}

interface ExperienceData {
  title?: string;
  experiences?: Experience[];
}

interface ExperienceEditorProps {
  data: ExperienceData;
  onSave: (data: ExperienceData) => void;
}

const ExperienceEditor: React.FC<ExperienceEditorProps> = ({ data, onSave }) => {
  const [formData, setFormData] = useState<ExperienceData>({
    title: data.title || 'Professional Experience',
    experiences: data.experiences || [
      {
        company: '',
        position: '',
        duration: '',
        location: '',
        description: '',
        achievements: ['']
      }
    ],
  });

  useEffect(() => {
    setFormData({
      title: data.title || 'Professional Experience',
      experiences: data.experiences || [
        {
          company: '',
          position: '',
          duration: '',
          location: '',
          description: '',
          achievements: ['']
        }
      ],
    });
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      experiences: formData.experiences?.filter(exp => exp.company.trim() || exp.position.trim()).map(exp => ({
        ...exp,
        achievements: exp.achievements.filter(achievement => achievement.trim())
      }))
    };
    onSave(cleanedData);
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experiences: [
        ...(prev.experiences || []),
        {
          company: '',
          position: '',
          duration: '',
          location: '',
          description: '',
          achievements: ['']
        }
      ]
    }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences?.filter((_, i) => i !== index)
    }));
  };

  const updateExperience = (index: number, field: keyof Experience, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences?.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addAchievement = (expIndex: number) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences?.map((exp, i) => 
        i === expIndex ? { ...exp, achievements: [...exp.achievements, ''] } : exp
      )
    }));
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences?.map((exp, i) => 
        i === expIndex ? { 
          ...exp, 
          achievements: exp.achievements.filter((_, j) => j !== achIndex) 
        } : exp
      )
    }));
  };

  const updateAchievement = (expIndex: number, achIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences?.map((exp, i) => 
        i === expIndex ? { 
          ...exp, 
          achievements: exp.achievements.map((ach, j) => j === achIndex ? value : ach)
        } : exp
      )
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
        <h3 className="text-blue-300 font-semibold mb-2">💡 Easy Editing Tips:</h3>
        <ul className="text-sm text-blue-200 space-y-1">
          <li>• Fill in your job details - company name, your role, when you worked there</li>
          <li>• Add bullet points for your key achievements in each role</li>
          <li>• Use the "+" buttons to add more jobs or achievements</li>
          <li>• Click "Save" when you're done to update your portfolio</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="exp-title" className="text-gray-200">Section Title</Label>
          <Input
            id="exp-title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            placeholder="Professional Experience"
          />
        </div>

        {formData.experiences?.map((experience, expIndex) => (
          <Card key={expIndex} className="bg-white/5 border-white/10">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Briefcase className="w-5 h-5 text-purple-400 mr-2" />
                  <Label className="text-gray-200">Job #{expIndex + 1}</Label>
                </div>
                {(formData.experiences?.length || 0) > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeExperience(expIndex)}
                    className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-200">Company Name</Label>
                  <Input
                    value={experience.company}
                    onChange={(e) => updateExperience(expIndex, 'company', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="e.g., Google, Microsoft"
                  />
                </div>
                <div>
                  <Label className="text-gray-200">Your Position/Role</Label>
                  <Input
                    value={experience.position}
                    onChange={(e) => updateExperience(expIndex, 'position', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>
                <div>
                  <Label className="text-gray-200">Duration</Label>
                  <Input
                    value={experience.duration}
                    onChange={(e) => updateExperience(expIndex, 'duration', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="e.g., Jan 2020 - Present"
                  />
                </div>
                <div>
                  <Label className="text-gray-200">Location</Label>
                  <Input
                    value={experience.location}
                    onChange={(e) => updateExperience(expIndex, 'location', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-200">Job Description</Label>
                <Textarea
                  value={experience.description}
                  onChange={(e) => updateExperience(expIndex, 'description', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Brief description of your role and responsibilities..."
                />
              </div>

              <div>
                <Label className="text-gray-200">Key Achievements (bullet points)</Label>
                {experience.achievements.map((achievement, achIndex) => (
                  <div key={achIndex} className="flex items-center gap-2 mt-2">
                    <Input
                      value={achievement}
                      onChange={(e) => updateAchievement(expIndex, achIndex, e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="e.g., Improved system performance by 40%"
                    />
                    {experience.achievements.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeAchievement(expIndex, achIndex)}
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
                  onClick={() => addAchievement(expIndex)}
                  className="border-white/20 text-white hover:bg-white/10 mt-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Achievement
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={addExperience}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Job
          </Button>
          
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <Briefcase className="w-4 h-4 mr-2" />
            Save Experience
          </Button>
        </div>
      </form>

      <Card className="bg-white/5 border-white/10">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
          <div className="space-y-6">
            <h2 className="text-xl font-bold gradient-text">{formData.title}</h2>
            {formData.experiences?.filter(exp => exp.company || exp.position).map((exp, index) => (
              <div key={index} className="border-l-2 border-purple-500/30 pl-4">
                <h3 className="text-lg font-semibold text-white">{exp.position || 'Position'}</h3>
                <p className="text-purple-300 font-medium">{exp.company || 'Company'}</p>
                <p className="text-sm text-gray-400">{exp.duration} • {exp.location}</p>
                {exp.description && <p className="text-gray-300 mt-2">{exp.description}</p>}
                {exp.achievements.filter(ach => ach.trim()).length > 0 && (
                  <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                    {exp.achievements.filter(ach => ach.trim()).map((achievement, achIndex) => (
                      <li key={achIndex}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExperienceEditor;
