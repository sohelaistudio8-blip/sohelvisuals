document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  var WHATSAPP_NUMBER = "8801783576503";
  var menuToggle = document.getElementById("menuToggle");
  var mainNav = document.getElementById("mainNav");
  var year = document.getElementById("currentYear");
  var projectForm = document.getElementById("projectForm");
  var formStatus = document.getElementById("formStatus");
  var selectedPackage = "";

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  // Mobile navigation: CSS opens the menu with the "open" class.
  function setMenuOpen(isOpen) {
    if (!menuToggle || !mainNav) return;
    mainNav.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", function () {
      setMenuOpen(!mainNav.classList.contains("open"));
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenuOpen(false);
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 850) setMenuOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setMenuOpen(false);
    });
  }

  // Load Google Drive preview only after the visitor taps a video card.
  document.querySelectorAll(".video-load").forEach(function (button) {
    button.addEventListener("click", function () {
      var videoId = button.getAttribute("data-video-id");
      var frame = button.closest(".video-frame");
      if (!videoId || !frame || frame.querySelector("iframe")) return;

      var iframe = document.createElement("iframe");
      iframe.src =
        "https://drive.google.com/file/d/" +
        encodeURIComponent(videoId) +
        "/preview";
      iframe.title = button.getAttribute("aria-label") || "Portfolio video";
      iframe.loading = "lazy";
      iframe.allow = "autoplay; fullscreen; picture-in-picture";
      iframe.setAttribute("allowfullscreen", "");
      iframe.referrerPolicy = "strict-origin-when-cross-origin";

      frame.appendChild(iframe);
      button.remove();
    });
  });

  // Package links prefill duration and preserve the selected package in the inquiry.
  document.querySelectorAll("[data-package]").forEach(function (link) {
    link.addEventListener("click", function () {
      selectedPackage = link.getAttribute("data-package") || "";
      if (!projectForm) return;

      var durationField = projectForm.elements.namedItem("duration");
      var serviceField = projectForm.elements.namedItem("service");

      if (serviceField && !serviceField.value) {
        serviceField.value = "AI product advertisement";
      }

      if (durationField) {
        if (/15 seconds/i.test(selectedPackage)) durationField.value = "15 seconds";
        else if (/30 seconds/i.test(selectedPackage)) durationField.value = "30 seconds";
        else if (/60 seconds/i.test(selectedPackage)) durationField.value = "60 seconds";
      }
    });
  });

  // Form creates a message; it does not collect or store personal information.
  if (projectForm) {
    projectForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!projectForm.reportValidity()) return;

      var fields = projectForm.elements;
      var nameField = fields.namedItem("name");
      var serviceField = fields.namedItem("service");
      var durationField = fields.namedItem("duration");
      var budgetField = fields.namedItem("budget");
      var briefField = fields.namedItem("brief");

      var lines = [
        "Project inquiry — Sohel Visuals",
        "",
        "Name: " + (nameField ? nameField.value.trim() : ""),
        "Project type: " + (serviceField ? serviceField.value : "")
      ];

      if (durationField && durationField.value) {
        lines.push("Preferred duration: " + durationField.value);
      }
      if (selectedPackage) {
        lines.push("Selected package: " + selectedPackage);
      }
      if (budgetField && budgetField.value.trim()) {
        lines.push("Approximate budget: " + budgetField.value.trim());
      }

      lines.push(
        "",
        "Project details:",
        briefField ? briefField.value.trim() : ""
      );

      var whatsappUrl =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(lines.join("\n"));

      if (formStatus) {
        formStatus.textContent =
          "Opening WhatsApp. Review your message there and press Send to submit your inquiry.";
      }

      var newWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      if (!newWindow) {
        window.location.href = whatsappUrl;
      }
    });
  }
});
