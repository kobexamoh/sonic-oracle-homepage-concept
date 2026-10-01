// v4.5: light/dark toggle disabled (light-only version, see NOTES.md).
// The button markup is commented out in index.html, so `toggle` below would
// be null anyway; the whole block is commented out too for a clean re-enable.
/*
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
*/

// v6: font-picker, review-only tool for trying the Playfair Display
// replacement shortlist live (see NOTES.md). Every heading/brand/blockquote
// rule in style.css already reads `var(--serif)`, so swapping fonts is just
// updating that one custom property; no per-element wiring needed. Choice
// persists in localStorage so it survives a refresh mid-review.
(function () {
  var STORAGE_KEY = "sonic-oracle-font-preview";
  var picker = document.getElementById("fontPicker");
  if (!picker) return;

  function applyFont(family) {
    document.documentElement.style.setProperty(
      "--serif",
      "'" + family + "', Georgia, serif"
    );
  }

  var stored;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (e) {}

  if (stored) {
    picker.value = stored;
    applyFont(stored);
  }

  picker.addEventListener("change", function () {
    applyFont(picker.value);
    try {
      localStorage.setItem(STORAGE_KEY, picker.value);
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
