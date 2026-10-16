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
| `billing_mode[type]` | enum | `flexible` or `classic`. Subscriptions created through the API default to `flexible` on API version `2025-09-30.clover` or later (`classic` on earlier versions). Requires `2025-06-30.basil` or later. |
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
| `paused` | Trial ended without a payment method, or paused on demand (`2026-09-30.endive`, flexible billing mode); the `status_details` property describes the pause |
| `canceled` | Permanently ended; unmodifiable |

### Key Endpoints

| Operation | Method | Path |
|-----------|--------|------|
| Create | POST | `/v1/subscriptions` |
| Retrieve | GET | `/v1/subscriptions/:id` |
| Update | POST | `/v1/subscriptions/:id` |
| Cancel | DELETE | `/v1/subscriptions/:id` |
| List | GET | `/v1/subscriptions` |
| Pause | POST | `/v1/subscriptions/:id/pause` |
| Resume | POST | `/v1/subscriptions/:id/resume` |
| Search | GET | `/v1/subscriptions/search` |

## Notes

- A new subscription starts as `incomplete`; it becomes `active` only after the first invoice is paid. For async payment methods (e.g., ACH) it transitions directly to `active`.
- Use `payment_behavior=default_incomplete` and expand `latest_invoice.confirmation_secret` to obtain the client secret needed for `stripe.confirmPayment()` on the frontend.
- After cancellation only `metadata` and `cancellation_details` remain editable.
- Listen to `invoice.paid` and `invoice.payment_failed` webhooks for provisioning and dunning logic rather than polling subscription status.
- Flexible billing mode (default for API-created subscriptions since `2025-09-30.clover`, breaking) changes subscription behavior and invoice calculations compared with `classic`. A subscription can't be migrated from flexible back to classic. The default also applies to invoice previews, subscription schedules, quotes, and subscriptions created via Checkout Sessions and Payment Links. (Source: https://docs.stripe.com/changelog/clover/2025-09-30/billing-mode-default-flexible)
- Pause on demand (`2026-09-30.endive`): `POST /v1/subscriptions/:id/pause` requires flexible billing mode and stops invoice generation (unlike pausing payment collection, which keeps generating invoices). Handle `status_details` and the `customer.subscription.paused` / `customer.subscription.resumed` events. Resume accepts `payment_behavior` (resume when payment is attempted, or only after payment succeeds). Subscription Schedules gain `pause_schedules`. (Source: https://docs.stripe.com/changelog/endive/2026-09-30/pause-subscription)
- Automatic pause after payment failure (`2026-09-30.endive`, flexible billing mode only): can pause after the first failed renewal payment or after retries are exhausted; `status_details.paused.subscription.type` returns `first_payment_failure` or `final_payment_failure`. (Source: https://docs.stripe.com/changelog/endive/2026-09-30/pause-on-payment-failure)
- Scheduled cancellation (`2026-09-30.endive`): `pending_update.cancel_at_period_end` (nullable boolean) can be set by passing `cancel_at_period_end` when updating with `payment_behavior=pending_if_incomplete` (previously an error); a conflicting later update expires the pending update. (Source: https://docs.stripe.com/changelog/endive/2026-09-30/scheduled-subscription-cancellation)
- Trial Offers are generally available (`2026-09-30.endive`): reusable free or paid introductory pricing per Subscription Item, with a post-trial price; applied on create, on an existing item, or replacing an item's trial offer. A subscription can mix trial and non-trial items. (Source: https://docs.stripe.com/changelog/endive/2026-09-30/trial-offer-ga)
- Breaking (`2026-09-30.endive`): `billing_cycle_anchor` on update, resume and create preview invoice is now an object with a `type` field: `{type: 'now'}`, `{type: 'unchanged'}`; for a preview invoice of a new subscription with a future anchor use `{type: 'timestamp', timestamp: 1234567890}` instead of the bare timestamp. (Source: https://docs.stripe.com/changelog/endive/2026-09-30/polymorphic-billing-cycle-anchor)
- `cancellation_details.reason` can be `canceled_by_retention_policy` (`2026-03-25.dahlia`, breaking) for test-mode / sandbox subscriptions canceled by Stripe's test data retention policy (`livemode` false); previously `cancellation_requested`. (Source: https://docs.stripe.com/changelog/dahlia/2026-03-25/adds-new-cancellation-reason-subscription-test-retention-policy)
- Custom cancellation reasons (`2026-09-30.endive`): the Billing Feedback Option resource (create / retrieve / update / list / deactivate) can be configured on the customer portal configuration. (Source: https://docs.stripe.com/changelog/endive/2026-09-30/feedback-options-api)

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
