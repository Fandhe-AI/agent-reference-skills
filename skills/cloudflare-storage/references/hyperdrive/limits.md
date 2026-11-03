---
source: https://developers.cloudflare.com/hyperdrive/platform/limits/
---

# Limits

Configuration, connection, and query limits for Hyperdrive on Free and Paid plans.

## Signature / Usage

```sh
npx wrangler hyperdrive update <HYPERDRIVE_ID> --origin-connection-limit=<MAX_CONNECTIONS>
```

## Options / Props

Configuration limits:

| Limit | Free | Paid |
| --- | --- | --- |
| Maximum configured databases | 10 per account | 25 per account |
| Maximum username length | 63 characters (bytes) | 63 characters (bytes) |
| Maximum database name length | 63 characters (bytes) | 63 characters (bytes) |

Connection limits:

| Limit | Free | Paid |
| --- | --- | --- |
| Initial connection timeout | 15 seconds | 15 seconds |
| Idle connection timeout | 10 minutes | 10 minutes |
| Maximum origin database connections (per configuration) | ~20 connections | ~100 connections |

Query limits:

| Limit | Free | Paid |
| --- | --- | --- |
| Maximum query (statement) duration | 60 seconds | 60 seconds |
| Maximum cached query response size | 50 MB | 50 MB |

## Notes

- Username and database name length limits are enforced by PostgreSQL; some providers enforce smaller limits.
- Hyperdrive is distributed: a client may be unable to reach an existing pool, in which case a new pool with its own allocation is created, so connection counts may occasionally exceed the listed limits.
- No limit on concurrent client connections from Workers; origin connections are limited because hosted databases have limits.
- Queries exceeding the maximum duration are terminated. Responses larger than 50 MB are not cached but still returned.
- Pool exhaustion errors: `Failed to acquire a connection from the pool.` (connections held too long) and `Server connection attempt failed: connection_refused` (firewall or provider connection limit). See [troubleshooting](./troubleshooting.md).
- Request an increase via the Limit Increase Request form or the Hyperdrive channel in Cloudflare's Discord. Not all limits can be increased.

## Related

- [Tune connection pooling](./tune-connection-pool.md)
- [Pricing](./pricing.md)
- [Troubleshoot and debug](./troubleshooting.md)
