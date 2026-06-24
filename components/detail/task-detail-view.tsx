import { ContextPanel } from "@/components/detail/context-panel";
import { CopyButton } from "@/components/detail/copy-button";
import { LinkedinLink } from "@/components/detail/linkedin-link";
import { ReadingSurface } from "@/components/detail/reading-surface";
import { Badge } from "@/components/ui/badge";
import { UrgencyPill } from "@/components/ui/urgency-pill";
import type { TaskDetail } from "@/lib/domain/task-detail";

// Écran prioritaire : vue détail centrée sur le texte (FR10/UX-DR17). Double colonne
// équilibrée (rédaction ~65% / contexte ~35%), repliée en une colonne sous 1080px
// (UX-DR25/35). Le modèle de boutons d'actions est identique post/DM (FR18).
export function TaskDetailView({ detail }: { detail: TaskDetail }) {
  return (
    <div className="grid gap-5 min-[1080px]:grid-cols-[1fr_340px]">
      <div className="space-y-4">
        <header className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{detail.statutLabel}</Badge>
            <UrgencyPill level={detail.urgency} />
          </div>
          <h1 className="font-display text-2xl">{detail.label}</h1>
        </header>

        <ReadingSurface>{detail.texte}</ReadingSurface>

        <div className="flex flex-wrap items-center gap-4">
          <CopyButton text={detail.texte} />
          <LinkedinLink
            kind={detail.kind}
            prospectLinkedinUrl={detail.prospectLinkedinUrl}
          />
        </div>
      </div>

      <ContextPanel detail={detail} />
    </div>
  );
}
