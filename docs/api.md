# API Reference

## Overview

The frontend communicates with the backend REST API via Axios. The API client is configured in `src/common/api/client.ts`.

- **Development**: Vite dev proxy forwards `/api` to `http://localhost:3000`
- **Production**: Uses `VITE_API_BASE_URL` environment variable

## Authentication

All authenticated requests include a Bearer token in the `Authorization` header. The token is stored in `localStorage` and auto-attached by the Axios request interceptor.

### POST /api/auth/login

Login with email and password.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "secret"
}
```

**Response:**

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John",
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOi..."
}
```

### POST /api/auth/register

Register a new user.

**Request:**

```json
{
  "name": "John",
  "email": "user@example.com",
  "password": "secret"
}
```

**Response:** Same as login.

### GET /api/auth/me

Get the current authenticated user.

**Response:**

```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John",
  "createdAt": "2026-01-01T00:00:00.000Z",
  "updatedAt": "2026-01-01T00:00:00.000Z"
}
```

## Subscriptions

### GET /api/subscriptions

Get all subscriptions for the authenticated user.

**Query Parameters (optional):**
| Param | Type | Description |
|-------|------|-------------|
| `category` | string | Filter by category |
| `status` | `active` \| `cancelled` \| `paused` | Filter by status |
| `minPrice` | number | Minimum price |
| `maxPrice` | number | Maximum price |

**Response:**

```json
[
  {
    "id": 1,
    "name": "Netflix",
    "description": "Streaming service",
    "price": 15.99,
    "currency": "USD",
    "billingCycle": "monthly",
    "nextBillingDate": "2026-04-01",
    "status": "active",
    "category": "Entertainment",
    "userId": 1,
    "createdAt": "2026-01-01T00:00:00.000Z",
    "updatedAt": "2026-01-01T00:00:00.000Z"
  }
]
```

### GET /api/subscriptions/:id

Get a single subscription by ID.

### POST /api/subscriptions

Create a new subscription.

**Request:**

```json
{
  "name": "Netflix",
  "description": "Streaming service",
  "price": 15.99,
  "currency": "USD",
  "billingCycle": "monthly",
  "nextBillingDate": "2026-04-01",
  "category": "Entertainment"
}
```

**Required fields:** `name`, `price`, `billingCycle`, `nextBillingDate`

### PUT /api/subscriptions/:id

Update an existing subscription. All fields are optional.

### DELETE /api/subscriptions/:id

Delete a subscription. Returns the ID of the deleted subscription.

## Types

```typescript
type BillingCycle = 'daily' | 'weekly' | 'monthly' | 'yearly';
type SubscriptionStatus = 'active' | 'cancelled' | 'paused';

interface Subscription {
  id: number;
  name: string;
  description?: string;
  price: number;
  currency: string;
  billingCycle: BillingCycle;
  nextBillingDate: string;
  status: SubscriptionStatus;
  category?: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  user: User;
  token: string;
}
```

## Error Handling

The Axios response interceptor in `client.ts` formats error messages from API responses. Components receive errors through Redux state (e.g., `auth.error`) and display them in the UI.
