import { describe, it, expect } from "vitest";

import { FUNNEL_STATUTS } from "@/lib/domain/enums";
import {
  funnelTransition,
  isFunnelTerminal,
  msgTransition,
  postTransition,
} from "@/lib/server/state-machine";

describe("Machine à états — funnel (AD-17)", () => {
  it("déroule le chemin nominal complet", () => {
    expect(funnelTransition("A_CONTACTER", "sendConnection")).toBe(
      "EN_ATTENTE_ACCEPTATION",
    );
    expect(funnelTransition("EN_ATTENTE_ACCEPTATION", "acceptConnection")).toBe(
      "EN_COURS",
    );
    expect(funnelTransition("EN_COURS", "markReplied")).toBe("EN_ECHANGE");
    expect(funnelTransition("EN_ECHANGE", "qualify")).toBe("QUALIFIE");
  });

  it("rejette (null) une action non autorisée depuis l'état courant", () => {
    expect(funnelTransition("A_CONTACTER", "qualify")).toBeNull();
    expect(funnelTransition("A_CONTACTER", "acceptConnection")).toBeNull();
    expect(funnelTransition("EN_ECHANGE", "sendConnection")).toBeNull();
  });

  it("une réponse à n'importe quelle étape bascule en échange libre (FR22)", () => {
    expect(funnelTransition("EN_ATTENTE_ACCEPTATION", "markReplied")).toBe(
      "EN_ECHANGE",
    );
    expect(funnelTransition("EN_COURS", "markReplied")).toBe("EN_ECHANGE");
  });

  it("la Touche 3 sans réponse mène à l'état terminal PERDU (FR48)", () => {
    expect(funnelTransition("EN_COURS", "breakup")).toBe("PERDU");
  });

  it("est idempotente : re-déclencher une transition déjà appliquée est rejeté", () => {
    // sendConnection a déjà fait passer en EN_ATTENTE ; le re-jouer y est interdit.
    expect(
      funnelTransition("EN_ATTENTE_ACCEPTATION", "sendConnection"),
    ).toBeNull();
  });

  it("marque QUALIFIE et PERDU comme terminaux (aucune sortie)", () => {
    expect(isFunnelTerminal("QUALIFIE")).toBe(true);
    expect(isFunnelTerminal("PERDU")).toBe(true);
    expect(isFunnelTerminal("EN_COURS")).toBe(false);
  });

  it("couvre TOUS les états du funnel (table totale)", () => {
    // Aucun état ne doit faire planter funnelTransition (table exhaustive).
    for (const state of FUNNEL_STATUTS) {
      expect(() => funnelTransition(state, "markLost")).not.toThrow();
    }
  });
});

describe("Machine à états — statut message (NFR3)", () => {
  it("enchaîne A_PREPARER -> PRET -> ENVOYE", () => {
    expect(msgTransition("A_PREPARER", "setPret")).toBe("PRET");
    expect(msgTransition("PRET", "markSent")).toBe("ENVOYE");
  });

  it("ENVOYE est irréversible : aucune transition sortante", () => {
    expect(msgTransition("ENVOYE", "markSent")).toBeNull();
    expect(msgTransition("ENVOYE", "annulerPret")).toBeNull();
  });

  it("permet d'annuler « Prêt »", () => {
    expect(msgTransition("PRET", "annulerPret")).toBe("A_PREPARER");
  });
});

describe("Machine à états — statut post (FR26)", () => {
  it("déroule le cycle IDEE -> ... -> PUBLIE", () => {
    expect(postTransition("IDEE", "commencerRedaction")).toBe("A_REDIGER");
    expect(postTransition("A_REDIGER", "marquerRedige")).toBe("REDIGE");
    expect(postTransition("REDIGE", "setPret")).toBe("PRET");
    expect(postTransition("PRET", "programmer")).toBe("PROGRAMME");
    expect(postTransition("PROGRAMME", "publier")).toBe("PUBLIE");
  });

  it("permet ANNULE et A_REPROGRAMMER comme issues", () => {
    expect(postTransition("PROGRAMME", "reprogrammer")).toBe("A_REPROGRAMMER");
    expect(postTransition("A_REPROGRAMMER", "confirmerReprog")).toBe(
      "PROGRAMME",
    );
    expect(postTransition("REDIGE", "annuler")).toBe("ANNULE");
  });

  it("PUBLIE est terminal et rejette toute action", () => {
    expect(postTransition("PUBLIE", "annuler")).toBeNull();
    expect(postTransition("PUBLIE", "publier")).toBeNull();
  });

  it("rejette une action hors séquence", () => {
    expect(postTransition("IDEE", "publier")).toBeNull();
  });
});
