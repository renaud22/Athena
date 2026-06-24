import {
  AVANCEMENT_COLUMNS,
  buildAvancementBoard,
  type ProspectionItem,
} from "@/lib/domain/avancement";
import type { UrgencyLevel } from "@/lib/domain/urgency";
import { cn } from "@/lib/utils";

const railColor: Record<UrgencyLevel, string> = {
  none: "border-l-u-none",
  far: "border-l-u-far",
  soon: "border-l-u-soon",
  now: "border-l-u-now",
};

// Kanban Avancement (FR36) : prospections par étape de séquence, vue de prise de recul,
// en LECTURE (le déplacement = Server Action, Story 5.2/DB). Pas une fiche riche.
export function AvancementBoard({ items }: { items: ProspectionItem[] }) {
  const board = buildAvancementBoard(items);
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {AVANCEMENT_COLUMNS.map((col) => (
        <section key={col} className="space-y-2">
          <h2 className="eyebrow flex items-center justify-between">
            <span>{col}</span>
            <span className="text-muted-2">{board[col].length}</span>
          </h2>
          <ul className="space-y-2">
            {board[col].map((item) => (
              <li key={item.id}>
                <div
                  className={cn(
                    "border-glass-line bg-glass rounded-sm border border-l-[3px] p-3",
                    railColor[item.urgency],
                  )}
                >
                  <span className="text-sm">{item.prospect}</span>
                </div>
              </li>
            ))}
            {board[col].length === 0 && (
              <li className="text-muted-2 text-xs italic">—</li>
            )}
          </ul>
        </section>
      ))}
    </div>
  );
}
