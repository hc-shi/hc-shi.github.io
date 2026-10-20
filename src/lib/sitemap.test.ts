import { describe, expect, it } from "vitest";
import { buildSitemap } from "@/lib/sitemap";
import type { Post } from "@/types";

const SITE = "https://hc-shi.github.io";
const post: Post = {
  slug: "first-note",
  title: "First",
  date: "2026-11-02",
  description: "d",
  tags: [],
  published: true,
  topics: [],
  content: "",
};

describe("buildSitemap", () => {
  it("lists only the homepage when nothing is published", () => {
    expect(buildSitemap(SITE, [])).toEqual([{ url: "https://hc-shi.github.io/" }]);
  });

  it("adds the writing index and each post once something is published", () => {
    expect(buildSitemap(SITE, [post])).toEqual([
      { url: "https://hc-shi.github.io/" },
      { url: "https://hc-shi.github.io/writing/" },
      { url: "https://hc-shi.github.io/writing/first-note/", lastModified: "2026-11-02" },
    ]);
  });
});
