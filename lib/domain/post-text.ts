// Repère de longueur d'un post LinkedIn : ~210 caractères = seuil « voir plus » (FR43).
// Compteur INDICATIF, jamais bloquant (aucune limite dure).
export const POST_SEE_MORE_THRESHOLD = 210;

export interface PostCharStats {
  count: number;
  threshold: number;
  /** Avancement vers le seuil, borné à 1. */
  ratio: number;
  overThreshold: boolean;
}

export function postCharStats(text: string): PostCharStats {
  // [...text] compte les points de code Unicode (un emoji = 1), plus juste que .length.
  const count = [...text].length;
  return {
    count,
    threshold: POST_SEE_MORE_THRESHOLD,
    ratio: Math.min(count / POST_SEE_MORE_THRESHOLD, 1),
    overThreshold: count > POST_SEE_MORE_THRESHOLD,
  };
}
