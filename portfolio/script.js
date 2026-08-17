/* ════════════════════════════════════════
   script.js — B M Janardhan Portfolio
════════════════════════════════════════ */

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu when a nav link is clicked
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!hamburger?.contains(e.target) && !navLinks?.contains(e.target)) {
    navLinks?.classList.remove('open');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  }
});

// ── STICKY NAV — hide on scroll down, show on scroll up ──
const navbar = document.getElementById('navbar');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  if (currentY > lastScrollY && currentY > 120) {
    navbar?.classList.add('nav-hidden');
  } else {
    navbar?.classList.remove('nav-hidden');
  }
  lastScrollY = currentY;
}, { passive: true });

// ── ACTIVE NAV LINK HIGHLIGHT ──
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
  root: null,
  rootMargin: '-60px 0px -40% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      allNavLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── SCROLL REVEAL (IntersectionObserver) ──
// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealTargets = document.querySelectorAll(
  '.section-inner, .project-card, .skill-category, .timeline-item, ' +
  '.education-card, .cert-item, .contact-card, .leadership-card, ' +
  '.competency-pill, .about-grid, .hero-body'
);

if (!prefersReducedMotion) {
  revealTargets.forEach((el, index) => {
    el.classList.add('reveal');
    // Stagger delay based on sibling position
    const parent = el.parentElement;
    const siblings = [...(parent?.children || [])];
    const i = siblings.indexOf(el);
    el.style.transitionDelay = `${Math.min(i * 60, 300)}ms`;
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after reveal to save resources
        revealObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -80px 0px', threshold: 0.05 });

  revealTargets.forEach(el => revealObserver.observe(el));
}

// ── DYNAMIC FOOTER ──
const footer = document.getElementById('footer');
if (footer) {
  footer.innerHTML = `
    <span>Built with ❤️ by <strong>B M Janardhan</strong></span>
    &nbsp;·&nbsp;
    <a href="https://github.com/janam9097-arch" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline;text-underline-offset:3px;">GitHub</a>
    &nbsp;·&nbsp;
    <a href="https://linkedin.com/in/b-m-janardhan-9b8919304" target="_blank" rel="noopener noreferrer" style="color:inherit;text-decoration:underline;text-underline-offset:3px;">LinkedIn</a>
    &nbsp;·&nbsp;
    <span>&copy; ${new Date().getFullYear()}</span>
  `;
}