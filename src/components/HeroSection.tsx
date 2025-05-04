
import React from 'react';
import { Link } from 'react-scroll';
import { Github, Linkedin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-portfolio-light-purple"
    >
      <div className="section-container">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in-up font-heading">
            <span className="block">LOKESH DARNE</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-medium text-portfolio-purple mb-6 animate-fade-in-up animation-delay-100 font-heading">
            Software Development Engineer in Test
          </h2>
          
          <p className="text-lg max-w-2xl mb-8 animate-fade-in-up animation-delay-200">
            Crafting Quality Software with Code and Creativity
          </p>
          
          <div className="flex space-x-4 mb-12 animate-fade-in-up animation-delay-300">
            <a 
              href="https://linkedin.com/in/lokeshdarne" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <Linkedin className="text-portfolio-purple" size={24} />
            </a>
            <a 
              href="https://github.com/lokeshdarne" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <Github className="text-portfolio-purple" size={24} />
            </a>
          </div>
          
          <Button 
            className="animate-fade-in-up animation-delay-400 bg-portfolio-purple hover:bg-portfolio-purple/90 font-medium text-white"
          >
            <Link
              to="projects"
              smooth={true}
              duration={800}
              offset={-70}
              className="flex items-center"
            >
              See My Work
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link
          to="about"
          smooth={true}
          duration={500}
          offset={-70}
          className="cursor-pointer"
        >
          <ChevronDown size={30} className="text-gray-500" />
        </Link>
      </div>
      
      {/* Background Elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-portfolio-soft-yellow rounded-full opacity-30 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-portfolio-soft-orange rounded-full opacity-30 blur-3xl" />
    </section>
  );
};

export default HeroSection;
