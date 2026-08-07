# Stripe

A plugin that integrates Stripe's payment and subscription features with Better Auth. It handles automatic Stripe customer creation at user sign-up, subscription lifecycle management, and webhook processing.

## Signature / Usage

### Installation

```bash
npm install @better-auth/stripe stripe@^22.0.0
```

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { stripe } from "@better-auth/stripe"
import Stripe from "stripe"

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const auth = betterAuth({
    plugins: [
        stripe({
            stripeClient,
            stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
            createCustomerOnSignUp: true,
            subscription: {
                enabled: true,
                plans: [
                    {
                        name: "pro",
                        priceId: "price_xxx",
                        limits: { seats: 5 }
                    }
                ]
            }
        })
    ]
})
```

### Webhook endpoint configuration

Register `/api/auth/stripe/webhook` as the webhook endpoint in the Stripe dashboard.

Migration:

```bash
npx auth migrate
```

### Subscription management

| Method | Endpoint | Description |
|---|---|---|
| `upgrade` | POST `/subscription/upgrade` | Create or upgrade a subscription |
| `list` | GET `/subscription/list` | List subscriptions |
| `cancel` | POST `/subscription/cancel` | Cancel a subscription |
| `restore` | POST `/subscription/restore` | Restore a cancellation/change schedule |
| `billing-portal` | POST `/subscription/billing-portal` | Create a Stripe Billing Portal session |

### upgrade parameters

| Parameter | Type | Description |
|---|---|---|
| `plan` | string | Plan name (required) |
| `successUrl` | string | Redirect URL after successful payment (required) |
| `cancelUrl` | string | Redirect URL on cancellation (required) |
| `annual?` | boolean | Annual billing flag |
| `referenceId?` | string | Reference ID for organization billing |
| `seats?` | number | Seat count (team billing) |
| `scheduleAtPeriodEnd?` | boolean | Schedule the plan change for the end of the period |

## Options / Props

| Property | Type | Description |
|---|---|---|
| `stripeClient` | Stripe | Stripe instance (required) |
| `stripeWebhookSecret` | string | Webhook signing secret (required) |
| `createCustomerOnSignUp` | boolean | Automatically create a customer on sign-up |
| `subscription.enabled` | boolean | Enables the subscription feature |
| `subscription.plans` | array \| function | Plan definitions |
| `onSubscriptionComplete?` | function | Hook run after checkout completes |
| `onSubscriptionCreated?` | function | Hook run when a subscription is created |
| `onSubscriptionUpdate?` | function | Hook run when a subscription changes |
| `onSubscriptionCancel?` | function | Hook run on cancellation |
| `onSubscriptionDeleted?` | function | Hook run on deletion |
| `getCheckoutSessionParams?` | function | Custom parameters for the checkout session |

### Plan definition

| Property | Type | Description |
|---|---|---|
| `name` | string | Plan identifier (required) |
| `priceId` | string | Stripe Price ID (required) |
| `limits` | object | Usage limits |
| `annualDiscountPriceId?` | string | Annual discount Price ID |
| `freeTrial?` | object | Free trial configuration |
| `seatPriceId?` | string | Per-seat Price ID |

### DB schema

Adds a `stripeCustomerId` field to the `user` table. When the organization plugin is used, the same field is added to the `organization` table.

Creates a new `subscription` table:

| Field | Description |
|---|---|
| `id`, `plan`, `referenceId`, `status` | Basic information |
| `periodStart`, `periodEnd` | Billing period |
| `cancelAtPeriodEnd`, `cancelAt`, `canceledAt`, `endedAt` | Cancellation-related |
| `trialStart`, `trialEnd` | Trial info |
| `seats`, `stripeScheduleId` | Team management |

## Notes

- **Organization billing**: `organization: { enabled: true }` bills the organization instead of the user
- **Trial management**: automatically enforces one trial per account
- **Scheduled changes**: `scheduleAtPeriodEnd: true` defers plan changes to the end of the period (uses Stripe's Subscription Schedules API)

## Related

- [organization.md](./organization.md)
- [chargebee.md](./chargebee.md)
