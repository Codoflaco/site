document.addEventListener('DOMContentLoaded', () => {
  // 1. Configurar año dinámico en el copyright
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Efecto Glassmorphism/Sombra en Topbar al hacer scroll
  const topbar = document.querySelector('.topbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      topbar.classList.add('scrolled');
    } else {
      topbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Smooth scroll mejorado para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        // Ajuste para el header fijo
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Intersection Observer para animaciones al hacer scroll
  // Selecciona todos los elementos con la clase .reveal
  const revealElements = document.querySelectorAll('.reveal');

  const revealOptions = {
    threshold: 0.15, // Se activa cuando el 15% del elemento es visible
    rootMargin: "0px 0px -50px 0px" // Activa un poco antes de llegar al borde inferior
  };

  const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return; // Si no está en pantalla, no hace nada
      } else {
        // Añade la clase .visible que dispara la transición CSS
        entry.target.classList.add('visible');
        // Deja de observar el elemento una vez animado para mejor performance
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    revealOnScroll.observe(el);
  });
});
