// Bibliothèque de modèles de messages réutilisables (FR33). Catégories = onglets de filtre.
export type TemplateCategory =
  | "premier-contact"
  | "relance"
  | "qualification"
  | "post";
export type TemplateFilter = TemplateCategory | "all";

export const TEMPLATE_FILTERS: { key: TemplateFilter; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "premier-contact", label: "Premier contact" },
  { key: "relance", label: "Relance" },
  { key: "qualification", label: "Qualification" },
  { key: "post", label: "Post LinkedIn" },
];

const CATEGORY_LABEL: Record<TemplateCategory, string> = {
  "premier-contact": "Premier contact",
  relance: "Relance",
  qualification: "Qualification",
  post: "Post LinkedIn",
};

export function templateCategoryLabel(c: TemplateCategory): string {
  return CATEGORY_LABEL[c];
}

export interface MessageTemplate {
  id: string;
  categorie: TemplateCategory;
  titre: string;
  texte: string;
}

export function filterTemplates(
  items: MessageTemplate[],
  filter: TemplateFilter,
): MessageTemplate[] {
  if (filter === "all") return items;
  return items.filter((t) => t.categorie === filter);
}

/**
 * Remplace les variables d'un modèle (UX-DR19) : `[prénom]` et `[signature]`. Une variable
 * sans valeur fournie est laissée telle quelle (placeholder visible). Pure.
 */
export function applyTemplateVariables(
  text: string,
  vars: { prenom?: string; signature?: string },
): string {
  let out = text;
  if (vars.prenom) out = out.replaceAll("[prénom]", vars.prenom);
  if (vars.signature) out = out.replaceAll("[signature]", vars.signature);
  return out;
}
