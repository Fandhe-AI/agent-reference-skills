# Autumn

Plugin integrating the open-source SaaS billing infrastructure Autumn with Better Auth. Manages subscription status, usage metering, and feature entitlements. No webhook setup is required; Autumn can be queried directly.

## Signature / Usage

### Installation

```bash
npm install autumn-js
```

Environment variables:

```
AUTUMN_SECRET_KEY=am_sk_xxxxxxxxxx
```

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { autumn } from "autumn-js/better-auth"

export const auth = betterAuth({
    plugins: [
        autumn({
            customerScope: "user"  // "user" | "organization" | "user_and_organization"
        })
    ]
})
```

### Setup (client side, React)

```jsx
import { AutumnProvider } from "autumn-js/react"

<AutumnProvider useBetterAuth={true}>
    {children}
</AutumnProvider>
```

### API methods

| Method | Description |
|---|---|
| `attach()` | Starts checkout or a payment confirmation dialog |
| `check()` | Verifies whether a customer can access a specific feature |
| `track()` | Records a usage event (mainly server side) |
| `customer` | Returns billing data including subscriptions and balances |
| `openBillingPortal()` | Opens the customer's billing management interface |
| `cancel()` | Cancels a product subscription |

### Usage example

```typescript
import { useCustomer, AttachDialog } from "autumn-js/react"

// Checkout
const { attach, allowed } = useCustomer()
await attach({ productId: "pro", dialog: AttachDialog })

// Feature access check
if (allowed({ featureId: "messages" })) { /* proceed */ }

// Usage tracking
await auth.api.track({ featureId: "messages", value: 2 })
```

## Options / Props

| Property | Type | Description |
|---|---|---|
| `customerScope` | `"user"` \| `{ customerScope: string }` | Billing scope |
| `identify?` | function | Custom identification function for advanced scenarios |

## Related

- [stripe.md](./stripe.md)
- [organization.md](./organization.md)
