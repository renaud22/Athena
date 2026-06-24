import { describe, it, expect } from "vitest";

import {
  avancementColumn,
  buildAvancementBoard,
  type ProspectionItem,
} from "@/lib/domain/avancement";

describe("avancementColumn (FR36/FR48)", () => {
  it("mappe les états actifs sur leur colonne", () => {
    expect(avancementColumn("A_CONTACTER", null)).toBe("À contacter");
    expect(avancementColumn("EN_ATTENTE_ACCEPTATION", null)).toBe(
      "Connexion envoyée",
    );
    expect(avancementColumn("EN_COURS", "TOUCHE_2")).toBe("Touche 2");
  });

  it("exclut les états terminaux (Qualifié / En échange / Perdu)", () => {
    expect(avancementColumn("QUALIFIE", null)).toBeNull();
    expect(avancementColumn("EN_ECHANGE", null)).toBeNull();
    expect(avancementColumn("PERDU", null)).toBeNull();
  });
});

describe("buildAvancementBoard", () => {
  it("range les prospections actives et écarte les terminales", () => {
    const items: ProspectionItem[] = [
      {
        id: "a",
        prospect: "A",
        funnelStatut: "A_CONTACTER",
        etape: null,
        urgency: "now",
      },
      {
        id: "b",
        prospect: "B",
        funnelStatut: "EN_COURS",
        etape: "TOUCHE_2",
        urgency: "soon",
      },
      {
        id: "c",
        prospect: "C",
        funnelStatut: "QUALIFIE",
        etape: null,
        urgency: "none",
      },
    ];
    const board = buildAvancementBoard(items);
    expect(board["À contacter"].map((i) => i.id)).toEqual(["a"]);
    expect(board["Touche 2"].map((i) => i.id)).toEqual(["b"]);
    expect(
      Object.values(board)
        .flat()
        .map((i) => i.id),
    ).not.toContain("c");
  });
});
