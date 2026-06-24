import { postCharStats } from "@/lib/domain/post-text";
import { cn } from "@/lib/utils";

// Compteur de caractères discret pour la rédaction de post (FR43/UX-DR25) : barre de
// progression vers le repère ~210 + libellé. Au-delà du repère, la barre passe en orange
// (indicatif, jamais bloquant).
export function CharacterCounter({ text }: { text: string }) {
  const { count, threshold, ratio, overThreshold } = postCharStats(text);
  return (
    <div
      className="flex items-center gap-2"
      aria-label="Compteur de caractères"
    >
      <div className="bg-glass-2 h-1 w-24 overflow-hidden rounded-full">
        <div
          className={cn(
            "h-full rounded-full transition-[width]",
            overThreshold ? "bg-u-soon" : "bg-gold",
          )}
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
      <span className="text-muted-2 text-xs tabular-nums">
        {count} / {threshold}
      </span>
    </div>
  );
}
