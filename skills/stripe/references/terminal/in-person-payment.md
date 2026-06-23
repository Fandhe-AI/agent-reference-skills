# In-Person Payment Flow

The Stripe Terminal in-person payment flow collects card-present payment data from a physical reader and charges it via a PaymentIntent. The JS SDK flow has four steps: create PaymentIntent → collect payment method → process payment → capture.

## Signature / Usage

```javascript
// 1. Server: create a PaymentIntent with card_present
// POST /v1/payment_intents
// payment_method_types[]=card_present, capture_method=manual

// 2. Client: collect payment method from the reader
const collectResult = await terminal.collectPaymentMethod(clientSecret);
if (collectResult.error) { /* handle */ }

// 3. Client: process (authorize) the payment
const processResult = await terminal.processPayment(collectResult.paymentIntent);
if (processResult.error) { /* handle */ }

// 4. Server: capture (if capture_method=manual)
// POST /v1/payment_intents/:id/capture
```

## Options / Props

### Step 1 — Create PaymentIntent (server-side)

| Parameter | Value | Notes |
|-----------|-------|-------|
| `payment_method_types[]` | `card_present` | Required for Terminal payments |
| `capture_method` | `manual` \| `automatic` | `manual` = authorize now, capture later; `automatic` = single-step |
| `amount` | integer | Amount in smallest currency unit |
| `currency` | string | ISO 4217 currency code |

### Step 2 — `collectPaymentMethod(clientSecret, options?)`

| Option | Type | Description |
|--------|------|-------------|
| `config_override.update_payment_intent` | boolean | Attach collected PaymentMethod to the PaymentIntent before authorization; allows inspecting card details |
| `config_override.enable_customer_cancellation` | boolean | Show a cancel button on the reader display |

### Step 3 — `processPayment(paymentIntent)`

Returns `{ paymentIntent }` on success. Check `paymentIntent.status`:

| Status | Meaning | Action |
|--------|---------|--------|
| `requires_capture` | Authorized, awaiting capture | Call `/capture` on server within 2 days |
| `succeeded` | Authorized and captured (`automatic`) | Done |
| `requires_payment_method` | Card declined | Call `collectPaymentMethod` again with same PaymentIntent |
| `requires_confirmation` | Transient connection issue | Retry `processPayment` with same PaymentIntent |

### Reader Discovery & Connection (JS SDK)

```javascript
// Discover internet-connected readers at a location
const { discoveredReaders } = await terminal.discoverReaders({
  simulated: false,
  location: 'tml_xxx',
});

// Connect to a reader
const { reader, error } = await terminal.connectReader(discoveredReaders[0], {
  fail_if_in_use: true, // fail rather than hijack an active transaction
});
```

## Notes

- Always load the JS SDK from `https://js.stripe.com/terminal/v1/` — do not self-host or bundle
- Never create a new PaymentIntent on retry; reuse the original to avoid double charges
- After `collectPaymentMethod`, you must call `processPayment` or `cancelCollectPaymentMethod` within 30 seconds
- For manual capture, the authorization expires after 2 days if not captured; cancel uncaptured authorizations not linked to completed orders
- Server-side confirmation (via API) skips PIN prompts and other cardholder interactions; always use client-side `processPayment`
- For BBPOS WisePOS E, Stripe Reader S700/S710, and Verifone readers, the server-driven integration (`process_payment_intent` API endpoint) is recommended over the JS SDK
- Chrome 142+ requires explicit user permission for local network device access
- Always use reader objects returned by the most recent `discoverReaders` call; do not cache them

## Related

- [readers.md](./readers.md)
- [connection-tokens.md](./connection-tokens.md)
- [locations.md](./locations.md)
