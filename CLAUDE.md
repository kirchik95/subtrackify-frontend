# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Subtrackify Frontend is a React application built with Vite, TypeScript, and Tailwind CSS v4. The project uses modern React features including React 19 and the React Compiler for automatic optimizations.

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production (runs TypeScript compiler then Vite build)
npm run build

# Run ESLint
npm run lint

# Preview production build
npm run preview
```

## Technology Stack

- **Build Tool**: Vite 8 (with built-in Rolldown bundler)
- **Framework**: React 19.2 with React Compiler enabled
- **Routing**: React Router v7 (core package, using data router with `createBrowserRouter`)
- **Language**: TypeScript 5.9.3 with strict mode enabled
- **Styling**: Tailwind CSS v4 with the new Vite plugin (`@tailwindcss/vite`)
- **UI Components**: shadcn/ui (New York style) configured with Lucide icons
- **Compiler**: React Compiler (experimental) for automatic memoization

## Project Structure

```
src/
├── App.tsx           # Root layout component with navigation
├── main.tsx          # Application entry point and router configuration
├── index.css         # Global styles and Tailwind configuration
├── pages/            # Route page components
│   ├── Home.tsx      # Home page
│   ├── About.tsx     # About page
│   └── NotFound.tsx  # 404 page
└── lib/
    └── utils.ts      # Utility functions (includes cn() for className merging)
```

Components should be added to `src/components/` following shadcn/ui conventions.
Page components should be added to `src/pages/`.

## Key Configuration Details

### Path Aliases

The project uses `@/*` as an alias for `src/*`. Import paths should use this alias:

```typescript
import { cn } from '@/lib/utils';
import Button from '@/components/ui/button';
```

### React Compiler

The React Compiler is enabled via `@rolldown/plugin-babel` with `reactCompilerPreset()` in `vite.config.ts`. This automatically optimizes components by memoizing values and callbacks.

### TypeScript Configuration

- **Strict mode** is enabled with additional linting rules
- **Bundler module resolution** is used
- **noEmit** is true (type checking only, Vite handles transpilation)
- Compiler options include `noUnusedLocals`, `noUnusedParameters`, and `noUncheckedSideEffectImports`

### ESLint Setup

ESLint uses the new flat config format (`eslint.config.js`) with:

- TypeScript ESLint recommended rules
- React Hooks recommended rules
- React Refresh for Vite

### React Router Configuration

The app uses React Router v7 with the data router pattern (`createBrowserRouter`):

- Router is configured in `src/main.tsx`
- `App.tsx` serves as the root layout with navigation and `<Outlet />` for child routes
- Page components are in `src/pages/`
- Uses nested routing with the App component as the parent route
- 404 handling via wildcard route (`*`)

To add a new route:

1. Create a page component in `src/pages/`
2. Add the route configuration to the router in `main.tsx`
3. Add navigation links in `App.tsx` if needed

### shadcn/ui Configuration

- Style: New York
- Base color: Neutral
- CSS variables enabled
- Components will be added to `@/components/ui`
- Icon library: Lucide React

## Adding UI Components

Use the shadcn/ui CLI to add components:

```bash
npx shadcn@latest add <component-name>
```

Components will be automatically configured with the New York style and Tailwind CSS v4.

## Important Notes

- This project uses **Vite 8** with the built-in Rolldown bundler (replacing the previous Rollup + esbuild setup)
- Tailwind CSS v4 uses a new plugin architecture (`@tailwindcss/vite`) - no separate config file needed
- The React Compiler is experimental and may require adjustments for complex components
- All TypeScript files should use strict type checking
