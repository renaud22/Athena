import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { Badge, StepTag } from "@/components/ui/badge";

describe("Badge", () => {
  it("rend la variante par défaut (pill verre)", () => {
    render(<Badge>Prospect</Badge>);
    expect(screen.getByText("Prospect")).toHaveClass("rounded-full");
  });

  it("StepTag est un badge or (étape de séquence)", () => {
    render(<StepTag>Touche 2</StepTag>);
    expect(screen.getByText("Touche 2")).toHaveClass("text-gold");
  });
});
