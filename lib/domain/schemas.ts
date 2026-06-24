import { z } from "zod";

// Validation aux frontières (NFR4/AD-14). Schémas zod purs, partageables formulaire/Server
// Action. Les erreurs alimentent `fieldErrors` de l'ActionResult.

function isLinkedinUrl(value: string): boolean {
  try {
    const { hostname } = new URL(value);
    // Accepte linkedin.com et ses sous-domaines (www., fr.) ; rejette tout suffixe piégé.
    return /(^|\.)linkedin\.com$/i.test(hostname);
  } catch {
    return false;
  }
}

// Enregistrement d'une personne à prospecter (FR19) : identité minimale = nom + URL LinkedIn.
export const registerProspectSchema = z.object({
  prospect: z.string().trim().min(1, "Le nom est requis"),
  linkedinUrl: z
    .string()
    .trim()
    .min(1, "L'URL LinkedIn est requise")
    .refine(isLinkedinUrl, "Doit être une URL LinkedIn valide"),
});

export type RegisterProspectInput = z.infer<typeof registerProspectSchema>;
