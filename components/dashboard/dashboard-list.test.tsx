import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import type { DashboardTask } from "@/lib/domain/dashboard";
import { DashboardList } from "@/components/dashboard/dashboard-list";

const task = (id: string): DashboardTask => ({
  id,
  kind: "dm",
  label: id,
  dateProgrammee: null,
  urgency: "far",
});

describe("DashboardList", () => {
  it("rend une carte par tâche", () => {
    render(<DashboardList tasks={[task("Contacter A"), task("Relance B")]} />);
    expect(screen.getByText("Contacter A")).toBeInTheDocument();
    expect(screen.getByText("Relance B")).toBeInTheDocument();
  });

  it("affiche l'état vide « Tout est prêt » quand il n'y a rien à faire", () => {
    render(<DashboardList tasks={[]} />);
    expect(screen.getByText("Tout est prêt")).toBeInTheDocument();
  });
});
