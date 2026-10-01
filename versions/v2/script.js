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
