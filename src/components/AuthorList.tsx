import { Fragment } from "react";
import { type AuthorMode, displayAuthors, separatorBefore, tokenText } from "@/lib/authors";

interface AuthorListProps {
  authors: string[];
  mode: AuthorMode;
  /** Folded lists end with a period ("et al." already has one). */
  endWithPeriod?: boolean;
}

export function AuthorList({ authors, mode, endWithPeriod = false }: AuthorListProps) {
  const tokens = displayAuthors(authors, mode);
  const last = tokens[tokens.length - 1];
  return (
    <>
      {tokens.map((t, i) => (
        <Fragment key={i}>
          {separatorBefore(t, i)}
          {t.kind === "author" && t.self ? (
            <>
              <b className="font-semibold text-ink">{t.name}</b>
              {t.marker}
            </>
          ) : (
            tokenText(t)
          )}
        </Fragment>
      ))}
      {endWithPeriod && last?.kind !== "etal" ? "." : null}
    </>
  );
}
