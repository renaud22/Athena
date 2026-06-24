import { Lightbulb } from "lucide-react";

// « Ligne de prospection » (FR44, COULD) : court texte de guidage en LECTURE SEULE, ton
// direct/tutoiement, sans fausse urgence. Oriente l'action sans imposer de stratégie.
export function ProspectionLine({ conseil }: { conseil: string }) {
  return (
    <div
      role="note"
      className="border-glass-line bg-glass text-muted-foreground flex items-start gap-2 rounded-sm border px-3 py-2 text-sm"
    >
      <Lightbulb
        className="text-gold mt-0.5 size-4 shrink-0"
        aria-hidden="true"
      />
      <p>{conseil}</p>
    </div>
  );
}
