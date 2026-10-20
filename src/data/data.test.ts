import { describe, expect, it } from "vitest";
import { education, teachingAndAwards } from "@/data/cv";
import { profile } from "@/data/profile";
import { publications, topics } from "@/data/research";

const SELF = "Haochen Shi";
const byId = (id: string) => {
  const pub = publications.find((p) => p.id === id);
  if (!pub) throw new Error(`no publication ${id}`);
  return pub;
};
const countPerTopic = (representative: boolean) =>
  topics.map((t) => publications.filter((p) => p.topic === t.id && p.representative === representative).length);

describe("topics", () => {
  it("lists the four topics in display order, with the current focus first", () => {
    expect(topics.map((t) => t.id)).toEqual(["recursive-reasoning", "llm-agents", "multimodal", "robust-learning"]);
    expect(topics.filter((t) => t.current).map((t) => t.id)).toEqual(["recursive-reasoning"]);
  });
});

describe("publications", () => {
  it("has 18 papers with unique ids", () => {
    expect(publications).toHaveLength(18);
    expect(new Set(publications.map((p) => p.id)).size).toBe(18);
  });

  it("has 1/2/1/1 representatives and 0/4/6/3 folded papers per topic", () => {
    expect(countPerTopic(true)).toEqual([1, 2, 1, 1]);
    expect(countPerTopic(false)).toEqual([0, 4, 6, 3]);
  });

  it("gives every representative a TL;DR and an emblem, and every folded paper a summary", () => {
    for (const p of publications) {
      if (p.representative) {
        expect(p.tldr, p.id).toBeTruthy();
        expect(p.emblem, p.id).toBeTruthy();
      } else {
        expect(p.summary, p.id).toBeTruthy();
      }
    }
  });

  it("lists Haochen Shi exactly once in every author list", () => {
    for (const p of publications) {
      expect(p.authors.filter((a) => a.replace(/[*†]$/, "") === SELF), p.id).toHaveLength(1);
    }
  });

  it("uses https links only", () => {
    for (const p of publications) {
      for (const url of Object.values(p.links)) expect(url, p.id).toMatch(/^https:\/\//);
    }
  });

  it("hosts code on GitHub and weights on Hugging Face, which the button icons show", () => {
    for (const p of publications) {
      if (p.links.code) expect(new URL(p.links.code).hostname, p.id).toBe("github.com");
      if (p.links.weights) expect(new URL(p.links.weights).hostname, p.id).toBe("huggingface.co");
    }
  });

  it("keeps the author corrections verified on 2026-10-19", () => {
    expect(byId("ssal").authors.slice(2, 6)).toEqual(["Yangyang Kang", "Kun Kuang", "Siliang Tang", "Zhuoren Jiang"]);
    expect(byId("consensus-graph").authors).toEqual([
      "Wenqiao Zhang*", "Haochen Shi*", "Siliang Tang", "Jun Xiao", "Qiang Yu", "Yueting Zhuang",
    ]);
    expect(byId("gvd").authors.slice(3, 5)).toEqual(["Haizhou Shi", "Haochen Shi"]);
    const survey = byId("foundation-agents").authors;
    expect(survey).toHaveLength(48);
    expect(survey.indexOf(SELF)).toBe(20);
  });
});

describe("copy", () => {
  it("never joins clauses with an em dash", () => {
    const prose = [
      ...profile.bio,
      profile.openTo,
      profile.description,
      ...topics.map((t) => t.blurb),
      ...publications.flatMap((p) => [p.tldr ?? "", p.summary ?? ""]),
    ];
    for (const text of prose) expect(text).not.toContain("—");
  });
});

describe("cv", () => {
  it("matches the resume: 3 education rows, 8 teaching and award rows", () => {
    expect(education).toHaveLength(3);
    expect(teachingAndAwards).toHaveLength(8);
  });
});
