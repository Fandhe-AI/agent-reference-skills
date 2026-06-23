# Invoices

Invoices represent bills sent to customers. Subscription invoices are created automatically each billing cycle; standalone invoices can be created manually for one-off charges.

## Signature / Usage

```bash
# Finalize a draft invoice then attempt payment
curl -X POST https://api.stripe.com/v1/invoices/in_xxx/finalize \
  -u "sk_test_...:"

curl -X POST https://api.stripe.com/v1/invoices/in_xxx/pay \
  -u "sk_test_...:"
```

## Options / Props

### Invoice Statuses

| Status | Description | Allowed Transitions |
|--------|-------------|---------------------|
| `draft` | Not yet sent; fully editable | → `open` (finalize), delete |
| `open` | Finalized; awaiting payment | → `paid`, `void`, `uncollectible` |
| `paid` | Payment received | → `open` (revert) |
| `void` | Canceled; audit trail preserved | terminal |
| `uncollectible` | Treated as bad debt | → `void`, `paid` |

### Key Endpoints

| Operation | Method | Path |
|-----------|--------|------|
| Create | POST | `/v1/invoices` |
| Retrieve | GET | `/v1/invoices/:id` |
| Update | POST | `/v1/invoices/:id` |
| Finalize | POST | `/v1/invoices/:id/finalize` |
| Pay | POST | `/v1/invoices/:id/pay` |
| Send | POST | `/v1/invoices/:id/send` |
| Void | POST | `/v1/invoices/:id/void` |
| Mark uncollectible | POST | `/v1/invoices/:id/mark_uncollectible` |
| Preview | POST | `/v1/invoices/create_preview` |
| Delete (draft only) | DELETE | `/v1/invoices/:id` |
| List | GET | `/v1/invoices` |
| Search | GET | `/v1/invoices/search` |

### Create Parameters

| Name | Type | Description |
|------|------|-------------|
| `customer` | string | Customer ID |
| `collection_method` | enum | `charge_automatically` or `send_invoice` |
| `days_until_due` | integer | Days after finalization before payment is due (required when `send_invoice`) |
| `auto_advance` | boolean | If `true`, Stripe finalizes the draft after ~1 hour |
| `description` | string | Description shown on the invoice |
| `metadata` | object | Arbitrary key-value pairs |

### Pay Parameters

| Name | Type | Description |
|------|------|-------------|
| `payment_method` | string | Specific PaymentMethod to charge |
| `paid_out_of_band` | boolean | Mark as paid externally without charging |

## Notes

- Subscription invoices auto-finalize approximately 1 hour after the last webhook delivery (or 1 hour after creation if no webhooks exist). Set `auto_advance=false` to prevent this.
- Amounts below Stripe's minimum charge threshold are automatically marked `paid` and credited to the customer's credit balance.
- `create_preview` generates a preview invoice without persisting it — useful for showing proration amounts before a plan change.
- Voiding preserves an audit trail; deleting (`DELETE`) is only possible while the invoice is a `draft` and not subscription-related.

### Key Webhook Events

| Event | When |
|-------|------|
| `invoice.created` | Draft invoice created |
| `invoice.finalized` | Moved to `open` |
| `invoice.paid` | Payment succeeded |
| `invoice.payment_failed` | Payment attempt failed |
| `invoice.upcoming` | Advance notice before auto-charge |
| `invoice.voided` | Invoice voided |
| `invoice.marked_uncollectible` | Marked as bad debt |

## Related

- [Subscriptions](./subscriptions.md)
- [Products & Prices](./products-prices.md)
