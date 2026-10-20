export type TopicId = "recursive-reasoning" | "llm-agents" | "multimodal" | "robust-learning";
export type EmblemId = "ics" | "psn" | "dive" | "consensus" | "ssal";
export type NavSection = "research" | "writing";

export interface Topic {
  id: TopicId;
  name: string;
  blurb: string;
  /** Shows the "Recent focus" label. */
  focus?: boolean;
}

export interface PublicationLinks {
  paper: string;
  project?: string;
  code?: string;
  weights?: string;
}

export interface Publication {
  id: string;
  title: string;
  /** Full author list in paper order; "*" marks equal contribution, "†" a corresponding author. */
  authors: string[];
  /** Venue without the year, e.g. "COLM", "Findings of EMNLP", "Preprint". */
  venue: string;
  year: number;
  /** Extra venue text, e.g. "AAMAS 2024 extended abstract". */
  venueNote?: string;
  topic: TopicId;
  representative: boolean;
  /** Required for representatives. */
  tldr?: string;
  /** Required for folded papers. */
  summary?: string;
  links: PublicationLinks;
  /** Required for representatives. */
  emblem?: EmblemId;
}

export interface Profile {
  name: string;
  nameZh: string;
  title: string;
  email: string;
  links: { scholar: string; github: string; cv: string };
  /** No trailing slash. */
  siteUrl: string;
  description: string;
  /** Paragraphs using **bold** and [text](url). */
  bio: string[];
  /** Job-search line, same markup as the bio. */
  openTo: string;
}

export interface TimelineEntry {
  period: string;
  heading: string;
  detail: string;
}

export interface CompactEntry {
  label: string;
  period: string;
}

export interface Post {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  description: string;
  tags: string[];
  published: boolean;
  topics: TopicId[];
  content: string;
}
