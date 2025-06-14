
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface HeroData {
  title?: string;
  subtitle?: string;
  description?: string;
}

interface HeroEditorProps {
  data: HeroData;
  onSave: (data: HeroData) => void;
}

const HeroEditor: React.FC<HeroEditorProps> = ({ data, onSave }) => {
  const [formData, setFormData] = useState<HeroData>({
    title: data.title || '',
    subtitle: data.subtitle || '',
    description: data.description || '',
  });

  useEffect(() => {
    setFormData({
      title: data.title || '',
      subtitle: data.subtitle || '',
      description: data.description || '',
    });
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof HeroData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-gray-200">Main Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            placeholder="Your Name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subtitle" className="text-gray-200">Subtitle/Role</Label>
          <Input
            id="subtitle"
            value={formData.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            placeholder="Your Professional Title"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-gray-200">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
            placeholder="Brief description or tagline"
          />
        </div>

        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          Save Hero Section
        </Button>
      </form>

      <Card className="bg-white/5 border-white/10">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold gradient-text">{formData.title || 'Your Name'}</h1>
            <h2 className="text-lg text-gray-300">{formData.subtitle || 'Your Professional Title'}</h2>
            <p className="text-gray-400">{formData.description || 'Brief description or tagline'}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroEditor;
