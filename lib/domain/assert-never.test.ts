import { describe, it, expect } from "vitest";

import { assertNever } from "@/lib/domain/assert-never";

describe("assertNever (AD-12 — garde d'exhaustivité)", () => {
  it("lève avec le contexte et la valeur si atteint à l'exécution", () => {
    // @ts-expect-error — on force un appel hors-type pour valider le garde-fou runtime
    expect(() => assertNever("MARDI", "piste")).toThrow(/piste.*MARDI/);
  });

  it("permet un switch exhaustif sur une union fermée", () => {
    type Palier = "gris" | "vert" | "orange" | "rouge";
    const label = (p: Palier): string => {
      switch (p) {
        case "gris":
          return "sans deadline";
        case "vert":
          return "loin";
        case "orange":
          return "approche";
        case "rouge":
          return "urgent";
        default:
          // Ne compile que si tous les cas sont couverts (p est `never` ici).
          return assertNever(p, "palier");
      }
    };
    expect(label("rouge")).toBe("urgent");
  });
});
