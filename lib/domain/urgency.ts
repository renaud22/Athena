// Palier d'urgence canonique (AD-12/AD-15) — type partagé entre le calcul serveur
// (`lib/server/urgency.ts`) et l'affichage (`components/ui/urgency-pill.tsx`).
// L'urgence est TOUJOURS dérivée, jamais stockée (AD-5).
export type UrgencyLevel = "none" | "far" | "soon" | "now";
