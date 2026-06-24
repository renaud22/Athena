import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import type { TaskDetail } from "@/lib/domain/task-detail";
import { TaskDetailView } from "@/components/detail/task-detail-view";

const detail: TaskDetail = {
  id: "s1",
  kind: "dm",
  label: "Touche 2 à Karim",
  statutLabel: "À préparer",
  urgency: "now",
  dateProgrammee: null,
  texte: "Bonjour Karim, on se cale 15 min ?",
  etape: "TOUCHE_2",
  accroche: "Gère sa prospection à la main.",
  signaux: ["prospection manuelle"],
  thread: [{ id: "t1", from: "moi", texte: "Bonjour Karim !" }],
  prospect: "Karim",
  prospectLinkedinUrl: "https://www.linkedin.com/in/karim",
};

describe("TaskDetailView (le joyau)", () => {
  it("affiche le texte, le titre en action nommée et le statut", () => {
    render(<TaskDetailView detail={detail} />);
    expect(screen.getByText(/on se cale 15 min/)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Touche 2 à Karim" }),
    ).toBeInTheDocument();
    expect(screen.getByText("À préparer")).toBeInTheDocument();
  });

  it("propose les actions unifiées : copier + lien LinkedIn (messagerie pour un DM)", () => {
    render(<TaskDetailView detail={detail} />);
    expect(screen.getByRole("button", { name: /Copier/ })).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /messagerie/i });
    expect(link).toHaveAttribute("href", "https://www.linkedin.com/in/karim");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("pointe le lien d'un post vers l'éditeur LinkedIn", () => {
    render(
      <TaskDetailView
        detail={{ ...detail, kind: "post", prospectLinkedinUrl: null }}
      />,
    );
    const link = screen.getByRole("link", { name: /éditeur/i });
    expect(link).toHaveAttribute(
      "href",
      expect.stringContaining("shareActive=true"),
    );
  });
});
