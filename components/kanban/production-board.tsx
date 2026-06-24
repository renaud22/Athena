"use client";

import { useState } from "react";

import { Mail, SquarePen } from "lucide-react";

import {
  buildProductionBoard,
  filterProductionItems,
  PRODUCTION_COLUMNS,
  type ProductionFilter,
  type ProductionItem,
} from "@/lib/domain/kanban";
import type { UrgencyLevel } from "@/lib/domain/urgency";
import { cn } from "@/lib/utils";

const FILTERS: { key: ProductionFilter; label: string }[] = [
  { key: "all", label: "Tout" },
  { key: "post", label: "Posts" },
  { key: "dm", label: "Messages" },
];

const railColor: Record<UrgencyLevel, string> = {
  none: "border-l-u-none",
  far: "border-l-u-far",
  soon: "border-l-u-soon",
  now: "border-l-u-now",
};

export function ProductionBoard({ items }: { items: ProductionItem[] }) {
  const [filter, setFilter] = useState<ProductionFilter>("all");
  const board = buildProductionBoard(filterProductionItems(items, filter));

  return (
    <div className="space-y-4">
      {/* Chips de filtre — un seul actif (fond or), FR35/UX-DR16. */}
      <div
        className="flex gap-2"
        role="group"
        aria-label="Filtrer la production"
      >
        {FILTERS.map((f) => (
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTION_COLUMNS.map((col) => (
          <section key={col} className="space-y-2">
            <h2 className="eyebrow flex items-center justify-between">
              <span>{col}</span>
              <span className="text-muted-2">{board[col].length}</span>
            </h2>
            <ul className="space-y-2">
              {board[col].map((item) => {
                const Icon = item.kind === "post" ? SquarePen : Mail;
                return (
                  <li key={item.id}>
                    <div
                      className={cn(
                        "border-glass-line bg-glass rounded-sm border border-l-[3px] p-3",
                        railColor[item.urgency],
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon
                          className="text-muted-foreground size-3.5 shrink-0"
                          aria-label={
                            item.kind === "post"
                              ? "Publication"
                              : "Message direct"
                          }
                        />
                        <span className="min-w-0 flex-1 truncate text-sm">
                          {item.titre}
                        </span>
                      </div>
                      <p className="text-muted-2 mt-1 text-xs">{item.meta}</p>
                    </div>
                  </li>
                );
              })}
              {board[col].length === 0 && (
                <li className="text-muted-2 text-xs italic">—</li>
              )}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
