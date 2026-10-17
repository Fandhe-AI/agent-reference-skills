# Creem

Better Auth plugin (`@creem_io/better-auth`) for Creem checkouts, subscriptions, and access control. Creem is a Merchant of Record for developers who sell software globally. The plugin adds session-aware endpoints for checkout, the customer portal, subscriptions, and transaction history; verified webhooks keep subscription state in your database and call your own access callbacks. It is maintained by the Creem team (full reference: Creem documentation, docs.creem.io/code/sdks/better-auth).

Version 2.0 changed checkout and portal redirects, error responses, and cancellation access; upgrading from 1.x follows the Creem 2.0 migration guide.

## Signature / Usage

### Installation

```bash
npm install @creem_io/better-auth
```

The plugin requires `better-auth` 1.5.6 or later and includes the Creem TypeScript SDK. Install it in both parts of a separate client and server setup.

```
CREEM_API_KEY=your_api_key
CREEM_WEBHOOK_SECRET=your_webhook_secret
```

Test mode and production use different API keys and webhook secrets. `testMode` defaults to `false`; set it to `true` whenever you use a test-mode key.

```typescript
import { betterAuth } from "better-auth";
import { creem } from "@creem_io/better-auth";

export const auth = betterAuth({
    plugins: [
        creem({
            apiKey: process.env.CREEM_API_KEY!,
            webhookSecret: process.env.CREEM_WEBHOOK_SECRET!,
            testMode: process.env.NODE_ENV !== "production",
            defaultSuccessUrl: "/billing/success",
        }),
    ],
});
```

Client:

```typescript
import { createAuthClient } from "better-auth/react";
import { creemClient } from "@creem_io/better-auth/client";

export const authClient = createAuthClient({ plugins: [creemClient()] });
```

The standard client infers endpoint inputs and responses plus the `creemCustomerId` and `hadTrial` session fields. The `createCreemAuthClient` wrapper from 1.x is deprecated.

Run `npx auth@latest migrate` (built-in Kysely adapter) or `npx auth@latest generate` (ORM-managed schema). Skip if `persistSubscriptions: false`.

Webhook endpoint: `https://your-domain.com/api/auth/creem/webhook` (registered only when `webhookSecret` is set). For local development expose the server with a tunnel such as ngrok.

### Usage

Every client method returns `{ data, error }`; on failure `data` is `null` and `error` has `message` and `status`. `auth.api` calls on the server throw an `APIError`.

#### Checkout

```typescript
const { data, error } = await authClient.creem.createCheckout({
    productId: "prod_abc123",
    successUrl: "/billing/success",
});
if (!error && data.url) window.location.assign(data.url);
```

Checkout returns the URL and leaves navigation to you; pass `redirect: true` to redirect automatically.

| Option | Description |
| --- | --- |
| `productId` | The Creem product ID. Required |
| `units` | Number of units. Default `1` |
| `successUrl` | Where Creem sends the customer after payment; overrides `defaultSuccessUrl` |
| `discountCode` | A Creem discount code |
| `customer` | `{ email }`; defaults to the signed-in user's email |
| `customFields` | Up to three text or checkbox fields to collect |
| `metadata` | Your metadata; the plugin adds the signed-in user's ID as `referenceId` |
| `requestId` | Idempotency key |
| `redirect` | Redirect automatically. Default `false` |

Webhooks link a purchase to a user through `metadata.referenceId`; a checkout created without a session has no `referenceId`.

#### Customer portal

```typescript
const { data, error } = await authClient.creem.createPortal();
if (!error && data.url) window.location.assign(data.url);
```

Defaults to `redirect: false`; uses the signed-in user's stored `creemCustomerId`. It also accepts a `customerId` but does not check ownership, so never pass one from untrusted input.

#### Check access

`hasAccessGranted` reads the signed-in user's stored subscriptions (requires persistence).

```typescript
const { data, error } = await authClient.creem.hasAccessGranted();
if (!error && data.hasAccessGranted) console.log(`Access until ${data.subscription?.periodEnd}`);
```

A subscription grants access while `active`, `trialing`, or `paid`. `scheduled_cancel`, `past_due`, or `unpaid` keep access until `periodEnd`. `canceled` does not grant access. Fails with `401` when signed out and `400` when persistence is disabled. On the server, `auth.api.hasAccessGranted({ headers })` throws an `APIError` when signed out, so check the session first.

#### Cancel / retrieve / transaction history

```typescript
await authClient.creem.cancelSubscription();
await authClient.creem.retrieveSubscription();
const { data } = await authClient.creem.searchTransactions({ productId: "prod_abc123", pageNumber: 1, pageSize: 20 });
```

With persistence enabled, `cancelSubscription` cancels the user's stored subscription that is `active`, `trialing`, `unpaid`, or `past_due` (an `id` you pass is used only when none exists). With persistence disabled, `id` is required and its ownership is not checked. `retrieveSubscription` returns the first stored subscription (pass `id` without persistence); `product` and `customer` can be IDs or expanded objects. `searchTransactions` returns `items` and `pagination` (amounts in cents), searches the user's `creemCustomerId` by default, and filters by `productId` or `orderId`.

### Webhooks

The route verifies the `creem-signature` header against `webhookSecret`, then (with persistence) updates the user's `creemCustomerId` and the `creem_subscription` table before calling your callbacks. Callbacks are awaited; Creem can deliver the same event more than once, so make them idempotent.

#### Grant and revoke access

```typescript
creem({
    apiKey: process.env.CREEM_API_KEY!,
    webhookSecret: process.env.CREEM_WEBHOOK_SECRET!,
    onGrantAccess: async ({ reason, product, metadata }) => {
        const userId = metadata?.referenceId;
        if (typeof userId !== "string") return;
        await setPlanAccess({ userId, productId: product.id, enabled: true, reason });
    },
    onRevokeAccess: async ({ reason, product, metadata }) => { /* same, enabled: false */ },
});
```

