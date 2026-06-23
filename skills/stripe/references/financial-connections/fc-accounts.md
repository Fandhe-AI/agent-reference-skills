# Financial Connections Accounts

Represents an external financial account (checking, savings, etc.) that a user has linked via a Financial Connections Session. Provides access to balance, ownership, and transaction data.

## Signature / Usage

```bash
# Retrieve an account
curl https://api.stripe.com/v1/financial_connections/accounts/{ACCOUNT_ID} \
  -u "sk_..."

# List accounts for a customer
curl -G https://api.stripe.com/v1/financial_connections/accounts \
  -u "sk_..." \
  -d "account_holder[customer]=cus_xxx" \
  -d limit=10

# Disconnect an account
curl -X POST https://api.stripe.com/v1/financial_connections/accounts/{ACCOUNT_ID}/disconnect \
  -u "sk_..."

# Refresh account data
curl -X POST https://api.stripe.com/v1/financial_connections/accounts/{ACCOUNT_ID}/refresh \
  -u "sk_..." \
  -d "features[]=balance"

# Subscribe to transaction updates
curl -X POST https://api.stripe.com/v1/financial_connections/accounts/{ACCOUNT_ID}/subscribe \
  -u "sk_..." \
  -d "features[]=transactions"
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/financial_connections/accounts/:id` | Retrieve an account |
| `GET` | `/v1/financial_connections/accounts` | List accounts |
| `POST` | `/v1/financial_connections/accounts/:id/disconnect` | Disconnect an account |
| `POST` | `/v1/financial_connections/accounts/:id/refresh` | Refresh account data |
| `POST` | `/v1/financial_connections/accounts/:id/subscribe` | Subscribe to data refreshes |
| `POST` | `/v1/financial_connections/accounts/:id/unsubscribe` | Unsubscribe from data refreshes |

## Account Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (`fca_...`) |
| `object` | string | `"financial_connections.account"` |
| `account_holder` | object | Linked customer or account (`type`, `customer`) |
| `balance` | object\|null | Current and available balances (requires `balances` permission) |
| `balance_refresh` | object\|null | Status and timestamp of last balance refresh |
| `category` | enum | `cash`, `credit`, `investment`, or `other` |
| `subcategory` | enum | `checking`, `savings`, `mortgage`, `line_of_credit`, `credit_card` |
| `display_name` | string | Human-readable account name |
| `institution_name` | string | Name of the financial institution |
| `last4` | string | Last 4 digits of the account number |
| `livemode` | boolean | `true` in live mode |
| `ownership` | object\|null | Account holder name and address (requires `ownership` permission) |
| `ownership_refresh` | object\|null | Status and timestamp of last ownership refresh |
| `permissions` | array | Granted permissions for this account |
| `status` | enum | `active`, `inactive`, or `disconnected` |
| `subscriptions` | array | Active data subscriptions (e.g., `["transactions"]`) |
| `supported_payment_method_types` | array | E.g., `["us_bank_account"]` |
| `transaction_refresh` | object\|null | Status and timestamp of last transaction refresh |

## List Parameters

| Name | Type | Description |
|------|------|-------------|
| `account_holder` | object | Filter by `account_holder.customer`, `account_holder.account`, or `account_holder.customer_account` (mutually exclusive) |
| `session` | string | Filter by Financial Connections session ID |
| `limit` | integer | Number of results (1–100, default 10) |
| `starting_after` | string | Cursor for forward pagination |
| `ending_before` | string | Cursor for backward pagination |

## Refresh `features` Values

| Value | Description |
|-------|-------------|
| `balance` | Refresh current and available balance |
| `ownership` | Refresh account holder name and address |
| `transactions` | Refresh transaction history |

## Webhook Events

| Event | Description |
|-------|-------------|
| `financial_connections.account.created` | Account linked for the first time |
| `financial_connections.account.disconnected` | Account disconnected by user or API |
| `financial_connections.account.deactivated` | Status changed to `inactive` |
| `financial_connections.account.reactivated` | Status changed back to `active` |
| `financial_connections.account.refreshed_balance` | Balance refresh completed |
| `financial_connections.account.refreshed_ownership` | Ownership refresh completed |
| `financial_connections.account.refreshed_transactions` | Transaction refresh completed |

## Notes

- Only `cash` category accounts (`checking`/`savings`) support ACH transfers via `us_bank_account`.
- After `disconnect`, `status` becomes `"disconnected"` and `permissions` is cleared.
- `refresh` initiates an async job; listen for `financial_connections.account.refreshed_*` webhooks for completion.
- `subscribe` enables automatic daily refreshes for `transactions`; data is refreshed once per day when the account is active.
- Default access (no permission needed): `last4`, account `category`/`subcategory`, and `display_name`.

## Related

- [Financial Connections Sessions](./fc-sessions.md)
