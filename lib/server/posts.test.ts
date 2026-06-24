import { describe, it, expect } from "vitest";

import type { PostSlot } from "@/lib/domain/post";
import { nextSlot, reportPost } from "@/lib/server/posts";

const iso = (d: Date | null) => d?.toISOString().slice(0, 10);

describe("nextSlot (créneaux mardi/jeudi, Europe/Paris)", () => {
  it("trouve le prochain mardi strictement après (2026-03-10 mardi -> 03-17)", () => {
    expect(iso(nextSlot("MARDI", new Date("2026-03-10T12:00:00Z")))).toBe(
      "2026-03-17",
    );
  });
  it("trouve le prochain jeudi (2026-03-10 mardi -> 03-12)", () => {
    expect(iso(nextSlot("JEUDI", new Date("2026-03-10T12:00:00Z")))).toBe(
      "2026-03-12",
    );
  });
});

describe("reportPost (FR31/FR32 — cascade par piste)", () => {
  const base: PostSlot[] = [
    {
      id: "m1",
      piste: "MARDI",
      dateProgrammee: new Date("2026-03-10T12:00:00Z"),
    },
    {
      id: "m2",
      piste: "MARDI",
      dateProgrammee: new Date("2026-03-17T12:00:00Z"),
    },
    {
      id: "j1",
      piste: "JEUDI",
      dateProgrammee: new Date("2026-03-12T12:00:00Z"),
    },
  ];
  const by = (posts: PostSlot[], id: string) => posts.find((p) => p.id === id)!;

  it("décale le post reporté ET la cascade de sa piste d'un créneau", () => {
    const out = reportPost(base, "m1");
    expect(iso(by(out, "m1").dateProgrammee)).toBe("2026-03-17");
    expect(iso(by(out, "m2").dateProgrammee)).toBe("2026-03-24");
  });

  it("ne touche jamais l'autre piste (FR32)", () => {
    const out = reportPost(base, "m1");
    expect(iso(by(out, "j1").dateProgrammee)).toBe("2026-03-12");
  });

  it("ne mute pas la liste d'entrée (pur)", () => {
    reportPost(base, "m1");
    expect(iso(base[0].dateProgrammee)).toBe("2026-03-10");
  });
});
