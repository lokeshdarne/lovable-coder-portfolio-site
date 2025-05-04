
export const setupScrollAnimations = () => {
  // Detect when elements with the class 'animate-on-scroll' enter the viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.1 });
  
  // Apply the observer to all elements with the class 'animate-on-scroll'
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));
  
  return () => {
    animatedElements.forEach(el => observer.unobserve(el));
  };
};
