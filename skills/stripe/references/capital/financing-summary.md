# Financing Summary

Describes a connected account's active financing status in real time: total advance, fees, amount paid, and remaining balance. Used for building merchant-facing dashboards and tracking repayment progress.

## Signature / Usage

```bash
curl https://api.stripe.com/v1/capital/financing_summary \
  -u "sk_live_YOUR_SECRET_KEY:" \
  -H "Stripe-Account: acct_CONNECTED_ACCOUNT_ID"
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/capital/financing_summary` | Retrieve the financing summary for a connected account |

## Options / Props

### Financing Summary Object

| Field | Type | Description |
|-------|------|-------------|
| `object` | string | Always `"capital.financing_summary"` |
| `status` | enum | `accepted`, `delivered`, or `none` |
| `financing_offer` | string | ID of the active financing offer |
| `details` | object | Real-time repayment details (present when `status` is `accepted`) |

### `details` Object

| Field | Type | Description |
|-------|------|-------------|
| `advance_amount` | integer | Original principal in minor currency units |
| `fee_amount` | integer | Total fixed fee in minor currency units |
| `paid_amount` | integer | Total amount repaid so far |
| `remaining_amount` | integer | Outstanding balance still owed |
| `currency` | string | Currency code (e.g., `"usd"`) |
| `withhold_rate` | float | Per-transaction withholding rate (e.g., `0.05` = 5%) |
| `advance_paid_out_at` | float | Unix timestamp when funds were disbursed |
| `repayments_begin_at` | float | Unix timestamp when repayments started |
| `current_repayment_interval` | object | Current interval details for term loans (nullable) |

### `current_repayment_interval` Object

| Field | Type | Description |
|-------|------|-------------|
| `due_at` | integer | Unix timestamp of interval due date |
| `paid_amount` | integer | Amount paid in the current interval |
| `remaining_amount` | integer | Amount still owed in the current interval |

## Notes

- The `Stripe-Account` header is required; this endpoint returns data scoped to the connected account.
- `details` is only present when `status` is `accepted` (i.e., active financing exists).
- `current_repayment_interval` is `null` for merchant cash advances; it is populated for term loans with minimum payment requirements.
- Use this endpoint to drive real-time repayment progress displays rather than computing balances from individual transactions.

## Related

- [Financing Offers](./financing-offers.md)
- [Financing Transactions](./financing-transactions.md)
