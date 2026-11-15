import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomePage from "@/app/page";

const html = renderToStaticMarkup(createElement(HomePage));
const headings = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)].map((m) => m[1].replace(/&amp;/g, "&"));

describe("home page", () => {
  it("ends with Teaching & Talks, then Awards (the owner's option A, 2026-11-15)", () => {
    expect(headings.slice(-2)).toEqual(["Teaching & Talks", "Awards"]);
  });

  it.each([
    ["Input-Conditioned Search for Efficient Test-Time Scaling of Recursive Reasoners", "https://nice-intl.github.io/", "NICE"],
    ["Evolving Programmatic Skill Networks", "https://ubc-tea.github.io/lab-web/", "TEA Lab, UBC"],
  ])("shows the talk on %s and links where it was given", (topic, href, place) => {
    const link = `<a href="${href}" target="_blank" rel="noopener noreferrer" class="[^"]*">${place}</a>`;
    expect(html).toMatch(new RegExp(`<span>${topic} at ${link}</span>`));
  });

  it("links nothing in rows without a place", () => {
    expect(html).toContain("<span>TA, NLP with Deep Learning (IFT6289)</span>");
  });
});
