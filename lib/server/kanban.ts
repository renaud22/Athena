import type { ProductionItem } from "@/lib/domain/kanban";

// Jeu d'exemples (lot DB bloqué). À remplacer par la lecture des posts/DMs en cours.
// L'item ENVOYE est inclus pour vérifier qu'il est bien ÉCARTÉ du board (FR35).
export function getSampleProductionItems(): ProductionItem[] {
  return [
    {
      id: "p1",
      kind: "post",
      titre: "Anti-bullshit IA",
      statut: "A_REDIGER",
      meta: "Anti-bullshit",
      urgency: "soon",
    },
    {
      id: "p2",
      kind: "post",
      titre: "Coulisses semaine 1",
      statut: "REDIGE",
      meta: "Coulisses",
      urgency: "far",
    },
    {
      id: "p3",
      kind: "post",
      titre: "Mini-cas client",
      statut: "PRET",
      meta: "Mini-cas",
      urgency: "now",
    },
    {
      id: "d1",
      kind: "dm",
      titre: "Touche 2 à Karim Benali",
      statut: "A_PREPARER",
      meta: "Touche 2",
      urgency: "now",
    },
    {
      id: "d2",
      kind: "dm",
      titre: "Relance Léa Moreau",
      statut: "PRET",
      meta: "Touche 3",
      urgency: "soon",
    },
    {
      id: "d3",
      kind: "dm",
      titre: "Touche 1 à Tom (envoyée)",
      statut: "ENVOYE",
      meta: "Touche 1",
      urgency: "none",
    },
  ];
}
