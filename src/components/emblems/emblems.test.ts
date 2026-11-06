import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { flow, nudge, pulse } from "@/components/emblems/motion";

const DIR = path.join(process.cwd(), "src/components/emblems");
const FILES = ["ConsensusEmblem.tsx", "DiveEmblem.tsx", "IcsEmblem.tsx", "PsnEmblem.tsx", "SsalEmblem.tsx"];
const read = (file: string) => fs.readFileSync(path.join(DIR, file), "utf8");

describe("emblem components", () => {
  it("exist for all five representative papers", () => {
    const found = fs.readdirSync(DIR).filter((f) => /^[A-Z][a-z]+Emblem\.tsx$/.test(f));
    expect(found.sort()).toEqual(FILES);
  });

  it.each(FILES)("%s uses colour tokens, never hex colours", (file) => {
    expect(read(file)).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });

  it.each(FILES)("%s sets colours in style, not in fill/stroke attributes", (file) => {
    expect(read(file)).not.toMatch(/\s(fill|stroke)="var\(/);
  });

  it.each(FILES)("%s is hidden from screen readers", (file) => {
    expect(read(file)).toContain('aria-hidden="true"');
  });

  it.each(FILES)("%s acts out its paper on hover with the shared motion classes", (file) => {
    expect(read(file)).toMatch(/className=\{(flow|pulse|nudge)\}/);
  });

  it("moves only while the paper is hovered and only when the visitor allows motion", () => {
    for (const motion of [flow, pulse, nudge]) expect(motion).toMatch(/\bmotion-safe:group-hover:animate-emblem-(flow|pulse|nudge)\b/);
  });

  it("prefixes marker ids with the emblem name so they never collide", () => {
    const ids = FILES.flatMap((file) =>
      [...read(file).matchAll(/\sid="([^"]+)"/g)].map((m) => ({ file, id: m[1] })),
    );
    expect(ids.length).toBeGreaterThan(0);
    for (const { file, id } of ids) expect(id.startsWith(file.replace("Emblem.tsx", "").toLowerCase())).toBe(true);
    expect(new Set(ids.map((x) => x.id)).size).toBe(ids.length);
  });
});
