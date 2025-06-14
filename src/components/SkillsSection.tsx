
import React, { useEffect, useRef } from 'react';

interface SkillCategory {
  title: string;
  skills: string[];
  icon: string;
  color: string;
}

const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('is-visible');
            }, index * 100);
          }
        });
      },
      {
        threshold: 0.1
      }
    );
    
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
      observer.observe(card);
    });
    
    return () => {
      skillCards.forEach(card => {
        observer.unobserve(card);
      });
    };
  }, []);
  
  const skillCategories: SkillCategory[] = [
    {
      title: "Programming Languages",
      skills: ["Python", "Java", "JavaScript"],
      icon: "💻",
      color: "glass-card border-blue-500/20"
    },
    {
      title: "Web Automation",
      skills: ["Selenium", "WebdriverIO", "Cypress", "Playwright"],
      icon: "🌐",
      color: "glass-card border-green-500/20"
    },
    {
      title: "Mobile Automation",
      skills: ["Appium (TestNG)", "Appium (WebdriverIO)"],
      icon: "📱",
      color: "glass-card border-purple-500/20"
    },
    {
      title: "Frameworks",
      skills: ["TestNG", "Pytest"],
      icon: "🧪",
      color: "glass-card border-yellow-500/20"
    },
    {
      title: "API Testing",
      skills: ["Postman", "GraphQL", "RestAssured", "Requests"],
      icon: "🔄",
      color: "glass-card border-red-500/20"
    },
    {
      title: "Version Control",
      skills: ["Git (GitHub)", "Git (SourceTree)"],
      icon: "🔄",
      color: "glass-card border-indigo-500/20"
    },
    {
      title: "Databases",
      skills: ["MySQL", "Hasura"],
      icon: "🗃️",
      color: "glass-card border-teal-500/20"
    },
    {
      title: "Project Management",
      skills: ["JIRA", "Zenhub"],
      icon: "📊",
      color: "glass-card border-orange-500/20"
    },
    {
      title: "Cloud",
      skills: ["AWS", "GCP", "Firebase", "SeeTest.io"],
      icon: "☁️",
      color: "glass-card border-cyan-500/20"
    },
    {
      title: "GenAI Tools",
      skills: ["LM Studio", "Ollama", "Autogen", "Langchain"],
      icon: "🤖",
      color: "glass-card border-pink-500/20"
    }
  ];

  return (
    <section id="skills" className="py-20 dark-glass-section">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl floating-animation" />
        <div className="absolute bottom-1/4 -left-20 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl floating-animation" style={{animationDelay: '4s'}} />
      </div>
      
      <div className="section-container relative z-10" ref={sectionRef}>
        <h2 className="section-title">My Toolkit</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className={`skill-card p-6 ${category.color} animate-on-scroll hover:glow-effect`}
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{category.icon}</span>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center text-gray-300">
                    <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
