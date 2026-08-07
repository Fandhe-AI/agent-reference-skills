# Chargebee

Plugin integrating Chargebee's subscription management and billing with Better Auth. Maintained by the Chargebee team.

## Signature / Usage

### Installation

```bash
npm install @chargebee/better-auth chargebee
npx auth migrate
```

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { chargebee } from "@chargebee/better-auth"

export const auth = betterAuth({
    plugins: [
        chargebee({
            chargebeeClient,
            createCustomerOnSignUp: true,
            webhookUsername: process.env.CHARGEBEE_WEBHOOK_USERNAME,
            webhookPassword: process.env.CHARGEBEE_WEBHOOK_PASSWORD,
            subscription: {
                enabled: true,
                plans: [
                    {
                        name: "pro",
                        itemPriceId: "pro-USD-monthly",
                        type: "plan",
                        limits: { seats: 5 }
                    }
                ]
            }
        })
    ]
})
```

### Setup (client side)

```typescript
import { chargebeeClient } from "@chargebee/better-auth/client"

export const authClient = createAuthClient({
    plugins: [chargebeeClient({ subscription: true })]
})
```

### API methods

| Method | Description |
|---|---|
| `subscription.create()` | Create a new subscription (checkout redirect) |
| `subscription.update()` | Change plan / update subscription |
| `subscription.list()` | List active subscriptions |
| `subscription.cancel()` | Cancel (portal redirect) |
| `subscription.portal()` | Open the self-service billing portal |

### Advanced features

- **Organization billing**: `organization.enabled: true` enables per-organization billing (API calls require `customerType: "organization"`)
- **Trial management**: `preventDuplicateTrials: true` prevents duplicate trials
- **Multi-item**: supports subscriptions with multiple plans, add-ons, and charges

## Options / Props

| Property | Type | Description |
|---|---|---|
| `chargebeeClient` | Chargebee | SDK instance (required) |
| `createCustomerOnSignUp` | boolean | Automatically create a customer on sign-up |
| `preventDuplicateTrials` | boolean | Prevent multiple trials |
| `authorizeReference?` | function | Permission check for the reference ID |
| `subscription.enabled` | boolean | Enable subscription features |
| `subscription.plans` | array \| function | Definitions of available plans |
| `webhookUsername` | string | Webhook Basic Auth username |
| `webhookPassword` | string | Webhook Basic Auth password |
| `webhookHandler?` | function | Custom webhook handler |

### Plan definition

| Property | Type | Description |
|---|---|---|
| `name` | string | Plan identifier (required) |
| `itemPriceId` | string | Chargebee Item Price ID (required) |
| `type` | string | `"plan"` / `"addon"` / `"charge"` |
| `limits` | object | Usage limits |
| `freeTrial?` | object | Free trial settings |

## Notes

### DB schema

Adds 4 tables:

- `user`: adds a `chargebeeCustomerId` field
- `organization`: adds a `chargebeeCustomerId` field (when using the organization plugin)
- `subscription`: tracks status, period, trial dates, seats, and metadata
- `subscriptionItem`: stores individual plan/add-on/charge items

## Related

- [stripe.md](./stripe.md)
- [organization.md](./organization.md)
