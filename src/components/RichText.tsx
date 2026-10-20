import { Fragment } from "react";
import { isExternal, parseRichText } from "@/lib/richtext";

/** Renders the bio's **bold** and [text](url) markup. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {parseRichText(text).map((seg, i) => {
        if (seg.kind === "bold") {
          return (
            <b key={i} className="font-semibold">
              {seg.text}
            </b>
          );
        }
        if (seg.kind === "link") {
          const external = isExternal(seg.href);
          return (
            <a
              key={i}
              href={seg.href}
              className="text-acc hover:underline"
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              {seg.text}
            </a>
          );
        }
        return <Fragment key={i}>{seg.text}</Fragment>;
      })}
    </>
  );
}
