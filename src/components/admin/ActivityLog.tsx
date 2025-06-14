
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface ActivityEntry {
  id: string;
  action: string;
  section: string;
  timestamp: string;
  details: any;
}

const ActivityLog = () => {
  const [activities, setActivities] = useState<ActivityEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivityLog();
  }, []);

  const loadActivityLog = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_activity_log')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error loading activity log:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading activity log...</div>;
  }

  return (
    <div className="space-y-4">
      {activities.length === 0 ? (
        <p className="text-gray-400">No activity recorded yet.</p>
      ) : (
        activities.map((activity) => (
          <Card key={activity.id} className="bg-white/5 border-white/10">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                    {activity.action.replace('_', ' ')}
                  </Badge>
                  {activity.section && (
                    <Badge variant="outline" className="border-white/20 text-gray-300">
                      {activity.section}
                    </Badge>
                  )}
                </div>
                <span className="text-sm text-gray-400">
                  {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                Updated {activity.section} section content
              </p>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default ActivityLog;
