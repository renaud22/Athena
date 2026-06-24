import { notFound } from "next/navigation";

import { Fiche360 } from "@/components/clients/fiche-360";
import { getSampleEntreprise } from "@/lib/server/clients";

// Fiche 360 d'une entreprise (route `/entreprises/[id]`). Source = jeu d'exemples (DB).
export default async function EntreprisePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const entreprise = getSampleEntreprise(id);
  if (!entreprise) notFound();
  return (
    <div className="mx-auto max-w-3xl">
      <Fiche360 entreprise={entreprise} />
    </div>
  );
}
