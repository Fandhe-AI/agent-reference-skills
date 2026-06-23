# Event Types

Stripe generates `Event` objects when API resource states change. Events follow a `resource.event` naming pattern and are delivered to configured event destinations.

## Signature / Usage

```javascript
// Handle specific event types in a webhook handler
switch (event.type) {
  case 'payment_intent.succeeded':
    const paymentIntent = event.data.object;
    // fulfill order
    break;
  case 'invoice.payment_failed':
    const invoice = event.data.object;
    // notify customer
    break;
  default:
    // unexpected event type
}
```

## Options / Props

### Event object (v1 snapshot)

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique event identifier |
| `object` | string | Always `"event"` |
| `type` | string | Event type string, e.g. `charge.succeeded` |
| `created` | timestamp | Unix timestamp |
| `livemode` | boolean | `true` in live mode |
| `data.object` | object | The API resource snapshot at event time |
| `data.previous_attributes` | object | Prior values of changed fields (`.updated` events only) |
| `api_version` | string | Stripe API version used to render `data` |
| `request.id` | string | API request that triggered the event; `null` for automatic events |
| `request.idempotency_key` | string | Idempotency key of the triggering request |
| `pending_webhooks` | integer | Count of webhooks not yet successfully delivered |
| `account` | string | Connected account that originated the event (Connect only) |

### Event formats

| Format | Payload size | Versioning | API origin | Access pattern |
|--------|-------------|------------|------------|----------------|
| Snapshot (v1) | Large — full object | Versioned (tied to `api_version`) | v1 and v2 endpoints | `event.data.object` directly |
| Thin (v2) | Lightweight | Unversioned | v2 endpoints only | Fetch via `fetchRelatedObject()` / `fetchEvent()` |

### Common event types by category

| Category | Key event types |
|----------|----------------|
| Charges | `charge.succeeded`, `charge.failed`, `charge.refunded`, `charge.dispute.created` |
| Payment Intents | `payment_intent.succeeded`, `payment_intent.payment_failed`, `payment_intent.requires_action` |
| Customers | `customer.created`, `customer.updated`, `customer.deleted` |
| Subscriptions | `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `customer.subscription.trial_will_end` |
| Invoices | `invoice.created`, `invoice.paid`, `invoice.payment_failed`, `invoice.finalized` |
| Checkout | `checkout.session.completed`, `checkout.session.expired` |
| Payment Methods | `payment_method.attached`, `payment_method.detached` |
| Payouts | `payout.created`, `payout.paid`, `payout.failed` |
| Refunds | `refund.created`, `refund.updated`, `refund.failed` |

## Notes

- Events are retained for **30 days**. Full payload + resend available for the first 15 days.
- Stripe does **not** guarantee event delivery order — handlers must be idempotent.
- Some events require **explicit opt-in** to receive: `identity.verification_session.redacted`, `issuing_authorization.request`, `reporting.report_type.updated`.
- Subresource events do not bubble up — `customer.subscription.updated` does not fire `customer.updated`.
- Some actions trigger multiple events (e.g., creating a subscription fires both `customer.subscription.created` and `charge.succeeded`).
- Log processed event IDs to detect and skip duplicate deliveries.
- Use `stripe trigger <event-type>` (Stripe CLI) to send test events.

## Related

- [Webhook Endpoints](./webhook-endpoints.md)
- [Signature Verification](./signature-verification.md)
