document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("mainNav");
  var year = document.getElementById("currentYear");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (!toggle || !nav) return;

  function setMenu(open) {
    nav.classList.toggle("active", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
  }

  toggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("active"));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setMenu(false);
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 768) setMenu(false);
  });
});
