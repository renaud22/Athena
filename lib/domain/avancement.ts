import type { Etape, FunnelStatut } from "@/lib/domain/enums";
import type { UrgencyLevel } from "@/lib/domain/urgency";

// Un canal de prospection vu par le Kanban Avancement (FR36) — pas une fiche riche.
export interface ProspectionItem {
  id: string;
  prospect: string;
  funnelStatut: FunnelStatut;
  etape: Etape | null;
  urgency: UrgencyLevel;
}

// Colonnes = étapes de séquence actives.
export const AVANCEMENT_COLUMNS = [
  "À contacter",
  "Connexion envoyée",
  "Touche 1",
  "Touche 2",
  "Touche 3",
] as const;
export type AvancementColumn = (typeof AVANCEMENT_COLUMNS)[number];

/**
 * Colonne d'avancement d'une prospection, ou `null` si elle ne doit PAS apparaître : les
 * états terminaux (Qualifié / En échange / Perdu) sortent des colonnes actives (FR48).
 */
export function avancementColumn(
  funnelStatut: FunnelStatut,
  etape: Etape | null,
): AvancementColumn | null {
  switch (funnelStatut) {
    case "A_CONTACTER":
      return "À contacter";
    case "EN_ATTENTE_ACCEPTATION":
      return "Connexion envoyée";
    case "EN_COURS":
      switch (etape) {
        case "TOUCHE_2":
          return "Touche 2";
        case "TOUCHE_3_BREAKUP":
          return "Touche 3";
        case "TOUCHE_1":
        case "DEMANDE_CONNEXION":
        case null:
          return "Touche 1";
        default:
          return "Touche 1";
      }
    case "EN_ECHANGE":
    case "QUALIFIE":
    case "PERDU":
      return null; // terminaux : exclus des colonnes actives
    default:
      return null;
  }
}

export function buildAvancementBoard(
  items: ProspectionItem[],
): Record<AvancementColumn, ProspectionItem[]> {
  const board = Object.fromEntries(
    AVANCEMENT_COLUMNS.map((c) => [c, [] as ProspectionItem[]]),
  ) as Record<AvancementColumn, ProspectionItem[]>;
  for (const item of items) {
    const col = avancementColumn(item.funnelStatut, item.etape);
    if (col) board[col].push(item);
  }
  return board;
}
