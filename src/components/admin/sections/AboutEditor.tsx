
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface AboutData {
  title?: string;
  content?: string;
}

interface AboutEditorProps {
  data: AboutData;
  onSave: (data: AboutData) => void;
}

const AboutEditor: React.FC<AboutEditorProps> = ({ data, onSave }) => {
  const [formData, setFormData] = useState<AboutData>({
    title: data.title || '',
    content: data.content || '',
  });

  useEffect(() => {
    setFormData({
      title: data.title || '',
      content: data.content || '',
    });
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof AboutData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="about-title" className="text-gray-200">Section Title</Label>
          <Input
            id="about-title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            placeholder="About Me"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="about-content" className="text-gray-200">About Content</Label>
          <Textarea
            id="about-content"
            value={formData.content}
            onChange={(e) => handleChange('content', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[200px]"
            placeholder="Tell your story, highlight your experience and expertise..."
          />
        </div>

        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          Save About Section
        </Button>
      </form>

      <Card className="bg-white/5 border-white/10">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
          <div className="space-y-4">
            <h2 className="text-xl font-bold gradient-text">{formData.title || 'About Me'}</h2>
            <p className="text-gray-300 leading-relaxed">
              {formData.content || 'Tell your story, highlight your experience and expertise...'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutEditor;
