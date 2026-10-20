import type { Metadata } from "next";
import { PostList } from "@/components/PostList";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteNav } from "@/components/SiteNav";
import { getPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "Writing" };

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
