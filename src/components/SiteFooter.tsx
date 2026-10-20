import { profile } from "@/data/profile";
import { buildYear, formatBuildDate } from "@/lib/dates";

/** Rendered at build time, so "Last updated" is the deploy date. */
export function SiteFooter() {
  const now = new Date();
  return (
    <footer className="mt-[34px] border-t border-rule pt-3.5 text-center text-[12.5px] text-faint">
      © {buildYear(now)} {profile.name} · Last updated {formatBuildDate(now)}
    </footer>
  );
}
