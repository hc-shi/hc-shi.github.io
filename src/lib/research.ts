import { publications, topics } from "@/data/research";
import { displayAuthors, type Marker, markersIn } from "@/lib/authors";
import type { Publication, Topic } from "@/types";

export interface TopicView {
  topic: Topic;
  representatives: Publication[];
  folded: Publication[];
}

/** Representatives keep data order; folded papers go newest first, ties in data order (stable sort). */
export function buildTopicView(topic: Topic, pubs: Publication[]): TopicView {
  const inTopic = pubs.filter((p) => p.topic === topic.id);
  return {
    topic,
    representatives: inTopic.filter((p) => p.representative),
    folded: inTopic.filter((p) => !p.representative).sort((a, b) => b.year - a.year),
  };
}

export function getTopicViews(): TopicView[] {
  return topics.map((t) => buildTopicView(t, publications));
}

export function formatVenue(pub: Publication, mode: "representative" | "folded"): string {
  if (mode === "representative") return `${pub.venue} · ${pub.year}`;
  const base = `${pub.venue} ${pub.year}`;
  return pub.venueNote ? `${base} · ${pub.venueNote}` : base;
}

/** Folded titles end with a period unless they already end with punctuation. */
export function titleWithPeriod(title: string): string {
  return /[.?!]$/.test(title) ? title : `${title}.`;
}

const MARKER_LABELS: Record<Marker, string> = {
  "*": "* Equal contribution",
  "†": "† Corresponding author",
};

/** Legend for the markers that are actually displayed (spec §3.4). */
export function legendText(views: TopicView[]): string {
  const found = new Set<Marker>();
  for (const view of views) {
    for (const p of view.representatives) markersIn(displayAuthors(p.authors, "full")).forEach((m) => found.add(m));
    for (const p of view.folded) markersIn(displayAuthors(p.authors, "short")).forEach((m) => found.add(m));
  }
  return (["*", "†"] as const)
    .filter((m) => found.has(m))
    .map((m) => MARKER_LABELS[m])
    .join(" · ");
}
