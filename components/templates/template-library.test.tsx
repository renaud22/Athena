import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import type { MessageTemplate } from "@/lib/domain/template";
import { TemplateLibrary } from "@/components/templates/template-library";

const templates: MessageTemplate[] = [
  {
    id: "a",
    categorie: "premier-contact",
    titre: "Accroche",
    texte: "Bonjour [prénom]",
  },
  {
    id: "b",
    categorie: "post",
    titre: "Mini-cas",
    texte: "Un client, une solution",
  },
];

describe("TemplateLibrary (Story 5.4)", () => {
  it("affiche les modèles avec un bouton copier", () => {
    render(<TemplateLibrary templates={templates} />);
    expect(screen.getByText("Accroche")).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /Copier le modèle/ }).length,
    ).toBe(2);
  });

  it("filtre par onglet « Post LinkedIn »", async () => {
    const user = userEvent.setup();
    render(<TemplateLibrary templates={templates} />);
    await user.click(screen.getByRole("button", { name: "Post LinkedIn" }));
    expect(screen.getByText("Mini-cas")).toBeInTheDocument();
    expect(screen.queryByText("Accroche")).not.toBeInTheDocument();
  });

  it("affiche un état vide « Aucun modèle » avec une action de création", () => {
    render(<TemplateLibrary templates={[]} />);
    expect(screen.getByText("Aucun modèle")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Créer un modèle" }),
    ).toBeInTheDocument();
  });
});
