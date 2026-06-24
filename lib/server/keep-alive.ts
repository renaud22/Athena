import { Pool } from "pg";

// AD-18 / AD-11 — Ping de maintien en vie de la BDD Supabase (neutralise la pause du
// free tier). LECTURE SEULE stricte : un `SELECT 1`, aucune mutation d'état métier.
// Utilise `pg` directement (et non Prisma) : c'est un ping trivial hors couche métier,
// et ça évite de dépendre du client Prisma généré. Runtime Node uniquement (AD-6).

let pool: Pool | undefined;

function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL manquant");
    }
    // max:1 + timeout court : un cron ne doit pas mobiliser le pooler (AD-7).
    pool = new Pool({ connectionString, max: 1, connectionTimeoutMillis: 5000 });
  }
  return pool;
}

/** Exécute le ping en lecture seule. Lève si la BDD ne répond pas comme attendu. */
export async function pingDatabase(): Promise<void> {
  const result = await getPool().query("SELECT 1");
  if (result.rowCount !== 1) {
    throw new Error("Ping BDD : réponse inattendue");
  }
}
