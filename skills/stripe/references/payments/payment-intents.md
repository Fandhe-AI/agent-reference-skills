# PaymentIntents

Tracks a payment from creation to completion, handling authentication, retries, and regulatory compliance (SCA). Create one PaymentIntent per order or customer session.

## Signature / Usage

```bash
# Create a PaymentIntent
curl https://api.stripe.com/v1/payment_intents \
  -u "sk_test_YOUR_SECRET_KEY:" \
  -d amount=2000 \
  -d currency=usd \
  -d "automatic_payment_methods[enabled]=true"
```

## Options / Props

### Create (`POST /v1/payment_intents`)

| Name | Type | Description |
|------|------|-------------|
| `amount` | integer (required) | Amount in smallest currency unit (e.g., 100 = $1.00 USD) |
| `currency` | enum (required) | Lowercase ISO 4217 currency code (e.g., `usd`) |
| `confirm` | boolean | Confirm immediately on creation. Default: `false` |
| `capture_method` | enum | `automatic_async` (default), `automatic`, or `manual` (separate auth/capture) |
| `customer` | string | ID of the associated Customer object |
| `payment_method` | string | ID of a PaymentMethod to attach |
| `payment_method_data` | object | Inline PaymentMethod creation hash |
| `automatic_payment_methods` | object | `{ enabled: true }` to let Stripe manage method selection |
| `setup_future_usage` | enum | `on_session` or `off_session` — saves the payment method for reuse |
| `metadata` | object | Arbitrary key-value pairs (copied to resulting Charge) |
| `receipt_email` | string | Email address to send the receipt to |
| `statement_descriptor` | string | Custom statement descriptor text (non-card) |
| `statement_descriptor_suffix` | string | Suffix appended to card statement descriptor (max 22 chars) |
| `off_session` | boolean/string | Indicate payment is off-session. Only with `confirm=true` |
| `on_behalf_of` | string | Connected account ID (Stripe Connect) |
| `transfer_data` | object | Destination and amount for Connect fund transfers |
| `description` | string | Arbitrary string for internal reference |

### Additional Actions

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/v1/payment_intents/:id/confirm` | POST | Initiate payment confirmation |
| `/v1/payment_intents/:id/capture` | POST | Capture authorized funds (manual capture_method) |
| `/v1/payment_intents/:id/cancel` | POST | Cancel an active PaymentIntent |
| `/v1/payment_intents/:id` | GET | Retrieve a PaymentIntent |
| `/v1/payment_intents` | GET | List all PaymentIntents |

## Notes

- A PaymentIntent creates **at most one successful Charge**; retries create additional charge attempts visible on the same PaymentIntent.
- The `client_secret` returned on creation is used client-side with Stripe.js; always serve it over HTTPS/TLS.
- Store the PaymentIntent ID server-side and reuse it for interrupted sessions — do not create a new one per attempt.
- Use idempotency keys (`Idempotency-Key` header) to prevent duplicate PaymentIntents.
- After confirmation, verify final status via **webhooks** (`payment_intent.succeeded`, `payment_intent.payment_failed`) rather than polling.
- `statement_descriptor_suffix` has a 22-character limit; special characters are restricted.
- Stripe recommends using **Checkout Sessions with Payment Element** for most new integrations.

## Related

- [PaymentMethods](./payment-methods.md)
- [Charges](./charges.md)
- [Refunds](./refunds.md)
