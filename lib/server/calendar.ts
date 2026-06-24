import type { CalendarSlot, ScheduledPost } from "@/lib/domain/calendar";
import { PISTES, type Piste } from "@/lib/domain/enums";

import { nextSlot, parisDayKey } from "./posts";
import { computeUrgency } from "./urgency";

/**
 * Construit le calendrier éditorial (FR27) : pour chaque piste, les `slotsPerPiste`
 * prochains créneaux (mardi/jeudi, Europe/Paris), chacun avec son urgence DÉRIVÉE (AD-5)
 * et le post qui l'occupe le cas échéant. Pure.
 */
export function buildEditorialCalendar(
  posts: ScheduledPost[],
  now: Date,
  slotsPerPiste = 4,
): Record<Piste, CalendarSlot[]> {
  const byPiste = {} as Record<Piste, CalendarSlot[]>;
  for (const piste of PISTES) {
    const slots: CalendarSlot[] = [];
    let cursor = now;
    for (let i = 0; i < slotsPerPiste; i++) {
      const date = nextSlot(piste, cursor);
      const key = parisDayKey(date);
      const post =
        posts.find(
          (p) => p.piste === piste && parisDayKey(p.dateProgrammee) === key,
        ) ?? null;
      slots.push({ date, piste, urgency: computeUrgency(date, now), post });
      cursor = date;
    }
    byPiste[piste] = slots;
  }
  return byPiste;
}

// Jeu d'exemples (lot DB bloqué). À remplacer par la lecture des PostLinkedIn programmés.
export function getSampleScheduledPosts(now: Date): ScheduledPost[] {
  const m1 = nextSlot("MARDI", now);
  const j1 = nextSlot("JEUDI", now);
  const m2 = nextSlot("MARDI", m1);
  return [
    {
      id: "p1",
      titre: "Anti-bullshit IA",
      piste: "MARDI",
      dateProgrammee: m1,
      statutLabel: "Programmé",
    },
    {
      id: "p2",
      titre: "Coulisses semaine 1",
      piste: "JEUDI",
      dateProgrammee: j1,
      statutLabel: "Prêt",
    },
    {
      id: "p3",
      titre: "Mini-cas client",
      piste: "MARDI",
      dateProgrammee: m2,
      statutLabel: "À rédiger",
    },
  ];
}
