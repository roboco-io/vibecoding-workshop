// Scroll-triggered fade-in.
// Applies to all elements with .fade-in class.
// Uses IntersectionObserver; gracefully degrades to immediate visibility.

(function () {
  'use strict';

  const elements = document.querySelectorAll('.fade-in');
  if (elements.length === 0) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.05,
    }
  );

  elements.forEach((el) => observer.observe(el));
})();
