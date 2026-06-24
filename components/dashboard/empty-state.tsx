import { Check } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

// To-do vide (FR9/UX-DR29) : message confiant, badge ✓ or, une seule action retour.
// Pas de remplissage ni de fausse urgence.
export function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <span className="bg-gold-soft text-gold flex size-12 items-center justify-center rounded-full">
        <Check className="size-6" aria-hidden="true" />
      </span>
      <p className="font-display text-lg">Tout est prêt</p>
      <p className="text-muted-foreground max-w-xs text-sm">
        Aucune action en attente. Rien d&apos;urgent à préparer pour
        l&apos;instant.
      </p>
      <Button variant="ghost" asChild>
        <Link href="/avancement">Voir l&apos;avancement</Link>
      </Button>
    </div>
  );
}
