import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { CORE_SCHEMA, load } from "js-yaml";
import { topics } from "@/data/research";
import type { Post, TopicId } from "@/types";

export const WRITING_DIR = path.join(process.cwd(), "src/content/writing");

/** Static export needs one param for /writing/[slug]; scripts/postbuild.mjs deletes this page (spec §6.2). */
export const PLACEHOLDER_SLUG = "_placeholder";

const TOPIC_IDS = new Set<string>(topics.map((t) => t.id));
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function fail(fileName: string, message: string): never {
  throw new Error(`Invalid post ${fileName}: ${message}`);
}

// Core-schema YAML keeps dates as plain strings, so a typo such as 2026-02-30 is reported below
// instead of silently becoming another day. Passing options also stops gray-matter from caching
// a failed parse, which would otherwise surface later as a misleading "title is required".
const MATTER_OPTIONS = {
  engines: { yaml: (text: string) => (load(text, { schema: CORE_SCHEMA }) ?? {}) as object },
};

const DATE = /^\d{4}-\d{2}-\d{2}$/;

function isCalendarDate(value: unknown): value is string {
  if (typeof value !== "string" || !DATE.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
}

function readFrontmatter(fileName: string, raw: string) {
  try {
    return matter(raw, MATTER_OPTIONS);
  } catch (error) {
    const reason = error instanceof Error ? error.message.split("\n")[0] : String(error);
    return fail(fileName, `frontmatter is not valid YAML (${reason})`);
  }
}

/** Validates frontmatter (spec §3.6); any problem stops the build and names the file. */
export function parsePost(fileName: string, raw: string): Post {
  const slug = fileName.replace(/\.mdx$/, "");
  if (!SLUG.test(slug)) fail(fileName, "file name must be lowercase words joined by hyphens, like my-post.mdx");
  const { data, content } = readFrontmatter(fileName, raw);
  if (typeof data.title !== "string" || data.title.trim() === "") fail(fileName, "title is required");
  const date: unknown = data.date;
  if (!isCalendarDate(date)) fail(fileName, "date must be YYYY-MM-DD and a real calendar date");
  if (typeof data.description !== "string" || data.description.trim() === "") {
    fail(fileName, "description is required");
  }
  if (typeof data.published !== "boolean") fail(fileName, "published must be true or false");
  const tags: unknown = data.tags ?? [];
  if (!Array.isArray(tags) || !tags.every((t) => typeof t === "string")) {
    fail(fileName, "tags must be a list of strings");
  }
  const postTopics: unknown = data.topics ?? [];
  if (!Array.isArray(postTopics)) fail(fileName, "topics must be a list of topic ids");
  for (const t of postTopics) if (!TOPIC_IDS.has(t)) fail(fileName, `unknown topic "${t}"`);
  return {
    slug,
    title: data.title,
    date,
    description: data.description,
    tags: tags as string[],
    published: data.published,
    topics: postTopics as TopicId[],
    content,
  };
}

export function readPosts(dir: string = WRITING_DIR): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => parsePost(f, fs.readFileSync(path.join(dir, f), "utf8")));
}

/** Published posts, newest first. */
export function getPublishedPosts(dir: string = WRITING_DIR): Post[] {
  return readPosts(dir)
    .filter((p) => p.published)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function getPublishedPost(slug: string, dir: string = WRITING_DIR): Post | undefined {
  return getPublishedPosts(dir).find((p) => p.slug === slug);
}

export function postStaticParams(posts: Post[]): { slug: string }[] {
  return posts.length > 0 ? posts.map((p) => ({ slug: p.slug })) : [{ slug: PLACEHOLDER_SLUG }];
}

/** "Writing on this topic": newest first, at most three (spec §3.6). */
export function postsForTopic(posts: Post[], topic: TopicId, limit = 3): Post[] {
  return posts.filter((p) => p.topics.includes(topic)).slice(0, limit);
}
