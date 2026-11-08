import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { PAPER, THEME_SCRIPT } from "@/lib/theme";

type Listener = (event: { target?: unknown }) => void;

/** Runs the inline script against a fake page: just the DOM and storage calls it may use. */
function load(stored: string | null, { blocked = false } = {}) {
  const attrs = new Map<string, string>();
  const meta = new Map<string, string>([["content", PAPER.light]]);
  const store = new Map<string, string>(stored === null ? [] : [["theme", stored]]);
  const listeners: Record<string, Listener[]> = {};
  const document = {
    documentElement: {
      getAttribute: (name: string) => attrs.get(name) ?? null,
      setAttribute: (name: string, value: string) => void attrs.set(name, value),
      removeAttribute: (name: string) => void attrs.delete(name),
    },
    querySelector: (selector: string) =>
      selector === 'meta[name="theme-color"]' ? { setAttribute: (name: string, value: string) => void meta.set(name, value) } : null,
    addEventListener: (type: string, listener: Listener) => void (listeners[type] ??= []).push(listener),
  };
  const localStorage = {
    getItem: (key: string) => {
      if (blocked) throw new Error("storage blocked");
      return store.get(key) ?? null;
    },
    setItem: (key: string, value: string) => {
      if (blocked) throw new Error("storage blocked");
      store.set(key, value);
    },
  };
  new Function("document", "localStorage", THEME_SCRIPT)(document, localStorage);
  const fire = (type: string, event = {}) => listeners[type]?.forEach((listener) => listener(event));
  const toggle = { closest: (selector: string) => (selector === "[data-theme-toggle]" ? toggle : null) };
  return {
    theme: () => attrs.get("data-theme") ?? "light",
    stored: () => store.get("theme") ?? null,
    barColour: () => meta.get("content"),
    clickToggle: () => fire("click", { target: toggle }),
    clickElsewhere: () => fire("click", { target: { closest: () => null } }),
    domReady: () => fire("DOMContentLoaded"),
  };
}

describe("theme script", () => {
  it("starts light for a visitor who never chose, whatever the system setting", () => {
    const page = load(null);
    page.domReady();
    expect(page.theme()).toBe("light");
    expect(page.barColour()).toBe(PAPER.light);
  });

  it("restores a stored dark choice as soon as it runs, before the page paints", () => {
    const page = load("dark");
    expect(page.theme()).toBe("dark");
    page.domReady();
    expect(page.barColour()).toBe(PAPER.dark);
  });

  it("switches on each toggle click and remembers the choice", () => {
    const page = load(null);
    page.clickToggle();
    expect([page.theme(), page.stored(), page.barColour()]).toEqual(["dark", "dark", PAPER.dark]);
    page.clickToggle();
    expect([page.theme(), page.stored(), page.barColour()]).toEqual(["light", "light", PAPER.light]);
  });

  it("ignores clicks anywhere else", () => {
    const page = load(null);
    page.clickElsewhere();
    expect([page.theme(), page.stored()]).toEqual(["light", null]);
  });

  it("still starts light and switches when storage is blocked", () => {
    const page = load(null, { blocked: true });
    expect(page.theme()).toBe("light");
    page.clickToggle();
    expect(page.theme()).toBe("dark");
  });
});

describe("colour scheme", () => {
  const SRC = path.join(process.cwd(), "src");
  const css = fs.readFileSync(path.join(SRC, "app/globals.css"), "utf8");
  const files = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return files(full);
      return /\.(css|tsx?)$/.test(entry.name) && !entry.name.includes(".test.") ? [full] : [];
    });

  it("never follows the system setting, so light is the default everywhere", () => {
    for (const file of files(SRC)) expect(fs.readFileSync(file, "utf8"), file).not.toContain("prefers-color-scheme");
  });

  it("keeps the dark palette under the toggle's data-theme attribute", () => {
    expect(css).toMatch(/:root\s*\{\s*color-scheme: light;/);
    expect(css).toMatch(/:root\[data-theme="dark"\]\s*\{\s*color-scheme: dark;/);
  });

  it("uses the green-tinted dark palette the owner chose on 2026-11-08 (option C)", () => {
    const block = css.match(/:root\[data-theme="dark"\] \{([^}]*)\}/)?.[1] ?? "";
    const tokens = Object.fromEntries([...block.matchAll(/--([\w-]+): ([^;]+);/g)].map((m) => [m[1], m[2]]));
    expect(tokens).toEqual({
      paper: "#111815", surface: "#1a231f", tint: "#161f1b", emb: "#18211d", "emb-line": "#25302b",
      ink: "#e3ebe6", ink2: "#c2cdc6", mute: "#a2afa8", faint: "#8a988f", rule: "#2a3530",
      acc: "#72cc9e", accsoft: "#2b5442", "on-acc": "#111815",
      "e-ink": "#d2ddd6", "e-mid": "#9aa89f", "e-soft": "#7c8b82", "e-faint": "#5f6c65", "e-card": "#212b26",
    });
  });

  it("tints the browser bar with the page colour of each theme", () => {
    const paper = [...css.matchAll(/--paper: (#[0-9a-f]{6});/g)].map((m) => m[1]);
    expect(paper).toEqual([PAPER.light, PAPER.dark]);
  });
});
