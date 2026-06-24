import { EntrepriseList } from "@/components/clients/entreprise-list";
import { getSampleEntreprises } from "@/lib/server/clients";

// Liste des entreprises clientes (route `/entreprises`). Source = jeu d'exemples en
// attendant la lecture des Entreprises (lot DB).
export default function EntreprisesPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="font-display text-2xl">Entreprises</h1>
      <EntrepriseList entreprises={getSampleEntreprises()} />
    </div>
  );
}
