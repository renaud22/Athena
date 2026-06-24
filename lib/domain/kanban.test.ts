import { describe, it, expect } from "vitest";

import {
  buildProductionBoard,
  filterProductionItems,
  productionColumn,
  type ProductionItem,
} from "@/lib/domain/kanban";

const item = (over: Partial<ProductionItem>): ProductionItem => ({
  id: "x",
  kind: "post",
  titre: "t",
  statut: "A_REDIGER",
  urgency: "none",
  meta: "",
  ...over,
});

describe("productionColumn (FR35)", () => {
  it("mappe les statuts post sur leur colonne", () => {
    expect(productionColumn("post", "A_REDIGER")).toBe("À rédiger");
    expect(productionColumn("post", "REDIGE")).toBe("Rédigé");
    expect(productionColumn("post", "PROGRAMME")).toBe("Programmé");
  });

  it("mappe les statuts DM (PRET = Prêt)", () => {
    expect(productionColumn("dm", "A_PREPARER")).toBe("À rédiger");
    expect(productionColumn("dm", "PRET")).toBe("Prêt");
  });

  it("écarte les items déjà publiés/envoyés (null)", () => {
    expect(productionColumn("dm", "ENVOYE")).toBeNull();
    expect(productionColumn("post", "PUBLIE")).toBeNull();
  });
});

describe("buildProductionBoard", () => {
  it("range les items dans leurs colonnes et exclut les terminés", () => {
    const board = buildProductionBoard([
      item({ id: "a", kind: "post", statut: "A_REDIGER" }),
      item({ id: "b", kind: "dm", statut: "PRET" }),
      item({ id: "c", kind: "post", statut: "PUBLIE" }), // exclu
    ]);
    expect(board["À rédiger"].map((i) => i.id)).toEqual(["a"]);
    expect(board["Prêt"].map((i) => i.id)).toEqual(["b"]);
    expect(
      Object.values(board)
        .flat()
        .map((i) => i.id),
    ).not.toContain("c");
  });
});

describe("filterProductionItems (chips)", () => {
  const items = [
    item({ id: "p", kind: "post" }),
    item({ id: "d", kind: "dm" }),
  ];
  it("filtre par type, ou tout", () => {
    expect(filterProductionItems(items, "all")).toHaveLength(2);
    expect(filterProductionItems(items, "post").map((i) => i.id)).toEqual([
      "p",
    ]);
    expect(filterProductionItems(items, "dm").map((i) => i.id)).toEqual(["d"]);
  });
});
