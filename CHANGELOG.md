# Changelog

All notable changes to the Subtrackify Frontend.

## [Unreleased]

### Added

- **Analytics page** — summary cards (monthly spend, active/paused/cancelled counts), area chart for spending history, donut chart for category breakdown. Uses recharts via shadcn/ui chart component (`9b5bcbb`)
- **Preferences connected to API** — NotificationsCard (6 toggles), RegionalCard (currency, language, timezone), AppearanceCard (theme + compact mode) now persist via `GET/PUT /api/preferences` (`2049d15`)
- **CSV export/import** — DataExportCard wired to `GET /api/export/csv` (file download) and `POST /api/import` (file upload with validation feedback) (`2049d15`)
- **Preferences Redux store** — `src/features/profile/store/` with fetch and update actions (`2049d15`)
- **Analytics Redux store** — `src/features/analytics/store/` with summary, spending history, category breakdown (`9b5bcbb`)

## [1.0.0] - 2026-03-29

### Added

- **Auth pages** — Login, Register, Forgot Password with split-layout bento design, view transitions
- **Dashboard** — subscriptions list view + calendar view with toggle, total spend card, upcoming payments sidebar
- **Subscription management** — create/edit/delete dialogs, detail page with status control (pause/unpause)
- **Profile page** — avatar upload, personal info editing, password change, account deletion
- **Billing tab** — current plan, payment methods, billing history (UI only, mocked)
- **Command palette** — Cmd+K / Ctrl+K global search and navigation
- **Dark mode** — system-aware theme via next-themes
- **Animations** — page transitions and stagger animations via Motion (Framer)
- **Loading states** — skeleton screens for all pages
- **Form validation** — Zod schemas with React Hook Form
- **Toast notifications** — Sonner for success/error feedback
- **shadcn/ui** — 20+ components (New York style, Radix primitives)
- **Dev tooling** — Vite 8, React Compiler, ESLint, Prettier, Husky pre-commit hooks
