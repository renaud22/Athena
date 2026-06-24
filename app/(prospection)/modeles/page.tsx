import { TemplateLibrary } from "@/components/templates/template-library";
import { getSampleTemplates } from "@/lib/server/templates";

// Bibliothèque de modèles (route `/modeles`). Source = jeu d'exemples en attendant
// l'entité ModeleMessage (lot DB).
export default function ModelesPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="font-display text-2xl">Modèles</h1>
      <TemplateLibrary templates={getSampleTemplates()} />
    </div>
  );
}
