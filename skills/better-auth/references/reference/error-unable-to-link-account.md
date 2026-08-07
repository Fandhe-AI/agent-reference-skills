# unable_to_link_account

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `account.accountLinking.trustedProviders` | `string[] \| async function` | — | Providers allowed for automatic account linking |

## Notes

- Occurs specifically during OAuth flows when Better Auth cannot link a provider account to the currently authenticated user.
- Common causes: the provider isn't listed in `account.accountLinking.trustedProviders`; different auth configurations across dev/staging/prod causing a provider to appear untrusted in one environment; database write failures (unique constraint violations, foreign key violations, transaction or connection issues); race conditions from concurrent attempts to link the same provider; pending migrations or schema differences between services.
- Fix: add the provider ID (e.g. `github`, `google`) to `account.accountLinking.trustedProviders` and verify the provider ID/slug matches what your integration expects; run pending migrations and ensure the schema matches your Better Auth version, investigate DB errors (deadlocks, timeouts, connection pool limits), and implement retry logic for transient failures; ensure identical auth configs are deployed across all environments, confirm environment variables load as expected, and validate the runtime sees the intended `trustedProviders` list.

## Related

- [error-account-not-linked](./error-account-not-linked.md)
