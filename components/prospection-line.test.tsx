import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { ProspectionLine } from "@/components/prospection-line";

describe("ProspectionLine (FR44)", () => {
  it("affiche le conseil en lecture seule", () => {
    render(<ProspectionLine conseil="Vise la qualité, pas le volume." />);
    const note = screen.getByRole("note");
    expect(note).toHaveTextContent("Vise la qualité, pas le volume.");
  });
});
