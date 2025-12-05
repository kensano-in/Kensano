/* ======================================================
   KENSANO — UI ENGINE
   ====================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // Reveal on scroll
    const revealElements = document.querySelectorAll("[data-reveal]");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Mobile Nav Toggle
    const navToggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector("nav");

    if (navToggle) {
        navToggle.addEventListener("click", () => {
            nav.classList.toggle("open");
            navToggle.classList.toggle("active");
        });
    }
});
