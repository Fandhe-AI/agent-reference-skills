# Financial Connections Sessions

A server-side object that authorizes the client-side account linking flow. Creating a session returns a `client_secret` used to launch the Stripe.js modal where users authenticate and select accounts to link.

## Signature / Usage

```bash
# Create a session
curl https://api.stripe.com/v1/financial_connections/sessions \
  -u "sk_..." \
  -d "account_holder[type]=customer" \
  -d "account_holder[customer]=cus_xxx" \
  -d "permissions[]=payment_method" \
  -d "permissions[]=balances" \
  -d "filters[countries][]=US"

# Retrieve a session
curl https://api.stripe.com/v1/financial_connections/sessions/{SESSION_ID} \
  -u "sk_..."
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/v1/financial_connections/sessions` | Create a session |
| `GET` | `/v1/financial_connections/sessions/:id` | Retrieve a session |

## Create Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account_holder` | object | Yes | The entity whose accounts will be linked |
| `account_holder.type` | enum | Yes | `"customer"` or `"account"` |
| `account_holder.customer` | string | Conditional | Stripe Customer ID (when `type` is `"customer"`) |
| `account_holder.account` | string | Conditional | Stripe Account ID (when `type` is `"account"`) |
| `permissions` | array | Yes | Data access to request: `payment_method`, `balances`, `ownership`, `transactions` |
| `filters` | object | No | Restrictions on which accounts to collect |
| `filters.countries` | array | No | ISO 3166-1 alpha-2 country codes to filter accounts |
| `filters.account_subcategories` | array | No | Limit to `checking`, `savings`, `mortgage`, `line_of_credit`, or `credit_card` |
| `prefetch` | array | No | Data to fetch immediately on account creation: `balances`, `ownership`, `transactions` |
| `return_url` | string | No | Redirect URL after OAuth bank login in webview contexts |

## Session Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (`fcsess_...`) |
| `object` | string | `"financial_connections.session"` |
| `client_secret` | string | Passed to Stripe.js to launch the auth modal |
| `account_holder` | object | The linked `customer` or `account` with `type` |
| `accounts` | list | Linked Account objects after the user completes the flow |
| `accounts.data` | array | Array of `financial_connections.account` objects |
| `accounts.has_more` | boolean | Pagination indicator |
| `accounts.total_count` | integer | Total linked accounts |
| `filters` | object | Applied country and subcategory filters |
| `permissions` | array | Permissions requested for the session |
| `livemode` | boolean | `true` in live mode |

## Integration Flow

1. Server: `POST /v1/financial_connections/sessions` → receive `client_secret`
2. Client: pass `client_secret` to `stripe.collectFinancialConnectionsAccounts({ clientSecret })`
3. User: completes consent, selects institution, authenticates, selects accounts
4. Client: receives linked account IDs on success
5. Server: `GET /v1/financial_connections/sessions/:id` to read `accounts`

## Notes

- `client_secret` is single-use and must be kept confidential; pass only to the authenticated client.
- `accounts` is empty on create and populated after the user completes the linking flow.
- Requesting a `Customer` object with the user's email pre-fills the flow for returning users.
- `prefetch` reduces latency by fetching data immediately when accounts are linked; otherwise data is fetched on first explicit refresh.
- Request only the `permissions` required for your use case to maximize user trust and conversion.
- For ACH payments, `payment_method` permission is required; it creates a tokenized `us_bank_account` PaymentMethod.

## Related

- [Financial Connections Accounts](./fc-accounts.md)
