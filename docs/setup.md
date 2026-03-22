# Setup Guide

## Prerequisites

- **Node.js** 20.19+ or 22.12+
- **npm** 10+
- Backend API running on `http://localhost:3000` (for development)

## Installation

```bash
git clone <repo-url>
cd subtrackify-frontend
npm install
```

## Development

```bash
npm run dev
```

Opens at `http://localhost:5173`. The dev server proxies `/api` requests to `http://localhost:3000`.

## Environment Variables

| Variable            | Description                         | Required        |
| ------------------- | ----------------------------------- | --------------- |
| `VITE_API_BASE_URL` | Backend API base URL for production | Production only |

For development, no env vars are needed — the Vite dev proxy handles API routing.

## Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start dev server with HMR           |
| `npm run build`   | TypeScript check + production build |
| `npm run lint`    | Run ESLint                          |
| `npm run preview` | Preview the production build        |

## Production Build

```bash
npm run build
```

Output goes to `dist/`. The build runs `tsc -b` for type checking, then `vite build` for bundling.

## Code Quality

### Pre-commit Hooks

Husky runs lint-staged on every commit:

- `*.{js,jsx,ts,tsx}` — `eslint --fix`
- `*.{js,jsx,ts,tsx,json,css,md}` — `prettier --write`

### Manual Checks

```bash
npm run lint      # ESLint
npm run build     # Type checking (tsc) + build
```

## Adding UI Components

shadcn/ui components are added via CLI:

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add form
```

Components are configured with New York style, Neutral base color, and Lucide icons (see `components.json`).

## Project Configuration

| File                    | Purpose                                  |
| ----------------------- | ---------------------------------------- |
| `vite.config.ts`        | Build config, plugins, dev proxy         |
| `tsconfig.json`         | TypeScript base config with path aliases |
| `tsconfig.app.json`     | App-specific TS config (strict)          |
| `tsconfig.node.json`    | Build tools TS config                    |
| `eslint.config.js`      | ESLint flat config                       |
| `prettier.config.js`    | Code formatting + import sorting         |
| `components.json`       | shadcn/ui configuration                  |
| `lint-staged.config.js` | Pre-commit lint/format rules             |
