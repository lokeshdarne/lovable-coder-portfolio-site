import React from 'react';
import { Link } from 'react-scroll';
import { Github, Linkedin, ChevronDown, Code, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
const HeroSection = () => {
  return <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl floating-animation" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl floating-animation" style={{
        animationDelay: '2s'
      }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl floating-animation" style={{
        animationDelay: '4s'
      }} />
      </div>
      
      <div className="section-container relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="mb-6 flex items-center space-x-4 animate-fade-in-up">
            
            
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up font-heading">
            <span className="block gradient-text">LOKESH DARNE</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-300 mb-8 animate-fade-in-up animation-delay-100 font-heading">
            Software Development Engineer in Test
          </h2>
          
          <p className="text-xl max-w-3xl mb-12 text-gray-400 animate-fade-in-up animation-delay-200 leading-relaxed">
            Crafting Quality Software with Code and Creativity
          </p>
          
          <div className="flex space-x-6 mb-12 animate-fade-in-up animation-delay-300">
            <a href="https://linkedin.com/in/lokeshdarne" target="_blank" rel="noopener noreferrer" className="glass-card p-4 hover:glow-effect transition-all duration-300 hover:scale-110">
              <Linkedin className="text-blue-400" size={28} />
            </a>
            <a href="https://github.com/lokeshdarne" target="_blank" rel="noopener noreferrer" className="glass-card p-4 hover:glow-effect transition-all duration-300 hover:scale-110">
              <Github className="text-purple-400" size={28} />
            </a>
          </div>
          
          <Button className="animate-fade-in-up animation-delay-400 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 font-medium text-white px-8 py-3 text-lg rounded-xl pulse-glow">
            <Link to="projects" smooth={true} duration={800} offset={-70} className="flex items-center">
              See My Work
            </Link>
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Link to="about" smooth={true} duration={500} offset={-70} className="cursor-pointer glass-card p-3 hover:glow-effect transition-all duration-300">
          <ChevronDown size={30} className="text-gray-400" />
        </Link>
      </div>
    </section>;
};
export default HeroSection;