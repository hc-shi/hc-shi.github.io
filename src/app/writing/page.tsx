import type { Metadata } from "next";
import { PostList } from "@/components/PostList";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteNav } from "@/components/SiteNav";
import { profile } from "@/data/profile";
import { getPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  openGraph: {
    type: "website",
    url: "/writing/",
    siteName: profile.name,
    title: `Writing · ${profile.name}`,
    description: profile.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: profile.name }],
  },
};

export default function WritingIndexPage() {
  const posts = getPublishedPosts();
  return (
    <>
      <SiteNav active="writing" showWriting={posts.length > 0} />
      <main>
        <SectionHeading>Writing</SectionHeading>
        {posts.length === 0 ? (
          <p className="mt-3 text-[15px] text-mute">Nothing published yet.</p>
        ) : (
          <PostList posts={posts} />
        )}
      </main>
    </>
  );
}
