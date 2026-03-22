# AGENTS.md

Instructions for AI agents (Copilot, Cursor, Windsurf, Claude Code, etc.) working with this codebase.

## Project Summary

Subtrackify Frontend is a subscription tracking SPA built with React 19, TypeScript, Vite 8, Tailwind CSS v4, Redux Toolkit, and shadcn/ui. Backend API runs separately on port 3000.

## Commands

```bash
npm run dev       # Start dev server (port 5173)
npm run build     # Type-check + production build
npm run lint      # ESLint check
npm run preview   # Serve production build
```

Always run `npm run build` after making changes to verify there are no type errors.

## Architecture

### Directory Layout

- `src/pages/` — Route page components
- `src/features/` — Domain modules (auth, subscriptions), each with `store/`, `components/`, `hooks/`
- `src/common/` — Shared code: store config, router, API client, UI components, utilities
- `src/components/ui/` — shadcn/ui primitives (do not edit manually, use `npx shadcn@latest add`)
- `src/lib/utils.ts` — `cn()` helper for Tailwind class merging

### State Management

Redux Toolkit with feature-based slices:

- Store: `src/common/store/store.ts`
- Typed hooks: `useAppDispatch`, `useAppSelector` from `src/common/store/hooks.ts`
- Feature slices: `src/features/<name>/store/slice.ts`
- Async thunks: `src/features/<name>/store/actions.ts`

### Routing

React Router v7 with `createBrowserRouter` in `src/common/router/router.tsx`:

- `ProtectedRouter` — requires authentication, redirects to `/login`
- `PublicRoute` — guest-only, redirects to `/` if authenticated
- `AuthInitializer` — checks token on app load

### API Client

Axios with interceptors in `src/common/api/client.ts`:

- Dev: Vite proxy `/api` -> `http://localhost:3000`
- Prod: `VITE_API_BASE_URL` env variable
- Auth: Bearer token auto-attached from localStorage

## Code Style Rules

1. **TypeScript strict mode** — no `any`, no unused variables, no unchecked side-effect imports
2. **Import alias** — always use `@/` for `src/` paths (e.g., `import { cn } from '@/lib/utils'`)
3. **Import order** (auto-sorted by Prettier): react -> react-router -> third-party -> @/lib -> @/components -> relative
4. **Formatting** — Prettier: single quotes, semicolons, 2-space indent, 100 char width, trailing commas (es5)
5. **Component structure** — each component in its own folder with `index.ts` barrel export
6. **No manual memoization** — React Compiler handles `useMemo`/`useCallback` automatically
7. **Form validation** — React Hook Form + Zod schemas
8. **Styling** — Tailwind CSS v4 utility classes, `cn()` for conditional classes

## Adding New Features

### New feature module

```
src/features/<name>/
├── store/
│   ├── slice.ts        # createSlice with initial state, reducers, extraReducers
│   ├── actions.ts      # createAsyncThunk for API calls
│   └── selectors.ts    # createSelector for memoized selectors
├── components/
│   └── <Component>/
│       ├── <Component>.tsx
│       └── index.ts
└── hooks/
    └── use<Hook>.ts
```

Register the reducer in `src/common/store/store.ts`.

### New page/route

1. Create `src/pages/<Name>.tsx`
2. Add route in `src/common/router/router.tsx`
3. Wrap with `ProtectedRouter` or `PublicRoute` as needed

### New shadcn/ui component

```bash
npx shadcn@latest add <component-name>
```

Do not manually create or edit files in `src/components/ui/`.

## Key Types

```typescript
// src/common/api/subscriptions.ts
interface Subscription {
  id: number;
  name: string;
  description?: string;
  price: number;
  currency: string;
  billingCycle: 'daily' | 'weekly' | 'monthly' | 'yearly';
  nextBillingDate: string;
  status: 'active' | 'cancelled' | 'paused';
  category?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

// src/common/api/auth.ts
interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
```

## Common Pitfalls

- `Subscription.id` is `number` (from API), not string — do not use `crypto.randomUUID()`
- shadcn/ui uses unified `radix-ui` package — import as `import { Dialog } from "radix-ui"`, not `@radix-ui/react-dialog`
- Tailwind CSS v4 has no `tailwind.config.js` — theme is configured in `src/assets/styles/index.css` via `@theme`
- React Compiler is active — avoid manual `useMemo`/`useCallback` unless there's a specific reason
- Pre-commit hooks run ESLint + Prettier automatically via Husky + lint-staged
