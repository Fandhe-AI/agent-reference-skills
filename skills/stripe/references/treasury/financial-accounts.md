# FinancialAccount

A container in Stripe Treasury that holds funds separately from the Payments balance. Serves as the source and destination for Treasury money movement APIs.

## Signature / Usage

```bash
# Create a FinancialAccount
curl https://api.stripe.com/v1/treasury/financial_accounts \
  -u "YOUR_SECRET_KEY" \
  -d "supported_currencies[]=usd" \
  -d "features[financial_addresses][aba][requested]=true" \
  -d "features[outbound_payments][ach][requested]=true"
```

## Options / Props

### Create parameters

| Name | Type | Description |
|------|------|-------------|
| `supported_currencies` | array of strings | **Required.** Currencies the account can hold (e.g., `["usd"]`) |
| `nickname` | string | User-defined label for the account |
| `features` | object | Requested features (see Features below) |
| `metadata` | object | Arbitrary key-value pairs |
| `platform_restrictions` | object | `inbound_flows` / `outbound_flows`: `restricted` or `unrestricted` |

### Features

| Feature path | Description |
|---|---|
| `card_issuing` | Access to Issuing product |
| `deposit_insurance` | FDIC deposit insurance eligibility |
| `financial_addresses.aba` | Adds an ABA routing/account number address |
| `inbound_transfers.ach` | ACH debit into the account |
| `intra_stripe_flows` | Send/receive between FinancialAccounts |
| `outbound_payments.ach` | ACH payment to third-party bank accounts |
| `outbound_payments.us_domestic_wire` | Wire payment to third-party bank accounts |
| `outbound_transfers.ach` | ACH transfer to own bank account |
| `outbound_transfers.us_domestic_wire` | Wire transfer to own bank account |

### Object fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | `fa_…` identifier |
| `object` | string | `"treasury.financial_account"` |
| `status` | enum | `open` or `closed` |
| `country` | string | ISO 3166-1 alpha-2 (e.g., `"US"`) |
| `supported_currencies` | array | ISO 4217 currency codes |
| `balance.cash` | object | Immediately spendable funds by currency |
| `balance.inbound_pending` | object | Arriving funds not yet available |
| `balance.outbound_pending` | object | Funds held for pending outbound flows |
| `financial_addresses` | array | ABA routing details (account number expandable) |
| `active_features` | array | Feature paths currently active |
| `pending_features` | array | Feature paths awaiting activation |
| `restricted_features` | array | Feature paths that are restricted |
| `nickname` | string \| null | User-defined label |
| `metadata` | object | Custom key-value pairs |
| `livemode` | boolean | Live vs. test mode |

### Feature status values

| Value | Meaning |
|-------|---------|
| `active` | Operational and usable |
| `pending` | Will activate automatically |
| `restricted` | Requires action or permanently disabled |

## Notes

- Each connected account can have **up to three FinancialAccounts** by default.
- Balance has three components: `cash` (spendable), `inbound_pending` (arriving), `outbound_pending` (reserved for outbound).
- Feature status detail codes (e.g., `requirements_past_due`, `restricted_by_platform`) indicate the reason a feature is not `active` and what action (`provide_information`, `remove_restriction`, `contact_stripe`) to take.
- FDIC insurance covers US balances up to $250,000 USD when `deposit_insurance` feature is active.
- Endpoints: `POST /v1/treasury/financial_accounts`, `GET /v1/treasury/financial_accounts/:id`, `POST /v1/treasury/financial_accounts/:id` (update), `GET /v1/treasury/financial_accounts` (list).

## Related

- [money-movement.md](./money-movement.md)
- [transactions.md](./transactions.md)
