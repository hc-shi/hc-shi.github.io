import Link from "next/link";
import { Fragment } from "react";
import { PaperList } from "@/components/PaperList";
import { RepresentativePaper } from "@/components/RepresentativePaper";
import type { TopicView } from "@/lib/research";
import type { Post } from "@/types";

export function ResearchTopic({ view, posts }: { view: TopicView; posts: Post[] }) {
  const { topic, representatives, folded } = view;
  return (
    <div className="mt-[30px] pt-1">
      <div className="flex flex-wrap items-baseline gap-2.5">
        <h3 className="text-[18px] font-semibold">{topic.name}</h3>
        {topic.current && (
          <span className="rounded-[10px] border border-accsoft px-[7px] py-1 font-sans text-[10px] font-semibold uppercase leading-none tracking-[.1em] text-acc">
            Current focus
          </span>
        )}
      </div>
      <p className="mb-3 mt-1 text-[15px] leading-[1.5] text-mute">{topic.blurb}</p>
      {representatives.map((pub) => (
        <RepresentativePaper key={pub.id} pub={pub} />
      ))}
      {folded.length > 0 && <PaperList pubs={folded} />}
      {posts.length > 0 && (
        <p className="border-t border-rule pt-2 text-[13.5px] leading-[1.45] text-mute">
          Writing on this topic:{" "}
          {posts.map((post, i) => (
            <Fragment key={post.slug}>
              {i > 0 && ", "}
              <Link href={`/writing/${post.slug}/`} className="text-acc hover:underline">
                {post.title}
              </Link>
            </Fragment>
          ))}
        </p>
      )}
    </div>
  );
}
