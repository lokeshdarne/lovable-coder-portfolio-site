
import React, { useEffect, useRef } from 'react';
import { Calendar, Briefcase } from 'lucide-react';

interface ExperienceItem {
  company: string;
  title: string;
  duration: string;
  description: string[];
  align?: 'left' | 'right';
}

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.1
      }
    );
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      observer.observe(item);
    });
    
    return () => {
      timelineItems.forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);

  const experiences: ExperienceItem[] = [
    {
      company: "Synechron",
      title: "Full Stack QA @ HSBC",
      duration: "10 Months",
      align: "right",
      description: [
        "Conducted comprehensive end-to-end testing for web and mobile applications",
        "Implemented API testing strategies to ensure robust backend functionality",
        "Collaborated with cross-functional teams to improve QA processes",
        "Led test planning and execution for new features"
      ]
    },
    {
      company: "Bebo Technologies",
      title: "Automation Test Engineer",
      duration: "3.1 Years",
      align: "left",
      description: [
        "Developed and maintained Python/Pytest automation frameworks, achieving 80% reduction in test failures",
        "Led mobile testing initiatives across Android and iOS platforms",
        "Implemented AI utilities for enhanced testing efficiency",
        "Managed end-to-end test planning, execution, and reporting for multiple projects"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="section-container" ref={sectionRef}>
        <h2 className="section-title">My Journey</h2>
        
        <div className="relative timeline-line">
          {experiences.map((exp, index) => (
            <div 
              key={index}
              className={`timeline-item mb-12 md:mb-0 animate-on-scroll ${
                exp.align === 'left' 
                  ? 'md:ml-auto md:pr-8 md:pl-0' 
                  : 'md:mr-auto md:pl-8 md:pr-0'
              } pl-8 relative md:w-1/2`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 w-4 h-4 bg-portfolio-purple rounded-full z-10 md:left-1/2 md:-translate-x-1/2"></div>
              
              <div className="rounded-lg border border-gray-200 p-6 shadow-md bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-2">
                  <Briefcase size={20} className="text-portfolio-purple mr-2" />
                  <h3 className="text-xl font-bold">{exp.company}</h3>
                </div>
                
                <div className="mb-3 text-lg font-medium">{exp.title}</div>
                
                <div className="flex items-center mb-4 text-gray-600">
                  <Calendar size={16} className="mr-2" />
                  <span>{exp.duration}</span>
                </div>
                
                <ul className="space-y-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex">
                      <span className="w-1.5 h-1.5 bg-portfolio-purple rounded-full mr-2 mt-2"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
