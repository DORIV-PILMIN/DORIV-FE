# Repository Guidelines

## Project Structure & Module Organization
- `src/app/`: Next.js App Router pages and API route handlers (`page.tsx`, `route.ts`). Includes OAuth callback routes and `/api/*` proxy endpoints.
- `src/components/`: Shared UI components (for example, `Header.tsx`).
- `src/lib/`: Integration logic (`lib/api/*` for HTTP clients and auth/push APIs, `lib/utils/*` for OAuth helpers).
- `src/hooks/`: Reusable React hooks (for example, `usePush.ts`).
- `src/types/`: Shared TypeScript types for domain models.
- `public/icons/`: Static assets served directly.
- Root config: `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `eslint.config.mjs`.

## Build, Test, and Development Commands
- `npm install`: Install dependencies (repo uses `package-lock.json`, so prefer npm).
- `npm run dev`: Start local dev server at `http://localhost:3000`.
- `npm run lint`: Run ESLint (Next.js core-web-vitals + TypeScript rules).
- `npm run typecheck`: Run TypeScript checks without emit.
- `npm run qa`: Run full checks (`lint`, `typecheck`, `test` if defined, `build`).
- `npm run qa -- --staged`: Run commit-gating checks on staged JS/TS files + full `typecheck`.
- `npm run qa:fast`: Run quick checks (`lint`, `typecheck`).
- `npm run commit:qa -- <type> <korean message>`: Run staged QA first, then commit with `type : "메시지"` format.
- `npm run build`: Create production build and catch compile/runtime route issues.
- `npm run start`: Run the production build locally.
- `npm run prepare`: Install Git hooks path (`.githooks`) for pre-commit QA.

## Coding Style & Naming Conventions
- Language: TypeScript + React function components.
- Formatting: 2-space indentation, semicolons, double quotes.
- Imports: Use `@/*` alias for `src/*` paths (configured in `tsconfig.json`).
- Naming: Components in PascalCase (`Header.tsx`), hooks in camelCase with `use` prefix (`usePush.ts`), route files follow Next conventions (`page.tsx`, `layout.tsx`, `route.ts`).
- Styling: Tailwind utility classes in JSX; keep reusable UI patterns in `src/components`.

## Testing Guidelines
- No automated test framework is configured yet.
- Minimum pre-PR checks: `npm run lint`, `npm run build`, and manual smoke test of login/OAuth and key routes (`/`, `/main`, `/quiz`, `/result`).
- When adding tests, use `*.test.ts`/`*.test.tsx` naming and colocate near the feature or under a dedicated `src/__tests__/` folder.

## Commit & Pull Request Guidelines
- Prefer Conventional Commit prefixes used in history: `feat:`, `fix:`, `docs:`, `refactor:`.
- Keep commits focused and imperative (example: `feat: add push token refresh flow`).
- PRs should include: summary of user-facing changes, linked issue/task, environment variable changes, and screenshots/GIFs for UI updates.
- Mention any new routes, API contracts, or migration steps explicitly.

## Security & Configuration Tips
- Start from `.env.local.example`; never commit `.env.local`.
- Only expose `NEXT_PUBLIC_*` values to client code. Keep secrets (for example OAuth client secrets) server-side in route handlers.
