"use client";

import { Button } from "@/components/ui/button";

// Erreur de lecture (UX-DR31) : message clair + « Réessayer ». Boundary App Router.
export default function DashboardError({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 py-16 text-center">
      <p className="font-display text-lg">Lecture impossible</p>
      <p className="text-muted-foreground text-sm">
        Impossible de charger tes tâches pour le moment.
      </p>
      <Button variant="ghost" onClick={reset}>
        Réessayer
      </Button>
    </div>
  );
}
