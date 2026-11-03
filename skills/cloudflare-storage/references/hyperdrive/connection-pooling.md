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
- Pooling mode is transaction mode; `SET` applies within a transaction or single query and the connection is `RESET` on return. Named prepared statements are supported in `postgres.js` and `node-postgres`.
- Best practices: start conservatively, monitor database metrics, stay under the database's maximum connection limit, and account for the total across multiple Hyperdrive configurations to the same database.

## Related

- [Tune connection pooling](./tune-connection-pool.md)
- [How Hyperdrive works](./how-hyperdrive-works.md)
- [Limits](./limits.md)
