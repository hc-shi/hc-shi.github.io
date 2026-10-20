import { AuthorList } from "@/components/AuthorList";
import { Emblem } from "@/components/emblems/Emblem";
import { formatVenue } from "@/lib/research";
import type { Publication, PublicationLinks } from "@/types";

const LINKS: [keyof PublicationLinks, string][] = [
  ["paper", "Paper"],
  ["project", "Project page"],
  ["code", "Code"],
  ["weights", "Weights"],
];
const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export function RepresentativePaper({ pub }: { pub: Publication }) {
  return (
    <article className="grid grid-cols-1 gap-3 border-t border-rule py-3 min-[600px]:grid-cols-[156px_1fr] min-[600px]:gap-4">
      <div className="flex h-[110px] items-center justify-center overflow-hidden rounded-md border border-emb-line bg-emb min-[600px]:h-[100px]">
        {pub.emblem && <Emblem id={pub.emblem} />}
      </div>
      <div>
        <h4 className="text-[15.5px] font-semibold leading-[1.35]">
          <a href={pub.links.paper} {...external} className="hover:underline">
            {pub.title}
          </a>
        </h4>
        <p className="mt-[3px] text-[13.5px] leading-[1.45] text-mute">
          <AuthorList authors={pub.authors} mode="full" />
        </p>
        <p className="mt-1 text-[10.5px] uppercase tracking-[.13em] text-acc">{formatVenue(pub, "representative")}</p>
        {pub.tldr && (
          <p className="mt-1.5 border-l-2 border-rule pl-2.5 text-[14px] italic leading-[1.5] text-ink2">{pub.tldr}</p>
        )}
        <div className="mt-[7px] flex flex-wrap gap-2">
          {LINKS.filter(([key]) => pub.links[key]).map(([key, label]) => (
            <a
              key={key}
              href={pub.links[key]}
              {...external}
              className="rounded-[10px] border border-rule bg-surface px-2 py-1 font-sans text-[10px] font-semibold uppercase leading-none tracking-[.08em] text-ink2 hover:text-acc"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
