import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { profile } from "@/data/profile";

const header = fs.readFileSync(path.join(process.cwd(), "src/components/ProfileHeader.tsx"), "utf8");

describe("profile header", () => {
  it.each(Object.keys(profile.links))("shows the %s link from profile.ts", (key) => {
    expect(header).toContain(`profile.links.${key}`);
  });
});
