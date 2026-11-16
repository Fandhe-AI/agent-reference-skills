---
source: https://docs.cloud.google.com/memorystore/docs/valkey/about-iam-auth
---

# About IAM authentication

IAM authentication integrates with the Valkey `AUTH` command so clients present a short-lived IAM access token instead of a static password. Principals are user accounts and service accounts; the required permission is `memorystore.instances.connect` (role `roles/memorystore.dbConnectionUser`).

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/manage-iam-auth

```bash
gcloud auth print-access-token
```

### End an authenticated connection

Run `CLIENT LIST` to identify the connection, then `CLIENT KILL` to end it.

### Best practices to avoid token double-caching

- Fetch tokens on demand: use dynamic credential providers or callbacks of your client library (such as Valkey GLIDE or redis-py) for new connections.
- If you use a custom refresh schedule, inspect the token's actual expiration timestamp or adjust the auth library's eager-refresh threshold.

## Options / Props

| Topic | Detail |
|-------|--------|
| Supported principals | user account, service account (Google groups, Workspace domains, Cloud Identity domains not yet supported) |
| Default grant scope | project level (all instances in the project); can be restricted to one instance via resource name conditions |
| Token lifetime | 1 hour by default; up to 12 hours when generating the token |
| New connections | need a valid token via `AUTH`; already authenticated connections keep working after expiry |
| Throughput impact | no steady-state degradation; throttles the rate of new connections per second |
| Compute Engine VM prerequisites | Cloud Platform API access scope and Memorystore for Valkey API enabled |

## Notes

- `AUTH` is sent unencrypted unless in-transit encryption is enabled; enabling in-transit encryption is recommended with IAM authentication.
- Automate token retrieval; a token cannot be hardcoded because of its short lifetime. Google authentication libraries cache tokens, so an application that also caches or refreshes on a fixed schedule may reuse a nearly expired token and new handshakes then fail with IAM authorization denials.
- Surges of new connections (restarts, deployments) are throttled; roll out clients gradually and use exponential backoff and connection pools.
- Managed Valkey on Google Cloud; distinct from Upstash Redis (`upstash`). Service accounts and ADC are in `gcp-foundation`.
- Source inconsistency: the client-library code samples page has a code comment saying "Generated IAM tokens are valid for 15 minutes" (see `memorystore-valkey-overview/client-library-code-samples.md`), while this page says one hour by default (up to 12 hours). Kept as written on each page.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/about-iam-auth (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [manage-iam-auth.md](./manage-iam-auth.md)
- [access-control.md](./access-control.md)
- [about-in-transit-encryption.md](./about-in-transit-encryption.md)
