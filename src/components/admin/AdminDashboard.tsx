
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { LogOut, Save, Activity } from 'lucide-react';
import HeroEditor from './sections/HeroEditor';
import AboutEditor from './sections/AboutEditor';
import ContactEditor from './sections/ContactEditor';
import SkillsEditor from './sections/SkillsEditor';
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
        title: 'Success',
        description: `${section} section updated successfully`,
      });
    } catch (error) {
      console.error('Error saving data:', error);
      toast({
        title: 'Error',
        description: 'Failed to save changes',
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
        <div className="text-white text-xl">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Portfolio Admin</h1>
            <p className="text-gray-400">Welcome back, {user?.email}</p>
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
          <TabsList className="grid w-full grid-cols-5 bg-white/10 border-white/20">
            <TabsTrigger value="hero" className="text-white data-[state=active]:bg-white/20">Hero</TabsTrigger>
            <TabsTrigger value="about" className="text-white data-[state=active]:bg-white/20">About</TabsTrigger>
            <TabsTrigger value="contact" className="text-white data-[state=active]:bg-white/20">Contact</TabsTrigger>
            <TabsTrigger value="skills" className="text-white data-[state=active]:bg-white/20">Skills</TabsTrigger>
            <TabsTrigger value="activity" className="text-white data-[state=active]:bg-white/20">
              <Activity className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Hero Section
                  <Button
                    disabled={saving}
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-blue-500"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Auto-save'}
                  </Button>
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
                <CardTitle className="text-white">About Section</CardTitle>
              </CardHeader>
              <CardContent>
                <AboutEditor
                  data={portfolioData.about || {}}
                  onSave={(content) => saveSection('about', content)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactEditor
                  data={portfolioData.contact || {}}
                  onSave={(content) => saveSection('contact', content)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Skills & Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <SkillsEditor
                  data={portfolioData.skills || {}}
                  onSave={(content) => saveSection('skills', content)}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Activity Log</CardTitle>
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
