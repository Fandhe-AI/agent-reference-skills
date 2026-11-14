---
source: https://developers.cloudflare.com/hyperdrive/concepts/connection-pooling/
---

# Connection pooling

Hyperdrive maintains a pool of connections to the origin database, optimally placed to minimize latency; the pool size is configurable.

## Signature / Usage

Pool size is set with `--origin-connection-limit` (see [tune-connection-pool](./tune-connection-pool.md)):

```sh
npx wrangler hyperdrive update <HYPERDRIVE_ID> --origin-connection-limit=<MAX_CONNECTIONS>
```

## Notes

- All configurations have a minimum of 5 connections; the maximum depends on the Workers plan (see [limits](./limits.md)).
- Hyperdrive auto-scales open connections with traffic and database load. `max_size` is a soft limit: Hyperdrive may temporarily exceed it during network issues or high traffic.
- Restart the pool (break-glass, for example after a failover where Hyperdrive has not cycled connections to the new primary): in the dashboard select the configuration, go to **Settings**, select **Restart** under **Danger zone**. Requires the **Hyperdrive Admin** role. Restart drops all active connections and in-flight queries may see brief errors.
- Advisory locks: Hyperdrive supports the transaction-level advisory lock functions `pg_advisory_xact_lock`, `pg_advisory_xact_lock_shared`, `pg_try_advisory_xact_lock`, and `pg_try_advisory_xact_lock_shared`, including their two-key (`integer`, `integer`) overloads. These locks are released when the transaction ends, before the connection is returned to the pool, so they behave consistently when you wrap them in an explicit transaction with `BEGIN`/`COMMIT`. Hyperdrive does not support session-level advisory lock functions (`pg_advisory_lock`, `pg_advisory_lock_shared`, `pg_try_advisory_lock`, and `pg_try_advisory_lock_shared`) because it uses transaction pooling: a session-level lock can remain held by a pooled connection after your client disconnects, blocking other clients until the lock is explicitly released or the database connection closes. Use transaction-level advisory locks within an explicit transaction instead.
- Pooling mode is transaction mode; `SET` applies within a transaction or single query and the connection is `RESET` on return. Named prepared statements are supported in `postgres.js` and `node-postgres`.
- Best practices: start conservatively, monitor database metrics, stay under the database's maximum connection limit, and account for the total across multiple Hyperdrive configurations to the same database.
- Source: https://developers.cloudflare.com/hyperdrive/concepts/connection-pooling/ (production `34d908a`, fetched 2026-11-14)

## Related

- [Tune connection pooling](./tune-connection-pool.md)
- [How Hyperdrive works](./how-hyperdrive-works.md)
- [Limits](./limits.md)
