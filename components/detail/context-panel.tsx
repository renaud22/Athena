import { ConversationThread } from "@/components/detail/conversation-thread";
import { StepTag } from "@/components/ui/badge";
import { ETAPE_LABEL } from "@/lib/domain/enums";
import type { TaskDetail } from "@/lib/domain/task-detail";

// Panneau contexte de rédaction (FR17, colonne droite) — entièrement en LECTURE SEULE :
// step-tag de l'étape (UX-DR13), accroche + signaux surlignés or, fil des touches.
// Aucune édition de champ de statut côté prospection (AD-13).
export function ContextPanel({ detail }: { detail: TaskDetail }) {
  return (
    <aside className="min-[1080px]:border-glass-line space-y-5 min-[1080px]:border-l min-[1080px]:pl-5">
      {detail.etape && <StepTag>{ETAPE_LABEL[detail.etape]}</StepTag>}

      {detail.accroche && (
        <section className="space-y-2">
          <h2 className="eyebrow">Accroche</h2>
          <p className="text-muted-foreground text-sm">{detail.accroche}</p>
          {detail.signaux.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {detail.signaux.map((signal) => (
                <li key={signal}>
                  <span className="bg-gold-soft text-gold rounded-sm px-1.5 py-0.5 text-xs">
                    {signal}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {detail.thread.length > 0 && (
        <section className="space-y-2">
          <h2 className="eyebrow">Fil des touches</h2>
          <ConversationThread messages={detail.thread} />
        </section>
      )}

      {detail.prospect !== "—" && (
        <section className="space-y-1">
          <h2 className="eyebrow">Prospect</h2>
          <p className="text-sm">{detail.prospect}</p>
        </section>
      )}
    </aside>
  );
}
