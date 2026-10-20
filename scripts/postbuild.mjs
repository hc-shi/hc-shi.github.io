import { globSync, rmSync } from "node:fs";

// Static export needs at least one param for /writing/[slug]. With no published
// posts, src/lib/posts.ts emits a placeholder page that renders 404; drop it here.
for (const path of globSync("out/**/*_placeholder*")) {
  rmSync(path, { recursive: true, force: true });
}
