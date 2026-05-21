# Product Catalog + Wishlist

A full-stack product catalog application built as part of the **Bell IPDev Full-Stack Takehome Interview Challenge**. It delivers a premium, responsive shopping experience featuring product search, category filtering, and wishlist management — powered by a React + Material UI frontend and a NestJS REST API backend inside a pnpm monorepo.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Available Scripts](#available-scripts)
- [Environment & Ports](#environment--ports)
- [API Reference](#api-reference)
- [Architecture](#architecture)
  - [Backend](#backend-architecture)
  - [Frontend](#frontend-architecture)
- [Testing](#testing)
- [Design Decisions](#design-decisions)
- [Assumptions & Limitations](#assumptions--limitations)

---

## Features

**Frontend**
- Sticky glassmorphism navigation bar with live wishlist item count badge
- Responsive product grid — 1 column on mobile up to 5 columns on large screens
- Gradient image tiles, hover elevation, zoom, category badges, and high-contrast CTAs on product cards
- Real-time search filtering by product name
- Category filter bar to narrow products by type
- Wishlist drawer with add/remove flows, per-button pending states, and empty states
- Snackbar feedback for all wishlist actions (success and error)
- Skeleton loading states while data is in flight
- Reusable `EmptyState` component and app-level `ErrorBoundary`

**Backend**
- NestJS feature modules (`products`, `wishlist`) with clean separation of concerns
- DTO validation via `class-validator` with a global `ValidationPipe`
- Duplicate wishlist protection — returns `409 Conflict` if a product is already saved
- Global `HttpExceptionFilter` for consistent, structured error payloads
- `RequestLoggerMiddleware` that logs method, path, status code, and duration for every request
- CORS configured for the Vite dev server origin

---

## Tech Stack

| Layer     | Technology                                           | Version  |
| --------- | ---------------------------------------------------- | -------- |
| Frontend  | React                                                | ^19.2.5  |
| Frontend  | Vite                                                 | ^8.0.8   |
| Frontend  | TypeScript                                           | ^6.0.2   |
| Frontend  | Material UI (`@mui/material`)                        | ^9.0.0   |
| Frontend  | Emotion (`@emotion/react`, `@emotion/styled`)        | ^11.14   |
| Backend   | NestJS (`@nestjs/common`, `core`, `platform-express`)| ^11.1.18 |
| Backend   | TypeScript                                           | ^6.0.2   |
| Backend   | class-validator / class-transformer                  | ^0.14.2  |
| Backend   | RxJS                                                 | ^7.8.1   |
| Testing   | Vitest                                               | ^4.1.4   |
| Testing   | Testing Library (`@testing-library/react`)           | ^16.3.2  |
| Testing   | Supertest                                            | ^7.2.2   |
| Tooling   | pnpm workspaces                                      | 9.12.0   |
| Tooling   | ESLint                                               | ^10.2.0  |
| Tooling   | Prettier                                             | ^3.8.1   |

---

## Project Structure

```
Bell_IPDev_FullStack_Takehome_Interview_Challenge_assesment/
├── apps/
│   ├── backend/
│   │   ├── src/
│   │   │   ├── common/
│   │   │   │   ├── http-exception.filter.ts   # Global structured error responses
│   │   │   │   ├── request-logger.middleware.ts # HTTP request logging
│   │   │   │   └── types.ts                   # Shared Product interface
│   │   │   ├── data/
│   │   │   │   └── products.json              # Seed product catalog
│   │   │   ├── products/
│   │   │   │   ├── dto/
│   │   │   │   │   └── get-products-query.dto.ts
│   │   │   │   ├── products.controller.ts
│   │   │   │   ├── products.module.ts
│   │   │   │   ├── products.service.ts
│   │   │   │   └── products.service.spec.ts
│   │   │   ├── wishlist/
│   │   │   │   ├── dto/
│   │   │   │   │   └── create-wishlist-item.dto.ts
│   │   │   │   ├── wishlist.controller.ts
│   │   │   │   ├── wishlist.controller.spec.ts
│   │   │   │   ├── wishlist.module.ts
│   │   │   │   ├── wishlist.service.ts
│   │   │   │   └── wishlist.service.spec.ts
│   │   │   ├── app.controller.ts
│   │   │   ├── app.module.ts
│   │   │   ├── app.service.ts
│   │   │   └── main.ts
│   │   ├── nest-cli.json
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── vitest.config.ts
│   └── frontend/
│       ├── src/
│       │   ├── api/
│       │   │   ├── client.ts       # Base fetch wrapper
│       │   │   ├── products.ts     # Products API calls
│       │   │   ├── store.ts        # Store name API call
│       │   │   └── wishlist.ts     # Wishlist API calls
│       │   ├── components/
│       │   │   ├── EmptyState.tsx
│       │   │   ├── ErrorBoundary.tsx
│       │   │   ├── FiltersBar.tsx
│       │   │   ├── ProductCard.tsx
│       │   │   ├── ProductsGrid.tsx
│       │   │   └── WishlistDrawer.tsx
│       │   ├── hooks/
│       │   │   ├── useProducts.ts  # Product fetching + filter state
│       │   │   └── useWishlist.ts  # Wishlist CRUD state
│       │   ├── pages/
│       │   │   └── ProductCatalog.tsx
│       │   ├── types/
│       │   │   └── product.ts
│       │   ├── utils/
│       │   │   └── format.ts
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── theme.ts            # MUI theme tokens and component defaults
│       ├── index.html
│       ├── package.json
│       ├── vite.config.ts
│       └── vitest.config.ts
├── eslint.config.mjs
├── package.json                    # Root workspace scripts
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

---

## Prerequisites

| Tool    | Minimum version | Check command        |
| ------- | --------------- | -------------------- |
| Node.js | 18.0.0          | `node --version`     |
| pnpm    | 9.0.0           | `pnpm --version`     |

**Install pnpm if you don't have it:**

```bash
# Via Corepack (bundled with Node.js 16.9+)
corepack enable
corepack prepare pnpm@9.12.0 --activate

# Or via npm
npm install -g pnpm@9
```

---

## Installation

Clone the repository and install all workspace dependencies from the root:

```bash
# Using pnpm
pnpm install

# Using Corepack
corepack pnpm install
```

This installs dependencies for **both** `apps/backend` and `apps/frontend` in a single command via pnpm workspaces.

---

## Running the App

### Start both frontend and backend together (recommended)

```bash
pnpm dev
```

This runs frontend and backend in parallel. Open your browser at:

| App      | URL                         |
| -------- | --------------------------- |
| Frontend | http://localhost:5173        |
| Backend  | http://localhost:3000/api   |

> If port `5173` is already in use, Vite automatically selects the next available port and prints it to the terminal.

### Start apps individually

```bash
# Backend only (NestJS with hot reload)
pnpm dev:backend

# Frontend only (Vite HMR)
pnpm dev:frontend
```

Or target a workspace directly:

```bash
pnpm --filter backend run dev
pnpm --filter frontend run dev
```

### Production build + serve

```bash
# Build all workspaces
pnpm build

# Serve the backend production build
pnpm --filter backend run start:prod
# → runs: node dist/main

# Preview the frontend production build
pnpm --filter frontend run preview
```

---

## Available Scripts

All scripts below are run from the **repository root** unless noted.

### Root workspace

| Command              | Description                                          |
| -------------------- | ---------------------------------------------------- |
| `pnpm dev`           | Start frontend and backend in parallel (watch mode)  |
| `pnpm dev:backend`   | Start backend only in watch mode                     |
| `pnpm dev:frontend`  | Start frontend only with Vite HMR                    |
| `pnpm build`         | Build all workspaces for production                  |
| `pnpm test`          | Run all test suites (frontend + backend)             |
| `pnpm lint`          | Run ESLint across all workspaces                     |
| `pnpm format`        | Format all source files with Prettier                |
| `pnpm format:check`  | Check formatting without writing changes             |

### Backend (`apps/backend`)

| Command                                    | Description                              |
| ------------------------------------------ | ---------------------------------------- |
| `pnpm --filter backend run dev`            | Start with `nest start --watch`          |
| `pnpm --filter backend run build`          | Compile TypeScript via `nest build`      |
| `pnpm --filter backend run start`          | Start without watch                      |
| `pnpm --filter backend run start:prod`     | Run compiled output with `node dist/main`|
| `pnpm --filter backend run test`           | Run tests once with Vitest               |
| `pnpm --filter backend run test:watch`     | Run tests in interactive watch mode      |
| `pnpm --filter backend run lint`           | Lint `src/**/*.ts`                       |

### Frontend (`apps/frontend`)

| Command                                     | Description                              |
| ------------------------------------------- | ---------------------------------------- |
| `pnpm --filter frontend run dev`            | Start Vite dev server with HMR           |
| `pnpm --filter frontend run build`          | Type-check + Vite production build       |
| `pnpm --filter frontend run preview`        | Serve the `dist/` production build       |
| `pnpm --filter frontend run test`           | Run tests once with Vitest               |
| `pnpm --filter frontend run test:watch`     | Run tests in interactive watch mode      |
| `pnpm --filter frontend run lint`           | Lint `src/**/*.{ts,tsx}`                 |

### Corepack equivalents

If you're using Corepack instead of a global pnpm install:

```bash
corepack pnpm install
corepack pnpm --parallel -r run dev
corepack pnpm -r run test
corepack pnpm -r run build
corepack pnpm -r run lint
```

---

## Environment & Ports

| Service  | Port | Default URL                   |
| -------- | ---- | ----------------------------- |
| Frontend | 5173 | http://localhost:5173          |
| Backend  | 3000 | http://localhost:3000/api      |

CORS is pre-configured on the backend to allow requests from `http://localhost:5173`. No `.env` files are required to run the app locally — all configuration is hardcoded for the development environment.

---

## API Reference

All routes are prefixed with `/api`.

### Store

| Method | Endpoint         | Description           | Response                  |
| ------ | ---------------- | --------------------- | ------------------------- |
| `GET`  | `/api/store-name`| Returns the store name | `{ "name": "..." }`      |

### Products

| Method | Endpoint               | Query Params       | Description                        |
| ------ | ---------------------- | ------------------ | ---------------------------------- |
| `GET`  | `/api/products`        | —                  | Returns all products               |
| `GET`  | `/api/products?type=X` | `type` _(string)_  | Filters products by category type  |

**Product object:**
```json
{
  "id": 1,
  "name": "Product Name",
  "type": "category",
  "price": 99.99,
  "image": "https://..."
}
```

### Wishlist

| Method   | Endpoint            | Body / Params              | Description                                          |
| -------- | ------------------- | -------------------------- | ---------------------------------------------------- |
| `GET`    | `/api/wishlist`     | —                          | Returns all saved wishlist items                     |
| `POST`   | `/api/wishlist`     | `{ "productId": number }`  | Adds a product to the wishlist                       |
| `DELETE` | `/api/wishlist/:id` | `:id` — product ID (int)   | Removes a product from the wishlist                  |

**Error responses** follow a consistent structure from the global exception filter:

```json
{
  "statusCode": 404,
  "message": "Product not found",
  "error": "Not Found",
  "path": "/api/wishlist",
  "timestamp": "2026-05-19T12:00:00.000Z"
}
```

**Status codes:**
- `409 Conflict` — product is already in the wishlist
- `404 Not Found` — product ID does not exist, or wishlist item not found
- `400 Bad Request` — invalid request body (DTO validation failure)

---

## Architecture

### Backend Architecture

```
NestFactory
└── AppModule
    ├── RequestLoggerMiddleware  (all routes)
    ├── ValidationPipe           (global — whitelist, transform, forbidNonWhitelisted)
    ├── HttpExceptionFilter      (global — structured error payloads)
    ├── AppController            → GET /api/store-name
    ├── ProductsModule
    │   ├── ProductsController   → GET /api/products
    │   └── ProductsService      (reads from data/products.json in-memory)
    └── WishlistModule
        ├── WishlistController   → GET/POST/DELETE /api/wishlist
        └── WishlistService      (in-memory array, depends on ProductsService)
```

- **Feature modules** keep `products` and `wishlist` responsibilities isolated.
- **DTO validation** uses `class-validator` decorators. The global `ValidationPipe` strips unknown fields (`whitelist`) and rejects requests with extra properties (`forbidNonWhitelisted`).
- **Exception filter** catches all exceptions and normalises the response shape — every error includes `statusCode`, `message`, `error`, `path`, and `timestamp`.
- **Request logger middleware** fires on `response.finish` and records `METHOD /path STATUS DURATIONms` via NestJS `Logger`.
- **CORS** is enabled only for the Vite dev server origin (`http://localhost:5173`).

### Frontend Architecture

```
main.tsx
└── App.tsx
    ├── AppBar (sticky glass nav + wishlist badge)
    ├── ProductCatalog (page)
    │   ├── FiltersBar     (search input + category chip filters)
    │   └── ProductsGrid   (responsive grid of ProductCards / skeletons / EmptyState)
    ├── WishlistDrawer     (slide-in drawer, list of saved items)
    └── Snackbar           (success/error feedback)
```

**State management:**
- `useWishlist` hook — owns wishlist array, loading/error state, and CRUD methods (add/remove with optimistic local updates).
- `useProducts` hook — owns product list, loading/error state, and applies client-side search filtering.
- All state is local React state. No external state library is needed at this scope.

**API layer** (`src/api/`):
- `client.ts` — a thin `fetch` wrapper that throws typed errors on non-OK responses.
- `products.ts`, `store.ts`, `wishlist.ts` — typed wrappers per domain.

**Theming:**
- A single `theme.ts` file configures MUI with responsive typography, a dark-palette app bar, and shared component defaults so overrides stay out of individual components.

---

## Testing

Tests cover meaningful product and wishlist flows using Vitest. Run all tests from the root:

```bash
pnpm test
```

Or watch mode per workspace:

```bash
pnpm --filter backend run test:watch
pnpm --filter frontend run test:watch
```

### Backend test coverage

| File                          | Scenarios covered                                                    |
| ----------------------------- | -------------------------------------------------------------------- |
| `products.service.spec.ts`    | Returns all products, filters by type, returns empty for unknown type|
| `wishlist.service.spec.ts`    | Add item, duplicate protection (409), remove item, remove missing (404)|
| `wishlist.controller.spec.ts` | DTO validation, invalid payload rejection, full controller flow      |
| `app.service.spec.ts`         | Store name response                                                  |
| `app.controller.spec.ts`      | Store name endpoint                                                  |

### Frontend test coverage

| File            | Scenarios covered                                                           |
| --------------- | --------------------------------------------------------------------------- |
| `App.test.tsx`  | Skeleton loading state, empty state, wishlist drawer open/close, snackbar feedback, search filtering |

---

## Design Decisions

**No Redux or global state library.** The app's state fits comfortably in React's built-in hooks. Two custom hooks (`useProducts`, `useWishlist`) encapsulate all async logic, keeping components declarative and easy to test.

**Wishlist stored in memory.** The backend wishlist resets on server restart. This is intentional for the interview scope — it avoids database setup while still demonstrating proper service/controller/DTO layering.

**Pending state per button, not per page.** Each "Add to Wishlist" and "Remove" button tracks its own in-flight state independently. This prevents the whole UI from locking while a single action is in progress.

**Consistent error shape from the API.** A global NestJS exception filter ensures every error response — whether from a guard, validation pipe, service layer, or unexpected crash — returns the same JSON structure. The frontend only needs to handle one format.

**MUI theme as the single source of truth for styling.** Component overrides, spacing, colours, and typography scale live in `theme.ts`. Individual components use the theme tokens rather than inline styles wherever possible.

---

## Assumptions & Limitations

- Wishlist data is **in-memory only** and resets whenever the backend process restarts.
- Product images are URLs stored in `apps/backend/src/data/products.json` and loaded directly in the browser.
- No authentication or user sessions are implemented.
- The app is optimised for clarity and review readability rather than production-grade persistence.
- An AI coding assistant was used to accelerate implementation, polish UI details, and expand test coverage. All generated output was reviewed and adjusted for correctness, readability, and fit with the project architecture.
# The_Tech_Library
