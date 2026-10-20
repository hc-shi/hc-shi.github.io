import { describe, expect, it } from "vitest";
import { publications } from "@/data/research";
import { authorsToText, displayAuthors, markersIn, parseAuthor } from "@/lib/authors";

const authorsOf = (id: string) => publications.find((p) => p.id === id)!.authors;
const short = (id: string) => authorsToText(displayAuthors(authorsOf(id), "short"));

describe("parseAuthor", () => {
  it("splits equal-contribution and corresponding marks off the name", () => {
    expect(parseAuthor("Haochen Shi*")).toEqual({ name: "Haochen Shi", marker: "*" });
    expect(parseAuthor("Bang Liu†")).toEqual({ name: "Bang Liu", marker: "†" });
    expect(parseAuthor("Qiang Yu")).toEqual({ name: "Qiang Yu", marker: null });
  });
});

describe("displayAuthors", () => {
  it("shows everyone on representative papers", () => {
    expect(displayAuthors(authorsOf("ssal"), "full")).toHaveLength(9);
  });

  it("shows lists of up to six authors in full", () => {
    expect(short("aria")).toBe("Yilin Lu, Juncheng Li, Xiaoqiang Wang, Haochen Shi, Tao Chen, Siliang Tang");
  });

  it("cuts after Haochen Shi, keeping at least three names", () => {
    expect(short("magic")).toBe("Wenqiao Zhang*, Haochen Shi*, Jiannan Guo*, et al.");
    expect(short("coat")).toBe("Tao Chen*, Haochen Shi*, Liyuan Liu, et al.");
    expect(short("radar")).toBe(
      "Bingchen Miao, Wenqiao Zhang, Juncheng Li, Wangyu Wu, Siliang Tang, Zhaocheng Li, Haochen Shi, et al.",
    );
  });

  it("elides long lists where Haochen Shi comes after the eighth author", () => {
    expect(short("foundation-agents")).toBe("Bang Liu, Xinfeng Li, Jiayi Zhang, …, Haochen Shi, … (48 authors)");
  });

  it("recognises Haochen Shi even with an equal-contribution mark", () => {
    const tokens = displayAuthors(["Wenqiao Zhang*", "Haochen Shi*"], "short");
    expect(tokens[1]).toEqual({ kind: "author", name: "Haochen Shi", marker: "*", self: true });
  });

  it("falls back to the first three names when Haochen Shi is absent", () => {
    expect(authorsToText(displayAuthors(["A", "B", "C", "D", "E", "F", "G"], "short"))).toBe("A, B, C, et al.");
  });
});

describe("markersIn", () => {
  it("reports the markers present, in legend order", () => {
    expect(markersIn(displayAuthors(authorsOf("ics"), "full"))).toEqual(["†"]);
    expect(markersIn(displayAuthors(["X†", "Y*"], "full"))).toEqual(["*", "†"]);
  });
});
