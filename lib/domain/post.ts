import type { Piste } from "@/lib/domain/enums";

// Vue minimale d'un post pour la logique de créneaux/cascade (piste + date programmée).
export interface PostSlot {
  id: string;
  piste: Piste;
  dateProgrammee: Date | null;
}
