import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { UrgencyPill, type UrgencyLevel } from "@/components/ui/urgency-pill";

describe("UrgencyPill", () => {
  it("affiche un libellé par défaut selon le palier", () => {
    render(<UrgencyPill level="now" />);
    expect(screen.getByText("Aujourd'hui")).toBeInTheDocument();
  });

  it("la pastille porte la couleur BRUTE, le texte la variante éclaircie", () => {
    render(<UrgencyPill level="now">En retard</UrgencyPill>);
    const pill = screen.getByText("En retard");
    expect(pill).toHaveClass("text-u-now-text"); // texte éclairci (AA)
    const dot = pill.querySelector("span[aria-hidden='true']");
    expect(dot).toHaveClass("bg-u-now"); // pastille couleur brute
  });

  it.each<[UrgencyLevel, string]>([
    ["none", "bg-u-none"],
    ["far", "bg-u-far"],
    ["soon", "bg-u-soon"],
    ["now", "bg-u-now"],
  ])("mappe le palier %s sur sa couleur de pastille", (level, dotClass) => {
    render(
      <UrgencyPill level={level}>
        <span data-testid="label">x</span>
      </UrgencyPill>,
    );
    const dot = screen
      .getByTestId("label")
      .parentElement?.querySelector("span[aria-hidden='true']");
    expect(dot).toHaveClass(dotClass);
  });
});
