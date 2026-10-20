export const SELF = "Haochen Shi";

export type Marker = "*" | "†";
export type AuthorMode = "full" | "short";
export type AuthorToken =
  | { kind: "author"; name: string; marker: Marker | null; self: boolean }
  | { kind: "ellipsis" }
  | { kind: "etal" }
  | { kind: "count"; total: number };

export function parseAuthor(raw: string): { name: string; marker: Marker | null } {
  const last = raw.slice(-1);
  if (last === "*" || last === "†") return { name: raw.slice(0, -1), marker: last };
  return { name: raw, marker: null };
}

function authorToken(raw: string): AuthorToken {
  const { name, marker } = parseAuthor(raw);
  return { kind: "author", name, marker, self: name === SELF };
}

/**
 * Spec §3.4. Representatives ("full") list everyone. Folded papers ("short") list
 * up to six authors in full; otherwise they stop after Haochen Shi (at least three
 * names) when he is among the first eight, or show the first three, "…", his name
 * and the author count when he comes later. "et al." and the trailing "…" appear
 * only when somebody is actually left out.
 */
export function displayAuthors(authors: string[], mode: AuthorMode): AuthorToken[] {
  if (mode === "full" || authors.length <= 6) return authors.map(authorToken);
  const selfIndex = authors.findIndex((a) => parseAuthor(a).name === SELF);
  if (selfIndex >= 8) {
    const tokens: AuthorToken[] = [
      ...authors.slice(0, 3).map(authorToken),
      { kind: "ellipsis" },
      authorToken(authors[selfIndex]),
    ];
    if (selfIndex < authors.length - 1) tokens.push({ kind: "ellipsis" });
    tokens.push({ kind: "count", total: authors.length });
    return tokens;
  }
  const shown = authors.slice(0, Math.max(3, selfIndex + 1)).map(authorToken);
  return shown.length < authors.length ? [...shown, { kind: "etal" }] : shown;
}

export function tokenText(t: AuthorToken): string {
  switch (t.kind) {
    case "author":
      return t.name + (t.marker ?? "");
    case "ellipsis":
      return "…";
    case "etal":
      return "et al.";
    case "count":
      return `(${t.total} authors)`;
  }
}

/** Text printed before token `index`: nothing first, a space before the count, ", " otherwise. */
export function separatorBefore(t: AuthorToken, index: number): string {
  if (index === 0) return "";
  return t.kind === "count" ? " " : ", ";
}

export function authorsToText(tokens: AuthorToken[]): string {
  return tokens.map((t, i) => separatorBefore(t, i) + tokenText(t)).join("");
}

export function markersIn(tokens: AuthorToken[]): Marker[] {
  const found = new Set<Marker>();
  for (const t of tokens) if (t.kind === "author" && t.marker) found.add(t.marker);
  return (["*", "†"] as const).filter((m) => found.has(m));
}
