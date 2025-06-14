
import React, { useEffect, useRef } from 'react';
import { GraduationCap, Calendar } from 'lucide-react';

const EducationSection = () => {
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
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="education" className="py-20 dark-glass-section">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl floating-animation" />
      </div>
      
      <div className="section-container relative z-10">
        <h2 className="section-title">Education</h2>
        
        <div 
          className="max-w-2xl mx-auto animate-on-scroll"
          ref={sectionRef}
        >
          <div className="glass-panel p-6 hover:glow-effect transition-all duration-300">
            <div className="flex items-center mb-3">
              <GraduationCap size={24} className="text-purple-400 mr-3" />
              <h3 className="text-xl font-bold text-white">B.E. in Electrical Engineering</h3>
            </div>
            <div className="ml-9">
              <p className="text-lg mb-2 gradient-text">Pune University</p>
              <div className="flex items-center text-gray-300">
                <Calendar size={16} className="mr-2" />
                <span>Graduated with honors</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-300">
              Continuously expanding knowledge through professional certifications and courses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
