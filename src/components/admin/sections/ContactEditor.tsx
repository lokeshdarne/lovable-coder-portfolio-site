
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ContactData {
  email?: string;
  linkedin?: string;
  github?: string;
}

interface ContactEditorProps {
  data: ContactData;
  onSave: (data: ContactData) => void;
}

const ContactEditor: React.FC<ContactEditorProps> = ({ data, onSave }) => {
  const [formData, setFormData] = useState<ContactData>({
    email: data.email || '',
    linkedin: data.linkedin || '',
    github: data.github || '',
  });

  useEffect(() => {
    setFormData({
      email: data.email || '',
      linkedin: data.linkedin || '',
      github: data.github || '',
    });
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof ContactData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-200">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            placeholder="your.email@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin" className="text-gray-200">LinkedIn Profile</Label>
          <Input
            id="linkedin"
            value={formData.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github" className="text-gray-200">GitHub Profile</Label>
          <Input
            id="github"
            value={formData.github}
            onChange={(e) => handleChange('github', e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            placeholder="https://github.com/yourusername"
          />
        </div>

        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          Save Contact Information
        </Button>
      </form>

      <Card className="bg-white/5 border-white/10">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
          <div className="space-y-2">
            <p className="text-gray-300">
              <span className="font-medium">Email:</span> {formData.email || 'your.email@example.com'}
            </p>
            <p className="text-gray-300">
              <span className="font-medium">LinkedIn:</span> {formData.linkedin || 'https://linkedin.com/in/yourprofile'}
            </p>
            <p className="text-gray-300">
              <span className="font-medium">GitHub:</span> {formData.github || 'https://github.com/yourusername'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactEditor;
