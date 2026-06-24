import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// usePathname doit être mocké : pas de routeur App Router dans l'environnement de test.
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

import { AppShell } from "@/components/app-shell";

describe("AppShell", () => {
  it("rend les 2 groupes de navigation, le CTA unique et le contenu", () => {
    render(
      <AppShell>
        <p>contenu de page</p>
      </AppShell>,
    );
    expect(screen.getByText("Prospection")).toBeInTheDocument();
    expect(screen.getByText("Clients")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Personne à prospecter/ }),
    ).toBeInTheDocument();
    expect(screen.getByText("contenu de page")).toBeInTheDocument();
  });

  it("marque l'item dont le href correspond au pathname comme actif", () => {
    render(
      <AppShell>
        <div />
      </AppShell>,
    );
    expect(
      screen.getByRole("link", { name: "Tableau de bord" }),
    ).toHaveAttribute("aria-current", "page");
    expect(
      screen.getByRole("link", { name: "Entreprises" }),
    ).not.toHaveAttribute("aria-current");
  });

  it("expose un bouton burger pour ouvrir le menu mobile", () => {
    render(
      <AppShell>
        <div />
      </AppShell>,
    );
    expect(
      screen.getByRole("button", { name: "Ouvrir le menu" }),
    ).toBeInTheDocument();
  });
});
