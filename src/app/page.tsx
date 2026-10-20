import { ProfileHeader } from "@/components/ProfileHeader";
import { SiteNav } from "@/components/SiteNav";
import { getPublishedPosts } from "@/lib/posts";

export default function HomePage() {
  const posts = getPublishedPosts();
  return (
    <>
      <SiteNav active="research" showWriting={posts.length > 0} />
      <main>
        <ProfileHeader />
      </main>
    </>
  );
}
