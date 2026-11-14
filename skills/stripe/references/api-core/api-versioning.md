# API Versioning

Stripe assigns an API version to your account on first use. The version controls which request parameters, response properties, and webhook payload structures your integration receives. You can test a new version by setting the `Stripe-Version` request header before upgrading your account.

## Signature / Usage

```sh
curl https://api.stripe.com/v1/customers \
  -u sk_test_YOUR_KEY: \
  -H "Stripe-Version: 2026-10-28.endive"
```

## Options / Props

| Header | Type | Description |
|--------|------|-------------|
| `Stripe-Version` | string | Override the API version for this request only. Useful for testing before a full upgrade. |

## Release Types

| Type | Description |
|------|-------------|
| Major release (e.g., `Acacia`) | Contains breaking changes; requires code updates. |
| Monthly release | Backward-compatible changes only; safe to apply without code changes. |

## Backward-Compatible Changes (Non-Breaking)

The following changes can occur in any release and do not require code updates:

- New API resources or endpoints
- New optional request parameters
- New response properties
- Changes to property order in responses
- Changes to opaque string formats (object IDs, error messages), including addition/removal of fixed prefixes such as `ch_`
- New event types

## Notes

- Latest API version: `2026-10-28.endive` (major release `Endive`; preview `2026-10-28.preview`). The previous API version is `2026-09-30.endive`, which in turn followed `2026-08-26.dahlia` (the Dahlia major release was `2026-03-25.dahlia`). The official upgrade guide uses `2026-10-28.endive` in its `Stripe-Version` examples (cURL, `stripe charges create --stripe-version 2026-10-28.endive`, SDK `apiVersion`). (Source: https://docs.stripe.com/upgrades, retrieved 2026-11-14)
- Always pin the API version in code (`Stripe-Version` header or a pinned SDK) rather than relying on the account default. Strongly typed SDKs (Java, Go, .NET) are fixed to the version current at SDK release and do not support overriding it.
- Breaking changes in `2026-09-30.endive` (28 listed in the changelog) include: `payment_method_types` removed from Checkout Session create and from PaymentIntent / SetupIntent create, update and confirm; PayTo fields removed from PaymentMethod update; `filters.countries` renamed `filters.country` for Financial Connections Sessions; `configurations` removed from Account Links v2. (Source: https://docs.stripe.com/changelog/endive, https://docs.stripe.com/changelog/endive/2026-09-30/remove-payment-method-types-checkout-sessions, https://docs.stripe.com/changelog/endive/2026-09-30/removes-the-payment-method-types-parameter-from-payment-intents-and-setup-intents, https://docs.stripe.com/changelog/endive/2026-09-30/removed-payto-fields, https://docs.stripe.com/changelog/endive/2026-09-30/rename-financial-connections-countries-filter-to-country, https://docs.stripe.com/changelog/endive/2026-09-30/removes-configurations-parameter-from-v2-core-account-links-api)
- `2026-10-28.endive` lists no breaking changes: all 38 changelog entries are non-breaking additions (for example Disputes `intended_submission_method`, Terminal T600, card-on-file usage indicators, Treasury / Global Payouts APIs in API v2). Details are in the Notes of the affected pages. (Source: https://docs.stripe.com/changelog, retrieved 2026-11-14)
- `2026-10-28.preview` only (not in `2026-10-28.endive`): Wero bank redirect payment method (Belgium, France, Germany; Payment Intents, Checkout Sessions, Payment Links), `payments.settlement_currencies` / `payments.default_settlement_currency` on Balance Settings, `us_bank_account.external_token` (Plaid processor token) for ACH Direct Debit, `fingerprint` on v2 bank account objects, the Queries and Reports API (`/v2/data`, replacing the Sigma API `/v1/sigma` and the Reporting APIs), and breaking v2 money management changes (`deposit_insurance_eligibility` removed from Financial Account create; Financial Addresses shape, `eur` / `sepa` rename of `sepa_credit_transfer`, required `settlement_currency`; Received Credits `originating_bank_account`; Payout Methods and vaulted bank account updates; Outbound Payments `created[...]` list filter and next-day ACH default). These were not verified against the endive API reference. (Source: https://docs.stripe.com/changelog/endive/2026-10-28/wero-bank-redirect-payment-method-support, https://docs.stripe.com/changelog/endive/2026-10-28/settlement-currency-management-balance-settings, https://docs.stripe.com/changelog/endive/2026-10-28/us-bank-account-external-token-parameter-support, https://docs.stripe.com/changelog/endive/2026-10-28/v2-bank-account-fingerprint-properties, https://docs.stripe.com/changelog/endive/2026-10-28/data-api, https://docs.stripe.com/changelog/endive/2026-10-28/financial-addresses-v2-api-shape-updates, https://docs.stripe.com/changelog/endive/2026-10-28/outbound-flows-api-updates, retrieved 2026-11-14)
- Store Stripe object IDs with up to 255 characters (MySQL: `VARCHAR(255) COLLATE utf8_bin`).
- Upgrading your account version affects: API calls without the `Stripe-Version` header, Stripe.js method responses, webhook payloads (except endpoints with an explicit version pin), and automatic billing operations.
- You can roll back to the previous version within 72 hours of upgrading; failed webhooks are retried with the old structure.
- For Connect platforms: when making requests on behalf of connected accounts without specifying a version, Stripe always uses the platform's API version and ignores the connected account's version.
- View your current version and available upgrades in the Stripe Dashboard Workbench.

## Related

- [Authentication](./authentication.md)
- [Error Handling](./error-handling.md)
