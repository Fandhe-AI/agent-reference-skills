# Creem

Plugin integrating Creem's financial OS with Better Auth. Payment processing and subscription management built directly into the authentication layer.

## Signature / Usage

### Installation

```bash
npm install @creem_io/better-auth
```

Environment variables:

```
CREEM_API_KEY=your_api_key_here
CREEM_WEBHOOK_SECRET=your_webhook_secret_here
```

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { creem } from "@creem_io/better-auth"

export const auth = betterAuth({
    plugins: [
        creem({
            apiKey: process.env.CREEM_API_KEY!,
            webhookSecret: process.env.CREEM_WEBHOOK_SECRET,
            testMode: true,
            persistSubscriptions: true,
            defaultSuccessUrl: "/success"
        })
    ]
})
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/react"
import { creemClient } from "@creem_io/better-auth/client"

export const authClient = createAuthClient({
    plugins: [creemClient()]
})
```

### API methods

| Method | Description |
|---|---|
| `authClient.creem.createCheckout({ productId, successUrl, discountCode?, metadata? })` | Create a payment session |
| `authClient.creem.createPortal()` | Open the self-service management portal |
| `cancelSubscription()` | Cancel a subscription |
| `retrieveSubscription()` | Retrieve subscription details |
| `hasAccessGranted()` | Check access based on subscription status |
| `searchTransactions({ productId, pageNumber, pageSize })` | Search transactions |

### Key features

- Automatic sync of customer and subscription data
- Access management based on subscription status
- Webhook signature verification
- Trial abuse prevention (one per account)
- Supports both DB persistence mode and API mode

## Options / Props

| Property | Type | Description |
|---|---|---|
| `apiKey` | string | Creem API key (required) |
| `webhookSecret?` | string | Webhook signature secret |
| `testMode?` | boolean | Test mode |
| `persistSubscriptions?` | boolean | Persist subscriptions to the DB |
| `defaultSuccessUrl?` | string | Default success URL |
| `onGrantAccess?` | function | Handler for granting access |
| `onRevokeAccess?` | function | Handler for revoking access |

## Related

- [stripe.md](./stripe.md)
- [chargebee.md](./chargebee.md)
