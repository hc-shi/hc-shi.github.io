import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "@/components/SiteFooter";
import { profile } from "@/data/profile";
import { buildYear } from "@/lib/dates";

describe("site footer", () => {
  it("shows only the copyright, with no Last updated date (the owner's choice, 2026-11-15)", () => {
    const text = renderToStaticMarkup(createElement(SiteFooter)).replace(/<[^>]+>/g, "").replace(/<!-- -->/g, "");
    expect(text).toBe(`© ${buildYear(new Date())} ${profile.name}`);
  });
});
