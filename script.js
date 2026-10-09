(function () {
  const header = document.getElementById("site-header");
  const toggle = document.getElementById("menu-toggle");
  const panel = document.getElementById("mobile-panel");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main .section[id]");
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const year = document.getElementById("year");
  const backToTop = document.getElementById("back-to-top");
  const scrollTop = document.getElementById("scroll-top");
  const revealElements = document.querySelectorAll(
    ".section-head, .about-visual, .about-content, .skill-card, .project-card, .service-row, .process-step, .journey-entry, .testimonial-card, .contact-form"
  );

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function closeMenu() {
    panel.hidden = true;
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    panel.hidden = false;
    toggle.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("menu-open");
  }

  toggle.addEventListener("click", function () {
    if (panel.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  panel.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 980) {
      closeMenu();
    }
  });

  window.addEventListener("scroll", function () {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    scrollTop.classList.toggle("is-visible", window.scrollY > 520);
  });

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  backToTop.addEventListener("click", scrollToTop);
  scrollTop.addEventListener("click", scrollToTop);

  function updateActiveNav() {
    const marker = window.innerHeight * 0.42;
    let currentSection = sections[0];

    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= marker) {
        currentSection = section;
      }
    });

    navLinks.forEach(function (link) {
      const active = link.getAttribute("href") === "#" + currentSection.id;
      link.classList.toggle("is-active", active);
    });
  }

  updateActiveNav();
  window.addEventListener("scroll", updateActiveNav, { passive: true });

  const revealObserver = new IntersectionObserver(
    function (entries, observerInstance) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observerInstance.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach(function (element) {
    element.classList.add("reveal");
    revealObserver.observe(element);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !subject || !message) {
      status.textContent = "Please complete your name, email, subject and message.";
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.textContent = "Please enter a valid email address.";
      return;
    }

    status.textContent = "Your message passed validation. Connect a backend or email service to send it.";
  });
})();
