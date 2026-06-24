import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { CharacterCounter } from "@/components/detail/character-counter";

describe("CharacterCounter", () => {
  it("affiche le compte sur le repère", () => {
    render(<CharacterCounter text="bonjour" />);
    expect(screen.getByText("7 / 210")).toBeInTheDocument();
  });
});
