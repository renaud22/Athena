import type { ProspectionItem } from "@/lib/domain/avancement";

// Jeu d'exemples (lot DB bloqué). À remplacer par la lecture des prospections actives.
// La prospection QUALIFIE est incluse pour vérifier qu'elle est ÉCARTÉE (FR48).
export function getSampleProspectionItems(): ProspectionItem[] {
  return [
    {
      id: "pr1",
      prospect: "Awa Diop",
      funnelStatut: "A_CONTACTER",
      etape: null,
      urgency: "now",
    },
    {
      id: "pr2",
      prospect: "Tom Garnier",
      funnelStatut: "EN_ATTENTE_ACCEPTATION",
      etape: null,
      urgency: "none",
    },
    {
      id: "pr3",
      prospect: "Karim Benali",
      funnelStatut: "EN_COURS",
      etape: "TOUCHE_2",
      urgency: "soon",
    },
    {
      id: "pr4",
      prospect: "Léa Moreau",
      funnelStatut: "EN_COURS",
      etape: "TOUCHE_3_BREAKUP",
      urgency: "far",
    },
    {
      id: "pr5",
      prospect: "Sofia Marchetti",
      funnelStatut: "QUALIFIE",
      etape: null,
      urgency: "none",
    },
  ];
}
