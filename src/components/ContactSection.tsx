
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
    <section id="contact" className="py-20 bg-gray-50">
      <div className="section-container" ref={sectionRef}>
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="contact-animate animate-on-scroll">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="text-portfolio-purple mt-1 mr-4" size={24} />
                <div>
                  <h4 className="font-medium text-lg">Email</h4>
                  <a 
                    href="mailto:lokeshdarne@gmail.com" 
                    className="text-gray-600 hover:text-portfolio-purple transition-colors"
                  >
                    lokeshdarne@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="text-portfolio-purple mt-1 mr-4" size={24} />
                <div>
                  <h4 className="font-medium text-lg">Phone</h4>
                  <a 
                    href="tel:+919960721074" 
                    className="text-gray-600 hover:text-portfolio-purple transition-colors"
                  >
                    +91 9960721074
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-portfolio-purple mt-1 mr-4" size={24} />
                <div>
                  <h4 className="font-medium text-lg">Location</h4>
                  <p className="text-gray-600">Pune, Maharashtra, India</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="text-portfolio-purple mr-4 flex space-x-4">
                  <a 
                    href="https://linkedin.com/in/lokeshdarne" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-portfolio-purple/80 transition-colors"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a 
                    href="https://github.com/lokeshdarne" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-portfolio-purple/80 transition-colors"
                  >
                    <Github size={24} />
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Connect with me</h4>
                  <p className="text-gray-600">Let's connect on social media</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-animate animate-on-scroll">
            <h3 className="text-2xl font-bold mb-6">Send Me a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="contact-input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="contact-input"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="contact-input resize-none"
                  required
                ></textarea>
              </div>
              
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-portfolio-purple hover:bg-portfolio-purple/90"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send size={18} className="mr-2" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
