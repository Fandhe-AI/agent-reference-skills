# Accounts

Connect Account object representing a seller, service provider, or SaaS customer on your platform. Supports two management models: Stripe-managed (Standard/Express) and application-managed (Custom).

## Signature / Usage

```bash
# Create a connected account (application-managed / Custom)
curl https://api.stripe.com/v1/accounts \
  -u "sk_test_...:" \
  -d country=US \
  -d email=jenny.rosen@example.com \
  -d "controller[stripe_dashboard][type]=none" \
  -d "controller[fees][payer]=application" \
  -d "controller[losses][payments]=application" \
  -d "controller[requirement_collection]=application" \
  -d "capabilities[card_payments][requested]=true" \
  -d "capabilities[transfers][requested]=true"
```

## Options / Props

### Create (`POST /v1/accounts`)

| Name | Type | Description |
|------|------|-------------|
| `country` | string | ISO 3166-1 alpha-2 country code (e.g. `US`) |
| `email` | string | Account holder email (max 800 chars) |
| `controller` | object | Controls dashboard access, fees, losses, and requirement collection |
| `controller.stripe_dashboard.type` | enum | `full` \| `express` \| `none` |
| `controller.fees.payer` | enum | `account` \| `application` — who pays Stripe fees |
| `controller.losses.payments` | enum | `stripe` \| `application` — who absorbs payment losses |
| `controller.requirement_collection` | enum | `stripe` \| `application` |
| `capabilities` | object | Map of capability name → `{ requested: true }` |
| `business_type` | enum | `individual` \| `company` \| `government_entity` \| `non_profit` |
| `business_profile` | object | `name`, `url`, `mcc`, `support_*` fields |
| `individual` | object | KYC data for individual accounts (`first_name`, `last_name`, `dob`, `address`) |
| `company` | object | KYC data for company accounts (`name`, `tax_id`, `address`) |
| `external_account` | string | Bank account or card token for payouts |
| `default_currency` | string | Three-letter ISO currency code |
| `settings` | object | `branding`, `card_payments`, `payouts`, `payments` sub-objects |
| `tos_acceptance` | object | `{ date, ip, user_agent }` — ToS acceptance record |
| `metadata` | object | Key-value pairs for internal use |

### Other Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/v1/accounts/:id` | Retrieve an account |
| `POST` | `/v1/accounts/:id` | Update an account |
| `DELETE` | `/v1/accounts/:id` | Delete an account (only if no charges) |
| `GET` | `/v1/accounts` | List all connected accounts |
| `POST` | `/v1/accounts/:id/reject` | Reject an account |

## Notes

- For new integrations, Stripe recommends the [Accounts v2 API](https://docs.stripe.com/connect/accounts-v2) (`POST /v2/core/accounts`) which unifies `Account` and `Customer` into a single object with `configuration` assignments (`merchant`, `customer`, `recipient`).
- Stripe-managed accounts (`requirement_collection: "stripe"`) only return full properties after an Account Link or Account Session is created for onboarding.
- The `type` parameter (`standard`, `express`, `custom`) is deprecated; use `controller` instead.
- The `account.updated` webhook fires whenever account status or properties change.
- Key capabilities: `card_payments`, `transfers`, `acss_debit_payments`, and many others — each has a `requested` boolean.

## Related

- [account-links.md](./account-links.md)
- [transfers-payouts.md](./transfers-payouts.md)
- [charge-types.md](./charge-types.md)
