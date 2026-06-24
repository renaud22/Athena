import type { FunnelStatut, MsgStatut, PostStatut } from "@/lib/domain/enums";

// ============================================================================
// Machine à états du cycle de vie de prospection (AD-4/AD-17) — TABLE DE
// TRANSITIONS TOTALE. Chaque état liste ses actions autorisées ; une action absente
// => transition REJETÉE (null), jamais d'état incohérent. Le typage `Record<Statut,…>`
// garantit la couverture exhaustive de TOUS les états à la compilation (équivaut au
// `satisfies never`). C'est la SEULE source des transitions ; les Server Actions
// l'appliquent en compare-and-set atomique (AD-16). Pure et déterministe.
// ============================================================================

export type FunnelAction =
  | "sendConnection" // envoi de la demande de connexion (J0)
  | "acceptConnection" // « Connexion acceptée » -> démarre la séquence (crée Touche 1)
  | "abandonConnection" // abandon d'une demande non acceptée
  | "markReplied" // « X a répondu » -> bascule en échange libre
  | "breakup" // Touche 3 sans réponse -> terminal perdu
  | "qualify" // l'échange aboutit -> qualifié
  | "markLost"; // abandon manuel -> perdu

// EN_ATTENTE_ACCEPTATION : pas de Touche 1 créée (gating, FR45).
// markReplied autorisé depuis l'attente ET depuis « en cours » : une réponse à
// n'importe quelle étape termine la séquence scriptée (FR22/FR47).
const FUNNEL_TRANSITIONS: Record<
  FunnelStatut,
  Partial<Record<FunnelAction, FunnelStatut>>
> = {
  A_CONTACTER: { sendConnection: "EN_ATTENTE_ACCEPTATION", markLost: "PERDU" },
  EN_ATTENTE_ACCEPTATION: {
    acceptConnection: "EN_COURS",
    abandonConnection: "PERDU",
    markReplied: "EN_ECHANGE",
    markLost: "PERDU",
  },
  EN_COURS: { markReplied: "EN_ECHANGE", breakup: "PERDU", markLost: "PERDU" },
  EN_ECHANGE: { qualify: "QUALIFIE", markLost: "PERDU" },
  QUALIFIE: {}, // terminal
  PERDU: {}, // terminal
};

/** État résultant d'une action, ou `null` si l'action n'est pas autorisée depuis `state`. */
export function funnelTransition(
  state: FunnelStatut,
  action: FunnelAction,
): FunnelStatut | null {
  return FUNNEL_TRANSITIONS[state][action] ?? null;
}

export function canFunnelTransition(
  state: FunnelStatut,
  action: FunnelAction,
): boolean {
  return funnelTransition(state, action) !== null;
}

/** États terminaux stockés : aucune transition sortante (QUALIFIE, PERDU). */
export function isFunnelTerminal(state: FunnelStatut): boolean {
  return Object.keys(FUNNEL_TRANSITIONS[state]).length === 0;
}

// ============================================================================
// Machine à états du statut d'un message programmé (MsgStatut). Le passage à ENVOYE
// est UNIQUE et IRRÉVERSIBLE (NFR3) : aucune transition sortante depuis ENVOYE.
// ============================================================================

export type MsgAction =
  | "setPret" // marque « Prêt » (handoff humain -> agent, AD-20)
  | "annulerPret" // repasse en préparation
  | "markSent"; // « Marqué envoyé/publié » — terminal

const MSG_TRANSITIONS: Record<
  MsgStatut,
  Partial<Record<MsgAction, MsgStatut>>
> = {
  A_PREPARER: { setPret: "PRET", markSent: "ENVOYE" },
  PRET: { annulerPret: "A_PREPARER", markSent: "ENVOYE" },
  ENVOYE: {}, // terminal irréversible
};

export function msgTransition(
  state: MsgStatut,
  action: MsgAction,
): MsgStatut | null {
  return MSG_TRANSITIONS[state][action] ?? null;
}

export function canMsgTransition(state: MsgStatut, action: MsgAction): boolean {
  return msgTransition(state, action) !== null;
}

// ============================================================================
// Machine à états du statut d'un post LinkedIn (PostStatut). Cycle de préparation
// IDEE -> A_REDIGER -> REDIGE -> PRET -> PROGRAMME -> PUBLIE (FR26), avec ANNULE et
// A_REPROGRAMMER (créneau manqué) comme issues. PRET = même handoff qu'un message (AD-20).
// ============================================================================

export type PostAction =
  | "commencerRedaction"
  | "marquerRedige"
  | "setPret"
  | "annulerPret"
  | "programmer"
  | "publier"
  | "reprogrammer" // créneau manqué -> à reprogrammer
  | "confirmerReprog" // reprogrammé sur un nouveau créneau
  | "annuler"
  | "reactiver";

const POST_TRANSITIONS: Record<
  PostStatut,
  Partial<Record<PostAction, PostStatut>>
> = {
  IDEE: { commencerRedaction: "A_REDIGER", annuler: "ANNULE" },
  A_REDIGER: { marquerRedige: "REDIGE", annuler: "ANNULE" },
  REDIGE: { setPret: "PRET", annuler: "ANNULE" },
  PRET: { programmer: "PROGRAMME", annulerPret: "REDIGE", annuler: "ANNULE" },
  PROGRAMME: {
    publier: "PUBLIE",
    reprogrammer: "A_REPROGRAMMER",
    annuler: "ANNULE",
  },
  A_REPROGRAMMER: { confirmerReprog: "PROGRAMME", annuler: "ANNULE" },
  PUBLIE: {}, // terminal
  ANNULE: { reactiver: "A_REDIGER" },
};

export function postTransition(
  state: PostStatut,
  action: PostAction,
): PostStatut | null {
  return POST_TRANSITIONS[state][action] ?? null;
}

export function canPostTransition(
  state: PostStatut,
  action: PostAction,
): boolean {
  return postTransition(state, action) !== null;
}
