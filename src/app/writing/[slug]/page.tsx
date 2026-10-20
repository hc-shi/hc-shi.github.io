import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { mdxComponents } from "@/components/mdx";
import { SiteNav } from "@/components/SiteNav";
import { formatPostDate } from "@/lib/dates";
import { getPublishedPost, getPublishedPosts, postStaticParams } from "@/lib/posts";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return postStaticParams(getPublishedPosts());
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPublishedPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      url: `/writing/${post.slug}/`,
      title: post.title,
      description: post.description,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPublishedPost(slug);
  if (!post) notFound();
  return (
    <>
      <SiteNav active="writing" showWriting />
      <main>
        <article className="mt-[34px]">
          <header className="mb-6">
            <h1 className="text-[30px] font-medium leading-[1.2]">{post.title}</h1>
            <p className="mt-2 text-[13.5px] text-faint">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            </p>
          </header>
          <div className="prose">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm, remarkMath],
                  rehypePlugins: [
                    rehypeKatex,
                    [rehypePrettyCode, { theme: { light: "github-light", dark: "github-dark" }, keepBackground: false }],
                  ],
                },
              }}
            />
          </div>
        </article>
        <p className="mt-8 text-[14px]">
          <Link href="/writing/" className="text-acc hover:underline">
            ← All writing
          </Link>
        </p>
      </main>
    </>
  );
}
