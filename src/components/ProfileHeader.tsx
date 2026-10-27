import { GitHubIcon, MailIcon, ScholarIcon } from "@/components/Icons";
import { RichText } from "@/components/RichText";
import { profile } from "@/data/profile";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;
const circle =
  "inline-flex h-8 w-8 items-center justify-center rounded-full border border-rule bg-surface text-ink2 hover:border-acc hover:bg-acc hover:text-on-acc";

export function ProfileHeader() {
  // Phones: photo above the name. From 600px: text on the left, photo on the right, one left edge.
  return (
    <section className="grid grid-cols-1 pb-2 pt-[30px] min-[600px]:grid-cols-[1fr_150px] min-[600px]:gap-x-8 min-[600px]:pt-10">
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized WebP */}
      <img
        src="/headshot.webp"
        alt={profile.name}
        width={112}
        height={112}
        className="headshot h-[112px] w-[112px] self-start rounded-full border border-rule bg-surface object-cover object-[50%_22%] min-[600px]:col-start-2 min-[600px]:row-span-4 min-[600px]:row-start-1 min-[600px]:mt-1 min-[600px]:h-[150px] min-[600px]:w-[150px]"
      />
      <h1 className="mt-3 text-[34px] font-medium leading-[1.1] tracking-[-0.01em] min-[600px]:col-start-1 min-[600px]:mt-0 min-[600px]:text-[38px]">
        {profile.name}{" "}
        <span className="ml-0.5 text-[0.74em] text-mute">
          <span className="mr-[0.3em]">·</span>
          <span lang="zh-Hans" className="font-zh font-medium tracking-[.06em]">
            {profile.nameZh}
          </span>
        </span>
      </h1>
      <p className="mt-1.5 text-[14px] text-mute min-[600px]:col-start-1">{profile.title}</p>
      <div className="mt-[18px] text-[17.5px] leading-[1.62] min-[600px]:col-start-1">
        {profile.bio.map((paragraph) => (
          <p key={paragraph} className="mb-3">
            <RichText text={paragraph} />
          </p>
        ))}
        <p className="mb-3 text-mute">
          <RichText text={profile.openTo} />
        </p>
      </div>
      <div className="mt-1.5 flex gap-2.5 min-[600px]:col-start-1">
        <a href={`mailto:${profile.email}`} aria-label="Email" title="Email" className={circle}>
          <MailIcon />
        </a>
        <a href={profile.links.scholar} {...external} aria-label="Google Scholar" title="Google Scholar" className={circle}>
          <ScholarIcon />
        </a>
        <a href={profile.links.github} {...external} aria-label="GitHub" title="GitHub" className={circle}>
          <GitHubIcon />
        </a>
        <a
          href={profile.links.cv}
          {...external}
          className="inline-flex h-8 items-center rounded-2xl border border-rule bg-surface px-3 font-sans text-[12px] font-semibold tracking-[.08em] text-ink2 hover:border-acc hover:bg-acc hover:text-on-acc"
        >
          CV · PDF
        </a>
      </div>
    </section>
  );
}
