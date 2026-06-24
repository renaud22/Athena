import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import type { EntrepriseSummary } from "@/lib/domain/client";
import { EntrepriseList } from "@/components/clients/entreprise-list";

const items: EntrepriseSummary[] = [
  {
    id: "e1",
    nom: "Atelier Dupont",
    ville: "Lyon",
    statutRelation: "CLIENT_ACTIF",
    nbContacts: 2,
    nbProjets: 1,
  },
  {
    id: "e2",
    nom: "Studio Marchetti",
    ville: "Marseille",
    statutRelation: "PROSPECT",
    nbContacts: 1,
    nbProjets: 0,
  },
];

describe("EntrepriseList (FR41)", () => {
  it("affiche les entreprises avec leur statut", () => {
    render(<EntrepriseList entreprises={items} />);
    expect(screen.getByText("Atelier Dupont")).toBeInTheDocument();
    expect(screen.getByText("Client actif")).toBeInTheDocument();
  });

  it("filtre par recherche sur le nom", async () => {
    const user = userEvent.setup();
    render(<EntrepriseList entreprises={items} />);
    await user.type(
      screen.getByLabelText("Rechercher une entreprise"),
      "studio",
    );
    expect(screen.getByText("Studio Marchetti")).toBeInTheDocument();
    expect(screen.queryByText("Atelier Dupont")).not.toBeInTheDocument();
  });
});
