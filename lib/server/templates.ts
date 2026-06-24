import type { MessageTemplate } from "@/lib/domain/template";

// Jeu d'exemples (lot DB bloqué). À remplacer par la lecture de l'entité ModeleMessage.
export function getSampleTemplates(): MessageTemplate[] {
  return [
    {
      id: "t1",
      categorie: "premier-contact",
      titre: "Connexion — accroche signal",
      texte:
        "Bonjour [prénom], votre approche sur [sujet] m'a parlé. Je me permets de me connecter, au plaisir d'échanger.\n[signature]",
    },
    {
      id: "t2",
      categorie: "relance",
      titre: "Relance douce — Touche 2",
      texte:
        "Bonjour [prénom], mon message précédent s'est peut-être perdu. L'idée tient toujours si le sujet vous parle.\n[signature]",
    },
    {
      id: "t3",
      categorie: "qualification",
      titre: "Qualification — proposer un créneau",
      texte:
        "Super [prénom] ! 15 min cette semaine pour cadrer le besoin ? Voici mon agenda : [lien].\n[signature]",
    },
    {
      id: "t4",
      categorie: "post",
      titre: "Post — mini-cas client",
      texte:
        "Un client, un problème, une solution en 3 jours. Voici ce qu'on a fait et ce que ça a changé.",
    },
  ];
}
