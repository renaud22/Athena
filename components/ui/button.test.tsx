import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("rend un <button> avec son libellé", () => {
    render(<Button>Envoyer</Button>);
    expect(screen.getByRole("button", { name: "Envoyer" })).toBeInTheDocument();
  });

  it("applique la variante gold (CTA = or)", () => {
    render(<Button variant="gold">CTA</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-primary");
  });

  it("utilise la variante ghost par défaut (l'or n'est pas le défaut)", () => {
    render(<Button>Neutre</Button>);
    expect(screen.getByRole("button")).not.toHaveClass("bg-primary");
  });

  it("rend l'enfant via asChild (ex. un lien stylé en bouton)", () => {
    render(
      <Button asChild>
        <a href="/x">Lien</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Lien" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveClass("inline-flex");
  });
});
