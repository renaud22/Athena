import type { TaskKind } from "@/lib/domain/dashboard";
import type { UrgencyLevel } from "@/lib/domain/urgency";

// Item du Kanban Production : un post ou un DM en cours de rédaction.
export interface ProductionItem {
  id: string;
  kind: TaskKind;
  titre: string;
  /** Statut brut (MsgStatut pour un DM, PostStatut pour un post). */
  statut: string;
  urgency: UrgencyLevel;
  /** Libellé contextuel : format (post) ou étape (DM). */
  meta: string;
}

// Colonnes du Kanban Production, par état de rédaction (FR35).
export const PRODUCTION_COLUMNS = [
  "À rédiger",
  "Rédigé",
  "Prêt",
  "Programmé",
] as const;
export type ProductionColumn = (typeof PRODUCTION_COLUMNS)[number];

/**
 * Colonne de production d'un item, ou `null` si l'item ne doit PAS apparaître (déjà
 * publié/envoyé/annulé) — le Kanban n'affiche que les items en cours (FR35).
 */
export function productionColumn(
  kind: TaskKind,
  statut: string,
): ProductionColumn | null {
  if (kind === "dm") {
    if (statut === "A_PREPARER") return "À rédiger";
    if (statut === "PRET") return "Prêt";
    return null; // ENVOYE : exclu
  }
  switch (statut) {
    case "IDEE":
    case "A_REDIGER":
      return "À rédiger";
    case "REDIGE":
      return "Rédigé";
    case "PRET":
      return "Prêt";
    case "PROGRAMME":
      return "Programmé";
    default:
      return null; // PUBLIE / ANNULE / A_REPROGRAMMER : exclus
  }
}

/** Regroupe les items par colonne de production (les items terminés sont écartés). Pure. */
export function buildProductionBoard(
  items: ProductionItem[],
): Record<ProductionColumn, ProductionItem[]> {
  const board = Object.fromEntries(
    PRODUCTION_COLUMNS.map((c) => [c, [] as ProductionItem[]]),
  ) as Record<ProductionColumn, ProductionItem[]>;
  for (const item of items) {
    const col = productionColumn(item.kind, item.statut);
    if (col) board[col].push(item);
  }
  return board;
}

export type ProductionFilter = "all" | "post" | "dm";

/** Filtre les items par type (chips Tout / Posts / Messages, FR35). Pure. */
export function filterProductionItems(
  items: ProductionItem[],
  filter: ProductionFilter,
): ProductionItem[] {
  if (filter === "all") return items;
  return items.filter((i) => i.kind === filter);
}
