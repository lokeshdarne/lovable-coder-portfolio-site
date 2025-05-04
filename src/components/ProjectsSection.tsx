
import React, { useEffect, useRef, useState } from 'react';
import { Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  achievements: string[];
  github?: string;
  image: string;
}

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, index * 150);
          }
        });
      },
      {
        threshold: 0.1
      }
    );
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      observer.observe(card);
    });
    
    return () => {
      projectCards.forEach(card => {
        observer.unobserve(card);
      });
    };
  }, []);

  const projects: Project[] = [
    {
      title: "Inventory Management System",
      description: "Automated testing framework for an inventory management system",
      technologies: ["Selenium", "Python", "Pytest"],
      achievements: [
        "Developed 500+ automated test cases",
        "Improved test accuracy by 30%",
        "Reduced regression testing time by 40%"
      ],
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
      github: "https://github.com/lokeshdarne"
    },
    {
      title: "Healthcare E-Learning Platform",
      description: "Mobile and web automation feasibility study and implementation",
      technologies: ["AWS Device Farm", "Seetest.io", "Selenium", "Appium"],
      achievements: [
        "Achieved 25% faster test execution",
        "Implemented cross-platform testing solutions",
        "Created comprehensive test documentation"
      ],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
      github: "https://github.com/lokeshdarne"
    },
    {
      title: "Audio/Video Podcasts Platform",
      description: "End-to-end testing for multimedia streaming application",
      technologies: ["WebdriverIO", "JavaScript", "API Testing"],
      achievements: [
        "Increased test coverage by 40%",
        "Developed comprehensive test plans",
        "Implemented smoke, integration, and regression tests"
      ],
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
      github: "https://github.com/lokeshdarne"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="section-container" ref={sectionRef}>
        <h2 className="section-title">Featured Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="project-card animate-on-scroll rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white border border-gray-200"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110" 
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <div className="text-sm font-semibold mb-2">Technologies:</div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="px-2 py-1 bg-portfolio-light-purple text-portfolio-purple rounded-md text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm font-semibold mb-2">Achievements:</div>
                  <ul className="space-y-1">
                    {project.achievements.map((achievement, i) => (
                      <li key={i} className="flex text-sm">
                        <span className="w-1.5 h-1.5 bg-portfolio-purple rounded-full mr-2 mt-1.5"></span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {project.github && (
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-portfolio-purple hover:text-portfolio-purple/80 transition-colors"
                  >
                    <Github size={16} className="mr-1" />
                    <span>View on GitHub</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
