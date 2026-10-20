import type { TimelineEntry } from "@/types";

/** "Year | content" rows; below 600px the year sits above the content. */
export function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ul className="my-4 min-[600px]:pl-10">
      {entries.map((entry) => (
        <li
          key={`${entry.period}-${entry.heading}`}
          className="grid grid-cols-1 py-1.5 text-[15px] leading-[1.45] min-[600px]:grid-cols-[120px_1fr] min-[600px]:gap-3.5"
        >
          <span className="pt-px text-[13.5px] text-faint">{entry.period}</span>
          <span>
            <b className="font-semibold">{entry.heading}</b>
            <span className="block text-mute">{entry.detail}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
