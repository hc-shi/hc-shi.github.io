import type { CompactEntry, TimelineEntry } from "@/types";

// Education, teaching and awards match the current resume (spec §3.5). The talks are not on it: the
// owner added them on 2026-11-15, written as "<topic> at <place>" with the place linked.
export const education: TimelineEntry[] = [
  { period: "2021 – Present", heading: "Ph.D. Computer Science", detail: "Université de Montréal / Mila" },
  { period: "2021", heading: "M.S. Computer Science", detail: "Zhejiang University" },
  { period: "2018", heading: "B.S. Software Engineering", detail: "Huazhong University of Science and Technology" },
];

export const teachingAndTalks: CompactEntry[] = [
  {
    label: "Input-Conditioned Search for Efficient Test-Time Scaling of Recursive Reasoners",
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

export const awards: CompactEntry[] = [
  { label: "Tianzhou-Chen Scholarship (top 1%), Zhejiang University", period: "2020" },
  { label: "Outstanding Graduate, Zhejiang University", period: "2020" },
  { label: "CETC Scholarship, China Electronics Technology Group Corporation", period: "2020" },
  { label: "4th place, NIST TAC KBP 2019 Entity Discovery and Linking", period: "2019" },
];
