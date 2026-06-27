// ── ACTIVE NAV HIGHLIGHT ──
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".hero-nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 130) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) a.classList.add("active");
  });
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll(
  ".section-inner, .project-card, .skill-chip, .cert-item, .contact-card"
);

revealEls.forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(28px)";
  el.style.transition = "opacity 0.65s ease, transform 0.65s ease";
});

const reveal = () => {
  revealEls.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }
  });
};

window.addEventListener("scroll", reveal);
reveal(); // run once on load

// ── DYNAMIC FOOTER ──
const footer = document.getElementById("footer");
if (footer) {
  footer.innerHTML = `Built with ❤️ by B M Janardhan &copy; ${new Date().getFullYear()}`;
}