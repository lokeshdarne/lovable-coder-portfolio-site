
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { LogOut, Save, Activity, User, Code, Briefcase, GraduationCap, Mail, Award, FolderOpen } from 'lucide-react';
import HeroEditor from './sections/HeroEditor';
import AboutEditor from './sections/AboutEditor';
import ContactEditor from './sections/ContactEditor';
import SkillsEditor from './sections/SkillsEditor';
import ExperienceEditor from './sections/ExperienceEditor';
import EducationEditor from './sections/EducationEditor';
import ProjectsEditor from './sections/ProjectsEditor';
import PersonalProjectsEditor from './sections/PersonalProjectsEditor';
import ActivityLog from './ActivityLog';

interface PortfolioContent {
  section: string;
  content: any;
  last_updated: string;
}

const AdminDashboard = () => {
  const { user, signOut } = useAuth();
  const [portfolioData, setPortfolioData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadPortfolioData();
  }, []);

  const loadPortfolioData = async () => {
    try {
      const { data, error } = await supabase
        .from('portfolio_content')
        .select('*');

      if (error) throw error;

      const dataMap = data.reduce((acc: Record<string, any>, item: PortfolioContent) => {
        acc[item.section] = item.content;
        return acc;
      }, {});

      setPortfolioData(dataMap);
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load portfolio data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async (section: string, content: any) => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from('portfolio_content')
        .upsert({
          section,
          content,
          updated_by: user?.id,
          last_updated: new Date().toISOString(),
        });

      if (error) throw error;

      // Log the activity
      await supabase
        .from('admin_activity_log')
        .insert({
          user_id: user?.id,
          action: 'update_content',
          section,
          details: { content },
        });

      setPortfolioData(prev => ({ ...prev, [section]: content }));
      
      toast({
        title: 'Saved Successfully! ✨',
        description: `${section.charAt(0).toUpperCase() + section.slice(1)} section has been updated`,
      });
    } catch (error) {
      console.error('Error saving data:', error);
      toast({
        title: 'Oops! Something went wrong',
        description: 'Failed to save changes. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="text-white text-xl">Loading your portfolio data...</div>
      </div>
    );
  }

  const sections = [
    { id: 'hero', label: 'Hero Section', icon: User, description: 'Your main introduction' },
    { id: 'about', label: 'About Me', icon: User, description: 'Your story and background' },
    { id: 'experience', label: 'Work Experience', icon: Briefcase, description: 'Your professional journey' },
    { id: 'education', label: 'Education', icon: GraduationCap, description: 'Your academic background' },
    { id: 'skills', label: 'Skills & Tech', icon: Code, description: 'Your technical expertise' },
    { id: 'projects', label: 'Featured Projects', icon: Award, description: 'Your best work showcases' },
    { id: 'personal_projects', label: 'Personal Projects', icon: FolderOpen, description: 'Your side projects' },
    { id: 'contact', label: 'Contact Info', icon: Mail, description: 'How people can reach you' },
    { id: 'activity', label: 'Activity Log', icon: Activity, description: 'Track your changes' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Portfolio Control Center</h1>
            <p className="text-gray-400">Welcome back! Edit your portfolio content easily below.</p>
          </div>
          <Button
            onClick={handleSignOut}
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9 bg-white/10 border-white/20 mb-8">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <TabsTrigger 
                  key={section.id}
                  value={section.id} 
                  className="text-white data-[state=active]:bg-white/20 flex flex-col items-center p-3"
                >
                  <Icon className="w-4 h-4 mb-1" />
                  <span className="text-xs hidden lg:block">{section.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="hero">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Hero Section - Your Main Introduction
                  </div>
                  {saving && (
                    <span className="text-sm text-purple-300 flex items-center">
                      <Save className="w-4 h-4 mr-2" />
                      Saving...
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <HeroEditor
                  data={portfolioData.hero || {}}
                  onSave={(content) => saveSection('hero', content)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  About Section - Tell Your Story
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AboutEditor
                  data={portfolioData.about || {}}
                  onSave={(content) => saveSection('about', content)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Work Experience - Your Professional Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ExperienceEditor
                  data={portfolioData.experience || {}}
                  onSave={(content) => saveSection('experience', content)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  Education - Your Academic Background
                </CardTitle>
              </CardHeader>
              <CardContent>
                <EducationEditor
                  data={portfolioData.education || {}}
                  onSave={(content) => saveSection('education', content)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Skills & Technologies - Your Expertise
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SkillsEditor
                  data={portfolioData.skills || {}}
                  onSave={(content) => saveSection('skills', content)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Featured Projects - Your Best Work
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProjectsEditor
                  data={portfolioData.projects || {}}
                  onSave={(content) => saveSection('projects', content)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personal_projects">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FolderOpen className="w-5 h-5 mr-2" />
                  Personal Projects - Your Side Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PersonalProjectsEditor
                  data={portfolioData.personal_projects || {}}
                  onSave={(content) => saveSection('personal_projects', content)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Information - How People Reach You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ContactEditor
                  data={portfolioData.contact || {}}
                  onSave={(content) => saveSection('contact', content)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Activity Log - Track Your Changes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ActivityLog />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
