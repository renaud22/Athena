import { ExternalLink } from "lucide-react";

import type { TaskKind } from "@/lib/domain/dashboard";
import { linkedinActionLabel, linkedinActionUrl } from "@/lib/domain/linkedin";

// Lien contextuel vers LinkedIn (FR14) — ouvre un nouvel onglet. L'app ne publie/n'envoie
// jamais (AD-10) : on ouvre seulement le bon endroit. Bleu = accent LinkedIn (UX-DR5).
export function LinkedinLink({
  kind,
  prospectLinkedinUrl,
}: {
  kind: TaskKind;
  prospectLinkedinUrl: string | null;
}) {
  return (
    <a
      href={linkedinActionUrl(kind, prospectLinkedinUrl)}
      target="_blank"
      rel="noopener noreferrer"
      className="text-cat-blue inline-flex items-center gap-1.5 text-sm hover:underline"
    >
      {linkedinActionLabel(kind)}
      <ExternalLink className="size-3.5" aria-hidden="true" />
    </a>
  );
}
