import { AuthorList } from "@/components/AuthorList";
import { formatVenue, titleWithPeriod } from "@/lib/research";
import type { Publication } from "@/types";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/** "N more in this topic": native <details>, closed by default, no JavaScript. */
export function PaperList({ pubs }: { pubs: Publication[] }) {
  return (
    <details className="pb-0.5 pt-2">
      <summary className="more-summary cursor-pointer font-sans text-[14px] text-ink2 hover:text-acc">
        {pubs.length} more in this topic
      </summary>
      <ul className="mb-1 ml-3.5 mt-2 min-[600px]:pl-10">
        {pubs.map((pub) => (
          <li key={pub.id} className="mb-[9px] text-[15px] leading-[1.45]">
            <a href={pub.links.paper} {...external} className="font-semibold text-ink underline-offset-2 hover:text-acc hover:underline">
              {titleWithPeriod(pub.title)}
            </a>{" "}
            <span className="text-mute">
              <AuthorList authors={pub.authors} mode="short" endWithPeriod />
            </span>{" "}
            <span className="text-[11px] uppercase tracking-[.13em] text-faint">{formatVenue(pub, "folded")}</span>
            {pub.links.code && (
              <>
                <span className="text-[11px] text-faint"> · </span>
                <a
                  href={pub.links.code}
                  {...external}
                  className="text-[11px] uppercase tracking-[.13em] text-faint hover:text-acc hover:underline"
                >
                  code
                </a>
              </>
            )}
            {pub.summary && <span className="block text-[14.5px] text-ink2">{pub.summary}</span>}
          </li>
        ))}
      </ul>
    </details>
  );
}
