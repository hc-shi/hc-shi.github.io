import type { Profile } from "@/types";

export const profile: Profile = {
  name: "Haochen Shi",
  nameZh: "史皓琛",
  title: "Ph.D. Candidate · Université de Montréal & Mila, Montréal",
  email: "haochen.shi@umontreal.ca",
  links: {
    scholar: "https://scholar.google.com/citations?user=PqODQVwAAAAJ",
    github: "https://github.com/hcshi316",
    cv: "/cv.pdf",
  },
  siteUrl: "https://hc-shi.github.io",
  description:
    "Ph.D. candidate at Université de Montréal and Mila studying how machines reason: language agents that act in interactive worlds, and small recursive models that think in latent space.",
  bio: [
    "I study how machines **reason**: language agents that act in interactive worlds, and small **recursive** models that think in latent space.",
    "My recent work with my advisor [Bang Liu](https://www-labs.iro.umontreal.ca/~liubang/) asks how a tiny reasoner that repeats one learned update can **spend test-time compute wisely**, and why it gets stuck. Before that, I built LLM-centric agents for embodied and open-ended environments, in collaboration with Microsoft Research.",
  ],
  openTo:
    "I'm open to research roles in both industry and academia, as well as collaborations. Feel free to [reach out](mailto:haochen.shi@umontreal.ca).",
};
