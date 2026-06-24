import { describe, it, expect } from "vitest";

import {
  applyTemplateVariables,
  filterTemplates,
  type MessageTemplate,
} from "@/lib/domain/template";

describe("applyTemplateVariables (UX-DR19)", () => {
  it("remplace [prénom] et [signature]", () => {
    const out = applyTemplateVariables("Bonjour [prénom],\n[signature]", {
      prenom: "Awa",
      signature: "Renaud",
    });
    expect(out).toBe("Bonjour Awa,\nRenaud");
  });

  it("laisse le placeholder si la variable n'est pas fournie", () => {
    expect(applyTemplateVariables("Salut [prénom]", {})).toBe("Salut [prénom]");
  });
});

describe("filterTemplates", () => {
  const items: MessageTemplate[] = [
    { id: "a", categorie: "premier-contact", titre: "A", texte: "" },
    { id: "b", categorie: "post", titre: "B", texte: "" },
  ];
  it("filtre par catégorie ou renvoie tout", () => {
    expect(filterTemplates(items, "all")).toHaveLength(2);
    expect(filterTemplates(items, "post").map((t) => t.id)).toEqual(["b"]);
  });
});
