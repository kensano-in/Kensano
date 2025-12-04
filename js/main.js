// Smooth scroll for in-page links / buttons
function smoothScrollTo(targetSelector) {
  const el = document.querySelector(targetSelector);
  if (!el) return;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - 70,
    behavior: "smooth"
  });
}

// Handle nav links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    smoothScrollTo(href);
  });
});

// Handle "Request" buttons in work cards
document.querySelectorAll(".work-cta").forEach((btn) => {
  const target = btn.getAttribute("data-scroll");
  if (!target) return;
  btn.addEventListener("click", () => smoothScrollTo(target));
});

// Contact form – front-end only
const contactForm = document.getElementById("contact-form");
const statusEl = document.getElementById("contact-status");

if (contactForm && statusEl) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name") || "Someone";

    statusEl.textContent = "Processing signal…";
    statusEl.style.color = "#9ca3af";

    // Simulate async request – replace with real API/Telegram later
    setTimeout(() => {
      statusEl.textContent = `${name}, your brief is logged. You’ll get a quiet reply if it fits the lane.`;
      statusEl.style.color = "#bbf7d0";
      contactForm.reset();
    }, 700);
  });
}
