// AD-12 — Garde d'exhaustivité pour les enums fermés.
// À placer dans la branche `default` d'un `switch` exhaustif : si un cas d'enum est
// oublié, `value` n'est plus de type `never` et le code NE COMPILE PAS. À l'exécution
// (cas théoriquement impossible si le type est respecté), on lève plutôt que d'échouer
// en silence — utile face à une donnée corrompue venue de la base.
export function assertNever(value: never, context = "valeur"): never {
  throw new Error(`Cas non géré (${context}) : ${JSON.stringify(value)}`);
}
