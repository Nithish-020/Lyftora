/* website/lyftora-site/js/main.js */

// Mobile nav toggle
(function initNavToggle() {
  var toggle = document.getElementById('nav-toggle');
  var links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('navbar__links--open');
    toggle.classList.toggle('navbar__toggle--open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close nav when a link is clicked
  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('navbar__links--open');
      toggle.classList.remove('navbar__toggle--open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Navbar scroll effect
(function initNavbarScroll() {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;

  var scrollThreshold = 50;

  window.addEventListener('scroll', function () {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }, { passive: true });
})();

// Scroll reveal animations
(function initRevealAnimations() {
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();
