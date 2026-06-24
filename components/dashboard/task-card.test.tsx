import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import type { DashboardTask } from "@/lib/domain/dashboard";
import { TaskCard } from "@/components/dashboard/task-card";

function makeTask(over: Partial<DashboardTask> = {}): DashboardTask {
  return {
    id: "t1",
    kind: "dm",
    label: "Touche 2 à Y",
    dateProgrammee: null,
    urgency: "now",
    ...over,
  };
}

describe("TaskCard", () => {
  it("affiche le libellé en action nommée", () => {
    render(<TaskCard task={makeTask({ label: "Relance Z" })} />);
    expect(screen.getByText("Relance Z")).toBeInTheDocument();
  });

  it("porte le liseré gauche de la couleur d'urgence brute", () => {
    const { container } = render(
      <TaskCard task={makeTask({ urgency: "now" })} />,
    );
    expect(container.querySelector("article")).toHaveClass("border-l-u-now");
  });

  it("distingue le DM (enveloppe) par un libellé accessible", () => {
    render(<TaskCard task={makeTask({ kind: "dm" })} />);
    expect(screen.getByLabelText("Message direct")).toBeInTheDocument();
  });

  it("distingue le post (publication) par un libellé accessible", () => {
    render(<TaskCard task={makeTask({ kind: "post" })} />);
    expect(screen.getByLabelText("Publication")).toBeInTheDocument();
  });
});
