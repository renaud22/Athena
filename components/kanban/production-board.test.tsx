import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import type { ProductionItem } from "@/lib/domain/kanban";
import { ProductionBoard } from "@/components/kanban/production-board";

const items: ProductionItem[] = [
  {
    id: "p",
    kind: "post",
    titre: "Mon post",
    statut: "A_REDIGER",
    meta: "Anti-bullshit",
    urgency: "soon",
  },
  {
    id: "d",
    kind: "dm",
    titre: "Mon DM",
    statut: "A_PREPARER",
    meta: "Touche 2",
    urgency: "now",
  },
];

describe("ProductionBoard (Story 5.1)", () => {
  it("affiche les colonnes, posts et DMs", () => {
    render(<ProductionBoard items={items} />);
    expect(screen.getByText("À rédiger")).toBeInTheDocument();
    expect(screen.getByText("Mon post")).toBeInTheDocument();
    expect(screen.getByText("Mon DM")).toBeInTheDocument();
  });

  it("filtre sur « Posts » seulement (un seul filtre actif)", async () => {
    const user = userEvent.setup();
    render(<ProductionBoard items={items} />);
    await user.click(screen.getByRole("button", { name: "Posts" }));
    expect(screen.getByText("Mon post")).toBeInTheDocument();
    expect(screen.queryByText("Mon DM")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Posts" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
