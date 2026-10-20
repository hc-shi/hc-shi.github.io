import { describe, expect, it } from "vitest";
import { profile } from "@/data/profile";
import { isExternal, parseRichText } from "@/lib/richtext";

describe("parseRichText", () => {
  it("splits bold text and links out of plain text", () => {
    expect(parseRichText("I study how machines **reason**: see [Bang Liu](https://example.org/).")).toEqual([
      { kind: "text", text: "I study how machines " },
      { kind: "bold", text: "reason" },
      { kind: "text", text: ": see " },
      { kind: "link", text: "Bang Liu", href: "https://example.org/" },
      { kind: "text", text: "." },
    ]);
  });

  it("leaves text without markup alone", () => {
    expect(parseRichText("Plain.")).toEqual([{ kind: "text", text: "Plain." }]);
  });

  it("leaves no markup behind in the real bio", () => {
    for (const paragraph of [...profile.bio, profile.openTo]) {
      const plain = parseRichText(paragraph)
        .map((s) => s.text)
        .join("");
      expect(plain).not.toMatch(/\*\*|\]\(/);
    }
  });
});

describe("isExternal", () => {
  it("treats http(s) links as external, mailto and site paths as local", () => {
    expect(isExternal("https://example.org")).toBe(true);
    expect(isExternal("mailto:someone@example.org")).toBe(false);
    expect(isExternal("/cv.pdf")).toBe(false);
  });
});
