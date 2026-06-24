import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Card, CardTitle } from "@/components/ui/card";

describe("Card", () => {
  it("utilise la variante verre par défaut", () => {
    render(<Card data-testid="c">contenu</Card>);
    expect(screen.getByTestId("c")).toHaveClass("bg-glass");
  });

  it("rend la variante solid (lecture/écriture, kanban)", () => {
    render(
      <Card variant="solid" data-testid="c">
        contenu
      </Card>,
    );
    const card = screen.getByTestId("c");
    expect(card).toHaveClass("rounded-lg");
    expect(card).not.toHaveClass("bg-glass");
  });

  it("rend un titre en police display", () => {
    render(<CardTitle>Titre</CardTitle>);
    expect(screen.getByRole("heading", { name: "Titre" })).toHaveClass(
      "font-display",
    );
  });
});
