import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  getPublishedPost,
  getPublishedPosts,
  parsePost,
  PLACEHOLDER_SLUG,
  postStaticParams,
  postsForTopic,
} from "@/lib/posts";

const post = (fields: Record<string, string>, body = "Body text.") =>
  `---\n${Object.entries(fields)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n")}\n---\n${body}\n`;

const valid = {
  title: '"Why tiny reasoners get stuck"',
  date: '"2026-11-02"',
  description: '"A note."',
  published: "true",
};

let dir: string;
beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), "writing-"));
});
afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});
const write = (name: string, text: string) => fs.writeFileSync(path.join(dir, name), text);

describe("parsePost", () => {
  it("reads a valid post", () => {
    const p = parsePost(
      "why-tiny-reasoners.mdx",
      post({ ...valid, tags: '["notes"]', topics: '["recursive-reasoning"]' }),
    );
    expect(p).toMatchObject({
      slug: "why-tiny-reasoners",
      title: "Why tiny reasoners get stuck",
      date: "2026-11-02",
      description: "A note.",
      published: true,
      tags: ["notes"],
      topics: ["recursive-reasoning"],
    });
    expect(p.content.trim()).toBe("Body text.");
  });

  it("accepts an unquoted YAML date", () => {
    expect(parsePost("a-post.mdx", post({ ...valid, date: "2026-11-02" })).date).toBe("2026-11-02");
  });

  it("defaults tags and topics to empty lists", () => {
    expect(parsePost("a-post.mdx", post(valid))).toMatchObject({ tags: [], topics: [] });
  });

  it.each([
    ["title", { ...valid, title: '""' }, /title is required/],
    ["date format", { ...valid, date: '"Nov 2"' }, /date must be YYYY-MM-DD/],
    ["description", { title: valid.title, date: valid.date, published: "true" }, /description is required/],
    ["published as a string", { ...valid, published: '"true"' }, /published must be true or false/],
    ["tags with a number", { ...valid, tags: "[1]" }, /tags must be a list of strings/],
    ["topics as a scalar", { ...valid, topics: "recursive-reasoning" }, /topics must be a list/],
    ["unknown topic", { ...valid, topics: '["robotics"]' }, /unknown topic "robotics"/],
  ])("rejects a bad %s and names the file", (_label, fields, message) => {
    expect(() => parsePost("bad-post.mdx", post(fields))).toThrow(message);
    expect(() => parsePost("bad-post.mdx", post(fields))).toThrow(/bad-post\.mdx/);
  });

  it.each([
    ['"2026-11-31"', "a day that does not exist"],
    ['"2026-13-45"', "a month that does not exist"],
    ["2026-02-30", "an unquoted impossible day"],
    ["2026-11-02T22:30:00-05:00", "a timestamp instead of a date"],
  ])("rejects the date %s (%s) and names the file", (date) => {
    expect(() => parsePost("bad-post.mdx", post({ ...valid, date }))).toThrow(/bad-post\.mdx: date must be YYYY-MM-DD/);
  });

  it("names the file when the frontmatter is not valid YAML", () => {
    const broken = "---\ntitle: [unclosed\n---\nBody\n";
    expect(() => parsePost("bad-post.mdx", broken)).toThrow(/bad-post\.mdx: frontmatter is not valid YAML/);
  });

  it("reports the YAML error again when the same file is parsed twice", () => {
    const broken = "---\ntitle: [also unclosed\n---\nBody\n";
    expect(() => parsePost("bad-post.mdx", broken)).toThrow(/not valid YAML/);
    expect(() => parsePost("bad-post.mdx", broken)).toThrow(/not valid YAML/);
  });

  it.each(["My Post.mdx", "My-post.mdx", "my_post.mdx"])("rejects the file name %s", (name) => {
    expect(() => parsePost(name, post(valid))).toThrow(/lowercase words joined by hyphens/);
  });
});

describe("getPublishedPosts", () => {
  it("returns an empty list when the folder is missing or empty", () => {
    expect(getPublishedPosts(path.join(dir, "missing"))).toEqual([]);
    expect(getPublishedPosts(dir)).toEqual([]);
  });

  it("skips drafts and non-MDX files, newest first", () => {
    write("older.mdx", post({ ...valid, date: '"2026-01-05"' }));
    write("newer.mdx", post({ ...valid, date: '"2026-03-01"' }));
    write("draft.mdx", post({ ...valid, published: "false" }));
    write("notes.txt", "not a post");
    expect(getPublishedPosts(dir).map((p) => p.slug)).toEqual(["newer", "older"]);
    expect(getPublishedPost("draft", dir)).toBeUndefined();
    expect(getPublishedPost("newer", dir)?.title).toBe("Why tiny reasoners get stuck");
  });
});

describe("postStaticParams", () => {
  it("uses the placeholder when nothing is published", () => {
    expect(postStaticParams([])).toEqual([{ slug: PLACEHOLDER_SLUG }]);
  });

  it("lists the published slugs otherwise", () => {
    write("one.mdx", post(valid));
    expect(postStaticParams(getPublishedPosts(dir))).toEqual([{ slug: "one" }]);
  });
});

describe("postsForTopic", () => {
  it("returns at most three matching posts, newest first", () => {
    for (const [name, day] of [["a", "01"], ["b", "02"], ["c", "03"], ["d", "04"]]) {
      write(`${name}.mdx`, post({ ...valid, date: `"2026-05-${day}"`, topics: '["llm-agents"]' }));
    }
    write("e.mdx", post({ ...valid, topics: '["multimodal"]' }));
    expect(postsForTopic(getPublishedPosts(dir), "llm-agents").map((p) => p.slug)).toEqual(["d", "c", "b"]);
  });
});
