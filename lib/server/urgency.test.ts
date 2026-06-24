import { describe, it, expect } from "vitest";

import { computeUrgency } from "@/lib/server/urgency";

describe("computeUrgency (AD-15 — urgence dérivée, deadline = la veille, Europe/Paris)", () => {
  // Référence non ambiguë : midi UTC => même jour civil à Paris.
  const now = new Date("2026-03-10T12:00:00Z"); // mardi 10 mars (Paris)

  it("renvoie 'none' sans date programmée", () => {
    expect(computeUrgency(null, now)).toBe("none");
    expect(computeUrgency(undefined, now)).toBe("none");
  });

  it("'far' quand la prep est dans 2+ jours (envoi à J+3)", () => {
    expect(computeUrgency(new Date("2026-03-13T12:00:00Z"), now)).toBe("far");
  });

  it("'soon' la veille de la prep — prep demain (envoi à J+2)", () => {
    expect(computeUrgency(new Date("2026-03-12T12:00:00Z"), now)).toBe("soon");
  });

  it("'now' quand la prep tombe aujourd'hui (envoi demain = la veille déclenche)", () => {
    expect(computeUrgency(new Date("2026-03-11T12:00:00Z"), now)).toBe("now");
  });

  it("'now' le jour même de l'envoi", () => {
    expect(computeUrgency(new Date("2026-03-10T12:00:00Z"), now)).toBe("now");
  });

  it("'now' quand l'envoi est déjà en retard", () => {
    expect(computeUrgency(new Date("2026-03-08T12:00:00Z"), now)).toBe("now");
  });

  it("calcule la frontière de jour en Europe/Paris et non en UTC", () => {
    // 15 jan 23:30 UTC => 16 jan 00:30 à Paris (UTC+1) : jour Paris = 16.
    const nowLateUtc = new Date("2026-01-15T23:30:00Z");
    // Envoi le 18 => prep le 17 ; à Paris daysToPrep = 17 - 16 = 1 => 'soon'.
    // En UTC naïf (jour = 15) on obtiendrait 'far' : la divergence prouve le fuseau.
    expect(computeUrgency(new Date("2026-01-18T12:00:00Z"), nowLateUtc)).toBe(
      "soon",
    );
  });
});
