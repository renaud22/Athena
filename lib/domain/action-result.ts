// AD-14 — Forme unique du résultat de toute Server Action.
// Un type discriminé unique que le bouton d'action unifié (FR18) sait consommer :
// succès -> { ok: true, data } ; échec -> { ok: false, error, fieldErrors? }.
// `fieldErrors` porte les erreurs de validation zod par champ (cf. AD-14).

/** Erreurs de validation par champ (clé = nom du champ, valeur = messages). */
export type FieldErrors = Record<string, string[]>;

export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: FieldErrors };

/** Construit un résultat de succès. */
export function ok<T>(data: T): ActionResult<T> {
  return { ok: true, data };
}

/**
 * Construit un résultat d'échec. `fieldErrors` n'est ajouté que s'il est fourni,
 * pour garder une forme minimale quand l'échec n'est pas lié à la validation.
 */
export function err(error: string, fieldErrors?: FieldErrors): ActionResult<never> {
  return fieldErrors ? { ok: false, error, fieldErrors } : { ok: false, error };
}
