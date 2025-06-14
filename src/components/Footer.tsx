
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="dark-glass-section border-t border-white/10">
      <div className="section-container py-6">
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-bold mb-4 gradient-text">Lokesh Darne</h3>
          
          <div className="text-gray-300 text-center mb-4 text-sm">
            <p>Software Development Engineer in Test (SDET)</p>
            <p className="text-gray-400">Automating quality, one test at a time</p>
          </div>
          
          <div className="flex justify-center space-x-4 mb-4">
            <a 
              href="https://linkedin.com/in/lokeshdarne" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card px-3 py-2 text-sm text-gray-300 hover:text-white transition-all duration-300 hover:glow-effect"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/lokeshdarne" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-card px-3 py-2 text-sm text-gray-300 hover:text-white transition-all duration-300 hover:glow-effect"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a 
              href="mailto:lokeshdarne@gmail.com" 
              className="glass-card px-3 py-2 text-sm text-gray-300 hover:text-white transition-all duration-300 hover:glow-effect"
              aria-label="Email"
            >
              Email
            </a>
          </div>
          
          <div className="text-xs text-gray-400">
            <p className="flex items-center justify-center">
              &copy; {currentYear} Lokesh Darne. All rights reserved. Made with 
              <Heart size={12} className="mx-1 text-red-400" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
