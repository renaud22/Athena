import type {
  DocStatut,
  DocType,
  ProjetStatut,
  ProjetType,
  StatutRelation,
} from "@/lib/domain/enums";

// Monde B — gestion client. Hiérarchie : Entreprise -> Contacts + Projets -> Documents.
// Les Documents sont des LIENS externes Indy en affichage seul (aucune génération in-app).

export interface Document {
  id: string;
  type: DocType;
  reference: string | null;
  statut: DocStatut;
  /** Montant en affichage seul (la source de vérité reste Indy). */
  montant: number | null;
  /** Lien externe vers Indy = la source de vérité. */
  lien: string | null;
  date: Date | null;
}

export interface Projet {
  id: string;
  nom: string;
  type: ProjetType | null;
  statut: ProjetStatut;
  montantEstime: number | null;
  documents: Document[];
}

export interface Contact {
  id: string;
  nom: string;
  prenom: string | null;
  role: string | null;
  email: string | null;
  telephone: string | null;
  linkedinUrl: string | null;
  contactPrincipal: boolean;
}

export interface Entreprise {
  id: string;
  nom: string;
  ville: string | null;
  statutRelation: StatutRelation;
  infosCles: string | null;
  preferences: string | null;
  notes: string | null;
  contacts: Contact[];
  projets: Projet[];
}

/** Ligne de la liste d'entreprises (données minimales). */
export interface EntrepriseSummary {
  id: string;
  nom: string;
  ville: string | null;
  statutRelation: StatutRelation;
  nbContacts: number;
  nbProjets: number;
}

/** Formate un montant en euros (fr), ou « — » si absent. */
export function formatMontant(montant: number | null): string {
  if (montant === null) return "—";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(montant);
}
