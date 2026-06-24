import { AvancementBoard } from "@/components/kanban/avancement-board";
import { getSampleProspectionItems } from "@/lib/server/avancement";

// Kanban Avancement (route `/avancement`) — vue de prise de recul. Source = jeu
// d'exemples en attendant la lecture des prospections (DB).
export default function AvancementPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl">Avancement</h1>
        <p className="text-muted-foreground text-sm">
          Tes prospections par étape de séquence — vue de prise de recul.
        </p>
      </div>
      <AvancementBoard items={getSampleProspectionItems()} />
    </div>
  );
}
