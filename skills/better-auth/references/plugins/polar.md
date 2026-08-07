# Polar

A plugin that seamlessly integrates Polar's payment infrastructure with Better Auth. It provides checkout, customer portal, usage tracking, and webhooks.

## Signature / Usage

### Installation

```bash
pnpm add better-auth @polar-sh/better-auth @polar-sh/sdk
```

Environment variables:

```
POLAR_ACCESS_TOKEN=...
POLAR_WEBHOOK_SECRET=...
```

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth"
import { Polar } from "@polar-sh/sdk"

const polarClient = new Polar({ accessToken: process.env.POLAR_ACCESS_TOKEN })

export const auth = betterAuth({
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({ successUrl: "/dashboard" }),
                portal(),
                usage(),
                webhooks({ secret: process.env.POLAR_WEBHOOK_SECRET })
            ]
        })
    ]
})
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/react"
import { polarClient } from "@polar-sh/better-auth/client"

export const authClient = createAuthClient({
    plugins: [polarClient()]
})
```

### checkout

```typescript
await authClient.checkout({ products: ["prod_xxx"] })
// or
await authClient.checkout({ slug: "pro-plan" })
```

### portal

```typescript
await authClient.customer.portal()
const { data: state } = await authClient.customer.state()
const { data: benefits } = await authClient.customer.benefits.list()
const { data: orders } = await authClient.customer.orders.list()
const { data: subs } = await authClient.customer.subscriptions.list()
```

### usage

```typescript
await authClient.usage.ingest({ event: "api_call", value: 1 })
const { data: meters } = await authClient.usage.meters.list()
```

## Options / Props

| Property | Type | Description |
|---|---|---|
| `client` | Polar | Polar SDK instance (required) |
| `createCustomerOnSignUp?` | boolean | Automatically create a customer on sign-up |
| `getCustomerCreateParams?` | function | Custom metadata for customer creation |

## Notes

- 25+ webhook handlers are provided: `onOrderPaid`, `onSubscriptionCreated`, `onCustomerStateChanged`, `onPayload` (catch-all), and more

## Related

- [stripe.md](./stripe.md)
- [autumn.md](./autumn.md)
