import type { MDXComponents } from "mdx/types";
import { isExternal } from "@/lib/richtext";

/** Element overrides for post bodies; typography lives in the .prose rules in globals.css. */
export const mdxComponents: MDXComponents = {
  a: ({ href = "", ...props }) =>
    isExternal(href) ? (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ) : (
      <a href={href} {...props} />
    ),
};
