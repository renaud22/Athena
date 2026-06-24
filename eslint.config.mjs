import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Helpers locaux machine (contournement install OneDrive/Defender), gitignorés.
    "_*.cjs",
    "_*.mjs",
    "_*.js",
    // Artefacts de planification BMAD (non sources).
    "_bmad/**",
    "_bmad-output/**",
    "coverage/**",
  ]),
]);

export default eslintConfig;
