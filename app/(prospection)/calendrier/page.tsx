import { EditorialCalendar } from "@/components/calendar/editorial-calendar";
import {
  buildEditorialCalendar,
  getSampleScheduledPosts,
} from "@/lib/server/calendar";

// Calendrier éditorial (route `/calendrier`). Server Component : urgence dérivée côté
// serveur. Source = jeu d'exemples en attendant la lecture des PostLinkedIn (lot DB).
export default function CalendrierPage() {
  const now = new Date();
  const calendar = buildEditorialCalendar(getSampleScheduledPosts(now), now);
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="font-display text-2xl">Calendrier éditorial</h1>
      <EditorialCalendar calendar={calendar} />
    </div>
  );
}
