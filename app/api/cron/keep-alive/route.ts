import { pingDatabase } from "@/lib/server/keep-alive";

// AD-6 — Accès BDD => runtime Node obligatoire (jamais Edge).
export const runtime = "nodejs";
// Le cron doit toujours réexécuter la requête, jamais servir une réponse mise en cache.
export const dynamic = "force-dynamic";

/**
 * Endpoint appelé par le cron Vercel quotidien (AD-11/AD-18). Protégé par un secret :
 * le cron envoie `Authorization: Bearer ${CRON_SECRET}`. Tout appel non signé est rejeté
 * pour qu'on ne puisse pas le déclencher depuis l'URL publique.
 */
export async function GET(request: Request): Promise<Response> {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get("authorization");
  if (!secret || auth !== `Bearer ${secret}`) {
    return Response.json({ ok: false }, { status: 401 });
  }

  try {
    await pingDatabase();
    return Response.json({ ok: true });
  } catch {
    // Pas de détail sensible dans la réponse ni les logs (NFR4).
    return Response.json({ ok: false, error: "keep-alive failed" }, { status: 500 });
  }
}
