import type { MetadataRoute } from "next";
import type { Post } from "@/types";

/** Spec §2.3: the homepage always; /writing/ and each post only once something is published. */
export function buildSitemap(siteUrl: string, posts: Post[]): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [{ url: `${siteUrl}/` }];
  if (posts.length === 0) return entries;
  entries.push({ url: `${siteUrl}/writing/` });
  for (const p of posts) entries.push({ url: `${siteUrl}/writing/${p.slug}/`, lastModified: p.date });
  return entries;
}
