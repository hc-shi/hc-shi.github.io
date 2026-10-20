export type RichSegment =
  | { kind: "text"; text: string }
  | { kind: "bold"; text: string }
  | { kind: "link"; text: string; href: string };

const MARKUP = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

/** The bio's tiny markup: **bold** and [text](url), nothing else (spec §4.4). */
export function parseRichText(input: string): RichSegment[] {
  const segments: RichSegment[] = [];
  let last = 0;
  for (const m of input.matchAll(MARKUP)) {
    const start = m.index ?? 0;
    if (start > last) segments.push({ kind: "text", text: input.slice(last, start) });
    if (m[1] !== undefined) segments.push({ kind: "bold", text: m[1] });
    else segments.push({ kind: "link", text: m[2], href: m[3] });
    last = start + m[0].length;
  }
  if (last < input.length) segments.push({ kind: "text", text: input.slice(last) });
  return segments;
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}
