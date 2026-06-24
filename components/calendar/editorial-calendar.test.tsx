import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import {
  buildEditorialCalendar,
  getSampleScheduledPosts,
} from "@/lib/server/calendar";
import { EditorialCalendar } from "@/components/calendar/editorial-calendar";

describe("EditorialCalendar (FR27)", () => {
  const now = new Date("2026-03-09T12:00:00Z");

  it("affiche les deux pistes et les posts programmés", () => {
    const calendar = buildEditorialCalendar(getSampleScheduledPosts(now), now);
    render(<EditorialCalendar calendar={calendar} />);
    expect(screen.getByText("Mardi")).toBeInTheDocument();
    expect(screen.getByText("Jeudi")).toBeInTheDocument();
    expect(screen.getByText("Anti-bullshit IA")).toBeInTheDocument();
    expect(screen.getAllByText("Créneau libre").length).toBeGreaterThan(0);
  });

  it("affiche un état vide neutre sans post (UX-DR29)", () => {
    const calendar = buildEditorialCalendar([], now);
    render(<EditorialCalendar calendar={calendar} />);
    expect(screen.getByText(/Aucun post programmé/)).toBeInTheDocument();
  });
});
