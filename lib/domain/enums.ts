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

// ---------- Monde B — Gestion client ----------
export const STATUT_RELATIONS = [
  "PROSPECT",
  "CLIENT_ACTIF",
  "CLIENT_INACTIF",
  "PERDU",
  "REFUSE",
] as const;
export type StatutRelation = (typeof STATUT_RELATIONS)[number];

export const PROJET_TYPES = [
  "AUTOMATISATION",
  "APP",
  "DASHBOARD",
  "AUTRE",
] as const;
export type ProjetType = (typeof PROJET_TYPES)[number];

export const PROJET_STATUTS = [
  "AUDIT",
  "DEVIS_ENVOYE",
  "CONFIRME",
  "EN_COURS",
  "LIVRE",
  "PERDU",
] as const;
export type ProjetStatut = (typeof PROJET_STATUTS)[number];

export const DOC_TYPES = ["DEVIS", "FACTURE", "AVENANT", "AVOIR"] as const;
export type DocType = (typeof DOC_TYPES)[number];

export const DOC_STATUTS = [
  "BROUILLON",
  "ENVOYE",
  "PAYE",
  "EN_RETARD",
  "REFUSE",
] as const;
export type DocStatut = (typeof DOC_STATUTS)[number];

export const STATUT_RELATION_LABEL: Record<StatutRelation, string> = {
  PROSPECT: "Prospect",
  CLIENT_ACTIF: "Client actif",
  CLIENT_INACTIF: "Client inactif",
  PERDU: "Perdu",
  REFUSE: "Refusé",
};

export const PROJET_STATUT_LABEL: Record<ProjetStatut, string> = {
  AUDIT: "Audit",
  DEVIS_ENVOYE: "Devis envoyé",
  CONFIRME: "Confirmé",
  EN_COURS: "En cours",
  LIVRE: "Livré",
  PERDU: "Perdu",
};

export const DOC_TYPE_LABEL: Record<DocType, string> = {
  DEVIS: "Devis",
  FACTURE: "Facture",
  AVENANT: "Avenant",
  AVOIR: "Avoir",
};

export const DOC_STATUT_LABEL: Record<DocStatut, string> = {
  BROUILLON: "Brouillon",
  ENVOYE: "Envoyé",
  PAYE: "Payé",
  EN_RETARD: "En retard",
  REFUSE: "Refusé",
};
