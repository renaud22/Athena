"use client";

import { useState } from "react";

import { CopyButton } from "@/components/detail/copy-button";
import { StepTag } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  filterTemplates,
  TEMPLATE_FILTERS,
  templateCategoryLabel,
  type MessageTemplate,
  type TemplateFilter,
} from "@/lib/domain/template";
import { cn } from "@/lib/utils";

export function TemplateLibrary({
  templates,
}: {
  templates: MessageTemplate[];
}) {
  const [filter, setFilter] = useState<TemplateFilter>("all");
  const visible = filterTemplates(templates, filter);

  return (
    <div className="space-y-4">
      {/* Onglets de filtre — un seul actif (fond or), UX-DR26. */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filtrer les modèles"
      >
        {TEMPLATE_FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            aria-pressed={filter === f.key}
            className={cn(
              "rounded-full border px-3 py-1 text-xs transition-colors",
              filter === f.key
                ? "bg-primary text-primary-foreground border-transparent"
                : "border-glass-line text-muted-foreground hover:bg-glass-2",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <p className="font-display">Aucun modèle</p>
          <Button variant="gold">Créer un modèle</Button>
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {visible.map((t) => (
            <li key={t.id}>
              <article className="border-solid-line from-solid-2 to-solid space-y-2 rounded-lg border bg-gradient-to-b p-4">
                <StepTag>{templateCategoryLabel(t.categorie)}</StepTag>
                <h3 className="font-display text-sm">{t.titre}</h3>
                <p className="text-muted-foreground line-clamp-4 text-xs whitespace-pre-wrap">
                  {t.texte}
                </p>
                <CopyButton
                  text={t.texte}
                  variant="ghost"
                  size="sm"
                  label="Copier le modèle"
                />
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
