import Link from "next/link";
import { PostList } from "@/components/PostList";
import { SectionHeading } from "@/components/SectionHeading";
import type { Post } from "@/types";

const HOME_LIMIT = 5;

/** Homepage Writing section: the five most recent posts (spec §3.6). */
export function WritingSection({ posts }: { posts: Post[] }) {
  return (
    <section>
      <SectionHeading>Writing</SectionHeading>
      <PostList posts={posts.slice(0, HOME_LIMIT)} />
      {posts.length > HOME_LIMIT && (
        <p className="mt-2 text-[14px]">
          <Link href="/writing/" className="text-acc hover:underline">
            All writing →
          </Link>
        </p>
      )}
    </section>
  );
}
