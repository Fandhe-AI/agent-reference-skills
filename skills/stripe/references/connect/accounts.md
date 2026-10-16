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

- For new integrations, Stripe recommends the [Accounts v2 API](https://docs.stripe.com/connect/accounts-v2) (`POST /v2/core/accounts`) which unifies `Account` and `Customer` into a single object with `configuration` assignments (`merchant`, `customer`, `recipient`). Accounts v2 is no longer Connect-only: as of the `2026-04-22.preview` API version it is generally available (GA) for Connect platforms and in public preview (requires `Stripe-Version: 2026-04-22.preview` or later) for all other Stripe users, specifically for representing customers as `Account` objects via the `customer` configuration.
- Accounts v2 capability requests use a nested shape instead of the flat v1 `capabilities[<name>][requested]` params documented above: `configuration.merchant.capabilities.<name>.requested` (e.g. `card_payments`) and `configuration.customer.capabilities.<name>.requested` (e.g. `automatic_indirect_tax`). Each capability object also exposes a `status` (`active` \| `pending` \| `restricted` \| `unsupported`; `rejected` added in `2026-09-30.endive`) and `status_details`. On `2026-09-30.endive` rejected accounts report `status: rejected` with `status_details` codes `rejected_fraud`, `rejected_incomplete_verification`, `rejected_listed`, `rejected_other`, `rejected_platform_fraud`, `rejected_platform_other`, `rejected_platform_terms_of_service`, `rejected_terms_of_service`; earlier versions return `restricted` / `restricted_other`. Also in that version, the Account Links v2 `configurations` parameter was removed (see account-links.md).
- Stripe-managed accounts (`requirement_collection: "stripe"`) only return full properties after an Account Link or Account Session is created for onboarding.
- The `type` parameter (`standard`, `express`, `custom`) is deprecated; use `controller` instead.
- The `account.updated` webhook fires whenever account status or properties change.
- Key capabilities: `card_payments`, `transfers`, `acss_debit_payments`, and many others — each has a `requested` boolean.
- Official guidance: new integrations should use Accounts v2 (`/v2/core/accounts`) and avoid the legacy v1 `type` parameter (`express` / `custom` / `standard`). The legacy v1 account-type pages are only relevant for existing v1 integrations.
- `2026-09-30.endive` (breaking): `requirements.errors[].code` and `future_requirements.errors[].code` (v1, and the v2 `requirements.entries[].errors[].code` equivalents) can return `invalid_address_cmra_address` (CMRA / virtual mailbox address; the account holder must update the address) and `invalid_address_registered_agent_address` (registered agent address; update the address or upload proof of address). Handle unknown codes.
- `2026-09-30.endive` (breaking): `POST /v1/accounts/:id/reject` `reason` is now an enum. The generic `fraud` is replaced by `fraud_payment_method_casher`, `fraud_payment_method_tester`, `fraud_no_intent_to_fulfill` and `fraud_other`; `credit` is added; `terms_of_service` and `other` remain. Passing `fraud` returns `400`.
- `2026-09-30.endive` (breaking): for platform-initiated rejections `requirements.disabled_reason` / `future_requirements.disabled_reason` now return `rejected.platform_fraud`, `rejected.platform_terms_of_service` and `rejected.platform_other` instead of `rejected.fraud`, `rejected.terms_of_service` and `rejected.other`.
- `2026-09-30.endive` (breaking): `settings.sepa_debit_payments.creditor_id` now returns Stripe's shared SEPA Creditor Identifier when the account has no custom one (previously omitted), and a custom identifier can be set when creating a v1 Account (v2: `configuration.merchant.sepa_debit_payments.creditor_id` on create / update).
- `2026-09-30.endive` (breaking): `requirements.errors` and `future_requirements.errors` (Accounts, Persons, Capabilities) can include errors for `eventually_due` requirements, not only currently due or past due ones.
- `2026-09-30.endive` (non-breaking): `blik_recurring_payments` capability (v1 Accounts and v2 `configuration.merchant.capabilities`) for BLIK recurring off-session payments.
- `2026-03-25.dahlia` (breaking): the Capability object's `requirements` hash can contain risk requirements, so v1 integrations can identify capabilities affected by them through the Capabilities API (v2 uses `impact.restricts_capabilities` on each requirements entry).
- `2025-09-30.clover` (breaking): new `unsupported_business_type` error code in `requirements.errors` (Accounts, Capabilities, Persons, Bank Accounts) when the business type is not supported in the merchant's country. Also new `external_hold` error code and `notice` resolution path, plus `legal_hold`, `pep_review` and `sanctions_review` risk requirement descriptions that were previously reported as `other_supportability_inquiry` / `other_compliance_inquiry`; `pep_review` and `sanctions_review` appear in `pending_verification` and need no user action.

## Related

- [accounts-v2.md](./accounts-v2.md)
- [connected-account-configuration.md](./connected-account-configuration.md)
- [account-links.md](./account-links.md)
- [transfers-payouts.md](./transfers-payouts.md)
- [charge-types.md](./charge-types.md)
