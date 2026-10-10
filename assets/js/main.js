// =========================================
// SUBHALAKSHMI SS — PORTFOLIO JAVASCRIPT
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const typedText = document.getElementById("typedText");
  const currentYear = document.getElementById("currentYear");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // -----------------------------------------
  // FOOTER YEAR
  // -----------------------------------------

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // -----------------------------------------
  // MOBILE NAVIGATION
  // -----------------------------------------

  function closeMenu() {
    if (!navMenu || !menuToggle) return;

    navMenu.classList.remove("open");
    document.body.classList.remove("menu-open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    const icon = menuToggle.querySelector("i");

    if (icon) {
      icon.className = "uil uil-bars";
    }
  }

  function toggleMenu() {
    if (!navMenu || !menuToggle) return;

    const isOpen = navMenu.classList.toggle("open");

    document.body.classList.toggle("menu-open", isOpen);

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );

    const icon = menuToggle.querySelector("i");

    if (icon) {
      icon.className = isOpen ? "uil uil-times" : "uil uil-bars";
    }
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", toggleMenu);

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Close the menu when clicking outside it.
    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    // Close the menu using Escape.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    // Reset mobile navigation when returning to desktop.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) {
        closeMenu();
      }
    });
  }

  // -----------------------------------------
  // HEADER SHADOW ON SCROLL
  // -----------------------------------------

  function updateHeader() {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 20);
  }

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true,
  });

  // -----------------------------------------
  // TYPING EFFECT
  // -----------------------------------------

  if (typedText && !reducedMotion) {
    const roles = [
      "Java Developer",
      "Software Engineer",
      "Full Stack Developer",
    ];

    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeRole() {
      const currentRole = roles[roleIndex];

      if (deleting) {
        characterIndex--;
      } else {
        characterIndex++;
      }

      typedText.textContent = currentRole.slice(0, characterIndex);

      let delay = deleting ? 45 : 85;

      if (!deleting && characterIndex === currentRole.length) {
        deleting = true;
        delay = 1700;
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 350;
      }

      window.setTimeout(typeRole, delay);
    }

    typeRole();
  }

  // -----------------------------------------
  // SCROLL REVEAL ANIMATIONS
  // -----------------------------------------

  const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .detail-card, " +
      ".skill-card, .project-card, .contact-card, " +
      ".contact-form-card",
  );

  if ("IntersectionObserver" in window && !reducedMotion) {
    revealElements.forEach((element) => {
      element.classList.add("js-reveal");
    });

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px",
      },
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  }

  // -----------------------------------------
  // ACTIVE NAVIGATION LINK
  // -----------------------------------------

  const sections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.id;

          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${sectionId}`;

            link.classList.toggle("active-link", isActive);
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // -----------------------------------------
  // PROJECT LINKS
  // -----------------------------------------

  // Add your actual repository URLs to these entries.
  // Example:
  // food: "https://github.com/subha-ss/your-food-project"

  const projectRepositories = {
    food: "",
    hrms: "",
    solar: "",
  };

  document.querySelectorAll("[data-project-link]").forEach((link) => {
    const projectKey = link.dataset.projectLink;
    const repositoryUrl = projectRepositories[projectKey];

    if (repositoryUrl) {
      link.href = repositoryUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.removeAttribute("aria-label");
    } else {
      link.addEventListener("click", (event) => {
        event.preventDefault();

        alert(
          "Add this project's GitHub repository URL in " +
            "assets/js/main.js before publishing your portfolio.",
        );
      });
    }
  });
});
