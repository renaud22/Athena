import type { Piste } from "@/lib/domain/enums";
import type { UrgencyLevel } from "@/lib/domain/urgency";

// Un post programmé, vu par le calendrier éditorial.
export interface ScheduledPost {
  id: string;
  titre: string;
  piste: Piste;
  dateProgrammee: Date;
  statutLabel: string;
}

// Un créneau du calendrier : une date de piste, son urgence dérivée, et le post qui
// l'occupe (ou null = créneau libre).
export interface CalendarSlot {
  date: Date;
  piste: Piste;
  urgency: UrgencyLevel;
  post: ScheduledPost | null;
}
