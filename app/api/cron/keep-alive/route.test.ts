import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// On isole la garde d'authentification : le ping BDD réel relève de l'intégration (DB).
const pingDatabase = vi.fn<() => Promise<void>>();
vi.mock("@/lib/server/keep-alive", () => ({ pingDatabase: () => pingDatabase() }));

import { GET } from "@/app/api/cron/keep-alive/route";

function call(headers?: Record<string, string>): Promise<Response> {
  return GET(new Request("http://localhost/api/cron/keep-alive", { headers }));
}

describe("GET /api/cron/keep-alive (garde d'auth cron)", () => {
  beforeEach(() => {
    process.env.CRON_SECRET = "s3cret";
    pingDatabase.mockReset().mockResolvedValue(undefined);
  });
  afterEach(() => {
    delete process.env.CRON_SECRET;
  });

  it("rejette (401) un appel sans en-tête d'autorisation", async () => {
    const res = await call();
    expect(res.status).toBe(401);
    expect(pingDatabase).not.toHaveBeenCalled();
  });

  it("rejette (401) un mauvais secret", async () => {
    const res = await call({ authorization: "Bearer mauvais" });
    expect(res.status).toBe(401);
  });

  it("accepte (200) un appel signé et ping la BDD", async () => {
    const res = await call({ authorization: "Bearer s3cret" });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(pingDatabase).toHaveBeenCalledOnce();
  });

  it("renvoie 500 sans détail sensible si le ping échoue", async () => {
    pingDatabase.mockRejectedValue(new Error("secret pg://user:pass@host"));
    const res = await call({ authorization: "Bearer s3cret" });
    expect(res.status).toBe(500);
    expect(await res.json()).toEqual({ ok: false, error: "keep-alive failed" });
  });
});
