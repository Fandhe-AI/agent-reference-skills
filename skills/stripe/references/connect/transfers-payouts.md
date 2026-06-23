# Transfers & Payouts

**Transfers** move funds between Stripe accounts (platform → connected account). **Payouts** disburse funds from a Stripe account balance to an external bank account or debit card.

## Signature / Usage

### Create a Transfer (`POST /v1/transfers`)

```bash
curl https://api.stripe.com/v1/transfers \
  -u "sk_test_...:" \
  -d amount=400 \
  -d currency=usd \
  -d destination=acct_1ExampleId \
  -d transfer_group=ORDER_95
```

### Create a Payout (`POST /v1/payouts`)

```bash
curl https://api.stripe.com/v1/payouts \
  -u "sk_test_...:" \
  -d amount=1100 \
  -d currency=usd
```

For a connected account, authenticate with the `Stripe-Account` header:

```bash
curl https://api.stripe.com/v1/payouts \
  -u "sk_test_...:" \
  -H "Stripe-Account: acct_1ExampleId" \
  -d amount=1100 \
  -d currency=usd
```

## Options / Props

### Transfer Parameters (`POST /v1/transfers`)

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `amount` | integer | yes | Positive integer in smallest currency unit (e.g. cents) |
| `currency` | string | yes | Lowercase 3-letter ISO code (e.g. `usd`) |
| `destination` | string | yes | Connected account ID (`acct_...`) |
| `description` | string | no | Arbitrary text attached to the object |
| `metadata` | object | no | Key-value pairs for internal use |
| `source_transaction` | string | no | Charge ID — transfer funds before they settle into available balance |
| `source_type` | string | no | `bank_account` \| `card` \| `fpx` (defaults to `card`) |
| `transfer_group` | string | no | Groups related charges and transfers together |

### Transfer Object Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Transfer ID (`tr_...`) |
| `amount` | integer | Amount transferred |
| `currency` | string | Currency |
| `destination` | string | Connected account ID |
| `destination_payment` | string | Associated payment ID on destination |
| `reversed` | boolean | Whether any reversals have been applied |
| `reversals` | list | List of reversal objects |
| `transfer_group` | string | Group identifier |
| `source_type` | string | Balance source used |

### Payout Parameters (`POST /v1/payouts`)

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `amount` | integer | yes | Positive integer in smallest currency unit |
| `currency` | string | yes | Lowercase 3-letter ISO code |
| `description` | string | no | Arbitrary text |
| `destination` | string | no | Bank account or card ID; uses default external account if omitted |
| `metadata` | object | no | Key-value pairs |
| `method` | string | no | `standard` (default) \| `instant` |
| `source_type` | string | no | `bank_account` \| `card` \| `fpx` |
| `statement_descriptor` | string | no | Text on recipient's bank statement (max 22 chars; 10 for US ACH) |

### Payout Object Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Payout ID (`po_...`) |
| `amount` | integer | Amount in smallest currency unit |
| `arrival_date` | timestamp | Expected bank arrival (Unix epoch) |
| `automatic` | boolean | `true` if created by automated schedule |
| `balance_transaction` | string | Expandable balance transaction ID |
| `destination` | string | Expandable bank account or card ID |
| `method` | string | `standard` \| `instant` |
| `status` | string | See status values below |
| `type` | string | `bank_account` \| `card` |
| `failure_code` | string | Failure reason code if status is `failed` |
| `failure_message` | string | Human-readable failure description |
| `reconciliation_status` | string | `not_applicable` \| `in_progress` \| `completed` |

### Payout Status Values

| Status | Description |
|--------|-------------|
| `pending` | Created, awaiting bank submission |
| `in_transit` | Submitted to bank |
| `paid` | Funds arrived in bank account |
| `failed` | Transaction failed (see `failure_code`) |
| `canceled` | Manually canceled (within 5 business days) |

### Transfer Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/transfers/:id` | Retrieve a transfer |
| `POST` | `/v1/transfers/:id` | Update description or metadata only |
| `GET` | `/v1/transfers` | List all transfers |
| `POST` | `/v1/transfers/:id/reversals` | Reverse a transfer |

### Payout Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/payouts/:id` | Retrieve a payout |
| `POST` | `/v1/payouts/:id` | Update description or metadata only |
| `GET` | `/v1/payouts` | List all payouts |
| `POST` | `/v1/payouts/:id/cancel` | Cancel a payout |
| `POST` | `/v1/payouts/:id/reverse` | Reverse a payout |

## Notes

- Transfers are a Connect-only feature; they move funds between Stripe accounts, not to external bank accounts.
- The platform balance must cover the transfer amount, or you will receive an `insufficient_funds` error.
- `transfer_group` is used with separate charges and transfers to associate a charge with its corresponding transfers across multiple connected accounts.
- `source_transaction` allows transferring funds from a specific charge before they settle — useful for immediate disbursement on destination-charge flows.
- Payout schedules vary by country and can be configured via `settings.payouts.schedule` on the Account object.
- Payout webhooks: `payout.created`, `payout.paid`, `payout.failed`, `payout.canceled`, `payout.reconciliation_completed`.
- Transfer webhooks: `transfer.created`, `transfer.reversed`, `transfer.updated`.

## Related

- [accounts.md](./accounts.md)
- [charge-types.md](./charge-types.md)
