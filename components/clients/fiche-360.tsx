"use client";

import { useState } from "react";

import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatMontant, type Entreprise } from "@/lib/domain/client";
import {
  DOC_STATUT_LABEL,
  DOC_TYPE_LABEL,
  PROJET_STATUT_LABEL,
  STATUT_RELATION_LABEL,
} from "@/lib/domain/enums";
import { cn } from "@/lib/utils";

const TABS = ["Infos", "Contacts", "Projets", "Documents"] as const;
type Tab = (typeof TABS)[number];

// Fiche 360 à onglets (FR41) : infos + contacts + projets + documents. « Montrer la donnée
// proprement » — vue en lecture (l'édition = Server Action, Story 6.x/DB).
export function Fiche360({ entreprise }: { entreprise: Entreprise }) {
  const [tab, setTab] = useState<Tab>("Infos");
  const documents = entreprise.projets.flatMap((p) => p.documents);

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-2xl">{entreprise.nom}</h1>
        <Badge>{STATUT_RELATION_LABEL[entreprise.statutRelation]}</Badge>
        {entreprise.ville && (
          <span className="text-muted-2 text-sm">{entreprise.ville}</span>
        )}
      </header>

      <div role="tablist" className="border-glass-line flex gap-1 border-b">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={cn(
              "border-b-2 px-3 py-2 text-sm transition-colors",
              tab === t
                ? "border-gold text-foreground"
                : "text-muted-foreground hover:text-foreground border-transparent",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div role="tabpanel">
        {tab === "Infos" && (
          <dl className="space-y-3 text-sm">
            <Info label="Infos clés" value={entreprise.infosCles} />
            <Info
              label="Habitudes & préférences"
              value={entreprise.preferences}
            />
            <Info label="Notes" value={entreprise.notes} />
          </dl>
        )}

        {tab === "Contacts" && (
          <ul className="space-y-2">
            {entreprise.contacts.map((c) => (
              <li
                key={c.id}
                className="border-glass-line bg-glass flex flex-wrap items-center gap-x-3 gap-y-1 rounded-sm border p-3"
              >
                <span className="text-sm font-medium">
                  {c.prenom ? `${c.prenom} ${c.nom}` : c.nom}
                </span>
                {c.contactPrincipal && <Badge variant="gold">Principal</Badge>}
                {c.role && (
                  <span className="text-muted-2 text-xs">{c.role}</span>
                )}
                <span className="text-muted-foreground w-full text-xs">
                  {[c.email, c.telephone].filter(Boolean).join(" · ") || "—"}
                </span>
              </li>
            ))}
          </ul>
        )}

        {tab === "Projets" && (
          <ul className="space-y-2">
            {entreprise.projets.length === 0 && (
              <li className="text-muted-2 text-sm">Aucun projet.</li>
            )}
            {entreprise.projets.map((p) => (
              <li
                key={p.id}
                className="border-glass-line bg-glass flex flex-wrap items-center gap-3 rounded-sm border p-3"
              >
                <span className="min-w-0 flex-1 truncate text-sm">{p.nom}</span>
                <Badge>{PROJET_STATUT_LABEL[p.statut]}</Badge>
                <span className="text-muted-2 text-xs">
                  {formatMontant(p.montantEstime)}
                </span>
              </li>
            ))}
          </ul>
        )}

        {tab === "Documents" && (
          <ul className="space-y-2">
            {documents.length === 0 && (
              <li className="text-muted-2 text-sm">Aucun document.</li>
            )}
            {documents.map((d) => (
              <li
                key={d.id}
                className="border-glass-line bg-glass flex flex-wrap items-center gap-3 rounded-sm border p-3"
              >
                <span className="text-sm">
                  {DOC_TYPE_LABEL[d.type]}
                  {d.reference ? ` · ${d.reference}` : ""}
                </span>
                <Badge>{DOC_STATUT_LABEL[d.statut]}</Badge>
                <span className="text-muted-2 text-xs">
                  {formatMontant(d.montant)}
                </span>
                {d.lien && (
                  <a
                    href={d.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cat-blue ml-auto inline-flex items-center gap-1 text-xs hover:underline"
                  >
                    Ouvrir dans Indy
                    <ExternalLink className="size-3" aria-hidden="true" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="eyebrow">{label}</dt>
      <dd className="text-muted-foreground mt-1">{value ?? "—"}</dd>
    </div>
  );
}
