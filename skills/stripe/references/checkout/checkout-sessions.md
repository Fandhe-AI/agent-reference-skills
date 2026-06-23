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
| `ui_mode` | string | `'hosted'` (default, redirects to Stripe-hosted page) or `'embedded'` or `'elements'`. |
| `customer` | string | Existing Customer ID to associate with the session. |
| `customer_email` | string | Pre-fill the customer's email address. |
| `billing_address_collection` | string | `'auto'` or `'required'`. |
| `shipping_address_collection` | object | `{ allowed_countries: string[] }` — collect shipping address. |
| `automatic_tax` | object | `{ enabled: boolean }` — enable automatic tax calculation. |
| `customer_creation` | string | `'always'` or `'if_required'`. |
| `submit_type` | string | Submit button label: `'pay'`, `'donate'`, or `'book'`. |
| `payment_method_types` | array | Explicit list of accepted payment method types. Omit to use dynamic payment methods. |
| `allow_promotion_codes` | boolean | Allow customers to enter promotion codes. |
| `expires_at` | integer | Unix timestamp for session expiration (30 min – 24 h from creation). |
| `client_reference_id` | string | Arbitrary string to reconcile the session with your internal order. |
| `metadata` | object | Set of key-value pairs for storing additional information. |

### UI modes

| Mode | Description |
|------|-------------|
| `hosted` | Stripe-hosted full-page checkout (recommended). Lowest effort, most features. |
| `embedded` | Embedded form in your page; no redirect. Moderate customization via Appearance API. |
| `elements` | Fully custom UI built with Stripe Elements. Highest flexibility, most effort. |

## Notes

- A session expires after 24 hours by default; use `expires_at` to shorten it (minimum 30 minutes from creation).
- After completion, retrieve the session to access `payment_status`, `customer`, and `payment_intent`.
- For `ui_mode: 'elements'`, initialize the client side with `stripe.initCheckoutElementsSdk({ clientSecret })` instead of redirecting.
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

- [Payment Links](./payment-links.md)
- [Stripe Elements](./stripe-elements.md)
