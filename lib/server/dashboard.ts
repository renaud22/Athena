import { urgencyOrder, type DashboardTask } from "@/lib/domain/dashboard";

import { computeUrgency } from "./urgency";

const MS_PER_DAY = 86_400_000;

/**
 * Ordonne les tâches du dashboard (FR4/FR7) : par urgence décroissante (now → soon →
 * far → none) puis, à urgence égale, par date la plus proche d'abord (sans-date en
 * dernier). AUCUNE priorité liée à la chaleur du prospect (FR7). Pure et stable.
 */
export function sortDashboardTasks(tasks: DashboardTask[]): DashboardTask[] {
  return [...tasks].sort((a, b) => {
    const byUrgency = urgencyOrder(a.urgency) - urgencyOrder(b.urgency);
    if (byUrgency !== 0) return byUrgency;
    const da = a.dateProgrammee?.getTime() ?? Number.POSITIVE_INFINITY;
    const db = b.dateProgrammee?.getTime() ?? Number.POSITIVE_INFINITY;
    return da - db;
  });
}

// ---------------------------------------------------------------------------
// Source de données — PLACEHOLDER (lot DB bloqué, cf. MORNING-REPORT).
// Tant que Supabase n'est pas branché, le dashboard est alimenté par un jeu d'exemples.
// À remplacer par un repository Prisma (lecture MessageProgramme + PostLinkedIn → map vers
// DashboardTask) : la signature `(now) => DashboardTask[]` triée NE CHANGE PAS.
// ---------------------------------------------------------------------------
export function getSampleDashboardTasks(now: Date): DashboardTask[] {
  const at = (days: number | null): Date | null =>
    days === null ? null : new Date(now.getTime() + days * MS_PER_DAY);

  const raw: Omit<DashboardTask, "urgency">[] = [
    {
      id: "s1",
      kind: "dm",
      label: "Touche 2 à Karim Benali",
      dateProgrammee: at(0),
    },
    {
      id: "s2",
      kind: "post",
      label: "Préparer post « anti-bullshit » pour mardi",
      dateProgrammee: at(1),
    },
    {
      id: "s3",
      kind: "dm",
      label: "Relance Léa Moreau",
      dateProgrammee: at(2),
    },
    {
      id: "s4",
      kind: "post",
      label: "Préparer post « coulisses » pour jeudi",
      dateProgrammee: at(5),
    },
    {
      id: "s5",
      kind: "dm",
      label: "Envoyer mes demandes de connexion du jour",
      dateProgrammee: null,
    },
  ];

  return sortDashboardTasks(
    raw.map((t) => ({ ...t, urgency: computeUrgency(t.dateProgrammee, now) })),
  );
}
