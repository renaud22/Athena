import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import type { ProspectionItem } from "@/lib/domain/avancement";
import { AvancementBoard } from "@/components/kanban/avancement-board";

const items: ProspectionItem[] = [
  {
    id: "a",
    prospect: "Awa Diop",
    funnelStatut: "A_CONTACTER",
    etape: null,
    urgency: "now",
  },
  {
    id: "b",
    prospect: "Karim Benali",
    funnelStatut: "EN_COURS",
    etape: "TOUCHE_2",
    urgency: "soon",
  },
  {
    id: "c",
    prospect: "Sofia Marchetti",
    funnelStatut: "QUALIFIE",
    etape: null,
    urgency: "none",
  },
];

describe("AvancementBoard (Story 5.3)", () => {
  it("affiche les colonnes et les prospections actives", () => {
    render(<AvancementBoard items={items} />);
    expect(screen.getByText("À contacter")).toBeInTheDocument();
    expect(screen.getByText("Touche 2")).toBeInTheDocument();
    expect(screen.getByText("Awa Diop")).toBeInTheDocument();
    expect(screen.getByText("Karim Benali")).toBeInTheDocument();
  });

  it("n'affiche pas les prospections terminales (FR48)", () => {
    render(<AvancementBoard items={items} />);
    expect(screen.queryByText("Sofia Marchetti")).not.toBeInTheDocument();
  });
});
