import { CompactList } from "@/components/CompactList";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ResearchSection } from "@/components/ResearchSection";
import { SectionHeading } from "@/components/SectionHeading";
import { SiteNav } from "@/components/SiteNav";
import { Timeline } from "@/components/Timeline";
import { WritingSection } from "@/components/WritingSection";
import { awards, education, teachingAndTalks } from "@/data/cv";
import { getPublishedPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getPublishedPosts();
  return (
    <>
      <SiteNav active="research" showWriting={posts.length > 0} />
      <main>
        <ProfileHeader />
        <ResearchSection posts={posts} />
        {posts.length > 0 && <WritingSection posts={posts} />}
        <section>
          <SectionHeading>Education</SectionHeading>
          <Timeline entries={education} />
        </section>
        <section>
          <SectionHeading>{"Teaching & Talks"}</SectionHeading>
          <CompactList entries={teachingAndTalks} />
        </section>
        <section>
          <SectionHeading>Awards</SectionHeading>
          <CompactList entries={awards} />
        </section>
      </main>
    </>
  );
}
