
import React, { useEffect, useRef } from 'react';
import { Github } from 'lucide-react';

interface PersonalProject {
  title: string;
  description: string;
  github: string;
  technologies: string[];
  image: string;
}

const PersonalProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    
    const projectCards = document.querySelectorAll('.personal-project-card');
    projectCards.forEach(card => {
      observer.observe(card);
    });
    
    return () => {
      projectCards.forEach(card => {
        observer.unobserve(card);
      });
    };
  }, []);

  const personalProjects: PersonalProject[] = [
    {
      title: "Jaywant Industries Ecosafe",
      description: "Developed a website for a local business focused on environmental safety solutions",
      technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      github: "https://github.com/lokeshdarne/jaywantindustriesecosafe",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Spotify RestAssured API Automation",
      description: "API Automation Framework for Spotify using RestAssured with comprehensive test coverage",
      technologies: ["Java", "RestAssured", "TestNG", "Maven"],
      github: "https://github.com/lokeshdarne/SpotifyRestAssuredApiAutomationFramework",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Code Llama Exploration",
      description: "Research and experimentation with the Code Llama large language model",
      technologies: ["Python", "LLMs", "NLP", "Machine Learning"],
      github: "https://github.com/lokeshdarne/codellama",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section id="personal-projects" className="py-20 bg-white">
      <div className="section-container" ref={sectionRef}>
        <h2 className="section-title">Personal Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {personalProjects.map((project, index) => (
            <div 
              key={index}
              className="personal-project-card animate-on-scroll rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-white border border-gray-200"
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
                
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-portfolio-purple hover:text-portfolio-purple/80 transition-colors"
                >
                  <Github size={16} className="mr-1" />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PersonalProjectsSection;
