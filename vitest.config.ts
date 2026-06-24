import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Racine du projet (sert d'alias "@/*" — aligné sur tsconfig paths).
const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": root },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    // Imports explicites (describe/it/expect) plutôt que des globaux : tests plus lisibles.
    globals: false,
    include: ["**/*.{test,spec}.{ts,tsx}"],
    // Les artefacts BMAD et le scaffold ne contiennent pas de tests à scanner.
    exclude: ["node_modules/**", ".next/**", "_bmad/**", "_bmad-output/**"],
  },
});
