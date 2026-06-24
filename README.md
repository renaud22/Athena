# CRM Solutix (Athena)

Cockpit de prospection + CRM mono-utilisateur. Monolithe **Next.js 16** (App Router, server-first),
**TypeScript**, **Tailwind v4 + shadcn/ui** (thème sombre), **Prisma 7 + Supabase** (Auth + RLS),
déploiement **Vercel**. Specs : `_bmad-output/planning-artifacts/`.

## Prérequis

- Node.js 24+, pnpm 11+.

## Installation

```bash
pnpm install
```

> ⚠️ **Windows + OneDrive/Defender** : si `pnpm install` échoue en `ERR_PNPM_EPERM` sur des
> paquets natifs, lancer `bash _install.sh` à la place (helper local qui contourne le verrou).
> Détails et fix permanent : voir `MORNING-REPORT.md`.

## Commandes

| Action            | Commande            |
| ----------------- | ------------------- |
| Dev               | `pnpm dev`          |
| Build             | `pnpm build`        |
| Lint              | `pnpm lint`         |
| Typecheck         | `pnpm typecheck`    |
| Tests (Vitest)    | `pnpm test`         |
| Tests (watch)     | `pnpm test:watch`   |
| Format            | `pnpm format`       |

## Architecture (résumé)

- `app/` — routes (Server Components, runtime `nodejs`). Modules : `app/(prospection)` (Monde A),
  `app/(clients)` (Monde B). Cron keep-alive : `app/api/cron/keep-alive/`.
- `lib/server/` — repositories, Server Actions, machine à états, calcul d'urgence.
- `lib/domain/` — types métier (`ActionResult`, enums, gardes d'exhaustivité).
- `components/ui/` — primitives shadcn réutilisables.
- `prisma/` — schéma (source de vérité), migrations, seed.

Règles d'architecture : `_bmad-output/planning-artifacts/architecture/.../ARCHITECTURE-SPINE.md`.
Conventions projet : `CLAUDE.md`.

## Configuration

Copier `.env.local.example` → `.env.local` et renseigner les variables Supabase. Aucun secret
n'est committé ; seules les variables `NEXT_PUBLIC_*` sont exposées au navigateur.
