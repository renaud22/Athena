import type { TaskKind } from "@/lib/domain/dashboard";
import type { Etape } from "@/lib/domain/enums";
import type { TaskDetail, ThreadMessage } from "@/lib/domain/task-detail";

import { computeUrgency } from "./urgency";

const MS_PER_DAY = 86_400_000;

type Sample = {
  kind: TaskKind;
  label: string;
  statutLabel: string;
  texte: string;
  prospect: string;
  prospectLinkedinUrl: string | null;
  days: number | null;
  etape: Etape | null;
  accroche: string | null;
  signaux: string[];
  thread: ThreadMessage[];
};

// Jeu d'exemples (lot DB bloqué, cf. MORNING-REPORT). Mêmes identifiants que le dashboard.
// À remplacer par un repository Prisma (MessageProgramme / PostLinkedIn + Prospection) ;
// la forme du TaskDetail ne change pas.
const SAMPLES: Record<string, Sample> = {
  s1: {
    kind: "dm",
    label: "Touche 2 à Karim Benali",
    statutLabel: "À préparer",
    texte:
      "Bonjour Karim,\n\nMerci d'avoir accepté ma demande. J'ai vu que vous structurez votre prospection à la main — c'est exactement le genre de friction que j'automatise.\n\nÇa vous dirait d'en parler 15 min cette semaine ?",
    prospect: "Karim Benali",
    prospectLinkedinUrl: "https://www.linkedin.com/in/karim-benali",
    days: 0,
    etape: "TOUCHE_2",
    accroche: "Gère sa prospection à la main, friction visible sur LinkedIn.",
    signaux: ["prospection manuelle", "scale-up B2B"],
    thread: [
      {
        id: "s1-t1",
        from: "moi",
        texte:
          "Bonjour Karim, je me permets de me connecter : votre approche terrain m'intéresse.",
      },
    ],
  },
  s2: {
    kind: "post",
    label: "Préparer post « anti-bullshit » pour mardi",
    statutLabel: "À rédiger",
    texte:
      "« L'IA va remplacer les devs. »\n\nNon. Mais le dev qui sait faire bosser l'IA va remplacer celui qui ne sait pas.\n\nCette semaine j'ai livré en 2 jours ce qui m'aurait pris 2 semaines. Voici comment.",
    prospect: "—",
    prospectLinkedinUrl: null,
    days: 1,
    etape: null,
    accroche: "Angle anti-bullshit : casser un mythe, prouver par un cas réel.",
    signaux: ["preuve chiffrée", "gain de temps"],
    thread: [],
  },
  s3: {
    kind: "dm",
    label: "Relance Léa Moreau",
    statutLabel: "À préparer",
    texte:
      "Bonjour Léa,\n\nJe me permets une relance : mon message précédent s'est peut-être perdu. L'idée d'un audit rapide de vos process tient toujours si le sujet vous parle.",
    prospect: "Léa Moreau",
    prospectLinkedinUrl: "https://www.linkedin.com/in/lea-moreau",
    days: 2,
    etape: "TOUCHE_3_BREAKUP",
    accroche: "Process internes lourds évoqués dans un post récent.",
    signaux: ["process manuels", "équipe qui grandit"],
    thread: [
      {
        id: "s3-t1",
        from: "moi",
        texte: "Bonjour Léa, ravi d'être connecté !",
      },
      {
        id: "s3-t2",
        from: "moi",
        texte:
          "Petite question : qui gère l'automatisation de vos process aujourd'hui ?",
      },
    ],
  },
  s4: {
    kind: "post",
    label: "Préparer post « coulisses » pour jeudi",
    statutLabel: "Idée",
    texte:
      "Les coulisses d'un projet d'automatisation, semaine 1 : ce qui a marché, ce qui a cassé.",
    prospect: "—",
    prospectLinkedinUrl: null,
    days: 5,
    etape: null,
    accroche:
      "Build in public : montrer l'envers du décor, semaine par semaine.",
    signaux: [],
    thread: [],
  },
};

export function getSampleTaskDetail(id: string, now: Date): TaskDetail | null {
  const s = SAMPLES[id];
  if (!s) return null;
  const dateProgrammee =
    s.days === null ? null : new Date(now.getTime() + s.days * MS_PER_DAY);
  return {
    id,
    kind: s.kind,
    label: s.label,
    statutLabel: s.statutLabel,
    urgency: computeUrgency(dateProgrammee, now),
    dateProgrammee,
    texte: s.texte,
    etape: s.etape,
    accroche: s.accroche,
    signaux: s.signaux,
    thread: s.thread,
    prospect: s.prospect,
    prospectLinkedinUrl: s.prospectLinkedinUrl,
  };
}
