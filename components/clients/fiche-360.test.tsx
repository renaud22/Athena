import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import type { Entreprise } from "@/lib/domain/client";
import { Fiche360 } from "@/components/clients/fiche-360";

const entreprise: Entreprise = {
  id: "e1",
  nom: "Atelier Dupont",
  ville: "Lyon",
  statutRelation: "CLIENT_ACTIF",
  infosCles: "Menuiserie haut de gamme",
  preferences: null,
  notes: null,
  contacts: [
    {
      id: "c1",
      nom: "Dupont",
      prenom: "Marc",
      role: "Gérant",
      email: "marc@x.fr",
      telephone: null,
      linkedinUrl: null,
      contactPrincipal: true,
    },
  ],
  projets: [
    {
      id: "pj1",
      nom: "Automatisation devis",
      type: "AUTOMATISATION",
      statut: "EN_COURS",
      montantEstime: 4500,
      documents: [
        {
          id: "d1",
          type: "FACTURE",
          reference: "FAC-1",
          statut: "PAYE",
          montant: 2250,
          lien: "https://indy.fr/doc/x",
          date: null,
        },
      ],
    },
  ],
};

describe("Fiche360 (FR41)", () => {
  it("affiche le nom + statut et l'onglet Infos par défaut", () => {
    render(<Fiche360 entreprise={entreprise} />);
    expect(
      screen.getByRole("heading", { name: "Atelier Dupont" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Menuiserie haut de gamme")).toBeInTheDocument();
  });

  it("bascule sur l'onglet Contacts (contact principal mis en avant)", async () => {
    const user = userEvent.setup();
    render(<Fiche360 entreprise={entreprise} />);
    await user.click(screen.getByRole("tab", { name: "Contacts" }));
    expect(screen.getByText("Marc Dupont")).toBeInTheDocument();
    expect(screen.getByText("Principal")).toBeInTheDocument();
  });

  it("affiche les documents en lien externe Indy (affichage seul)", async () => {
    const user = userEvent.setup();
    render(<Fiche360 entreprise={entreprise} />);
    await user.click(screen.getByRole("tab", { name: "Documents" }));
    const link = screen.getByRole("link", { name: /Indy/ });
    expect(link).toHaveAttribute("href", "https://indy.fr/doc/x");
    expect(link).toHaveAttribute("target", "_blank");
  });
});
