# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Sindifacil is an ERP for small businesses in Brazil. This repo is the **frontend only**
(Next.js + TypeScript). The backend (NestJS + PostgreSQL + TypeORM) lives in a sibling
repo: `sindifacil-back` (https://github.com/FernandoBersellini/sindifacil-back).

- App language: Portuguese (Brazil) — UI copy, labels, and error messages should be in pt-BR.
- Date format: `DD/MM/YYYY`. CPF format: `000.000.000-00`.
- Frontend runs on port 3002; backend on port 3001 (`http://localhost:3001/api/v1`).

## Commands

```
npm run dev      # start dev server (localhost:3002 by convention; backend must run separately)
npm run build     # production build
npm run start     # run production build
npm run lint      # eslint
```

No test suite is configured yet.

## Architecture

Next.js App Router project. Data flow: **UI component → TanStack Query hook → `lib/api/*`
resource module → `lib/api/client.ts`**.

- `app/providers.tsx` sets up a single `QueryClient` via `QueryClientProvider`, wrapped
  around everything in `app/layout.tsx`. All data-fetching components must be client
  components (`"use client"`) for hooks to work.
- `lib/api/client.ts` — the only place that calls `fetch`. Exports `apiClient` with
  `get/post/patch/delete`, all going through a shared `request()` that JSON-encodes
  bodies, reads `NEXT_PUBLIC_API_BASE_URL` (falls back to `http://localhost:3001/api/v1`),
  and throws `ApiError` (with `status` and parsed `body`) on non-2xx responses.
- `lib/api/<resource>.ts` (e.g. `employees.ts`) — one file per backend resource, mapping
  CRUD operations to REST paths and typing them against `types/<resource>.ts`. Follow this
  pattern for new resources rather than calling `apiClient` directly from components.
- `hooks/use<Resource>.ts` — read hooks (`useQuery`), with a `<resource>Keys` query-key
  factory (e.g. `employeesKeys.all`, `employeesKeys.detail(id)`) exported alongside for
  reuse in mutation invalidation.
- `hooks/use<Resource>Mutations.ts` — write hooks (`useMutation`), each invalidating the
  relevant query keys from the sibling `use<Resource>.ts` file `onSuccess`.
- Components (`components/*.tsx`) consume the hooks directly; there is no separate service
  or store layer beyond this.
- Styling is Tailwind v4 (`@import "tailwindcss"` in `app/globals.css`), utility classes
  inline, no component library. Dark mode via `prefers-color-scheme` and `dark:` variants.
- Path alias `@/*` maps to the repo root (see `tsconfig.json`).

## Backend API contract

The backend has no OpenAPI/Swagger yet, so its actual contract is documented by hand in
`docs/` — read the relevant file there before wiring up a new integration, since routes,
DTOs, and auth requirements aren't derivable from this repo alone:

- `docs/auth.md` — current state of `/auth/login/admin` and `/auth/login/employee`,
  response shape, JWT usage, and which routes are guarded. Key points not yet reflected
  in this codebase: `EmployeeController` routes now require `Authorization: Bearer <token>`
  from an **admin** login (`role: "ADMIN"`); `lib/api/client.ts` does not yet attach any
  auth header. There is no refresh/logout/`/auth/me` endpoint — the frontend must persist
  and decode the login response itself.
- `docs/associates.md` — the `Associate` resource (digitized union-member "ficha"
  records). Not yet implemented in this frontend. Key points: uses bare REST verbs on
  the resource root (`POST/GET /associate`, `GET/PATCH/DELETE /associate/:id`) —
  singular `associate`, unlike Employees' `/employees/create`-style paths. **No auth
  guard yet** — routes are public despite `Employees` requiring an admin JWT. No
  `ValidationPipe`, so `PATCH` will silently accept undeclared fields (e.g.
  `registrationNumber`, which isn't on `CreateAssociateDto` but is on the entity).
  `registrationNumber` can't be set on create, only via a follow-up `PATCH`. `birthDate`
  round-trips as a full ISO timestamp on read even though create takes a plain date
  string. File-upload metadata fields (`storageKey`, `originalFilename`, `mimeType`,
  `uploadedAt`) exist on the entity but are always `null` — no upload endpoint exists.

The employee REST paths/DTOs are also summarized in the root `README.md`, but `docs/auth.md`
and `docs/associates.md` are the source of truth for their respective resources.
