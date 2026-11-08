import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { THEME_SCRIPT } from "@/lib/theme";

const read = (file: string) => fs.readFileSync(path.join(process.cwd(), "src", file), "utf8");

describe("theme toggle", () => {
  it("sits in the nav, so every page has it", () => {
    expect(read("components/SiteNav.tsx")).toContain("<ThemeToggle />");
  });

  it("is a button the inline script listens for", () => {
    const toggle = read("components/ThemeToggle.tsx");
    expect(toggle).toContain('type="button"');
    expect(toggle).toContain("data-theme-toggle");
    expect(THEME_SCRIPT).toContain('closest("[data-theme-toggle]")');
  });

  it("shows a moon in light mode and a sun in dark mode", () => {
    const toggle = read("components/ThemeToggle.tsx");
    expect(toggle).toMatch(/<MoonIcon className="[^"]*\bdark:hidden\b[^"]*" \/>/);
    expect(toggle).toMatch(/<SunIcon className="[^"]*\bhidden\b[^"]*\bdark:block\b[^"]*" \/>/);
  });

  it("tells screen readers what a click will do in each theme", () => {
    const toggle = read("components/ThemeToggle.tsx");
    expect(toggle).toMatch(/<span className="sr-only dark:hidden">Switch to dark mode<\/span>/);
    expect(toggle).toMatch(/<span className="sr-only hidden dark:inline">Switch to light mode<\/span>/);
  });

  it("runs the theme script in <head>, before the page paints", () => {
    expect(read("app/layout.tsx")).toMatch(/<head>\s*<script dangerouslySetInnerHTML=\{\{ __html: THEME_SCRIPT \}\} \/>\s*<\/head>/);
  });
});
