# Early Fraud Warnings

Notifications from card issuers indicating a charge may be fraudulent, surfaced before a formal dispute is filed. Part of Stripe Radar (`radar.early_fraud_warning` object).

## Signature / Usage

```ts
// Retrieve an early fraud warning
const efw = await stripe.radar.earlyFraudWarnings.retrieve('issfr_xxx');

// List all early fraud warnings
const warnings = await stripe.radar.earlyFraudWarnings.list({ limit: 10 });

// List warnings for a specific charge
const warnings = await stripe.radar.earlyFraudWarnings.list({
  charge: 'ch_xxx',
});
```

## Options / Props

### Early Fraud Warning Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (`issfr_...`) |
| `object` | string | `"radar.early_fraud_warning"` |
| `actionable` | boolean | `true` if no dispute has been filed and the charge has not been fully refunded |
| `charge` | string | Expandable ID of the associated Charge |
| `payment_intent` | string \| null | Expandable ID of the associated PaymentIntent |
| `fraud_type` | enum | Type of fraud reported by the issuer (see values below) |
| `created` | timestamp | Unix epoch creation time |
| `livemode` | boolean | `true` in live mode |

### `fraud_type` Values

| Value | Description |
|-------|-------------|
| `card_never_received` | Physical card was never received by the cardholder |
| `fraudulent_card_application` | Card was obtained via a fraudulent application |
| `made_with_counterfeit_card` | Transaction made with a counterfeit card |
| `made_with_lost_card` | Transaction made with a reported lost card |
| `made_with_stolen_card` | Transaction made with a reported stolen card |
| `unauthorized_use_of_card` | Card used without cardholder authorization |
| `misc` | Other fraud type not covered above |

### List Parameters (`GET /v1/radar/early_fraud_warnings`)

| Parameter | Type | Description |
|-----------|------|-------------|
| `charge` | string | Filter by Charge ID |
| `payment_intent` | string | Filter by PaymentIntent ID |
| `limit` | number | Number of results (1–100, default 10) |
| `starting_after` | string | Cursor for pagination |
| `ending_before` | string | Cursor for reverse pagination |
| `created` | object | Filter by creation time `{ gt, gte, lt, lte }` |

### Webhook Events

| Event | Description |
|-------|-------------|
| `radar.early_fraud_warning.created` | A new early fraud warning was received from the issuer |
| `radar.early_fraud_warning.updated` | An existing early fraud warning was updated |

## Notes

- `actionable: true` means no dispute has been filed yet; proactively refunding can prevent chargebacks
- Once a charge is fully refunded or disputed, `actionable` becomes `false`
- Early fraud warnings do not automatically result in refunds or disputes — action is at the merchant's discretion
- Use `expand: ['charge', 'payment_intent']` in the retrieve/list request to inline related objects

## Related

- [reviews.md](./reviews.md)
- [rules.md](./rules.md)
