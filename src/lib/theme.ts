// Colour theme: light unless the visitor picks dark with a [data-theme-toggle] button, whatever their
// system setting (the owner's choice). The choice is kept in localStorage under "theme".
//
// THEME_SCRIPT runs inline at the top of <head> (layout.tsx), so a stored dark choice applies before
// the first paint. It is a plain string because it ships as written, outside the bundle; theme.test.ts
// runs it against a fake page. One listener on document handles every toggle, including those that
// client-side navigation renders later.

/** The --paper colour of each theme in globals.css, also used for the browser bar. */
export const PAPER = { light: "#ffffff", dark: "#0f0f0e" } as const;

export const THEME_SCRIPT = `(function () {
  var root = document.documentElement;
  function paint(dark) {
    if (dark) root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    var bar = document.querySelector('meta[name="theme-color"]');
    if (bar) bar.setAttribute("content", dark ? "${PAPER.dark}" : "${PAPER.light}");
  }
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  paint(stored === "dark");
  document.addEventListener("DOMContentLoaded", function () {
    paint(root.getAttribute("data-theme") === "dark");
  });
  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || !target.closest || !target.closest("[data-theme-toggle]")) return;
    var dark = root.getAttribute("data-theme") !== "dark";
    paint(dark);
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
  });
})();`;
