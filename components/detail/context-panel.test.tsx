import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import type { TaskDetail } from "@/lib/domain/task-detail";
import { ContextPanel } from "@/components/detail/context-panel";

const base: TaskDetail = {
  id: "s1",
  kind: "dm",
  label: "Touche 2 à Karim",
  statutLabel: "À préparer",
  urgency: "now",
  dateProgrammee: null,
  texte: "",
  etape: "TOUCHE_2",
  accroche: "Gère sa prospection à la main.",
  signaux: ["prospection manuelle"],
  thread: [
    { id: "t1", from: "moi", texte: "Bonjour Karim !" },
    { id: "t2", from: "prospect", texte: "Salut, dis-m'en plus" },
  ],
  prospect: "Karim Benali",
  prospectLinkedinUrl: null,
};

describe("ContextPanel (FR17 — contexte de rédaction, lecture seule)", () => {
  it("affiche le step-tag de l'étape, l'accroche et les signaux", () => {
    render(<ContextPanel detail={base} />);
    expect(screen.getByText("Touche 2")).toBeInTheDocument();
    expect(
      screen.getByText(/Gère sa prospection à la main/),
    ).toBeInTheDocument();
    expect(screen.getByText("prospection manuelle")).toBeInTheDocument();
  });

  it("affiche le fil des touches (moi + prospect)", () => {
    render(<ContextPanel detail={base} />);
    expect(screen.getByText("Bonjour Karim !")).toBeInTheDocument();
    expect(screen.getByText("Salut, dis-m'en plus")).toBeInTheDocument();
  });

  it("masque l'étape et le fil pour un post (pas de séquence)", () => {
    render(<ContextPanel detail={{ ...base, etape: null, thread: [] }} />);
    expect(screen.queryByText("Fil des touches")).not.toBeInTheDocument();
  });
});
