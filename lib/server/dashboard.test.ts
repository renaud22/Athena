import { describe, it, expect } from "vitest";

import type { DashboardTask, TaskKind } from "@/lib/domain/dashboard";
import type { UrgencyLevel } from "@/lib/domain/urgency";
import { sortDashboardTasks } from "@/lib/server/dashboard";

function task(
  id: string,
  urgency: UrgencyLevel,
  date: Date | null,
): DashboardTask {
  return {
    id,
    kind: "dm" as TaskKind,
    label: id,
    dateProgrammee: date,
    urgency,
  };
}

describe("sortDashboardTasks (FR4/FR7 — tri par urgence-temps seule)", () => {
  it("ordonne par urgence décroissante : now → soon → far → none", () => {
    const out = sortDashboardTasks([
      task("none", "none", null),
      task("far", "far", new Date("2026-03-20T12:00:00Z")),
      task("now", "now", new Date("2026-03-10T12:00:00Z")),
      task("soon", "soon", new Date("2026-03-12T12:00:00Z")),
    ]);
    expect(out.map((t) => t.id)).toEqual(["now", "soon", "far", "none"]);
  });

  it("à urgence égale, la date la plus proche d'abord", () => {
    const out = sortDashboardTasks([
      task("late", "now", new Date("2026-03-12T00:00:00Z")),
      task("early", "now", new Date("2026-03-10T00:00:00Z")),
    ]);
    expect(out.map((t) => t.id)).toEqual(["early", "late"]);
  });

  it("les tâches sans date passent en dernier à urgence égale", () => {
    const out = sortDashboardTasks([
      task("nodate", "far", null),
      task("dated", "far", new Date("2026-03-10T12:00:00Z")),
    ]);
    expect(out.map((t) => t.id)).toEqual(["dated", "nodate"]);
  });

  it("ne mute pas le tableau d'entrée (tri pur)", () => {
    const input = [task("a", "far", null), task("b", "now", null)];
    sortDashboardTasks(input);
    expect(input.map((t) => t.id)).toEqual(["a", "b"]);
  });
});
