import { describe, it, expect } from "vitest";

import { registerProspectSchema } from "@/lib/domain/schemas";

describe("registerProspectSchema (FR19 — validation frontière)", () => {
  it("accepte un nom + une URL LinkedIn valides", () => {
    const r = registerProspectSchema.safeParse({
      prospect: "Awa Diop",
      linkedinUrl: "https://www.linkedin.com/in/awa-diop",
    });
    expect(r.success).toBe(true);
  });

  it("rejette un nom vide (ou en espaces)", () => {
    const r = registerProspectSchema.safeParse({
      prospect: "   ",
      linkedinUrl: "https://www.linkedin.com/in/x",
    });
    expect(r.success).toBe(false);
  });

  it("rejette une URL qui n'est pas LinkedIn", () => {
    const r = registerProspectSchema.safeParse({
      prospect: "Awa",
      linkedinUrl: "https://example.com/awa",
    });
    expect(r.success).toBe(false);
  });

  it("rejette un domaine piégé (linkedin.com.evil.com)", () => {
    const r = registerProspectSchema.safeParse({
      prospect: "Awa",
      linkedinUrl: "https://linkedin.com.evil.com/awa",
    });
    expect(r.success).toBe(false);
  });

  it("rejette une chaîne qui n'est pas une URL", () => {
    const r = registerProspectSchema.safeParse({
      prospect: "Awa",
      linkedinUrl: "pas-une-url",
    });
    expect(r.success).toBe(false);
  });
});
