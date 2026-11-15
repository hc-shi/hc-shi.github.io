import type { CompactEntry } from "@/types";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export function CompactList({ entries }: { entries: CompactEntry[] }) {
  return (
    <ul className="my-4 min-[600px]:pl-10">
      {entries.map((entry) => (
        <li key={entry.label} className="flex justify-between gap-3 py-[3px] text-[16px] leading-[1.5]">
          <span>
            {entry.label}
            {entry.place && (
              <>
                {" at "}
                <a href={entry.place.href} {...external} className="text-acc hover:underline">
                  {entry.place.name}
                </a>
              </>
            )}
          </span>
          <span className="whitespace-nowrap text-[13px] text-faint">{entry.period}</span>
        </li>
      ))}
    </ul>
  );
}
