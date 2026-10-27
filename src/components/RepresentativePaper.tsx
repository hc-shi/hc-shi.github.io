import { AuthorList } from "@/components/AuthorList";
import { Emblem } from "@/components/emblems/Emblem";
import { GitHubIcon, GlobeIcon, HuggingFaceIcon, PaperIcon } from "@/components/Icons";
import { formatVenue } from "@/lib/research";
import type { Publication, PublicationLinks } from "@/types";

// Code links are on GitHub and weights on Hugging Face (data.test.ts checks this).
const LINKS: [keyof PublicationLinks, string, typeof PaperIcon][] = [
  ["paper", "Paper", PaperIcon],
  ["project", "Project page", GlobeIcon],
  ["code", "Code", GitHubIcon],
  ["weights", "Weights", HuggingFaceIcon],
];
const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export function RepresentativePaper({ pub }: { pub: Publication }) {
  return (
    <article className="grid grid-cols-1 gap-3 py-3 min-[600px]:grid-cols-[176px_1fr] min-[600px]:gap-4">
      <div className="flex h-[110px] items-center justify-center overflow-hidden rounded-md border border-emb-line bg-emb min-[600px]:h-[100px]">
        {pub.emblem && <Emblem id={pub.emblem} />}
      </div>
      <div>
        <h4 className="text-[17px] font-semibold leading-[1.35]">
          <a href={pub.links.paper} {...external} className="underline-offset-2 hover:text-acc hover:underline">
            {pub.title}
          </a>
        </h4>
        <p className="mt-[3px] text-[14.5px] leading-[1.45] text-mute">
          <AuthorList authors={pub.authors} mode="full" />
        </p>
        <p className="mt-1 text-[11.5px] uppercase tracking-[.13em] text-faint">{formatVenue(pub, "representative")}</p>
        {pub.tldr && (
          <p className="mt-1.5 text-[15px] leading-[1.5] text-ink2">{pub.tldr}</p>
        )}
        <div className="mt-[7px] flex flex-wrap gap-2">
          {LINKS.filter(([key]) => pub.links[key]).map(([key, label, Icon]) => (
            <a
              key={key}
              href={pub.links[key]}
              {...external}
              className="inline-flex items-center gap-[5px] rounded-[10px] border border-rule bg-surface px-2 py-1 font-sans text-[11px] font-semibold uppercase leading-none tracking-[.08em] text-ink2 hover:border-acc hover:bg-acc hover:text-on-acc"
            >
              <Icon className="h-3 w-3 flex-none" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
