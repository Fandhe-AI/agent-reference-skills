# Subscriptions

Automate recurring billing by linking a Customer to one or more Prices. Stripe generates Invoices and attempts payment on each billing cycle automatically.

## Signature / Usage

```bash
# Create a subscription (incomplete → active after first payment)
curl https://api.stripe.com/v1/subscriptions \
  -u "sk_test_...:" \
  -d "customer=cus_xxx" \
  -d "items[0][price]=price_xxx" \
  -d "payment_behavior=default_incomplete" \
  -d "payment_settings[save_default_payment_method]=on_subscription" \
  -d "expand[0]=latest_invoice.confirmation_secret"
```

## Options / Props

### Create Parameters

| Name | Type | Description |
|------|------|-------------|
| `customer` | string | Customer ID (required) |
| `items` | array | Array of `{ price }` objects; each item links a Price to the subscription |
| `payment_behavior` | enum | `default_incomplete` — hold in `incomplete` until payment confirmed; `allow_incomplete` — create even if payment fails |
| `collection_method` | enum | `charge_automatically` (default) or `send_invoice` |
| `trial_period_days` | integer | Free trial length in days |
| `trial_end` | timestamp | Explicit trial end date (overrides `trial_period_days`) |
| `trial_settings.end_behavior.missing_payment_method` | enum | `pause` or `cancel` when trial ends with no payment method |
| `default_payment_method` | string | PaymentMethod ID to use for this subscription |
| `cancel_at_period_end` | boolean | Cancel at end of current billing period instead of immediately |
| `proration_behavior` | enum | `create_prorations` (default), `none`, or `always_invoice` |
| `metadata` | object | Arbitrary key-value pairs |

### Subscription Statuses

| Status | Meaning |
|--------|---------|
| `trialing` | In trial period; transitions to `active` on first payment |
| `active` | Healthy; grants product access |
| `incomplete` | Awaiting payment confirmation within 23 hours |
| `incomplete_expired` | 23-hour window lapsed; customer not charged |
| `past_due` | Latest invoice unpaid; Stripe continues retrying |
| `unpaid` | Latest invoice unpaid; retries stopped |
| `paused` | Trial ended without a payment method |
| `canceled` | Permanently ended; unmodifiable |

### Key Endpoints

| Operation | Method | Path |
|-----------|--------|------|
| Create | POST | `/v1/subscriptions` |
| Retrieve | GET | `/v1/subscriptions/:id` |
| Update | POST | `/v1/subscriptions/:id` |
| Cancel | DELETE | `/v1/subscriptions/:id` |
| List | GET | `/v1/subscriptions` |
| Resume | POST | `/v1/subscriptions/:id/resume` |
| Search | GET | `/v1/subscriptions/search` |

## Notes

- A new subscription starts as `incomplete`; it becomes `active` only after the first invoice is paid. For async payment methods (e.g., ACH) it transitions directly to `active`.
- Use `payment_behavior=default_incomplete` and expand `latest_invoice.confirmation_secret` to obtain the client secret needed for `stripe.confirmPayment()` on the frontend.
- After cancellation only `metadata` and `cancellation_details` remain editable.
- Listen to `invoice.paid` and `invoice.payment_failed` webhooks for provisioning and dunning logic rather than polling subscription status.

### Key Webhook Events

| Event | When |
|-------|------|
| `customer.subscription.created` | Subscription created |
| `customer.subscription.updated` | Plan change, pause, resume, etc. |
| `customer.subscription.deleted` | Subscription canceled |
| `customer.subscription.trial_will_end` | 3 days before trial ends |
| `invoice.paid` | Successful payment; provision access |
| `invoice.payment_failed` | Payment failure; begin dunning |

## Related

- [Invoices](./invoices.md)
- [Products & Prices](./products-prices.md)
- [Customer Portal](./customer-portal.md)
