import type { Piste } from "@/lib/domain/enums";
import type { PostSlot } from "@/lib/domain/post";

// Jour de la semaine (Europe/Paris) de chaque piste éditoriale (0=dim … 6=sam).
const PISTE_WEEKDAY: Record<Piste, number> = { MARDI: 2, JEUDI: 4 };
const PARIS_WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parisWeekday(date: Date): number {
  const short = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Paris",
    weekday: "short",
  }).format(date);
  return PARIS_WEEKDAYS.indexOf(short);
}

/** Prochain créneau de la piste (mardi/jeudi en Europe/Paris) STRICTEMENT après `after`. */
export function nextSlot(piste: Piste, after: Date): Date {
  const target = PISTE_WEEKDAY[piste];
  const d = new Date(after.getTime());
  do {
    d.setUTCDate(d.getUTCDate() + 1);
  } while (parisWeekday(d) !== target);
  return d;
}

/**
 * Report d'un post manqué (FR31/FR32). Le post reporté ET tous les posts de SA piste au
 * même créneau ou après décalent d'UN créneau (cascade, espacements préservés) ; l'AUTRE
 * piste ne bouge jamais — la cascade ne franchit pas la frontière des pistes (FR32).
 * Pure : renvoie une nouvelle liste, n'altère pas l'entrée.
 */
export function reportPost(posts: PostSlot[], postId: string): PostSlot[] {
  const target = posts.find((p) => p.id === postId);
  if (!target || target.dateProgrammee === null) return posts;
  const fromTime = target.dateProgrammee.getTime();
  return posts.map((p) => {
    if (p.piste !== target.piste || p.dateProgrammee === null) return p;
    if (p.dateProgrammee.getTime() < fromTime) return p;
    return { ...p, dateProgrammee: nextSlot(p.piste, p.dateProgrammee) };
  });
}
