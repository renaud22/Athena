import type { Entreprise, EntrepriseSummary } from "@/lib/domain/client";

// Jeu d'exemples (lot DB bloqué). À remplacer par la lecture des Entreprises (+ contacts,
// projets, documents). Les résumés de liste sont DÉRIVÉS du jeu complet (DRY).
const ENTREPRISES: Entreprise[] = [
  {
    id: "e1",
    nom: "Atelier Dupont",
    ville: "Lyon",
    statutRelation: "CLIENT_ACTIF",
    infosCles: "Menuiserie haut de gamme, 12 personnes.",
    preferences: "Échanges courts ; réactif par email le matin.",
    notes: "Recommandé par Karim. Sensible au délai.",
    contacts: [
      {
        id: "c1",
        nom: "Dupont",
        prenom: "Marc",
        role: "Gérant",
        email: "marc@atelier-dupont.fr",
        telephone: "06 12 34 56 78",
        linkedinUrl: null,
        contactPrincipal: true,
      },
      {
        id: "c2",
        nom: "Roche",
        prenom: "Inès",
        role: "Assistante",
        email: "ines@atelier-dupont.fr",
        telephone: null,
        linkedinUrl: null,
        contactPrincipal: false,
      },
    ],
    projets: [
      {
        id: "pj1",
        nom: "Automatisation des devis",
        type: "AUTOMATISATION",
        statut: "EN_COURS",
        montantEstime: 4500,
        documents: [
          {
            id: "d1",
            type: "DEVIS",
            reference: "DEV-2026-014",
            statut: "PAYE",
            montant: 4500,
            lien: "https://indy.fr/doc/abc",
            date: new Date("2026-05-02"),
          },
          {
            id: "d2",
            type: "FACTURE",
            reference: "FAC-2026-031",
            statut: "ENVOYE",
            montant: 2250,
            lien: "https://indy.fr/doc/def",
            date: new Date("2026-06-01"),
          },
        ],
      },
      {
        id: "pj2",
        nom: "Dashboard de pilotage",
        type: "DASHBOARD",
        statut: "DEVIS_ENVOYE",
        montantEstime: 3200,
        documents: [],
      },
    ],
  },
  {
    id: "e2",
    nom: "Studio Marchetti",
    ville: "Marseille",
    statutRelation: "PROSPECT",
    infosCles: "Studio de design, 4 personnes.",
    preferences: null,
    notes: null,
    contacts: [
      {
        id: "c3",
        nom: "Marchetti",
        prenom: "Sofia",
        role: "Fondatrice",
        email: "sofia@studio-m.fr",
        telephone: null,
        linkedinUrl: "https://www.linkedin.com/in/sofia-marchetti",
        contactPrincipal: true,
      },
    ],
    projets: [],
  },
  {
    id: "e3",
    nom: "Garnier & Co",
    ville: "Paris",
    statutRelation: "CLIENT_INACTIF",
    infosCles: null,
    preferences: null,
    notes: "Projet en pause depuis mars.",
    contacts: [
      {
        id: "c4",
        nom: "Garnier",
        prenom: "Tom",
        role: "DAF",
        email: null,
        telephone: "06 98 76 54 32",
        linkedinUrl: null,
        contactPrincipal: true,
      },
    ],
    projets: [
      {
        id: "pj3",
        nom: "App mobile interne",
        type: "APP",
        statut: "LIVRE",
        montantEstime: 12000,
        documents: [
          {
            id: "d3",
            type: "FACTURE",
            reference: "FAC-2026-008",
            statut: "PAYE",
            montant: 12000,
            lien: "https://indy.fr/doc/ghi",
            date: new Date("2026-03-15"),
          },
        ],
      },
    ],
  },
];

export function getSampleEntreprises(): EntrepriseSummary[] {
  return ENTREPRISES.map((e) => ({
    id: e.id,
    nom: e.nom,
    ville: e.ville,
    statutRelation: e.statutRelation,
    nbContacts: e.contacts.length,
    nbProjets: e.projets.length,
  }));
}

export function getSampleEntreprise(id: string): Entreprise | null {
  return ENTREPRISES.find((e) => e.id === id) ?? null;
}