| Callback | Reason | Webhook event |
| --- | --- | --- |
| `onGrantAccess` | `subscription_active` | `subscription.active` |
| `onGrantAccess` | `subscription_trialing` | `subscription.trialing` |
| `onGrantAccess` | `subscription_paid` | `subscription.paid` |
| `onRevokeAccess` | `subscription_paused` | `subscription.paused` |
| `onRevokeAccess` | `subscription_expired` | `subscription.expired` |
| `onRevokeAccess` | `subscription_canceled` | `subscription.canceled` |

No other event calls these callbacks: `subscription.scheduled_cancel` keeps access until the period ends (stored as `scheduled_cancel` with `cancelAtPeriodEnd: true`); refunds, disputes, and failed payments do not revoke access; one-time purchases create no subscription events (grant in `onCheckoutCompleted`).

#### Event callbacks

Each receives the flattened event data and the Better Auth endpoint context as the second argument: `onCheckoutCompleted`, `onRefundCreated`, `onDisputeCreated`, `onSubscriptionActive`, `onSubscriptionTrialing`, `onSubscriptionPaid`, `onSubscriptionCanceled`, `onSubscriptionScheduledCancel`, `onSubscriptionExpired`, `onSubscriptionUnpaid`, `onSubscriptionPastDue`, `onSubscriptionPaused`, `onSubscriptionUpdate` (events `checkout.completed`, `refund.created`, `dispute.created`, `subscription.active|trialing|paid|canceled|scheduled_cancel|expired|unpaid|past_due|paused|update`).

#### Custom webhook route

Verify the raw body with `validateWebhookSignature` (a promise; await it). Do not point Creem at both routes for the same events.

```typescript
import { validateWebhookSignature } from "@creem_io/better-auth/server";

export async function POST(request: Request) {
    const payload = await request.text();
    const signature = request.headers.get("creem-signature");
    const valid = await validateWebhookSignature(payload, signature, process.env.CREEM_WEBHOOK_SECRET!);
    if (!valid) return new Response("Invalid signature", { status: 401 });
    const event = JSON.parse(payload);
    return new Response(null, { status: 204 });
}
```

### Server helpers

`@creem_io/better-auth/server` exports `createCheckout`, `createPortal`, `cancelSubscription`, `retrieveSubscription`, `searchTransactions`, and `createCreemClient` for code outside Better Auth endpoints. They call Creem with your API key and do not read the session; authenticate the request and verify ownership of every customer or subscription ID yourself. Set `metadata.referenceId` yourself so webhooks can link the purchase; pass `skipTrial` explicitly.

```typescript
import { createCheckout } from "@creem_io/better-auth/server";

const { url } = await createCheckout(
    { apiKey: process.env.CREEM_API_KEY!, testMode: process.env.NODE_ENV !== "production" },
    {
        productId,
        customer: { email: session.user.email },
        successUrl: "/billing/success",
        metadata: { referenceId: session.user.id },
        skipTrial: session.user.hadTrial === true,
    },
);
```

Use `auth.api.hasAccessGranted` for server-side access checks; the exported `checkSubscriptionAccess` and `getActiveSubscriptions` helpers expect a raw query builder most adapters do not provide and ignore scheduled cancellations and payment grace periods.

### Trial abuse prevention

With persistence enabled the plugin sets `hadTrial` on the user when a subscription enters a trial; a later signed-in checkout tells Creem to skip the trial on any plan. Server-helper checkouts skip it only when you pass `skipTrial`.

## Options / Props

### Schema

With `persistSubscriptions` enabled (default) the plugin adds `user.creemCustomerId?`, `user.hadTrial?` (default false) and the `creem_subscription` table: `id`, `productId`, `referenceId` (owner user ID), `creemCustomerId?`, `creemSubscriptionId?`, `creemOrderId?`, `status` (default `pending`), `periodStart?`, `periodEnd?`, `cancelAtPeriodEnd?`. With `persistSubscriptions: false` no tables or fields are added and `hasAccessGranted` and trial prevention are unavailable.

Customize with `schema`:

```typescript
creem({
    schema: {
        creem_subscription: { modelName: "billing_subscription", fields: { referenceId: "user_id" } },
        user: { fields: { creemCustomerId: "creem_customer_id" } },
    },
});
```

### Server options

| Option | Type | Description |
| --- | --- | --- |
| `apiKey` | string | Your Creem API key. Required |
| `webhookSecret` | string | Webhook signing secret; the route is only registered when set |
| `testMode` | boolean | Use the Creem test API. Default `false` |
| `defaultSuccessUrl` | string | Default `successUrl` (relative or absolute) |
| `persistSubscriptions` | boolean | Store customers and subscriptions. Default `true` |
| `schema` | object | Rename tables and columns |
| `onGrantAccess` | function | Called when a subscription event grants access |
| `onRevokeAccess` | function | Called when a subscription event revokes access |

### Client options

| Option | Type | Description |
| --- | --- | --- |
| `persistSubscriptions` | boolean | Set to `false` when the server disables persistence so session types omit `creemCustomerId` and `hadTrial`. Default `true` |

## Notes

- Changed in 1.7 docs: the page was restructured (Usage / Webhooks / Server helpers / Trial abuse prevention / Schema / Options). The former "Database Mode vs API Mode", "Type Exports", and "Troubleshooting" sections no longer appear.
- Version 2.0 of the plugin changed checkout / portal redirects (`redirect` defaults to `false`), error responses (`{ data, error }`), and cancellation access.

## Related

- [stripe.md](./stripe.md)
- [chargebee.md](./chargebee.md)
