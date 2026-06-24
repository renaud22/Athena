import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Étend `expect` de Vitest avec les matchers DOM (@testing-library/jest-dom),
// ex. toBeInTheDocument(), toHaveClass() — utilisés par les tests de composants.
import "@testing-library/jest-dom/vitest";

// Avec `globals: false`, l'auto-cleanup de @testing-library/react n'est pas branché
// (il s'accroche au afterEach global). On le câble explicitement pour éviter que les
// rendus s'accumulent dans le DOM entre les tests.
afterEach(() => {
  cleanup();
});
