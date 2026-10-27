import type { ReactNode } from "react";

/** Section title with a hairline running to the right edge. */
export function SectionHeading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="mb-1.5 mt-[52px] flex scroll-mt-4 items-center gap-3.5 text-[26px] font-semibold after:h-px after:flex-1 after:bg-rule after:content-['']"
    >
      {children}
    </h2>
  );
}
