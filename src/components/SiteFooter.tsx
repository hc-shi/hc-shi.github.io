import { profile } from "@/data/profile";
import { buildYear } from "@/lib/dates";

/** Copyright only: the owner removed the "Last updated" date on 2026-11-15. The year is the build year. */
export function SiteFooter() {
  const now = new Date();
  return (
    <footer className="mt-[34px] border-t border-rule pt-3.5 text-center text-[12.5px] text-faint">
      © {buildYear(now)} {profile.name}
    </footer>
  );
}
