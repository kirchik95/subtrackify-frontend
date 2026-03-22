# CLAUDE.md

Instructions for Claude Code when working with this repository.

## Quick Reference

```bash
npm run dev       # Dev server with HMR (http://localhost:5173)
npm run build     # Type-check (tsc) + production build (Vite)
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Technology Stack

| Layer     | Tech                  | Notes                                                  |
| --------- | --------------------- | ------------------------------------------------------ |
| Build     | Vite 8 + Rolldown     | Built-in Rolldown bundler                              |
| Framework | React 19.2            | React Compiler enabled via `@rolldown/plugin-babel`    |
| Language  | TypeScript 5.9        | Strict mode, `noUnusedLocals`, `noUnusedParameters`    |
| Styling   | Tailwind CSS v4       | Vite plugin (`@tailwindcss/vite`), no config file      |
| State     | Redux Toolkit         | Slices in `src/features/*/store/`                      |
| Routing   | React Router v7       | Data router (`createBrowserRouter`)                    |
| UI        | shadcn/ui (New York)  | Radix primitives via unified `radix-ui` package        |
| Forms     | React Hook Form + Zod | Validation schemas co-located with forms               |
| HTTP      | Axios                 | Client with interceptors in `src/common/api/client.ts` |
| Icons     | Lucide React          |                                                        |

## Project Structure

```
src/
├── main.tsx                    # Entry point, providers, font imports
├── App.tsx                     # Root layout: Header, Outlet, CommandPalette, Toaster
├── assets/styles/index.css     # Tailwind v4 theme (OKLCH color vars, dark mode)
├── pages/                      # Route page components
│   ├── Home.tsx                # Dashboard with SubscriptionsList
│   ├── Login.tsx               # Auth form (email/password)
│   ├── Register.tsx            # Registration form
│   └── NotFound.tsx            # 404
├── features/                   # Domain modules
│   ├── auth/
│   │   ├── store/              # slice.ts, actions.ts, selectors.ts
│   │   ├── components/         # AuthInitializer
│   │   └── hooks/              # useAuthInit
│   └── subscriptions/
│       ├── store/              # slice.ts, actions.ts
│       └── components/         # SubscriptionsList, SubscriptionItem, DeleteDialog
├── common/
│   ├── store/                  # Redux store config + typed hooks
│   ├── router/                 # Router config, ProtectedRoute, PublicRoute
│   ├── api/                    # Axios client, auth.ts, subscriptions.ts
│   ├── entities/               # Type re-exports
│   ├── ui/                     # Header, AddSubscriptionDialog, CommandPalette
│   └── utils/                  # localStorage helpers
├── components/ui/              # shadcn/ui components (20+)
├── lib/utils.ts                # cn() utility
└── types/global.d.ts           # Global type declarations
```

## Architecture Patterns

### Adding a New Feature

1. Create feature folder: `src/features/<name>/`
2. Add Redux slice in `store/slice.ts`, async thunks in `store/actions.ts`
3. Register reducer in `src/common/store/store.ts`
4. Add components in `components/`, hooks in `hooks/`
5. Each component folder has `index.ts` barrel export

### Adding a New Route

1. Create page in `src/pages/<Name>.tsx`
2. Add route in `src/common/router/router.tsx`
3. Use `ProtectedRouter` wrapper for auth-required routes, `PublicRoute` for guest-only

### Adding UI Components

```bash
npx shadcn@latest add <component-name>
```

Components land in `src/components/ui/` with New York style and Tailwind CSS v4.

## Code Conventions

- **Imports**: Use `@/*` alias for `src/*` paths
- **Import order** (enforced by Prettier): react -> react-router -> third-party -> @/lib -> @/components -> relative
- **Formatting**: Prettier with single quotes, semicolons, 100 char width, trailing commas (es5)
- **Pre-commit**: Husky + lint-staged runs `eslint --fix` and `prettier --write`
- **Component exports**: Barrel exports via `index.ts` files
- **State access**: Use typed hooks `useAppDispatch`, `useAppSelector` from `@/common/store/hooks`

## API Layer

- Base URL: dev proxy `/api` -> `http://localhost:3000`, production via `VITE_API_BASE_URL`
- Auth: Bearer token stored in localStorage, auto-attached via Axios interceptor
- Endpoints defined in `src/common/api/auth.ts` and `src/common/api/subscriptions.ts`
- Types (Subscription, User, etc.) exported from API modules

## Key Config Files

| File                 | Purpose                                                                       |
| -------------------- | ----------------------------------------------------------------------------- |
| `vite.config.ts`     | Plugins (react, babel/compiler, tailwind), `resolve.tsconfigPaths`, dev proxy |
| `tsconfig.json`      | Base config with `@/*` path alias                                             |
| `eslint.config.js`   | Flat config: TS-ESLint + React Hooks + React Refresh                          |
| `components.json`    | shadcn/ui settings (New York style, Lucide icons)                             |
| `prettier.config.js` | Formatting rules + import sorting                                             |
