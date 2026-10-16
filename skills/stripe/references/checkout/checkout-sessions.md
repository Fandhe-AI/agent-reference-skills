# Checkout Sessions

A Checkout Session represents a customer's session for completing a one-time payment or subscription via a Stripe-hosted or embedded payment page. Create a new session for each payment attempt; after completion it holds references to a Customer and either a PaymentIntent or Subscription.

## Signature / Usage

```javascript
// Server-side: create a session and redirect the customer
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const session = await stripe.checkout.sessions.create({
  line_items: [{ price: 'price_xxx', quantity: 1 }],
  mode: 'payment',
  success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${YOUR_DOMAIN}/cancel`,
});

res.redirect(303, session.url);
```

## Options / Props

### Create parameters

| Name | Type | Description |
|------|------|-------------|
| `line_items` | array | Products and quantities to sell. Each item requires `price` (or `price_data`) and `quantity`. |
| `mode` | string | `'payment'` (one-time), `'subscription'`, or `'setup'`. |
| `success_url` | string | URL to redirect after successful payment. Supports `{CHECKOUT_SESSION_ID}` placeholder. |
| `cancel_url` | string | URL to redirect if customer cancels. |
| `ui_mode` | string | `'hosted_page'` (redirects to a Stripe-hosted page), `'embedded_page'`, `'elements'`, or `'form'` (Checkout form). Since `2026-03-25.dahlia` the old values `hosted`, `embedded` and `custom` fail (see Notes). |
| `customer` | string | Existing Customer ID to associate with the session. |
| `customer_email` | string | Pre-fill the customer's email address. |
| `billing_address_collection` | string | `'auto'` or `'required'`. |
| `shipping_address_collection` | object | `{ allowed_countries: string[] }` — collect shipping address. |
| `automatic_tax` | object | `{ enabled: boolean }` — enable automatic tax calculation. |
| `customer_creation` | string | `'always'` or `'if_required'`. |
| `submit_type` | string | Submit button label: `'pay'`, `'donate'`, or `'book'`. |
| `payment_method_types` | array | Explicit list of accepted payment method types. Omit to use dynamic payment methods. Removed in `2026-09-30.endive` (see Notes). |
| `allowed_payment_method_types` | array | Added in `2026-09-30.endive`. Narrows the set of payment methods; types that are unsupported for the current `currency`, `amount`, `customer` etc. are filtered out without an error. |
| `excluded_payment_method_types` | array | Exclude specific types from the dynamic payment methods result. |
| `allow_promotion_codes` | boolean | Allow customers to enter promotion codes. |
| `expires_at` | integer | Unix timestamp for session expiration (30 min – 24 h from creation). |
| `client_reference_id` | string | Arbitrary string to reconcile the session with your internal order. |
| `metadata` | object | Set of key-value pairs for storing additional information. |

### UI modes

| Mode | Description |
|------|-------------|
| `hosted_page` | Stripe-hosted full-page checkout (recommended). Lowest effort, most features. Replaces `hosted`. |
| `embedded_page` | Embedded page on your website; no redirect. Moderate customization via Appearance API. Replaces `embedded`. |
| `elements` | Embedded components on your website (Elements with Checkout Sessions). Highest flexibility, most effort. Replaces `custom`. |
| `form` | Checkout form UI mode, with default Adaptive Pricing support and improved payment method handling. Added in `2026-03-25.dahlia`. |

## Notes

- `payment_method_types` was removed from Checkout Session create in `2026-09-30.endive`: passing it returns a `400` error. Use dynamic payment methods (managed in the Dashboard), `excluded_payment_method_types`, or the new `allowed_payment_method_types`. The response `payment_method_types` property remains and lists the narrowed set. Previously an unsupported type in `payment_method_types` caused an error; `allowed_payment_method_types` silently drops it.
- A session expires after 24 hours by default; use `expires_at` to shorten it (minimum 30 minutes from creation).
- After completion, retrieve the session to access `payment_status`, `customer`, and `payment_intent`.
- For `ui_mode: 'elements'`, initialize the client side with `stripe.initCheckoutElementsSdk({ clientSecret })` instead of redirecting.
- `ui_mode` enum (breaking, `2026-03-25.dahlia`): `hosted` / `embedded` / `custom` were removed and setting them fails; use `hosted_page` / `embedded_page` / `elements`. The new `form` value enables the Checkout form UI mode.
- Stripe.js renames (breaking, `2026-03-25.dahlia`): `stripe.initCheckout()` became `stripe.initCheckoutElementsSdk()` (same options and return value; React `CheckoutProvider` became `CheckoutElementsProvider`); for `ui_mode: "form"` use `stripe.initCheckoutFormSdk()` (React `CheckoutFormProvider` / `CheckoutForm`). `stripe.initEmbeddedCheckout()` became `stripe.createEmbeddedCheckoutPage()`. Calling the old names throws an `IntegrationError`.
- `stripe.initCheckout` became synchronous in `2025-09-30.clover`: remove `await` / `.then()`, pass a client secret string or Promise instead of `fetchClientSecret`, and call `checkout.loadActions()` once to reach `getSession()` (replaces `session()`) and `confirm()`. React needs `@stripe/react-stripe-js` 5.0.0 or later.
- `stripe.redirectToCheckout` is no longer supported in Stripe.js (`2025-09-30.clover`); redirect to `session.url` (for example `window.location.href = session.url`) instead. Client-only integrations should migrate to Payment Links and Buy Buttons.
- The `currency_conversion` field was removed from the Checkout Session object in `2025-09-30.clover`. For sessions created on or after 2025-03-30 read `presentment_details`; for older sessions use the top-level fields.
- Elements with Checkout Sessions (`2026-09-30.endive`, breaking): `canConfirm` stays `false` while a server update is queued or in progress, so confirm only when it is `true`; empty optional address fields no longer fail format validation (a provided value is still validated); a billing field set to `never` on the Payment Element is no longer collected, so supply it through `updateBillingAddress` / `updateEmail` / `updatePhoneNumber` or a `checkout.confirm()` option, otherwise `confirm()` throws an integration error.
- Non-breaking (`2026-09-30.endive`): Bancontact supports `payment_method_options.bancontact.setup_future_usage` / `payment_intent_data.setup_future_usage` = `off_session`, producing a reusable SEPA Direct Debit payment method.
- Listen to `checkout.session.completed` webhook before fulfilling orders — do not rely solely on `success_url` redirect.
- Delayed payment methods (e.g., bank transfers) fire `checkout.session.async_payment_succeeded` or `checkout.session.async_payment_failed` after the initial completion event.

### Webhook events

| Event | Trigger |
|-------|---------|
| `checkout.session.completed` | Session successfully completed |
| `checkout.session.expired` | Session expired without payment |
| `checkout.session.async_payment_succeeded` | Delayed payment method succeeded |
| `checkout.session.async_payment_failed` | Delayed payment method failed |

### API endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/v1/checkout/sessions` | Create a session |
| `GET` | `/v1/checkout/sessions/:id` | Retrieve a session |
| `POST` | `/v1/checkout/sessions/:id` | Update a session |
| `GET` | `/v1/checkout/sessions/:id/line_items` | List session line items |
| `GET` | `/v1/checkout/sessions` | List all sessions |
| `POST` | `/v1/checkout/sessions/:id/expire` | Expire a session early |

## Related

- [Payment Links](../payment-links/payment-links.md)
- [Stripe Elements](../elements/stripe-elements.md)
