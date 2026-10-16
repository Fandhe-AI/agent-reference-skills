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
- `payment_method_types` as a writable parameter was removed from PaymentIntent create / update / confirm and SetupIntent create / update (removed in 2026-09-30.endive); passing it returns `400` with code `payment_method_types_no_longer_supported`. Use `automatic_payment_methods` / dynamic payment methods, `excluded_payment_method_types`, or `allowed_payment_method_types` (incompatible types are filtered, not errors). `payment_method_types` stays on the object as a read-only computed list. (Source: https://docs.stripe.com/changelog/endive/2026-09-30/removes-the-payment-method-types-parameter-from-payment-intents-and-setup-intents)
- 3D Secure Data Share Only: `2026-09-30.endive` adds `data_share_only` to `three_d_secure.result` under `payment_method_details.card` on Charge, SetupAttempt, PaymentRecord and PaymentAttemptRecord. Charge events (e.g. `charge.succeeded`) now include a `three_d_secure` object for Data Share Only transactions (previously `null`, indistinguishable from no 3DS). Applies to Data Share Only transactions from 2026-09-30 onward. (Source: https://docs.stripe.com/changelog/endive/2026-09-30/data-share-only)
- `payment_record` (`2026-09-30.endive`): expandable property holding the ID of the associated Payment Record, so you can reach it from the PaymentIntent without a separate lookup. (Source: https://docs.stripe.com/changelog/endive/2026-09-30/payment-records-on-payment-intents)
- `allowed_payment_method_types` (`2026-09-30.endive`) now accepts `card_present` (in-person card payments with Stripe Terminal) and `interac_present` (Interac in Canada) on PaymentIntents and SetupIntents, on create, update, confirm and retrieve. (Source: https://docs.stripe.com/changelog/endive/2026-09-30/card-present-and-interac-present-enum-values-for-allowed-payment-method-types)
- Breaking (`2026-09-30.endive`): India recurring card mandates reject duplicate references while a mandate is pending, not only when active; a reused reference returns `resource_already_exists` on intent creation or confirmation. Use a unique reference per mandate. (Source: https://docs.stripe.com/changelog/endive/2026-09-30/duplicate-reference-validation-for-india-pending-mandates)
- Swish QR code (`2026-09-30.endive`): `next_action.swish_handle_redirect_or_display_qr_code.qr_code.expires_at` is an integer Unix timestamp of the QR code's expiration. (Source: https://docs.stripe.com/changelog/endive/2026-09-30/expiration-timestamp-swish-qr)
- Breaking (`2025-09-30.clover`): a PaymentIntent confirmed with the `crypto` payment method (stablecoin payments) enters `processing` once the user submits the transaction to the blockchain. Cancelling it in that state fails with `payment_intent_invalid_cancellation_state`; listen to `payment_intent.processing` if you need the transition. (Source: https://docs.stripe.com/changelog/clover/2025-09-30/stablecoin-payments-processing-status)

## Related

- [PaymentMethods](./payment-methods.md)
- [Charges](./charges.md)
- [Refunds](./refunds.md)
