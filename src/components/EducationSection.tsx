
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
    <section id="education" className="py-20 bg-white">
      <div className="section-container">
        <h2 className="section-title">Education</h2>
        
        <div 
          className="max-w-2xl mx-auto animate-on-scroll"
          ref={sectionRef}
        >
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-3">
              <GraduationCap size={24} className="text-portfolio-purple mr-3" />
              <h3 className="text-xl font-bold">B.E. in Electrical Engineering</h3>
            </div>
            <div className="ml-9">
              <p className="text-lg mb-2">Pune University</p>
              <div className="flex items-center text-gray-600">
                <Calendar size={16} className="mr-2" />
                <span>Graduated with honors</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600">
              Continuously expanding knowledge through professional certifications and courses.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
