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

- **Build Tool**: Vite (using Rolldown variant `rolldown-vite@7.1.14`)
- **Framework**: React 19.1.1 with React Compiler enabled
- **Language**: TypeScript 5.9.3 with strict mode enabled
- **Styling**: Tailwind CSS v4 with the new Vite plugin (`@tailwindcss/vite`)
- **UI Components**: shadcn/ui (New York style) configured with Lucide icons
- **Compiler**: React Compiler (experimental) for automatic memoization

## Project Structure

```
src/
├── App.tsx           # Root component
├── main.tsx          # Application entry point
├── index.css         # Global styles and Tailwind configuration
└── lib/
    └── utils.ts      # Utility functions (includes cn() for className merging)
```

Components should be added to `src/components/` following shadcn/ui conventions.

## Key Configuration Details

### Path Aliases
The project uses `@/*` as an alias for `src/*`. Import paths should use this alias:
```typescript
import { cn } from "@/lib/utils"
import Button from "@/components/ui/button"
```

### React Compiler
The React Compiler is enabled via Babel plugin in `vite.config.ts`. This automatically optimizes components by memoizing values and callbacks. Be aware this may impact dev & build performance.

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

- This project uses **Rolldown-Vite**, a Vite variant with Rolldown bundler instead of Rollup
- Tailwind CSS v4 uses a new plugin architecture (`@tailwindcss/vite`) - no separate config file needed
- The React Compiler is experimental and may require adjustments for complex components
- All TypeScript files should use strict type checking
