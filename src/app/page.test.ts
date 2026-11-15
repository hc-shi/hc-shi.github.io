import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

const html = renderToStaticMarkup(createElement(HomePage));
const headings = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)].map((m) => m[1].replace(/&amp;/g, "&"));

describe("home page", () => {
  it("ends with Teaching & Talks and has no Awards section (the owner removed it on 2026-11-15)", () => {
    expect(headings.at(-1)).toBe("Teaching & Talks");
    expect(headings).not.toContain("Awards");
  });

  it.each([
    ["“Can recursive models think differently, not just long?”", "https://nice-intl.github.io/", "NICE"],
    ["Evolving Programmatic Skill Networks", "https://ubc-tea.github.io/lab-web/", "TEA Lab, UBC"],
  ])("shows the talk on %s and links where it was given", (topic, href, place) => {
    const link = `<a href="${href}" target="_blank" rel="noopener noreferrer" class="[^"]*">${place}</a>`;
    const escaped = topic.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    expect(html).toMatch(new RegExp(`<span>${escaped} at ${link}</span>`));
  });

  it("links nothing in rows without a place", () => {
    expect(html).toContain("<span>TA, NLP with Deep Learning (IFT6289)</span>");
  });
});
