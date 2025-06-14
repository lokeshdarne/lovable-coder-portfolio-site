
import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
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
    
    const elements = document.querySelectorAll('.contact-animate');
    elements.forEach(el => {
      observer.observe(el);
    });
    
    return () => {
      elements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="dark-glass-section relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl floating-animation" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl floating-animation" style={{ animationDelay: '3s' }} />
        <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl floating-animation" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="section-container relative z-10" ref={sectionRef}>
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="contact-animate animate-on-scroll space-y-8">
            <div className="glass-panel p-8">
              <h3 className="text-2xl font-bold mb-8 gradient-text font-heading">Contact Information</h3>
              
              <div className="space-y-8">
                <div className="flex items-start group">
                  <div className="glass-card p-3 mr-6 group-hover:glow-effect transition-all duration-300">
                    <Mail className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-white mb-2 font-heading">Email</h4>
                    <a 
                      href="mailto:lokeshdarne@gmail.com" 
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-lg"
                    >
                      lokeshdarne@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="glass-card p-3 mr-6 group-hover:glow-effect transition-all duration-300">
                    <Phone className="text-blue-400" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-white mb-2 font-heading">Phone</h4>
                    <a 
                      href="tel:+919960721074" 
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-lg"
                    >
                      +91 9960721074
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="glass-card p-3 mr-6 group-hover:glow-effect transition-all duration-300">
                    <MapPin className="text-cyan-400" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-white mb-2 font-heading">Location</h4>
                    <p className="text-gray-300 text-lg">Pune, Maharashtra, India</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="glass-card p-3 mr-6 flex space-x-3 group-hover:glow-effect transition-all duration-300">
                    <a 
                      href="https://linkedin.com/in/lokeshdarne" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300 hover:scale-110 transform"
                    >
                      <Linkedin size={24} />
                    </a>
                    <a 
                      href="https://github.com/lokeshdarne" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors duration-300 hover:scale-110 transform"
                    >
                      <Github size={24} />
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-white mb-2 font-heading">Connect</h4>
                    <p className="text-gray-300 text-lg">Let's connect on social media</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-animate animate-on-scroll">
            <div className="glass-panel p-8">
              <h3 className="text-2xl font-bold mb-8 gradient-text font-heading">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white mb-3 font-heading">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 glass-card text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300 text-lg"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white mb-3 font-heading">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 glass-card text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300 text-lg"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-white mb-3 font-heading">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 glass-card text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-purple-400 focus:outline-none transition-all duration-300 resize-none text-lg"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 text-lg rounded-xl pulse-glow border-0 transition-all duration-300 hover:scale-105"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send size={20} className="mr-3" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
