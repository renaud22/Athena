import { describe, it, expect } from "vitest";

import { ok, err, type ActionResult } from "@/lib/domain/action-result";

describe("ActionResult (AD-14 — forme unique de retour de Server Action)", () => {
  it("ok() encapsule la donnée et discrimine sur ok=true", () => {
    const r: ActionResult<number> = ok(42);
    expect(r.ok).toBe(true);
    // Le narrowing TS doit exposer `data` dans la branche ok.
    if (r.ok) {
      expect(r.data).toBe(42);
    }
  });

  it("err() porte un message d'erreur, sans fieldErrors par défaut", () => {
    const r = err("Échec de l'opération");
    expect(r).toEqual({ ok: false, error: "Échec de l'opération" });
    expect("fieldErrors" in r).toBe(false);
  });

  it("err() inclut fieldErrors quand ils sont fournis (validation zod)", () => {
    const r = err("Entrée invalide", { nom: ["Le nom est requis"] });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.fieldErrors).toEqual({ nom: ["Le nom est requis"] });
    }
  });
});
