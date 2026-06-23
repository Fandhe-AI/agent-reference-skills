# Financing Transactions

Records each financial movement in a Capital financing lifecycle: the initial payout (disbursement), ongoing paydowns (repayments), and any reversals. Use this API for reconciliation and merchant-facing reporting.

## Signature / Usage

```bash
# List all financing transactions for a connected account
curl -G https://api.stripe.com/v1/capital/financing_transactions \
  -u "sk_live_YOUR_SECRET_KEY:" \
  -H "Stripe-Account: acct_CONNECTED_ACCOUNT_ID" \
  -d financing_offer=financingoffer_1NAdVWJQ3aJgxqz5nh90Zqrs
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/capital/financing_transactions` | List financing transactions |
| `GET` | `/v1/capital/financing_transactions/:id` | Retrieve a specific transaction |

## Options / Props

### Financing Transaction Object

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (`cptxn_...`) |
| `object` | string | Always `"capital.financing_transaction"` |
| `account` | string | Connected account ID |
| `created_at` | integer | Unix timestamp of creation |
| `financing_offer` | string | ID of the associated financing offer |
| `type` | enum | `payout`, `payment`, or `reversal` |
| `livemode` | boolean | `true` for live mode, `false` for test mode |
| `user_facing_description` | string | Customer-readable description (e.g., `"Paydown of your loan"`) |
| `details` | object | Transaction-specific financial details |

### `details` Object

| Field | Type | Description |
|-------|------|-------------|
| `advance_amount` | integer | Principal portion of the transaction in minor currency units |
| `fee_amount` | integer | Fee portion of the transaction in minor currency units |
| `total_amount` | integer | Total transaction amount (`advance_amount + fee_amount`) |
| `currency` | string | Currency code (e.g., `"usd"`) |
| `linked_payment` | string | ID of the related charge or payment |
| `reason` | string | Reason for the transaction (e.g., `"automatic_withholding"`) |
| `transaction` | object | Nested object containing `charge` ID for reconciliation |

### List Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `financing_offer` | string | Filter by financing offer ID |
| `type` | enum | Filter by type: `payout`, `payment`, or `reversal` |
| `Stripe-Account` header | string | Connected account ID (required) |
| `limit` | integer | Results per page (1–100, default 10) |
| `starting_after` | string | Pagination cursor (next page) |
| `ending_before` | string | Pagination cursor (previous page) |

## Transaction Types

### `payout`

Initial disbursement of funds to the connected account after offer acceptance and approval. ACH funds typically take several business days to arrive. No platform action required — Stripe handles the transfer automatically.

### `payment`

Repayment of borrowed funds. Three subtypes based on `details.reason`:

| Reason | Description |
|--------|-------------|
| `automatic_withholding` | Fixed percentage automatically deducted from each Stripe settlement |
| `user_directed` | Manual payment via Stripe-hosted Capital page or embedded component |
| `collection_attempt` | Initiated by the Capital servicing team per collection policy |

Withholding occurs simultaneously with payment processing. The connected account receives: original settlement − platform fees − withheld amount.

### `reversal`

Offsets a prior payout or payment. Common triggers:

| Trigger | Description |
|---------|-------------|
| Failed ACH | Insufficient funds or failed bank transfer |
| Loan cancellation | Connected account cancels within 48 hours of acceptance |
| Manual reversal | Requested via `capital-support@stripe.com` |

## Reconciliation

To reconcile a `payment` transaction with the originating charge on the platform account:

1. Extract `details.transaction.charge` from the financing transaction.
2. Retrieve the Charge object to get `source_transfer`.
3. Retrieve the Transfer object to get `source_transaction` — this is the platform's original charge ID.

## Notes

- Always include reversals in reports to avoid reconciliation errors; reversals offset the original transaction amounts.
- The `Stripe-Account` header is required when listing transactions for a connected account.
- `capital.financing_transaction.created` webhook fires on each new transaction, particularly useful for detecting the initial payout.

## Webhook Events

| Event | Trigger |
|-------|---------|
| `capital.financing_transaction.created` | A new financing transaction is created |

## Related

- [Financing Offers](./financing-offers.md)
- [Financing Summary](./financing-summary.md)
