
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu } from 'lucide-react';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', to: 'hero', offset: 0 },
    { name: 'About', to: 'about', offset: -70 },
    { name: 'Skills', to: 'skills', offset: -70 },
    { name: 'Experience', to: 'experience', offset: -70 },
    { name: 'Projects', to: 'projects', offset: -70 },
    { name: 'Education', to: 'education', offset: -70 },
    { name: 'Contact', to: 'contact', offset: -70 },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <Link
              to="hero"
              smooth={true}
              duration={500}
              className="text-portfolio-purple font-bold text-xl cursor-pointer"
            >
              Lokesh Darne
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={500}
                offset={link.offset}
                className="text-gray-600 hover:text-portfolio-purple transition-colors cursor-pointer"
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-600 hover:text-portfolio-purple focus:outline-none"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  offset={link.offset}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 hover:text-portfolio-purple transition-colors cursor-pointer"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
