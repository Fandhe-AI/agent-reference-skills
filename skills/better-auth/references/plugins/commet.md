# Commet

Plugin integrating Commet (Merchant of Record) with Better Auth. Manages subscriptions, usage-based billing, feature gating, tax, and global payments. Maintained by the Commet team.

## Signature / Usage

### Installation

```bash
npm install better-auth @commet/better-auth @commet/node
```

Environment variables:

```
COMMET_API_KEY=ck_...
```

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { commet, portal, subscriptions, features, usage, seats } from "@commet/better-auth"
import { Commet } from "@commet/node"

const commetClient = new Commet({ apiKey: process.env.COMMET_API_KEY })

export const auth = betterAuth({
    plugins: [
        commet({
            client: commetClient,
            createCustomerOnSignUp: true,
            use: [portal(), subscriptions(), features(), usage(), seats()]
        })
    ]
})
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/react"
import { commetClient } from "@commet/better-auth/client"

export const authClient = createAuthClient({
    plugins: [commetClient()]
})
```

### Sub-plugins and API methods

`portal`:

```typescript
await authClient.customer.portal()
```

`subscriptions`:

```typescript
const { data: subscription } = await authClient.subscription.get()
await authClient.subscription.cancel({ reason: "...", immediate: false })
```

`features`:

```typescript
const { data: features } = await authClient.features.list()
const { data: feature } = await authClient.features.get("api_calls")
const { data: check } = await authClient.features.check("sso")
const { data: canUse } = await authClient.features.canUse("api_calls")
```

`usage`:

```typescript
await authClient.usage.track({
    feature: "api_calls",
    value: 1,
    idempotencyKey: "evt_123",
    properties: { endpoint: "/api/generate" }
})
```

`seats`:

```typescript
const { data: seatBalances } = await authClient.seats.list()
await authClient.seats.add({ featureCode: "member", count: 5 })
await authClient.seats.remove({ featureCode: "member", count: 2 })
await authClient.seats.set({ featureCode: "admin", count: 3 })
await authClient.seats.setAll({ admin: 2, member: 10 })
```

`webhooks`:

Webhook endpoint: `/api/auth/commet/webhooks`

Supported handlers: `onSubscriptionActivated`, `onSubscriptionCanceled`, `onPaymentReceived`, `onPaymentFailed`, `onInvoiceCreated`, and more

## Options / Props

| Property | Required | Description |
|---|---|---|
| `client` | Required | Commet SDK instance |
| `use` | Required | Array of sub-plugins |
| `createCustomerOnSignUp?` | Optional | Automatically create a customer on sign-up |
| `getCustomerCreateParams?` | Optional | Additional parameters when creating a customer |

## Related

- [stripe.md](./stripe.md)
- [autumn.md](./autumn.md)
