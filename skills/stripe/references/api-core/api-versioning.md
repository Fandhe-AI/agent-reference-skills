# API Versioning

Stripe assigns an API version to your account on first use. The version controls which request parameters, response properties, and webhook payload structures your integration receives. You can test a new version by setting the `Stripe-Version` request header before upgrading your account.

## Signature / Usage

```sh
curl https://api.stripe.com/v1/customers \
  -u sk_test_YOUR_KEY: \
  -H "Stripe-Version: 2026-09-30.endive"
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

- Latest API version: `2026-09-30.endive` (major release `Endive`; preview `2026-09-30.preview`). The previous API version is `2026-08-26.dahlia` (the Dahlia major release was `2026-03-25.dahlia`). The official upgrade guide uses `2026-09-30.endive` in its `Stripe-Version` examples (cURL, `stripe charges create --stripe-version 2026-09-30.endive`, SDK `apiVersion`). (Source: https://docs.stripe.com/upgrades)
- Always pin the API version in code (`Stripe-Version` header or a pinned SDK) rather than relying on the account default. Strongly typed SDKs (Java, Go, .NET) are fixed to the version current at SDK release and do not support overriding it.
- Breaking changes in `2026-09-30.endive` (28 listed in the changelog) include: `payment_method_types` removed from Checkout Session create and from PaymentIntent / SetupIntent create, update and confirm; PayTo fields removed from PaymentMethod update; `filters.countries` renamed `filters.country` for Financial Connections Sessions; `configurations` removed from Account Links v2. (Source: https://docs.stripe.com/changelog/endive, https://docs.stripe.com/changelog/endive/2026-09-30/remove-payment-method-types-checkout-sessions, https://docs.stripe.com/changelog/endive/2026-09-30/removes-the-payment-method-types-parameter-from-payment-intents-and-setup-intents, https://docs.stripe.com/changelog/endive/2026-09-30/removed-payto-fields, https://docs.stripe.com/changelog/endive/2026-09-30/rename-financial-connections-countries-filter-to-country, https://docs.stripe.com/changelog/endive/2026-09-30/removes-configurations-parameter-from-v2-core-account-links-api)
- Store Stripe object IDs with up to 255 characters (MySQL: `VARCHAR(255) COLLATE utf8_bin`).
- Upgrading your account version affects: API calls without the `Stripe-Version` header, Stripe.js method responses, webhook payloads (except endpoints with an explicit version pin), and automatic billing operations.
- You can roll back to the previous version within 72 hours of upgrading; failed webhooks are retried with the old structure.
- For Connect platforms: when making requests on behalf of connected accounts without specifying a version, Stripe always uses the platform's API version and ignores the connected account's version.
- View your current version and available upgrades in the Stripe Dashboard Workbench.

## Related

- [Authentication](./authentication.md)
- [Error Handling](./error-handling.md)
