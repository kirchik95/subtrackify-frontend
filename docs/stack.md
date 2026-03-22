# Technology Stack

## Core

| Technology                                               | Version | Purpose                              |
| -------------------------------------------------------- | ------- | ------------------------------------ |
| [React](https://react.dev)                               | 19.2    | UI framework                         |
| [TypeScript](https://www.typescriptlang.org)             | 5.9     | Type safety, strict mode             |
| [Vite](https://vite.dev)                                 | 8.0     | Build tool with Rolldown bundler     |
| [React Compiler](https://react.dev/learn/react-compiler) | 1.0     | Automatic memoization (experimental) |

## State & Routing

| Technology                                    | Version | Purpose                                   |
| --------------------------------------------- | ------- | ----------------------------------------- |
| [Redux Toolkit](https://redux-toolkit.js.org) | 2.11    | State management                          |
| [React Redux](https://react-redux.js.org)     | 9.2     | React bindings for Redux                  |
| [React Router](https://reactrouter.com)       | 7.13    | Client-side routing (data router pattern) |

## UI & Styling

| Technology                                                  | Version | Purpose                                    |
| ----------------------------------------------------------- | ------- | ------------------------------------------ |
| [Tailwind CSS](https://tailwindcss.com)                     | 4.2     | Utility-first CSS framework                |
| [shadcn/ui](https://ui.shadcn.com)                          | Latest  | Component library (New York style)         |
| [Radix UI](https://www.radix-ui.com)                        | 1.4     | Accessible UI primitives (unified package) |
| [Lucide React](https://lucide.dev)                          | 0.577   | Icon library                               |
| [next-themes](https://github.com/pacocoursey/next-themes)   | 0.4     | Dark/light mode                            |
| [tw-animate-css](https://github.com/nicepkg/tw-animate-css) | 1.4     | Animation utilities                        |

## Forms & Validation

| Technology                                                          | Version | Purpose                       |
| ------------------------------------------------------------------- | ------- | ----------------------------- |
| [React Hook Form](https://react-hook-form.com)                      | 7.72    | Performant form handling      |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | 5.2     | Schema validation integration |
| [Zod](https://zod.dev)                                              | 4.3     | Schema validation             |

## HTTP & Data

| Technology                       | Version | Purpose                       |
| -------------------------------- | ------- | ----------------------------- |
| [Axios](https://axios-http.com)  | 1.13    | HTTP client with interceptors |
| [date-fns](https://date-fns.org) | 4.1     | Date manipulation             |

## Notifications

| Technology                             | Version | Purpose                 |
| -------------------------------------- | ------- | ----------------------- |
| [Sonner](https://sonner.emilkowal.dev) | 2.0     | Toast notifications     |
| [cmdk](https://cmdk.paco.me)           | 1.1     | Command palette (Cmd+K) |

## Build & Dev Tools

| Technology                                                                     | Version      | Purpose                              |
| ------------------------------------------------------------------------------ | ------------ | ------------------------------------ |
| [Rolldown](https://rolldown.rs)                                                | (via Vite 8) | Rust-based bundler                   |
| [@rolldown/plugin-babel](https://www.npmjs.com/package/@rolldown/plugin-babel) | 0.2          | Babel integration for React Compiler |
| [ESLint](https://eslint.org)                                                   | 10.1         | Linting (flat config)                |
| [typescript-eslint](https://typescript-eslint.io)                              | 8.57         | TypeScript ESLint rules              |
| [Prettier](https://prettier.io)                                                | 3.8          | Code formatting                      |
| [Husky](https://typicode.github.io/husky)                                      | 9.1          | Git hooks                            |
| [lint-staged](https://github.com/lint-staged/lint-staged)                      | 16.4         | Pre-commit linting                   |

## Fonts

| Font          | Package                              |
| ------------- | ------------------------------------ |
| Open Sans     | `@fontsource-variable/open-sans`     |
| Manrope       | `@fontsource-variable/manrope`       |
| DM Sans       | `@fontsource-variable/dm-sans`       |
| Inter         | `@fontsource-variable/inter`         |
| IBM Plex Sans | `@fontsource-variable/ibm-plex-sans` |
