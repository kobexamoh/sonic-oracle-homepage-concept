(function () {
  var STORAGE_KEY = "sonic-oracle-theme";
  var root = document.documentElement;
  var toggle = document.getElementById("themeToggle");

  if (!toggle) return;

  function currentTheme() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    toggle.setAttribute("aria-pressed", String(theme === "light"));
    toggle.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark mode" : "Switch to light mode"
    );
  }

  // Sync the toggle's a11y state with whatever the inline head script already set.
  applyTheme(currentTheme());

  toggle.addEventListener("click", function () {
    var next = currentTheme() === "light" ? "dark" : "light";
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (e) {}
  });
})();

// Fade in [data-reveal] elements as they scroll into view, once, and leave
// them visible on the way back up (no reverse fade on scroll-up).
(function () {
  var targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    // Low threshold + a slight bottom margin so tall <section> blocks (not
    // just the small heading-echo span this started with) reveal as soon as
    // they meaningfully enter the viewport, rather than waiting for 40% of a
    // full section's height to be on screen.
    { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
  );

  targets.forEach(function (el) { observer.observe(el); });
})();
