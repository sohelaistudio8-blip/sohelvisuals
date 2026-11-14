(() => {
  "use strict";

  const menu = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  // Mobile navigation
  function closeMenu() {
    if (!menu || !nav) return;
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open menu");
  }

  if (menu && nav) {
    menu.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", event => {
      if (
        nav.classList.contains("open") &&
        !nav.contains(event.target) &&
        !menu.contains(event.target)
      ) closeMenu();
    });
  }

  // Click-to-load portfolio videos
  document.querySelectorAll(".video-load").forEach(button => {
    button.addEventListener("click", () => {
      const frame = button.closest(".video-frame");
      const id = frame?.dataset.video;

      if (!id) return;

      const iframe = document.createElement("iframe");
      iframe.src =
        "https://drive.google.com/file/d/" +
        encodeURIComponent(id) +
        "/preview";

      iframe.title = "Sohel Visuals portfolio video";
      iframe.loading = "lazy";
      iframe.allow = "autoplay; fullscreen; picture-in-picture";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";

      frame.replaceChildren(iframe);
    });
  });

  // Package selection
  const packageField = document.getElementById("packageField");

  document.querySelectorAll(".choose-package").forEach(button => {
    button.addEventListener("click", () => {
      if (packageField) {
        packageField.value = button.dataset.package || "";
      }

      document.getElementById("contact")?.scrollIntoView({
        behavior: "smooth"
      });
    });
  });

  // Service selection
  const serviceField = document.getElementById("serviceField");

  document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("click", () => {
      if (serviceField) {
        serviceField.value = card.dataset.service || "";
      }
    });
  });

  // WhatsApp inquiry
  const form = document.getElementById("projectForm");

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();

      if (!form.reportValidity()) return;

      const data = new FormData(form);

      const name = String(data.get("name") || "").trim();
      const service = String(data.get("service") || "").trim();
      const brief = String(data.get("brief") || "").trim();
      const selectedPackage = String(data.get("package") || "").trim();

      const message = [
        "SOHEL VISUALS — PROJECT INQUIRY",
        "",
        "Name: " + name,
        "Service: " + service,
        "Package: " + (selectedPackage || "Not selected"),
        "",
        "Project details:",
        brief,
        "",
        "Please share the next steps."
      ].join("\n");

      const url =
        "https://wa.me/8801783576503?text=" +
        encodeURIComponent(message);

      const status = document.getElementById("formStatus");

      if (status) {
        status.textContent =
          "Opening WhatsApp. Review your message and press Send.";
      }

      window.location.href = url;
    });
  }

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

})();
