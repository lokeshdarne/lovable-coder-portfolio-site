
-- Create a table to store portfolio content sections
CREATE TABLE public.portfolio_content (
  section TEXT PRIMARY KEY,
  content JSONB NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users only
CREATE POLICY "Authenticated users can view portfolio content" 
  ON public.portfolio_content 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert portfolio content" 
  ON public.portfolio_content 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated' AND updated_by = auth.uid());

CREATE POLICY "Authenticated users can update portfolio content" 
  ON public.portfolio_content 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Create a table for activity logging
CREATE TABLE public.admin_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  action TEXT NOT NULL,
  section TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  details JSONB
);

-- Enable RLS on activity log
ALTER TABLE public.admin_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own activity" 
  ON public.admin_activity_log 
  FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert their own activity" 
  ON public.admin_activity_log 
  FOR INSERT 
  WITH CHECK (user_id = auth.uid());

-- Insert initial portfolio content structure
INSERT INTO public.portfolio_content (section, content) VALUES
('hero', '{"title": "LOKESH DARNE", "subtitle": "Software Development Engineer in Test", "description": "Crafting Quality Software with Code and Creativity"}'),
('about', '{"title": "About Me", "content": "I am an experienced Software Development Engineer in Test (SDET) with expertise in web and mobile application testing, automation frameworks, and quality assurance across diverse domains."}'),
('contact', '{"email": "lokeshdarne@gmail.com", "linkedin": "https://linkedin.com/in/lokeshdarne", "github": "https://github.com/lokeshdarne"}'),
('skills', '{"categories": [{"title": "Programming Languages", "skills": ["Python", "Java", "JavaScript"]}, {"title": "Web Automation", "skills": ["Selenium", "WebdriverIO", "Cypress", "Playwright"]}]}');
