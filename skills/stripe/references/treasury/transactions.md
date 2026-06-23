# Transaction

Records a balance change to a FinancialAccount. Every money movement (InboundTransfer, OutboundTransfer, OutboundPayment, ReceivedCredit, etc.) creates a Transaction. Read-only — transactions are never created directly.

## Signature / Usage

```bash
# List transactions for a FinancialAccount
curl -G https://api.stripe.com/v1/treasury/transactions \
  -u "YOUR_SECRET_KEY" \
  -d financial_account=fa_xxx \
  -d limit=10 \
  -d status=posted
```

## Options / Props

### List parameters

| Name | Type | Description |
|------|------|-------------|
| `financial_account` | string | **Required.** Filter by FinancialAccount ID |
| `status` | enum | `open`, `posted`, or `void` |
| `order_by` | enum | `created` (default) or `posted_at` |
| `created` | object | Date range filter (`gt`, `gte`, `lt`, `lte`) |
| `status_transitions` | object | Filter by `posted_at`; requires `status=posted` and `order_by=posted_at` |
| `limit` | integer | 1–100, default 10 |
| `starting_after` | string | Pagination cursor (fetch after this ID) |
| `ending_before` | string | Pagination cursor (fetch before this ID) |

### Object fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | `trxn_…` identifier |
| `object` | string | `"treasury.transaction"` |
| `amount` | integer | Amount in cents; negative for debits |
| `currency` | string | ISO 4217 code (e.g., `"usd"`) |
| `description` | string | Human-readable description |
| `status` | enum | `open`, `posted`, or `void` |
| `balance_impact.cash` | integer | Change to immediately spendable balance |
| `balance_impact.inbound_pending` | integer | Change to inbound pending balance |
| `balance_impact.outbound_pending` | integer | Change to outbound pending balance |
| `flow` | string | ID of the related flow object |
| `flow_type` | string | Type of flow (e.g., `"outbound_transfer"`, `"inbound_transfer"`) |
| `financial_account` | string | Associated FinancialAccount ID |
| `status_transitions.posted_at` | timestamp | When status changed to `posted` |
| `status_transitions.void_at` | timestamp | When status changed to `void` |
| `created` | timestamp | Unix creation time |
| `livemode` | boolean | Live vs. test mode |

### Status values

| Value | Meaning |
|-------|---------|
| `open` | Initial state; updates sub-balances (`inbound_pending` / `outbound_pending`) but not `cash` |
| `posted` | Funds successfully transferred; `cash` balance affected |
| `void` | Transaction canceled; no balance impact |

## Notes

- Transactions are **read-only**. Use `GET /v1/treasury/transactions/:id` or `GET /v1/treasury/transactions` to access them.
- The `flow_type` field identifies what caused the transaction (e.g., `outbound_payment`, `received_credit`, `inbound_transfer`).
- `balance_impact` values are signed integers: positive = credit, negative = debit.

## Related

- [financial-accounts.md](./financial-accounts.md)
- [money-movement.md](./money-movement.md)
