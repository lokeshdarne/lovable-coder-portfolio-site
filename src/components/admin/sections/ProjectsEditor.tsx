
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Trash2, Award, ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured: boolean;
}

interface ProjectsData {
  title?: string;
  projects?: Project[];
}

interface ProjectsEditorProps {
  data: ProjectsData;
  onSave: (data: ProjectsData) => void;
}

const ProjectsEditor: React.FC<ProjectsEditorProps> = ({ data, onSave }) => {
  const [formData, setFormData] = useState<ProjectsData>({
    title: data.title || 'Featured Projects',
    projects: data.projects || [
      {
        title: '',
        description: '',
        technologies: [''],
        liveUrl: '',
        githubUrl: '',
        image: '',
        featured: true
      }
    ],
  });

  useEffect(() => {
    setFormData({
      title: data.title || 'Featured Projects',
      projects: data.projects || [
        {
          title: '',
          description: '',
          technologies: [''],
          liveUrl: '',
          githubUrl: '',
          image: '',
          featured: true
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
          liveUrl: '',
          githubUrl: '',
          image: '',
          featured: true
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

  const updateProject = (index: number, field: keyof Project, value: string | boolean | string[]) => {
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

  return (
    <div className="space-y-6">
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
        <h3 className="text-purple-300 font-semibold mb-2">🚀 Showcase Your Best Work:</h3>
        <ul className="text-sm text-purple-200 space-y-1">
          <li>• Add your most impressive projects that show your skills</li>
          <li>• Include the technologies you used (React, Python, etc.)</li>
          <li>• Add links to live demos and GitHub repositories</li>
          <li>• Write clear descriptions of what the project does and your role</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="projects-title" className="text-gray-200">Section Title</Label>
          <Input
            id="projects-title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
            placeholder="Featured Projects"
          />
        </div>

        {formData.projects?.map((project, projectIndex) => (
          <Card key={projectIndex} className="bg-white/5 border-white/10">
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-yellow-400 mr-2" />
                  <Label className="text-gray-200">Project #{projectIndex + 1}</Label>
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
                    placeholder="e.g., E-commerce Website"
                  />
                </div>
                <div>
                  <Label className="text-gray-200">Project Image URL (optional)</Label>
                  <Input
                    value={project.image}
                    onChange={(e) => updateProject(projectIndex, 'image', e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <Label className="text-gray-200">Project Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => updateProject(projectIndex, 'description', e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[100px]"
                  placeholder="Describe what this project does, the problem it solves, and your role in building it..."
                />
              </div>

              <div>
                <Label className="text-gray-200">Technologies Used</Label>
                {project.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="flex items-center gap-2 mt-2">
                    <Input
                      value={tech}
                      onChange={(e) => updateTechnology(projectIndex, techIndex, e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      placeholder="e.g., React, Node.js, MongoDB"
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
                    placeholder="https://myproject.com"
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
            <Award className="w-4 h-4 mr-2" />
            Save Projects
          </Button>
        </div>
      </form>

      <Card className="bg-white/5 border-white/10">
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
          <div className="space-y-6">
            <h2 className="text-xl font-bold gradient-text">{formData.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formData.projects?.filter(project => project.title.trim()).map((project, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  {project.image && (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                  )}
                  <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.filter(tech => tech.trim()).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300"
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
                        Live Demo
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

export default ProjectsEditor;
