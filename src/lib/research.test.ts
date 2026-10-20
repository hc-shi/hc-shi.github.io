import { describe, expect, it } from "vitest";
import { publications, topics } from "@/data/research";
import { buildTopicView, formatVenue, getTopicViews, legendText, titleWithPeriod } from "@/lib/research";
import type { Publication } from "@/types";

const pub = (id: string): Publication => publications.find((p) => p.id === id)!;

describe("getTopicViews", () => {
  it("keeps topic order and folds 0/4/6/3 papers", () => {
    const views = getTopicViews();
    expect(views.map((v) => v.topic.id)).toEqual(topics.map((t) => t.id));
    expect(views.map((v) => v.folded.length)).toEqual([0, 4, 6, 3]);
  });

  it("orders folded papers newest first, ties in data order", () => {
    const [, agents, multimodal] = getTopicViews();
    expect(agents.folded.map((p) => p.id)).toEqual(["foundation-agents", "tradexpert", "opex", "digital-detectives"]);
    expect(multimodal.folded.map((p) => p.id)).toEqual(["radar", "magic", "temporal-emotion", "boss", "ahgr", "gvd"]);
  });

  it("keeps representatives in data order", () => {
    expect(getTopicViews()[1].representatives.map((p) => p.id)).toEqual(["psn", "dive"]);
  });

  it("does not reorder the source data", () => {
    const before = publications.map((p) => p.id);
    buildTopicView(topics[2], publications);
    expect(publications.map((p) => p.id)).toEqual(before);
  });
});

describe("formatVenue", () => {
  it("formats representatives as VENUE · YEAR", () => {
    expect(formatVenue(pub("psn"), "representative")).toBe("COLM · 2026");
  });

  it("formats folded papers as VENUE YEAR plus the optional note", () => {
    expect(formatVenue(pub("tradexpert"), "folded")).toBe("ICLR Workshop 2025");
    expect(formatVenue(pub("opex"), "folded")).toBe("ACL 2024 · AAMAS 2024 extended abstract");
  });
});

describe("titleWithPeriod", () => {
  it("adds a period only when the title has no closing punctuation", () => {
    expect(titleWithPeriod("BOSS: Robust Retrieval")).toBe("BOSS: Robust Retrieval.");
    expect(titleWithPeriod("Do Agents Dream?")).toBe("Do Agents Dream?");
    expect(titleWithPeriod("Already done.")).toBe("Already done.");
  });
});

describe("legendText", () => {
  it("lists both markers for the real data", () => {
    expect(legendText(getTopicViews())).toBe("* Equal contribution · † Corresponding author");
  });

  it("is empty when no displayed author carries a marker", () => {
    const plain = buildTopicView(topics[3], [{ ...pub("vat"), representative: true, emblem: "ssal", tldr: "x" }]);
    expect(legendText([plain])).toBe("");
  });
});
