import Link from "next/link";
import { profile } from "@/data/profile";
import type { NavSection } from "@/types";

interface SiteNavProps {
  /** Highlighted section; omitted on the 404 page. */
  active?: NavSection;
  /** Writing appears only once a post is published (spec §2.2). */
  showWriting: boolean;
}

export function SiteNav({ active, showWriting }: SiteNavProps) {
  const tone = (section?: NavSection) =>
    section !== undefined && section === active ? "text-ink hover:text-acc" : "text-faint hover:text-acc";
  return (
    <header className="flex items-baseline justify-between border-b border-rule pb-[10px] pt-[18px] text-[14px]">
      <Link href="/" className="text-ink hover:text-acc">
        {profile.name}
      </Link>
      <nav aria-label="Main" className="flex gap-[18px] text-[11.5px] uppercase tracking-[.13em]">
        <Link href="/#research" className={tone("research")}>
          Research
        </Link>
        {showWriting && (
          <Link href="/writing/" className={tone("writing")}>
            Writing
          </Link>
        )}
        <a href={profile.links.cv} target="_blank" rel="noopener noreferrer" className={tone()}>
          CV
        </a>
      </nav>
    </header>
  );
}
