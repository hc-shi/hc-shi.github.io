import type { CompactEntry, TimelineEntry } from "@/types";

// Education and teaching match the current resume (spec §3.5). The talks are not on it: the owner
// added them on 2026-11-15, written as "<topic> at <place>" with the place linked, and titled by the
// question the talk asks rather than the paper title. Awards were dropped from the site the same day.
export const education: TimelineEntry[] = [
  { period: "2021 – Present", heading: "Ph.D. Computer Science", detail: "Université de Montréal / Mila" },
  { period: "2021", heading: "M.S. Computer Science", detail: "Zhejiang University" },
  { period: "2018", heading: "B.S. Software Engineering", detail: "Huazhong University of Science and Technology" },
];

export const teachingAndTalks: CompactEntry[] = [
  {
    label: "“Can recursive models think differently, not just long?”",
    place: { name: "NICE", href: "https://nice-intl.github.io/" },
    period: "Nov 2026",
  },
  {
    label: "Evolving Programmatic Skill Networks",
    place: { name: "TEA Lab, UBC", href: "https://ubc-tea.github.io/lab-web/" },
    period: "Jan 2026",
  },
  { label: "TA, Advanced Projects in Machine Learning (IFT6759)", period: "Winter 2024" },
  { label: "TA, NLP with Deep Learning (IFT6289)", period: "Winter 2023" },
  { label: "Technical Assistant, IVADO NLP Workshop: Knowledge Graphs", period: "Winter 2021" },
  { label: "TA, NLP and AI courses, Zhejiang University", period: "2019 – 2021" },
];
