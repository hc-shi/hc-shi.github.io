import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { getPublishedPosts } from "@/lib/posts";
import { buildSitemap } from "@/lib/sitemap";

// Required for metadata routes under output: "export" (spec §2.3).
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemap(profile.siteUrl, getPublishedPosts());
}
