import Link from "next/link";
import { formatPostDate } from "@/lib/dates";
import type { Post } from "@/types";

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug} className="py-1.5 leading-[1.45]">
          <Link href={`/writing/${post.slug}/`} className="text-[16px] font-semibold text-ink hover:underline">
            {post.title}
          </Link>
          <span className="block text-[13.5px] text-faint">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          </span>
          <span className="block text-[14px] text-ink2">{post.description}</span>
        </li>
      ))}
    </ul>
  );
}
