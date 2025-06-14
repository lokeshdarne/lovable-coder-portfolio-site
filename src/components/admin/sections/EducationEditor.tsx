
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

interface Education {
  institution: string;
  degree: string;
  field: string;
  year: string;
  grade?: string;
  description?: string;
}

interface EducationData {
  title?: string;
  education?: Education[];
}

interface EducationEditorProps {
  data: EducationData;
  onSave: (data: EducationData) => void;
}

const EducationEditor: React.FC<EducationEditorProps> = ({ data, onSave }) => {
  const [formData, setFormData] = useState<EducationData>({
    title: data.title || 'Education',
    education: data.education || [
      {
        institution: '',
        degree: '',
        field: '',
        year: '',
        grade: '',
        description: ''
      }
    ],
  });

  useEffect(() => {
    setFormData({
      title: data.title || 'Education',
      education: data.education || [
        {
          institution: '',
          degree: '',
          field: '',
          year: '',
          grade: '',
          description: ''
        }
      ],
    });
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      education: formData.education?.filter(edu => edu.institution.trim() || edu.degree.trim())
    };
    onSave(cleanedData);
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [
        ...(prev.education || []),
        {
          institution: '',
          degree: '',
          field: '',
          year: '',
          grade: '',
          description: ''
        }
      ]
    }));
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education?.filter((_, i) => i !== index)
    }));
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education?.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
        <h3 className="text-green-300 font-semibold mb-2">🎓 Education Made Simple:</h3>
        <ul className="text-sm text-green-200 space-y-1">
          <li>• Add your schools, colleges, universities, or certifications</li>
          <li>• Fill in your degree, major/field of study, and graduation year</li>
          <li>• Include your GPA/grade if you want to showcase it</li>
          <li>• Add any special achievements or relevant coursework</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="edu-title" className="text-gray-200">Section Title</Label>
          <Input
            id="edu-title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            placeholder="Education"
          />
        </div>

        {formData.education?.map((education, eduIndex) => (
          <Card key={eduIndex} className="bg-white/5 border-white/10">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <GraduationCap className="w-5 h-5 text-blue-400 mr-2" />
                  <Label className="text-gray-200">Education #{eduIndex + 1}</Label>
                </div>
                {(formData.education?.length || 0) > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeEducation(eduIndex)}
                    className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-200">School/University Name</Label>
                  <Input
                    value={education.institution}
                    onChange={(e) => updateEducation(eduIndex, 'institution', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="e.g., Stanford University"
                  />
                </div>
                <div>
                  <Label className="text-gray-200">Degree/Certification</Label>
                  <Input
                    value={education.degree}
                    onChange={(e) => updateEducation(eduIndex, 'degree', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="e.g., Bachelor's, Master's, PhD"
                  />
                </div>
                <div>
                  <Label className="text-gray-200">Field of Study/Major</Label>
                  <Input
                    value={education.field}
                    onChange={(e) => updateEducation(eduIndex, 'field', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="e.g., Computer Science"
                  />
                </div>
                <div>
                  <Label className="text-gray-200">Year/Duration</Label>
                  <Input
                    value={education.year}
                    onChange={(e) => updateEducation(eduIndex, 'year', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="e.g., 2018-2022 or 2022"
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-200">Grade/GPA (optional)</Label>
                <Input
                  value={education.grade}
                  onChange={(e) => updateEducation(eduIndex, 'grade', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="e.g., 3.8 GPA, First Class, 85%"
                />
              </div>

              <div>
                <Label className="text-gray-200">Additional Details (optional)</Label>
                <Textarea
                  value={education.description}
                  onChange={(e) => updateEducation(eduIndex, 'description', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="e.g., Relevant coursework, achievements, honors..."
                />
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={addEducation}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Education
          </Button>
          
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Save Education
          </Button>
        </div>
      </form>

      <Card className="bg-white/5 border-white/10">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
          <div className="space-y-4">
            <h2 className="text-xl font-bold gradient-text">{formData.title}</h2>
            {formData.education?.filter(edu => edu.institution || edu.degree).map((edu, index) => (
              <div key={index} className="border-l-2 border-blue-500/30 pl-4">
                <h3 className="text-lg font-semibold text-white">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </h3>
                <p className="text-blue-300 font-medium">{edu.institution}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  {edu.year && <span>{edu.year}</span>}
                  {edu.grade && <span>• {edu.grade}</span>}
                </div>
                {edu.description && <p className="text-gray-300 mt-2">{edu.description}</p>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EducationEditor;
