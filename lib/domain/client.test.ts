import { describe, it, expect } from "vitest";

import { formatMontant } from "@/lib/domain/client";

describe("formatMontant", () => {
  it("formate un montant en euros", () => {
    const out = formatMontant(4500);
    expect(out).toMatch(/4.?500/);
    expect(out).toContain("€");
  });

  it("affiche « — » quand le montant est absent", () => {
    expect(formatMontant(null)).toBe("—");
  });
});
