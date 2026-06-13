# Gravity

A Windows app download platform with a galaxy/dark theme. Users sign in before downloading. The owner can upload the .exe and toggle download availability.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm --filter @workspace/gravity run dev` — run the frontend (port 23258)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string
- Required env: `CLERK_SECRET_KEY`, `CLERK_PUBLISHABLE_KEY`, `VITE_CLERK_PUBLISHABLE_KEY` — Clerk auth (auto-provisioned)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind v4, framer-motion, Clerk React, wouter
- API: Express 5 + Clerk Express middleware
- DB: PostgreSQL + Drizzle ORM
- Auth: Replit-managed Clerk (Google OAuth + email OTP)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — API contract (source of truth)
- `lib/db/src/schema/release.ts` — release table schema
- `artifacts/api-server/src/routes/release.ts` — all release endpoints
- `artifacts/api-server/uploads/` — uploaded .exe files stored here
- `artifacts/gravity/src/App.tsx` — Clerk setup + routing
- `artifacts/gravity/src/pages/` — home, download, admin, auth pages
- `artifacts/gravity/public/logo.svg` — transparent gravity SVG icon

## Architecture decisions

- File uploads use multer directly (not in OpenAPI spec) to avoid Blob/File type issues with Zod codegen in Node context
- Owner detection uses Clerk session claims email — no separate roles table needed
- Release row is singleton (one row ever); created lazily on first GET
- Auth is cookie-based on web (no Bearer token needed); Clerk proxy middleware at `/api/__clerk`

## Product

- Public landing page with animated galaxy background, gravity logo, feature sections, downloadable SVG icon
- Sign in required before downloading (Google OAuth or email with OTP code)
- Download page shows release status (Updated = downloadable, Not Updated = disabled)
- Admin panel (owner email: adammalik1234674@gmail.com) — upload .exe, set version, toggle availability

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `releaseTable` must be exported from `lib/db/src/schema/index.ts` and `pnpm run typecheck:libs` run before the API server typecheck sees it
- Clerk Tailwind v4: set `tailwindcss({ optimize: false })` in vite.config.ts to prevent prod build breakage
- File upload route `/api/release/upload` is NOT in the OpenAPI spec — use raw fetch with FormData on the frontend

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See the `clerk-auth` skill for Clerk setup details
