import { describe, it, expect } from "vitest";

import { postCharStats } from "@/lib/domain/post-text";

describe("postCharStats (FR43 — compteur indicatif)", () => {
  it("compte les caractères et borne le ratio à 1", () => {
    const s = postCharStats("a".repeat(105));
    expect(s.count).toBe(105);
    expect(s.ratio).toBeCloseTo(0.5);
    expect(s.overThreshold).toBe(false);
  });

  it("signale le dépassement du repère (~210) sans bloquer", () => {
    const s = postCharStats("a".repeat(250));
    expect(s.overThreshold).toBe(true);
    expect(s.ratio).toBe(1); // borné
  });

  it("compte un emoji comme un seul caractère", () => {
    expect(postCharStats("😀").count).toBe(1);
  });
});
