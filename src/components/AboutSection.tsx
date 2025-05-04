
import React, { useEffect, useRef } from 'react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
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
    <section id="about" className="py-20 bg-white">
      <div className="section-container">
        <h2 className="section-title">About Me</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="rounded-full h-64 w-64 bg-gray-200 overflow-hidden shadow-lg border-4 border-white">
              <img 
                src="/placeholder.svg" 
                alt="Lokesh Darne"
                className="h-full w-full object-cover" 
              />
            </div>
          </div>
          
          <div 
            ref={sectionRef}
            className="w-full md:w-2/3 animate-on-scroll"
          >
            <p className="text-lg mb-4">
              I am an experienced Software Development Engineer in Test (SDET) with expertise in web and mobile application testing, automation frameworks, and quality assurance across diverse domains.
            </p>
            <p className="text-lg mb-4">
              With a strong foundation in Python, Java, and JavaScript, I specialize in creating robust automation frameworks that improve testing efficiency and product quality. My experience spans across healthcare, inventory management, and multimedia applications.
            </p>
            <p className="text-lg mb-4">
              I'm passionate about leveraging cutting-edge tools and technologies to enhance testing processes. My proficiency with tools like JIRA, TestRail, and various automation frameworks allows me to implement comprehensive testing strategies that ensure high-quality software delivery.
            </p>
            <p className="text-lg">
              I enjoy solving complex testing challenges and continuously improving my skills to adapt to evolving technologies and industry best practices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
