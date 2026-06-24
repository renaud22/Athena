import { PrismaPg } from "@prisma/adapter-pg";
import { defineConfig } from "prisma/config";

// AD-7 — Configuration Prisma 7 avec driver adapter @prisma/adapter-pg (OBLIGATOIRE :
// Prisma 7 sans adapter lève une erreur). L'app se connecte via le pooler Supavisor
// (DATABASE_URL, 6543, ?pgbouncer=true) avec un connectionTimeoutMillis réglé sur
// l'adapter ; les migrations CLI passent par DIRECT_URL (5432), cf. datasource du schéma.
//
// NOTE (lot DB bloqué) : à valider contre la doc Prisma 7 au branchement Supabase réel —
// la forme exacte de l'API config peut différer ; ce fichier est exclu du typecheck app
// tant que le client Prisma n'est pas généré.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
  adapter: () => {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL manquant");
    }
    return new PrismaPg({ connectionString, connectionTimeoutMillis: 5000 });
  },
});
