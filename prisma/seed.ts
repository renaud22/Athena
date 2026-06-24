import { PrismaClient } from "@prisma/client";

// Seed IDEMPOTENT (AD-19) : rejouable sans dupliquer (upsert sur des ids stables).
// Fournit un jeu d'exemples générique (niche non figée) pour faire vivre le dashboard.
// NOTE (lot DB bloqué) : exécuté via `prisma db seed` une fois Supabase branché.
const prisma = new PrismaClient();

// Décalage en jours par rapport à maintenant -> illustre les 4 paliers d'urgence.
function inDays(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

async function main() {
  // Profil de l'opérateur unique (id = uuid de l'utilisateur Supabase Auth ; placeholder
  // à remplacer par le vrai uuid à la mise en place de l'auth).
  await prisma.profile.upsert({
    where: { email: "operateur@solutix.fr" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      email: "operateur@solutix.fr",
    },
  });

  // Tâches de démonstration (libellés en actions nommées, dates variées).
  const taches = [
    { id: "seed-msg-1", intitule: "Contacter Awa Diop", etape: "DEMANDE_CONNEXION" as const, dateEnvoiPrevue: inDays(-1) },
    { id: "seed-msg-2", intitule: "Touche 2 à Karim Benali", etape: "TOUCHE_2" as const, dateEnvoiPrevue: inDays(0) },
    { id: "seed-msg-3", intitule: "Relance Léa Moreau", etape: "TOUCHE_3_BREAKUP" as const, dateEnvoiPrevue: inDays(2) },
    { id: "seed-msg-4", intitule: "Touche 1 à Tom Garnier", etape: "TOUCHE_1" as const, dateEnvoiPrevue: inDays(6) },
  ];

  for (const t of taches) {
    await prisma.messageProgramme.upsert({
      where: { id: t.id },
      update: { intitule: t.intitule, etape: t.etape, dateEnvoiPrevue: t.dateEnvoiPrevue },
      create: t,
    });
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
