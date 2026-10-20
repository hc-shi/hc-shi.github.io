import { ResearchTopic } from "@/components/ResearchTopic";
import { SectionHeading } from "@/components/SectionHeading";
import { postsForTopic } from "@/lib/posts";
import { getTopicViews, legendText } from "@/lib/research";
import type { Post } from "@/types";

export function ResearchSection({ posts }: { posts: Post[] }) {
  const views = getTopicViews();
  const legend = legendText(views);
  return (
    <section aria-labelledby="research">
      <SectionHeading id="research">Research</SectionHeading>
      {views.map((view) => (
        <ResearchTopic key={view.topic.id} view={view} posts={postsForTopic(posts, view.topic.id)} />
      ))}
      {legend && <p className="mt-3 text-[12.5px] text-faint">{legend}</p>}
    </section>
  );
}
