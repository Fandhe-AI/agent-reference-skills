# Dodo Payments

Plugin integrating the global Merchant-of-Record platform Dodo Payments with Better Auth. Centralizes sales, tax, fraud, and compliance across 150+ countries.

## Signature / Usage

### Installation

```bash
npm install @dodopayments/better-auth dodopayments better-auth zod
```

Environment variables:

```
DODO_PAYMENTS_API_KEY=your_api_key_here
DODO_PAYMENTS_WEBHOOK_SECRET=your_webhook_secret_here
```

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { dodoPayments } from "@dodopayments/better-auth"
import DodoPayments from "dodopayments"

const dodoClient = new DodoPayments({ bearerToken: process.env.DODO_PAYMENTS_API_KEY })

export const auth = betterAuth({
    plugins: [
        dodoPayments({
            client: dodoClient,
            createCustomerOnSignUp: true,
            use: [checkout({ products: [{ productId: "xxx", slug: "premium-plan" }] }), portal(), webhooks({ secret: process.env.DODO_PAYMENTS_WEBHOOK_SECRET })]
        })
    ]
})
```

### Setup (client side)

```typescript
import { dodoPaymentsClient } from "@dodopayments/better-auth/client"

export const authClient = createAuthClient({
    plugins: [dodoPaymentsClient()]
})
```

### API methods

| Method | Description |
|---|---|
| `authClient.dodopayments.checkoutSession({ slug })` | Create a checkout session |
| `authClient.dodopayments.customer.portal()` | Redirect to the customer portal |
| `authClient.dodopayments.subscriptions.list()` | List subscriptions |
| `authClient.dodopayments.payments.list()` | Get payment history |

### Key features

- Automatic customer creation on sign-up
- Type-safe checkout flow
- Self-service customer portal access
- Webhook signature verification
- Default webhook endpoint: `/api/auth/dodopayments/webhooks`

## Options / Props

| Property | Type | Description |
|---|---|---|
| `client` | DodoPayments | SDK instance (required) |
| `createCustomerOnSignUp` | boolean | Automatically create a customer on sign-up |
| `use` | array | Array of sub-plugins (checkout, portal, webhooks) |

### checkout configuration

| Property | Type | Description |
|---|---|---|
| `products` | array | Array mapping product IDs to slugs |
| `successUrl?` | string | Redirect URL after successful payment |
| `authenticatedUsersOnly?` | boolean | Restrict to authenticated users only (default: false) |

## Related

- [stripe.md](./stripe.md)
- [creem.md](./creem.md)
