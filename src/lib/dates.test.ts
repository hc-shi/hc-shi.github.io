import { describe, expect, it } from "vitest";
import { buildYear, formatBuildDate, formatPostDate } from "@/lib/dates";

describe("formatPostDate", () => {
  it("formats a calendar date without shifting the day", () => {
    expect(formatPostDate("2026-11-02")).toBe("November 2, 2026");
  });
});

describe("formatBuildDate", () => {
  it("uses Montreal time, so a late-evening build keeps the local date", () => {
    expect(formatBuildDate(new Date("2026-10-20T02:30:00Z"))).toBe("October 19, 2026");
  });
});

describe("buildYear", () => {
  it("uses Montreal time around New Year", () => {
    expect(buildYear(new Date("2027-01-01T03:00:00Z"))).toBe("2026");
  });
});
