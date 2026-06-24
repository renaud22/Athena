import type { TaskKind } from "@/lib/domain/dashboard";

// Composeur de publication LinkedIn (ouvre l'éditeur de post). L'app ne publie JAMAIS
// elle-même (AD-10) : on ouvre seulement le bon endroit, l'humain colle et envoie.
const POST_COMPOSER_URL = "https://www.linkedin.com/feed/?shareActive=true";
const MESSAGING_URL = "https://www.linkedin.com/messaging/";

/**
 * Lien contextuel selon le type de tâche (FR14) :
 *  - post : l'éditeur de publication LinkedIn ;
 *  - DM   : le profil du prospect (la messagerie est accessible d'un clic depuis le
 *           profil) ; à défaut d'URL, la messagerie générique.
 * Jamais d'envoi/publication automatique (AD-10) — un simple lien à ouvrir.
 */
export function linkedinActionUrl(
  kind: TaskKind,
  prospectLinkedinUrl: string | null,
): string {
  if (kind === "post") return POST_COMPOSER_URL;
  return prospectLinkedinUrl ?? MESSAGING_URL;
}

/** Libellé du lien contextuel selon le type. */
export function linkedinActionLabel(kind: TaskKind): string {
  return kind === "post" ? "Ouvrir l'éditeur LinkedIn" : "Ouvrir la messagerie";
}
