
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="section-container">
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-6">Lokesh Darne</h3>
          
          <div className="text-gray-400 text-center mb-6">
            <p>Software Development Engineer in Test (SDET)</p>
            <p>Automating quality, one test at a time</p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-8">
            <a 
              href="https://linkedin.com/in/lokeshdarne" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/lokeshdarne" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a 
              href="mailto:lokeshdarne@gmail.com" 
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Email"
            >
              Email
            </a>
          </div>
          
          <div className="text-sm text-gray-500">
            <p className="flex items-center justify-center">
              &copy; {currentYear} Lokesh Darne. All rights reserved. Made with 
              <Heart size={14} className="mx-1 text-red-500" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
