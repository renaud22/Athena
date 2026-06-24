# CRM Solutix — Guide projet pour Claude Code

> Ce fichier ne contient QUE le spécifique au projet. Les règles générales (méthode de
> travail, qualité, réutilisation de composants, sécurité, Git/commits/PR/push, Tests & TDD,
> CI) sont dans ma config globale `~/.claude/CLAUDE.md` et s'appliquent automatiquement ici.

## Vue d'ensemble
- **But** : Cockpit de prospection / CRM Solutix — outil mono-utilisateur (prospection LinkedIn « cockpit d'action » + gestion client « CRM classique »). Specs complètes dans `_bmad-output/planning-artifacts/` (PRD, ARCHITECTURE-SPINE, DESIGN/EXPERIENCE, epics.md).
- **Type** : monolithe Next.js (App Router), TypeScript.
- **Hébergement** : Vercel. **Gestionnaire de paquets** : pnpm. **Dépôt distant** : `git@github.com:renaud22/Athena.git` (CI GitHub Actions à monter : lint + typecheck + tests, bloquante).
- **BDD** : PostgreSQL (**Supabase**) via **Prisma 7** (pooler Supavisor `6543` `?pgbouncer=true` + `DIRECT_URL` `5432`). **Auth** : **Supabase Auth** + RLS. Noms d'env : voir `.env.local.example`.

> Renseigne les <...> au fil de l'eau, ou lance /onboard une fois le code en place.

## Architecture (Next.js App Router)
- `app/` : routes (Server Components par défaut), `route.ts` pour les API, `layout.tsx`/`page.tsx`.
- Logique métier hors des composants : couche `lib/` ou `server/` (services, accès données).
- Accès BDD centralisé (`lib/db`, repositories) — pas de requêtes éparpillées.

## Commandes (pnpm)
| Action            | Commande                              |
|-------------------|---------------------------------------|
| Install           | `pnpm install`                        |
| Dev               | `pnpm dev`                            |
| Build             | `pnpm build`                          |
| Lint              | `pnpm lint`                           |
| Typecheck         | `pnpm typecheck` (ou `npx tsc --noEmit`) |
| Tests unit/intég. | `pnpm test` (Vitest)                  |
| Tests E2E         | `pnpm exec playwright test`           |
| Migrations        | `<pnpm prisma migrate dev>` ou `<pnpm drizzle-kit ...>` |

## Conventions spécifiques (en plus des règles globales)
- **Server Components par défaut** ; `"use client"` uniquement si état/interactivité.
- Récupération des données côté serveur (Server Components, Route Handlers, Server Actions) ;
  état serveur côté client via TanStack Query si besoin.
- **Validation** des entrées avec zod aux frontières (Route Handlers, Server Actions).
- **Secrets** : jamais côté client ; seules les variables `NEXT_PUBLIC_*` sont exposées.

## Spécificités Vercel / serverless
- Pas de tâche longue/bloquante en serverless : externalise (cron Vercel, file, job). Timeouts.
- Variables d'env dans le dashboard Vercel (+ `.env.local` en dev) — ne commits pas `.env*`.
- Runtime Node vs Edge selon les besoins (accès BDD = souvent Node).

## Règles spécifiques au domaine CRM
- Accès aux données (clients, contacts, deals) : valide + vérifie l'autorisation
  (ownership / rôle) sur chaque Route Handler et Server Action. Pas d'IDOR.
- Ne logue pas de données sensibles en clair.

## Pièges connus
- <Zones fragiles, à compléter au fil de l'eau>
