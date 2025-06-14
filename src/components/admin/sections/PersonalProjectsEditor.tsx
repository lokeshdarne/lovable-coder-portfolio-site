
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, FolderOpen, ExternalLink, Github } from 'lucide-react';

interface PersonalProject {
  title: string;
  description: string;
  technologies: string[];
  status: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface PersonalProjectsData {
  title?: string;
  projects?: PersonalProject[];
}

interface PersonalProjectsEditorProps {
  data: PersonalProjectsData;
  onSave: (data: PersonalProjectsData) => void;
}

const PersonalProjectsEditor: React.FC<PersonalProjectsEditorProps> = ({ data, onSave }) => {
  const [formData, setFormData] = useState<PersonalProjectsData>({
    title: data.title || 'Personal Projects',
    projects: data.projects || [
      {
        title: '',
        description: '',
        technologies: [''],
        status: 'In Progress',
        liveUrl: '',
        githubUrl: ''
      }
    ],
  });

  useEffect(() => {
    setFormData({
      title: data.title || 'Personal Projects',
      projects: data.projects || [
        {
          title: '',
          description: '',
          technologies: [''],
          status: 'In Progress',
          liveUrl: '',
          githubUrl: ''
        }
      ],
    });
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      projects: formData.projects?.filter(project => project.title.trim()).map(project => ({
        ...project,
        technologies: project.technologies.filter(tech => tech.trim())
      }))
    };
    onSave(cleanedData);
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [
        ...(prev.projects || []),
        {
          title: '',
          description: '',
          technologies: [''],
          status: 'In Progress',
          liveUrl: '',
          githubUrl: ''
        }
      ]
    }));
  };

  const removeProject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects?.filter((_, i) => i !== index)
    }));
  };

  const updateProject = (index: number, field: keyof PersonalProject, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects?.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }));
  };

  const addTechnology = (projectIndex: number) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects?.map((project, i) => 
        i === projectIndex ? { 
          ...project, 
          technologies: [...project.technologies, ''] 
        } : project
      )
    }));
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects?.map((project, i) => 
        i === projectIndex ? { 
          ...project, 
          technologies: project.technologies.filter((_, j) => j !== techIndex) 
        } : project
      )
    }));
  };

  const updateTechnology = (projectIndex: number, techIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      projects: prev.projects?.map((project, i) => 
        i === projectIndex ? { 
          ...project, 
          technologies: project.technologies.map((tech, j) => j === techIndex ? value : tech)
        } : project
      )
    }));
  };

  const statusOptions = ['In Progress', 'Completed', 'On Hold', 'Planning'];

  return (
    <div className="space-y-6">
      <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
        <h3 className="text-cyan-300 font-semibold mb-2">💡 Personal Projects & Side Hustles:</h3>
        <ul className="text-sm text-cyan-200 space-y-1">
          <li>• Showcase your personal coding projects, experiments, and learning journeys</li>
          <li>• Include hobby projects, open source contributions, or things you built for fun</li>
          <li>• Set the status to show if it's completed, in progress, or just an idea</li>
          <li>• These show your passion and initiative beyond work projects</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="personal-projects-title" className="text-gray-200">Section Title</Label>
          <Input
            id="personal-projects-title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            placeholder="Personal Projects"
          />
        </div>

        {formData.projects?.map((project, projectIndex) => (
          <Card key={projectIndex} className="bg-white/5 border-white/10">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FolderOpen className="w-5 h-5 text-cyan-400 mr-2" />
                  <Label className="text-gray-200">Personal Project #{projectIndex + 1}</Label>
                </div>
                {(formData.projects?.length || 0) > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeProject(projectIndex)}
                    className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-200">Project Name</Label>
                  <Input
                    value={project.title}
                    onChange={(e) => updateProject(projectIndex, 'title', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="e.g., Weather App, Chat Bot"
                  />
                </div>
                <div>
                  <Label className="text-gray-200">Project Status</Label>
                  <select
                    value={project.status}
                    onChange={(e) => updateProject(projectIndex, 'status', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status} className="bg-gray-800">
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label className="text-gray-200">Project Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(projectIndex, 'description', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[80px]"
                  placeholder="What does this project do? What inspired you to build it? What did you learn?"
                />
              </div>

              <div>
                <Label className="text-gray-200">Technologies/Tools Used</Label>
                {project.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="flex items-center gap-2 mt-2">
                    <Input
                      value={tech}
                      onChange={(e) => updateTechnology(projectIndex, techIndex, e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="e.g., React, Firebase, Python"
                    />
                    {project.technologies.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTechnology(projectIndex, techIndex)}
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
                  onClick={() => addTechnology(projectIndex)}
                  className="border-white/20 text-white hover:bg-white/10 mt-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Technology
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-200">Live Demo URL (optional)</Label>
                  <Input
                    value={project.liveUrl}
                    onChange={(e) => updateProject(projectIndex, 'liveUrl', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="https://myproject.netlify.app"
                  />
                </div>
                <div>
                  <Label className="text-gray-200">GitHub URL (optional)</Label>
                  <Input
                    value={project.githubUrl}
                    onChange={(e) => updateProject(projectIndex, 'githubUrl', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={addProject}
            className="border-white/20 text-white hover:bg-white/10"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Project
          </Button>
          
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <FolderOpen className="w-4 h-4 mr-2" />
            Save Personal Projects
          </Button>
        </div>
      </form>

      <Card className="bg-white/5 border-white/10">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
          <div className="space-y-4">
            <h2 className="text-xl font-bold gradient-text">{formData.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.projects?.filter(project => project.title.trim()).map((project, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs ${
                      project.status === 'Completed' ? 'bg-green-500/20 text-green-300' :
                      project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-300' :
                      project.status === 'On Hold' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.filter(tech => tech.trim()).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-cyan-500/20 rounded text-xs text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-400 text-sm hover:text-blue-300"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-400 text-sm hover:text-gray-300"
                      >
                        <Github className="w-3 h-3 mr-1" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalProjectsEditor;
