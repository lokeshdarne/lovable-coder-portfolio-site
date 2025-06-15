
import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Heart, Target } from 'lucide-react';

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
    <section id="about" className="py-20 relative dark-glass-section">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl floating-animation" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl floating-animation" style={{animationDelay: '3s'}} />
      </div>
      
      <div className="section-container relative z-10">
        <h2 className="section-title">About Me</h2>
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:w-1/3 flex justify-center animate-on-scroll">
            <div className="relative">
              <Avatar className="w-72 h-72 rounded-3xl shadow-2xl border-4 border-white/20 overflow-hidden glow-effect">
                <AvatarImage src="/lovable-uploads/7a608944-1d68-46e3-aec4-ae9f15702de9.png" alt="Lokesh Darne" className="h-full w-full object-cover" />
                <AvatarFallback>LD</AvatarFallback>
              </Avatar>
              <div className="absolute -top-4 -right-4 glass-card p-3 glow-effect">
                <User className="text-purple-400" size={24} />
              </div>
            </div>
          </div>
          
          <div 
            ref={sectionRef}
            className="w-full lg:w-2/3 animate-on-scroll"
          >
            <div className="glass-panel p-8">
              <div className="flex items-center mb-6">
                <Heart className="text-red-400 mr-3" size={24} />
                <h3 className="text-2xl font-bold gradient-text">Passionate Quality Engineer</h3>
              </div>
              
              <p className="text-lg mb-6 text-gray-200 leading-relaxed">
                I am an experienced Software Development Engineer in Test (SDET) with expertise in web and mobile application testing, automation frameworks, and quality assurance across diverse domains.
              </p>
              
              <div className="flex items-center mb-6">
                <Target className="text-blue-400 mr-3" size={24} />
                <h4 className="text-xl font-semibold text-white">Technical Excellence</h4>
              </div>
              
              <p className="text-lg mb-6 text-gray-200 leading-relaxed">
                With a strong foundation in Python, Java, and JavaScript, I specialize in creating robust automation frameworks that improve testing efficiency and product quality. My experience spans across healthcare, inventory management, and multimedia applications.
              </p>
              
              <p className="text-lg mb-6 text-gray-200 leading-relaxed">
                I'm passionate about leveraging cutting-edge tools and technologies to enhance testing processes. My proficiency with tools like JIRA, TestRail, and various automation frameworks allows me to implement comprehensive testing strategies that ensure high-quality software delivery.
              </p>
              
              <p className="text-lg text-gray-200 leading-relaxed">
                I enjoy solving complex testing challenges and continuously improving my skills to adapt to evolving technologies and industry best practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
