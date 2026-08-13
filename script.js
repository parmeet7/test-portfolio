/* ==========================================================
   PARMEET KAUR PORTFOLIO
   Pure JavaScript — no framework.
   ========================================================== */

(() => {
  "use strict";

  const pages = [...document.querySelectorAll(".page")];
  const pageLinks = [...document.querySelectorAll(".page-link")];
  const menuOverlay = document.getElementById("menuOverlay");
  const menuButton = document.getElementById("menuButton");
  const menuClose = document.getElementById("menuClose");
  const themeButton = document.getElementById("themeButton");
  const themeIcon = document.getElementById("themeIcon");
  const transitionLayer = document.getElementById("transitionLayer");
  const roleText = document.getElementById("roleText");
  const year = document.getElementById("year");

  let currentPage = document.querySelector(".active-page")?.id || "home";
  let isTransitioning = false;

  // ================= THEME =================

  function applyTheme(theme) {
    const isLight = theme === "light";
    document.body.classList.toggle("light-theme", isLight);
    themeIcon.textContent = isLight ? "☾" : "☀";
    themeButton.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode"
    );
    localStorage.setItem("portfolio-theme", theme);
  }

  const savedTheme = localStorage.getItem("portfolio-theme");
  applyTheme(savedTheme === "light" ? "light" : "dark");

  themeButton.addEventListener("click", () => {
    applyTheme(document.body.classList.contains("light-theme") ? "dark" : "light");
  });

  // ================= MENU =================

  function setMenu(open) {
    menuOverlay.classList.toggle("open", open);
    menuButton.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuOverlay.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-open", open);
  }

  menuButton.addEventListener("click", () => {
    setMenu(!menuOverlay.classList.contains("open"));
  });

  menuClose.addEventListener("click", () => setMenu(false));

  menuOverlay.addEventListener("click", (event) => {
    if (event.target === menuOverlay || event.target.classList.contains("menu-backdrop")) {
      setMenu(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenu(false);
    }
  });

  // ================= PAGE NAVIGATION =================

  function getPageFromHash() {
    const hash = window.location.hash.replace("#", "").trim();
    return pages.some(page => page.id === hash) ? hash : "home";
  }

  function setActivePage(id, animate = true) {
    const target = document.getElementById(id);
    const current = document.getElementById(currentPage);

    if (!target || id === currentPage || isTransitioning) return;

    isTransitioning = true;
    setMenu(false);

    if (!animate) {
      pages.forEach(page => {
        page.classList.remove("active-page", "page-leaving");
      });
      target.classList.add("active-page");
      currentPage = id;
      isTransitioning = false;
      updateMenuState();
      return;
    }

    // The five vertical panels create the colored page-transition effect.
    transitionLayer.classList.remove("play");
    void transitionLayer.offsetWidth;
    transitionLayer.classList.add("play");

    setTimeout(() => {
      current?.classList.remove("active-page");
      current?.classList.add("page-leaving");

      target.classList.remove("page-leaving");
      target.classList.add("active-page");
      currentPage = id;

      // Reset scroll position of the newly opened internal page.
      if (target.classList.contains("inner-page")) {
        target.scrollTop = 0;
      }

      updateMenuState();
    }, 360);

    setTimeout(() => {
      current?.classList.remove("page-leaving");
      transitionLayer.classList.remove("play");
      isTransitioning = false;
    }, 850);
  }

  function updateMenuState() {
    document.querySelectorAll(".menu-item").forEach(item => {
      const target = item.getAttribute("href")?.replace("#", "");
      item.classList.toggle("active-menu-item", target === currentPage);
    });
  }

  pageLinks.forEach(link => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const id = href.slice(1);
      if (!document.getElementById(id)) return;

      event.preventDefault();

      if (id !== currentPage) {
        history.pushState(null, "", `#${id}`);
        setActivePage(id);
      } else {
        setMenu(false);
      }
    });
  });

  window.addEventListener("popstate", () => {
    const target = getPageFromHash();
    if (target !== currentPage) setActivePage(target);
  });

  window.addEventListener("hashchange", () => {
    const target = getPageFromHash();
    if (target !== currentPage) setActivePage(target);
  });

  // If the URL starts with #about etc., open that page on first load.
  const initialPage = getPageFromHash();
  if (initialPage !== "home") {
    setActivePage(initialPage, false);
  }
  updateMenuState();

  // ================= ROTATING HOME TITLES =================

  const roles = [
    "BUSINESS ANALYST",
    "DATA ANALYST",
    "BUSINESS INTELLIGENCE",
    "WEB DEVELOPER"
  ];
  let roleIndex = 0;

  function rotateRole() {
    if (!roleText) return;
    roleIndex = (roleIndex + 1) % roles.length;
    roleText.style.animation = "none";
    void roleText.offsetWidth;
    roleText.textContent = roles[roleIndex];
    roleText.style.animation = "roleIn .55s ease both";
  }

  setInterval(rotateRole, 2600);

  // ================= PORTFOLIO FILTER =================

  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const projectCards = [...document.querySelectorAll(".project-card")];

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      projectCards.forEach(card => {
        const matches = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !matches);
      });
    });
  });

  // ================= CONTACT FORM =================

  const contactForm = document.getElementById("contactForm");

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    // EDIT THIS: replace with your real email address.
    const recipient = "kparmeet659@gmail.com";

    const body =
      `Name: ${name}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${message}`;

    const mailto =
      `mailto:${recipient}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  });

  if (year) year.textContent = new Date().getFullYear();

  // ================= IMAGE FALLBACK =================
  // The HTML already contains an onerror fallback so the site
  // remains visually usable even before you add your own images.

})();/* =========================================*/
