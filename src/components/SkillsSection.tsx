
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
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Web Automation",
      skills: ["Selenium", "WebdriverIO", "Cypress", "Playwright"],
      icon: "🌐",
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Mobile Automation",
      skills: ["Appium (TestNG)", "Appium (WebdriverIO)"],
      icon: "📱",
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Frameworks",
      skills: ["TestNG", "Pytest"],
      icon: "🧪",
      color: "bg-yellow-50 border-yellow-200"
    },
    {
      title: "API Testing",
      skills: ["Postman", "GraphQL", "RestAssured", "Requests"],
      icon: "🔄",
      color: "bg-red-50 border-red-200"
    },
    {
      title: "Version Control",
      skills: ["Git (GitHub)", "Git (SourceTree)"],
      icon: "🔄",
      color: "bg-indigo-50 border-indigo-200"
    },
    {
      title: "Databases",
      skills: ["MySQL", "Hasura"],
      icon: "🗃️",
      color: "bg-teal-50 border-teal-200"
    },
    {
      title: "Project Management",
      skills: ["JIRA", "Zenhub"],
      icon: "📊",
      color: "bg-orange-50 border-orange-200"
    },
    {
      title: "Cloud",
      skills: ["AWS", "GCP", "Firebase", "SeeTest.io"],
      icon: "☁️",
      color: "bg-cyan-50 border-cyan-200"
    },
    {
      title: "GenAI Tools",
      skills: ["LM Studio", "Ollama", "Autogen", "Langchain"],
      icon: "🤖",
      color: "bg-pink-50 border-pink-200"
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="section-container" ref={sectionRef}>
        <h2 className="section-title">My Toolkit</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className={`skill-card p-6 rounded-lg shadow-skill border ${category.color} animate-on-scroll`}
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{category.icon}</span>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center">
                    <span className="w-1.5 h-1.5 bg-portfolio-purple rounded-full mr-2"></span>
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
