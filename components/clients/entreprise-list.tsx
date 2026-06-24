"use client";

import { useState } from "react";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { EntrepriseSummary } from "@/lib/domain/client";
import { STATUT_RELATION_LABEL } from "@/lib/domain/enums";

// Liste filtrable des entreprises (FR41). Recherche par nom, lien vers la fiche 360.
export function EntrepriseList({
  entreprises,
}: {
  entreprises: EntrepriseSummary[];
}) {
  const [query, setQuery] = useState("");
  const visible = entreprises.filter((e) =>
    e.nom.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <Input
        placeholder="Rechercher une entreprise…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Rechercher une entreprise"
      />

      {visible.length === 0 ? (
        <p className="text-muted-foreground py-8 text-center text-sm">
          Aucune entreprise.
        </p>
      ) : (
        <ul className="divide-glass-line border-solid-line divide-y overflow-hidden rounded-lg border">
          {visible.map((e) => (
            <li key={e.id}>
              <Link
                href={`/entreprises/${e.id}`}
                className="hover:bg-glass-2 flex items-center gap-3 px-4 py-3 transition-colors"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm">{e.nom}</span>
                  <span className="text-muted-2 block text-xs">
                    {e.ville ?? "—"}
                  </span>
                </span>
                <span className="text-muted-2 hidden text-xs sm:block">
                  {e.nbContacts} contact·s · {e.nbProjets} projet·s
                </span>
                <Badge>{STATUT_RELATION_LABEL[e.statutRelation]}</Badge>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
