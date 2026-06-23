# API Versioning

Stripe assigns an API version to your account on first use. The version controls which request parameters, response properties, and webhook payload structures your integration receives. You can test a new version by setting the `Stripe-Version` request header before upgrading your account.

## Signature / Usage

```sh
curl https://api.stripe.com/v1/customers \
  -u sk_test_YOUR_KEY: \
  -H "Stripe-Version: 2024-04-10"
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

- Store Stripe object IDs with up to 255 characters (MySQL: `VARCHAR(255) COLLATE utf8_bin`).
- Upgrading your account version affects: API calls without the `Stripe-Version` header, Stripe.js method responses, webhook payloads (except endpoints with an explicit version pin), and automatic billing operations.
- You can roll back to the previous version within 72 hours of upgrading; failed webhooks are retried with the old structure.
- For Connect platforms: when making requests on behalf of connected accounts without specifying a version, Stripe always uses the platform's API version and ignores the connected account's version.
- View your current version and available upgrades in the Stripe Dashboard Workbench.

## Related

- [Authentication](./authentication.md)
- [Error Handling](./error-handling.md)
