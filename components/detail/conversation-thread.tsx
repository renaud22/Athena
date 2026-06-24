import type { ThreadMessage } from "@/lib/domain/task-detail";
import { cn } from "@/lib/utils";

// Fil des touches déjà échangées (UX-DR20), en LECTURE SEULE : bulles distinguant moi
// (or doux + bordure or) et le prospect (verre). Aide à écrire la touche suivante vite.
export function ConversationThread({
  messages,
}: {
  messages: ThreadMessage[];
}) {
  if (messages.length === 0) return null;
  return (
    <ol className="flex flex-col gap-2">
      {messages.map((m) => {
        const mine = m.from === "moi";
        return (
          <li
            key={m.id}
            className={cn("flex", mine ? "justify-end" : "justify-start")}
          >
            <div
              className={cn(
                "max-w-[85%] rounded-sm border px-3 py-2 text-xs",
                mine
                  ? "border-gold-line bg-gold-soft text-foreground"
                  : "border-glass-line bg-glass text-muted-foreground",
              )}
            >
              {m.texte}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
