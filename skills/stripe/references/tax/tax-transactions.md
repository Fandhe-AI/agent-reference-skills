# Tax Transactions

Records tax collected from or refunded to a customer. Created after payment is confirmed to finalize liability in Stripe Tax reporting. Supports reversals (full or partial) for refunds.

## Signature / Usage

```bash
# Create a transaction from a completed calculation
curl https://api.stripe.com/v1/tax/transactions/create_from_calculation \
  -u "sk_test_..." \
  -d calculation=taxcalc_1OduxkBUZ691iUZ4iWvpMApI \
  -d reference=myOrder_123
```

## Options / Props

### POST /v1/tax/transactions/create_from_calculation

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `calculation` | string | Yes | ID of the `tax.calculation` to convert |
| `reference` | string | Yes | Unique order/sale identifier (max 500 chars); must be unique across all transactions including reversals |
| `posted_at` | integer | No | Unix timestamp when liability is assumed; defaults to current time |
| `metadata` | object | No | Arbitrary key-value pairs |

### POST /v1/tax/transactions/create_reversal

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `original_transaction` | string | Yes | ID of the `tax.transaction` to reverse |
| `reference` | string | Yes | Unique identifier for this reversal (max 500 chars) |
| `mode` | enum | Yes | `full` to reverse entire transaction; `partial` to reverse specific amounts |
| `line_items` | array | No* | Line items to reverse; each requires `amount`, `amount_tax`, `original_line_item`, `reference` |
| `shipping_cost` | object | No* | Shipping cost to reverse; requires `amount` and `amount_tax` |
| `flat_amount` | integer | No* | Flat amount to reverse in smallest currency unit (negative value) |
| `posted_at` | integer | No | Unix timestamp when liability is reduced |
| `metadata` | object | No | Arbitrary key-value pairs |

*For `mode=partial`, at least one of `line_items`, `shipping_cost`, or `flat_amount` is required.

### GET /v1/tax/transactions/:id

Retrieves a single `tax.transaction` by ID.

### GET /v1/tax/transactions/:id/line_items

Returns a paginated list of `tax.transaction_line_item` objects for the given transaction.

## Response Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Transaction ID |
| `object` | string | Always `"tax.transaction"` |
| `type` | string | `"transaction"` for sales; `"reversal"` for refunds |
| `currency` | string | ISO currency code |
| `reference` | string | Custom order identifier |
| `customer` | string | Stripe Customer ID if provided |
| `customer_details` | object | Address, tax IDs, and taxability override |
| `line_items` | list | `tax.transaction_line_item` objects |
| `shipping_cost` | object | Shipping amount and tax |
| `tax_date` | integer | Date used to determine applicable tax rules |
| `posted_at` | integer | Unix timestamp of liability posting |
| `reversal` | object | Present on reversal transactions; references original |
| `livemode` | boolean | Test vs. live mode indicator |

## Notes

- A transaction **must** be created after payment to record tax liability for compliance reporting.
- `reference` must be globally unique per account — include reversals in that uniqueness constraint.
- The source calculation must not be expired (calculations expire 90 days after creation).
- Use `mode=partial` with explicit `line_items` for partial refunds rather than `mode=full`.
- Transaction records feed into Stripe Tax filing exports and threshold monitoring.

## Related

- [Tax Calculations](./tax-calculations.md)
- [Tax Registrations](./registrations.md)
