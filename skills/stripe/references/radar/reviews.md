# Radar Reviews

Manual review queue that supplements automated fraud detection, allowing human judgment on flagged payments before capture or fulfillment.

## Signature / Usage

```ts
// Retrieve a review
const review = await stripe.reviews.retrieve('prv_xxx');

// List open reviews
const reviews = await stripe.reviews.list({ limit: 10 });

// Approve a review
const approved = await stripe.reviews.approve('prv_xxx');
```

## Options / Props

### Review Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (`prv_...`) |
| `object` | string | `"review"` |
| `open` | boolean | `true` if the review still needs action |
| `opened_reason` | enum | `rule` or `manual` |
| `reason` | string | Current open/closed reason (see `closed_reason` values) |
| `closed_reason` | enum \| null | `approved`, `refunded`, `refunded_as_fraud`, `disputed`, `redacted`, `canceled`, `payment_never_settled`, `acknowledged` |
| `charge` | string \| null | Expandable ID of the associated Charge |
| `payment_intent` | string \| null | Expandable ID of the associated PaymentIntent |
| `billing_zip` | string \| null | ZIP/postal code of the card used |
| `ip_address` | string \| null | IP address where the payment originated |
| `ip_address_location` | object \| null | `{ city, country, latitude, longitude, region }` |
| `session` | object \| null | `{ browser, device, platform, version }` |
| `refund_signals` | object \| null | `{ early_fraud_warning, recommended_refund }` — smart refund indicators |
| `created` | timestamp | Unix epoch creation time |
| `livemode` | boolean | `true` in live mode |

### List Parameters (`GET /v1/reviews`)

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | number | Number of results (1–100, default 10) |
| `starting_after` | string | Cursor for pagination (review ID) |
| `ending_before` | string | Cursor for reverse pagination |
| `created` | object | Filter by creation time `{ gt, gte, lt, lte }` |

### Webhook Events

| Event | Description |
|-------|-------------|
| `review.opened` | Review created and added to the queue |
| `review.closed` | Review closed; `closed_reason` indicates outcome |

## Notes

- Payments added to the review queue are placed on hold; capture should happen after review
- ACH and SEPA transfers do not support manual review — use Allow/Block rules instead
- If a customer disputes a payment currently in review, the review closes automatically with reason `disputed`
- Smart Refunds (`refund_signals.recommended_refund`) uses an AI model to predict chargeback likelihood
- Approving ends the review; the charge can still be refunded or reported as fraud afterward
- Refunding and reporting as fraud automatically adds the card fingerprint and email to Stripe's default blocklists
- Reviews can be assigned to team members to prevent duplicate work; only your own assignments can be reassigned
- Dashboard shortcut: `J` / `K` to navigate between payments in the list view

## Related

- [rules.md](./rules.md)
- [early-fraud-warnings.md](./early-fraud-warnings.md)
