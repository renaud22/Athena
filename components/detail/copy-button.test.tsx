import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { CopyButton } from "@/components/detail/copy-button";

describe("CopyButton (FR12)", () => {
  it("copie le texte dans le presse-papiers et bascule le label en « Copié ✓ »", async () => {
    // fireEvent (et non userEvent) : userEvent.setup() remplacerait navigator.clipboard
    // par son propre stub, masquant notre espion.
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });

    render(<CopyButton text="Bonjour Karim" />);
    fireEvent.click(screen.getByRole("button", { name: /Copier le texte/ }));

    expect(writeText).toHaveBeenCalledWith("Bonjour Karim");
    expect(await screen.findByText(/Copié/)).toBeInTheDocument();
  });
});
