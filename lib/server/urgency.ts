import type { UrgencyLevel } from "@/lib/domain/urgency";

const MS_PER_DAY = 86_400_000;

// Numéro de jour civil en Europe/Paris (nombre de jours depuis l'epoch). La frontière de
// jour est TOUJOURS calculée à Paris, quel que soit le fuseau du serveur (les dates sont
// stockées en UTC) ; les changements d'heure été/hiver sont gérés par Intl.
function parisDayNumber(date: Date): number {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const part = (type: string) =>
    Number(parts.find((p) => p.type === type)?.value);
  return Math.floor(
    Date.UTC(part("year"), part("month") - 1, part("day")) / MS_PER_DAY,
  );
}

/**
 * Urgence dérivée (AD-5 / AD-15, FR29) — fonction pure UNIQUE, jamais recalculée ailleurs,
 * aucun champ d'urgence persisté. L'urgence mesure la proximité de la deadline de
 * PRÉPARATION = la veille de la date programmée (et non la date d'envoi elle-même),
 * à granularité JOUR en Europe/Paris :
 *   - `none` : pas de date programmée ;
 *   - `far`  : prep dans 2 jours ou plus (vert) ;
 *   - `soon` : prep demain — approche (orange) ;
 *   - `now`  : prep aujourd'hui ou dépassée / envoi en retard (rouge).
 *
 * Les états TERMINAUX (Qualifié, En échange, Perdu, publié/envoyé) n'appellent jamais
 * cette fonction : l'urgence ne concerne que les états actifs non terminaux (AD-17), le
 * filtrage se fait en amont (liste active du dashboard).
 */
export function computeUrgency(
  dateProgrammee: Date | null | undefined,
  now: Date,
): UrgencyLevel {
  if (!dateProgrammee) return "none";
  const prepDeadlineDay = parisDayNumber(dateProgrammee) - 1; // la veille
  const daysToPrep = prepDeadlineDay - parisDayNumber(now);
  if (daysToPrep <= 0) return "now";
  if (daysToPrep === 1) return "soon";
  return "far";
}
