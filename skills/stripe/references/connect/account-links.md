# Account Links & Account Sessions

Two mechanisms for granting connected accounts access to Stripe-hosted or embedded onboarding flows.

- **Account Link** — redirects the user to a Stripe-hosted page (one-time URL, expires quickly).
- **Account Session** — provides a short-lived `client_secret` for rendering embedded Connect components inside your own UI.

## Signature / Usage

### Account Link (`POST /v1/account_links`)

```bash
curl https://api.stripe.com/v1/account_links \
  -u "sk_test_...:" \
  -d account=acct_1ExampleId \
  -d type=account_onboarding \
  --data-urlencode "refresh_url=https://example.com/reauth" \
  --data-urlencode "return_url=https://example.com/return"
```

Response:

```json
{
  "object": "account_link",
  "created": 1680577733,
  "expires_at": 1680578033,
  "url": "https://connect.stripe.com/setup/c/acct_.../TqckGNUHg2mG"
}
```

### Account Session (`POST /v1/account_sessions`)

```bash
curl https://api.stripe.com/v1/account_sessions \
  -u "sk_test_...:" \
  -d account=acct_1ExampleId \
  -d "components[account_onboarding][enabled]=true" \
  -d "components[payments][enabled]=true" \
  -d "components[payouts][enabled]=true"
```

Response includes `client_secret` used by the front-end Stripe.js `ConnectComponentsProvider`.

## Options / Props

### Account Link Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | string | yes | Connected account ID |
| `type` | enum | yes | `account_onboarding` \| `account_update` |
| `refresh_url` | string | yes | Redirect if the link expires or becomes invalid |
| `return_url` | string | yes | Redirect after the user completes or leaves the flow |
| `collection_options.fields` | enum | no | `currently_due` (default) \| `eventually_due` |
| `collection_options.future_requirements` | enum | no | `omit` (default) \| `include` |

### Account Session Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `account` | string | yes | Connected account ID |
| `components` | object | yes | Map of component name → `{ enabled: true, features?: {...} }` |

### Available Components (Account Session)

`account_management`, `account_onboarding`, `balance_report`, `balances`, `documents`, `disputes_list`, `financial_account`, `financial_account_transactions`, `instant_payouts_promotion`, `issuing_card`, `issuing_cards_list`, `notification_banner`, `payment_details`, `payment_disputes`, `payments`, `payout_details`, `payout_reconciliation_report`, `payouts`, `payouts_list`, `tax_registrations`, `tax_settings`

## Notes

- Account Links are single-use and expire after a few minutes. Always generate a fresh link when the user clicks the onboarding button — never cache or reuse them.
- If the user navigates away from the hosted page, redirect them back using `refresh_url` to regenerate a new link.
- Account Sessions are also short-lived. Create a new session each time an embedded component is rendered; do not persist `client_secret` in your database.
- `collection_options.fields = "eventually_due"` is recommended to collect all requirements upfront and avoid future interruptions.
- `account_onboarding` type should be used for new accounts; `account_update` is for updating information on an existing account.

## Related

- [accounts.md](./accounts.md)
