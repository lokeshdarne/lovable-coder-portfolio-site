import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
        description: "Thank you for reaching out. I'll get back to you soon."
      });
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="dark-glass-section relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl floating-animation" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl floating-animation" style={{
          animationDelay: '3s'
        }} />
        <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl floating-animation" style={{
          animationDelay: '1.5s'
        }} />
      </div>

      <div className="section-container relative z-10" ref={sectionRef}>
        <h2 className="section-title">Get In Touch</h2>
        
        {/* Updated hero text with better typography */}
        <div className="text-center mb-12 lg:mb-16 space-content">
          <p className="text-responsive-xl text-gray-300 mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed">
            Ready to discuss your next project? Let's connect and bring your ideas to life.
          </p>
          <p className="text-responsive-lg text-gray-400">
            Contact <span className="text-gradient font-bold font-display">Lokesh Darne</span> directly
          </p>
        </div>
        
        <div className="grid-responsive-2 items-stretch">
          <div className="contact-animate animate-on-scroll">
            <div className="glass-panel h-full flex flex-col">
              <h3 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 gradient-text font-display">Contact Information</h3>
              
              <div className="space-y-8 sm:space-y-10 lg:space-y-12 flex-1">
                <div className="flex items-start group hover-lift">
                  <div className="glass-card p-4 mr-6 group-hover:glow-effect transition-all duration-300">
                    <Mail className="text-purple-400" size={28} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg sm:text-xl text-white mb-2 sm:mb-3 font-heading">Email</h4>
                    <a 
                      href="mailto:lokeshdarne@gmail.com" 
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-300 text-base sm:text-lg break-all"
                    >
                      lokeshdarne@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start group hover-lift">
                  <div className="glass-card p-4 mr-6 group-hover:glow-effect transition-all duration-300">
                    <Phone className="text-blue-400" size={28} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg sm:text-xl text-white mb-2 sm:mb-3 font-heading">Phone</h4>
                    <a 
                      href="tel:+919960721074" 
                      className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-base sm:text-lg font-mono"
                    >
                      +91 9960721074
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start group hover-lift">
                  <div className="glass-card p-4 mr-6 group-hover:glow-effect transition-all duration-300">
                    <MapPin className="text-cyan-400" size={28} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg sm:text-xl text-white mb-2 sm:mb-3 font-heading">Location</h4>
                    <p className="text-gray-300 text-base sm:text-lg">Pune, Maharashtra, India</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-6 pt-8">
                  <a 
                    href="https://linkedin.com/in/lokeshdarne" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="glass-card p-4 hover:glow-effect transition-all duration-300 hover:scale-110"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="text-blue-400" size={24} />
                  </a>
                  <a 
                    href="https://github.com/lokeshdarne" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="glass-card p-4 hover:glow-effect transition-all duration-300 hover:scale-110"
                    aria-label="GitHub"
                  >
                    <Github className="text-purple-400" size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-animate animate-on-scroll">
            <div className="glass-panel h-full flex flex-col">
              <h3 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 gradient-text font-display">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-content flex-1 flex flex-col">
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
                    className="form-input text-base sm:text-lg" 
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
                    className="form-input text-base sm:text-lg" 
                    placeholder="Enter your email" 
                    required 
                  />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <label htmlFor="message" className="block text-sm font-semibold text-white mb-3 font-heading">
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={6} 
                    value={formData.message} 
                    onChange={handleChange} 
                    className="form-input resize-none text-base sm:text-lg flex-1 min-h-[120px]" 
                    placeholder="Write your message here..." 
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="btn-primary w-full mt-auto text-base sm:text-lg"
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
