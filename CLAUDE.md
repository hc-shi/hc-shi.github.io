# CLAUDE.md

Guidance for Claude Code in this repository.

## What this is

The personal website of Haochen Shi: a Next.js 16 App Router site, statically exported and deployed to GitHub Pages at https://hc-shi.github.io by `.github/workflows/deploy.yml` on every push to `main`.

## Commands

```bash
npm run dev       # dev server
npm test          # vitest unit tests (src/**/*.test.ts)
npm run lint
npm run build     # static export into out/, then scripts/postbuild.mjs
npm run preview   # serve out/ on port 4173
```

## Where things live

- `src/data/profile.ts`: name, title, bio, links. The bio supports `**bold**` and `[text](url)` only.
- `src/data/research.ts`: topics and publications. `*` marks equal contribution; corresponding authors are not marked.
- `src/data/cv.ts`: Experience, Education, Teaching & Awards.
- `src/content/writing/*.mdx`: posts. The file name is the URL slug.
- `src/lib/`: display logic, each module with unit tests.
- `src/components/emblems/`: one SVG component per representative paper.
- `src/app/globals.css`: colour tokens (light; dark via `prefers-color-scheme`) and post typography.
- `design/`: source for `public/og.png`.

## Workflows

### Update the CV

Compile the resume, copy the PDF to `public/cv.pdf`, commit and push. Only the PDF belongs here, never LaTeX sources.

### Publish a post

1. Add `src/content/writing/<slug>.mdx`. The slug uses lowercase words joined by hyphens.
2. Frontmatter: `title`, `date` (YYYY-MM-DD), `description`, `published` (true or false); optional `tags` and `topics` (topic ids from `src/data/research.ts`).
3. Run `npm test && npm run build`, check the post with `npm run preview`, then push.

This repository is public. Anything in `src/content/writing/` is visible on GitHub even with `published: false`, so keep private drafts outside the repository.

### Add or change a paper

Edit `src/data/research.ts` and check authors and venue against the publisher page or arXiv. Representatives need `tldr` and `emblem`; folded papers need `summary`. Run `npm test`.

## Conventions

- Server components only; the homepage ships no custom client JavaScript.
- Colours come from the tokens in `globals.css`. Emblems never contain hex colours. The Hugging Face logo on the Weights button keeps its brand colours.
- External links open in a new tab with `rel="noopener noreferrer"`.
- English copy does not join clauses with em dashes.
- Before pushing, make sure no private files (other CV versions, drafts, environment files) are tracked.
