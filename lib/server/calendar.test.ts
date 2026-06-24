import { describe, it, expect } from "vitest";

import type { ScheduledPost } from "@/lib/domain/calendar";
import { buildEditorialCalendar } from "@/lib/server/calendar";

describe("buildEditorialCalendar (FR27)", () => {
  const now = new Date("2026-03-09T12:00:00Z"); // lundi 9 mars

  it("génère N créneaux à venir par piste, tous postérieurs à maintenant", () => {
    const cal = buildEditorialCalendar([], now, 2);
    expect(cal.MARDI).toHaveLength(2);
    expect(cal.JEUDI).toHaveLength(2);
    expect(cal.MARDI[0].date.getTime()).toBeGreaterThan(now.getTime());
    expect(cal.MARDI[1].date.getTime()).toBeGreaterThan(
      cal.MARDI[0].date.getTime(),
    );
  });

  it("rattache un post à son créneau ; les autres restent libres", () => {
    const posts: ScheduledPost[] = [
      {
        id: "p1",
        titre: "Mon post",
        piste: "MARDI",
        dateProgrammee: new Date("2026-03-10T12:00:00Z"), // 1er mardi après le 9
        statutLabel: "Programmé",
      },
    ];
    const cal = buildEditorialCalendar(posts, now, 2);
    expect(cal.MARDI[0].post?.titre).toBe("Mon post");
    expect(cal.MARDI[1].post).toBeNull();
    expect(cal.JEUDI[0].post).toBeNull();
  });
});
