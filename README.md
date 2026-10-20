# hc-shi.github.io

Source for [hc-shi.github.io](https://hc-shi.github.io), the personal website of Haochen Shi.

It is a statically exported Next.js site. `.github/workflows/deploy.yml` builds it and deploys it to GitHub Pages on every push to `main`.

## Local development

Requires Node 22.12 or newer.

```bash
npm ci
npm run dev       # http://localhost:3000
npm test          # unit tests
npm run build     # static export into out/
npm run preview   # serve out/ at http://localhost:4173
```
