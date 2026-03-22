# Architecture

## Overview

Subtrackify Frontend is a single-page application for tracking recurring subscriptions. It follows a feature-based architecture with clear separation between domain logic, shared infrastructure, and UI primitives.

## High-Level Diagram

```
┌─────────────────────────────────────────────────────┐
│                     main.tsx                         │
│          (Providers: Redux, Theme, Router)           │
├─────────────────────────────────────────────────────┤
│                      App.tsx                         │
│        (Layout: Header, Outlet, Toaster)             │
├──────────┬──────────┬───────────────────────────────┤
│  pages/  │ features/│         common/                │
│          │          │                                │
│ Home     │ auth/    │ store/    (Redux config)       │
│ Login    │  store   │ router/   (Routes, guards)     │
│ Register │  comps   │ api/      (Axios client)       │
│ NotFound │  hooks   │ ui/       (Header, Dialogs)    │
│          │          │ utils/    (localStorage)        │
│          │ subs/    │ entities/ (Type re-exports)     │
│          │  store   │                                │
│          │  comps   │                                │
├──────────┴──────────┴───────────────────────────────┤
│              components/ui/ (shadcn/ui)              │
├─────────────────────────────────────────────────────┤
│                  lib/utils.ts                        │
└─────────────────────────────────────────────────────┘
```

## Layer Responsibilities

### Pages (`src/pages/`)

Top-level route components. Each page composes feature components and connects to the store. Pages should be thin — business logic lives in features.

### Features (`src/features/`)

Domain-specific modules. Each feature owns its:

- **Store** — Redux slice (state shape, reducers), async thunks (API calls), selectors
- **Components** — UI specific to the feature
- **Hooks** — Custom hooks encapsulating feature logic

Features do not import from other features. Shared code goes into `common/`.

### Common (`src/common/`)

Shared infrastructure used across features:

- **store/** — Redux store configuration, typed hooks (`useAppDispatch`, `useAppSelector`)
- **router/** — Route definitions, `ProtectedRouter`, `PublicRoute`, `AuthInitializer`
- **api/** — Axios client with interceptors, endpoint modules
- **ui/** — Shared UI components (Header, AddSubscriptionDialog, CommandPalette)
- **entities/** — Type re-exports for domain entities
- **utils/** — Generic utilities (localStorage helpers)

### Components/UI (`src/components/ui/`)

shadcn/ui primitives. These are managed by the shadcn CLI — do not edit manually unless customizing behavior.

## Data Flow

```
User Action
    │
    ▼
Component dispatches thunk (useAppDispatch)
    │
    ▼
Async thunk calls API (src/common/api/)
    │
    ▼
API response updates Redux state (slice.extraReducers)
    │
    ▼
Component re-renders (useAppSelector)
```

## Authentication Flow

```
App Mount
    │
    ▼
AuthInitializer → useAuthInit()
    │
    ├─ No token in localStorage → isAuthenticated = false
    │                               │
    │                               ▼
    │                          ProtectedRouter redirects to /login
    │
    └─ Token found → dispatch(getCurrentUser())
                        │
                        ├─ Success → isAuthenticated = true, user set
                        │
                        └─ Failure → token cleared, redirect to /login
```

## Styling Architecture

- **Tailwind CSS v4** — Utility-first, configured via Vite plugin
- **Theme** — CSS custom properties in `src/assets/styles/index.css` using OKLCH color space
- **Dark mode** — Managed by `next-themes`, uses `.dark` class variant
- **Class merging** — `cn()` utility combining `clsx` + `tailwind-merge`
- **Animations** — `tw-animate-css` package
