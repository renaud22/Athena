import { ProductionBoard } from "@/components/kanban/production-board";
import { getSampleProductionItems } from "@/lib/server/kanban";

// Kanban Production (route `/production`) — vue de prise de recul, jamais le driver
// quotidien (FR34). Source = jeu d'exemples en attendant la lecture des posts/DMs (DB).
export default function ProductionPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-2xl">Production</h1>
        <p className="text-muted-foreground text-sm">
          Posts et messages par état de rédaction — vue de prise de recul.
        </p>
      </div>
      <ProductionBoard items={getSampleProductionItems()} />
    </div>
  );
}
