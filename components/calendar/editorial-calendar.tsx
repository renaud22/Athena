import { Badge } from "@/components/ui/badge";
import { UrgencyPill } from "@/components/ui/urgency-pill";
import type { CalendarSlot } from "@/lib/domain/calendar";
import { type Piste } from "@/lib/domain/enums";
import { cn } from "@/lib/utils";

// Pistes distinguées par accent catégoriel (UX-DR5) : mardi bleu, jeudi violet.
const pisteMeta: Record<
  Piste,
  { label: string; accent: string; badge: "blue" | "violet" }
> = {
  MARDI: { label: "Mardi", accent: "text-cat-blue", badge: "blue" },
  JEUDI: { label: "Jeudi", accent: "text-cat-violet", badge: "violet" },
};

function formatSlotDate(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    timeZone: "Europe/Paris",
  }).format(date);
}

export function EditorialCalendar({
  calendar,
}: {
  calendar: Record<Piste, CalendarSlot[]>;
}) {
  const slots = Object.values(calendar) as CalendarSlot[][];
  const empty = slots.every((column) => column.every((s) => s.post === null));
  if (empty) {
    return (
      <p className="text-muted-foreground py-12 text-center text-sm">
        Aucun post programmé pour le moment.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {(Object.keys(pisteMeta) as Piste[]).map((piste) => {
        const meta = pisteMeta[piste];
        return (
          <section key={piste} className="space-y-2">
            <h2 className={cn("font-display text-sm", meta.accent)}>
              {meta.label}
            </h2>
            <ul className="space-y-2">
              {calendar[piste].map((slot) => (
                <li key={slot.date.toISOString()}>
                  <div className="border-glass-line bg-glass flex items-center gap-3 rounded-sm border px-3 py-2">
                    <span className="text-muted-2 w-24 shrink-0 text-xs">
                      {formatSlotDate(slot.date)}
                    </span>
                    {slot.post ? (
                      <>
                        <span className="min-w-0 flex-1 truncate text-sm">
                          {slot.post.titre}
                        </span>
                        <UrgencyPill level={slot.urgency} />
                        <Badge variant={meta.badge}>
                          {slot.post.statutLabel}
                        </Badge>
                      </>
                    ) : (
                      <span className="text-muted-2 flex-1 text-sm italic">
                        Créneau libre
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
