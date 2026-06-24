// Jeu d'enums CANONIQUE (AD-12) — miroir TS du schéma Prisma de l'addendum (source de
// vérité). Déclarés en tableaux `as const` : servent à la fois de type fermé et de liste
// itérable (machine à états, validation, libellés). Toute exhaustivité s'appuie dessus.

export const MSG_STATUTS = ["A_PREPARER", "PRET", "ENVOYE"] as const;
export type MsgStatut = (typeof MSG_STATUTS)[number];

export const POST_STATUTS = [
  "IDEE",
  "A_REDIGER",
  "REDIGE",
  "PRET",
  "PROGRAMME",
  "PUBLIE",
  "A_REPROGRAMMER",
  "ANNULE",
] as const;
export type PostStatut = (typeof POST_STATUTS)[number];

export const FUNNEL_STATUTS = [
  "A_CONTACTER",
  "EN_ATTENTE_ACCEPTATION",
  "EN_COURS",
  "EN_ECHANGE",
  "QUALIFIE",
  "PERDU",
] as const;
export type FunnelStatut = (typeof FUNNEL_STATUTS)[number];

export const ETAPES = [
  "DEMANDE_CONNEXION",
  "TOUCHE_1",
  "TOUCHE_2",
  "TOUCHE_3_BREAKUP",
] as const;
export type Etape = (typeof ETAPES)[number];

export const PISTES = ["MARDI", "JEUDI"] as const;
export type Piste = (typeof PISTES)[number];

// Libellés d'affichage (français).
export const MSG_STATUT_LABEL: Record<MsgStatut, string> = {
  A_PREPARER: "À préparer",
  PRET: "Prêt",
  ENVOYE: "Envoyé",
};

export const ETAPE_LABEL: Record<Etape, string> = {
  DEMANDE_CONNEXION: "Demande de connexion",
  TOUCHE_1: "Touche 1",
  TOUCHE_2: "Touche 2",
  TOUCHE_3_BREAKUP: "Touche 3 (breakup)",
};
