import Link from "next/link";
import { SiteNav } from "@/components/SiteNav";
import { getPublishedPosts } from "@/lib/posts";

export default function NotFound() {
  const posts = getPublishedPosts();
  return (
    <>
      <SiteNav showWriting={posts.length > 0} />
      <main className="py-24 text-center">
        <p className="font-sans text-[11px] uppercase tracking-[.13em] text-faint">404</p>
        <h1 className="mt-2 text-[26px] font-medium">{"This page doesn't exist."}</h1>
        <p className="mt-4 text-[15px]">
          <Link href="/" className="text-acc hover:underline">
            Back to the homepage
          </Link>
        </p>
      </main>
    </>
  );
}
