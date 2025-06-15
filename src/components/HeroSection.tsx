import React from 'react';
import { Link } from 'react-scroll';
import { Github, Linkedin, ChevronDown, Code, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
const HeroSection = () => {
  return <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl floating-animation" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl floating-animation" style={{
        animationDelay: '2s'
      }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-400/5 rounded-full blur-3xl floating-animation" style={{
        animationDelay: '4s'
      }} />
      </div>
      
      <div className="section-container relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-content">
          <div className="mb-8 flex items-center justify-center space-x-6 animate-fade-in-up">
            
            
          </div>
          
          <h1 className="futuristic-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 animate-fade-in-up leading-tight tracking-widest">
            <span className="block text-white">LOKESH</span>
            <span className="block gradient-text">DARNE</span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium text-gray-300 mb-6 sm:mb-8 lg:mb-12 animate-fade-in-up animation-delay-100 font-heading leading-relaxed tracking-tight">
            Software Development Engineer in Test
          </h2>
          
          <p className="body-text text-lg sm:text-xl lg:text-2xl max-w-4xl mb-8 sm:mb-12 lg:mb-16 animate-fade-in-up animation-delay-200 leading-relaxed px-4">
            Crafting Quality Software with Code and Creativity
          </p>
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 mb-8 sm:mb-12 lg:mb-16 animate-fade-in-up animation-delay-300">
            <a href="https://linkedin.com/in/lokeshdarne" target="_blank" rel="noopener noreferrer" className="glass-card p-4 sm:p-6 hover:glow-effect transition-all duration-300 hover:scale-110 hover-lift" aria-label="LinkedIn Profile">
              <Linkedin className="text-blue-400" size={32} />
            </a>
            <a href="https://github.com/lokeshdarne" target="_blank" rel="noopener noreferrer" className="glass-card p-4 sm:p-6 hover:glow-effect transition-all duration-300 hover:scale-110 hover-lift" aria-label="GitHub Profile">
              <Github className="text-orange-400" size={32} />
            </a>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up animation-delay-400">
            <Button className="btn-primary text-base sm:text-lg font-semibold">
              <Link to="projects" smooth={true} duration={800} offset={-70} className="flex items-center">
                See My Work
              </Link>
            </Button>
            
            <Button variant="outline" className="glass-card border-white/20 text-white hover:bg-white/10 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold">
              <Link to="contact" smooth={true} duration={800} offset={-70} className="flex items-center">
                Get In Touch
              </Link>
            </Button>
          </div>
          
          <div className="mt-12 sm:mt-16 lg:mt-20 animate-bounce-gentle">
            <Link to="about" smooth={true} duration={800} offset={-70}>
              <ChevronDown className="text-orange-400 cursor-pointer hover:text-orange-300 transition-colors" size={32} />
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;