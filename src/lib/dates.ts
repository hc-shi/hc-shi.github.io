const LONG_DATE: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" };

/** Post dates are calendar dates (YYYY-MM-DD); format them in UTC so the day never shifts. */
export function formatPostDate(isoDate: string): string {
  return new Intl.DateTimeFormat("en-US", { ...LONG_DATE, timeZone: "UTC" }).format(
    new Date(`${isoDate}T00:00:00Z`),
  );
}

/** "Last updated" date in the footer, in Montreal time (spec §2). */
export function formatBuildDate(now: Date): string {
  return new Intl.DateTimeFormat("en-US", { ...LONG_DATE, timeZone: "America/Toronto" }).format(now);
}

export function buildYear(now: Date): string {
  return new Intl.DateTimeFormat("en-US", { year: "numeric", timeZone: "America/Toronto" }).format(now);
}
