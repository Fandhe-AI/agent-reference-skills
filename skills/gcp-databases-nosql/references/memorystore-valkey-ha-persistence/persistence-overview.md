---
source: https://docs.cloud.google.com/memorystore/docs/valkey/persistence-overview
---

# Persistence overview

Memorystore for Valkey supports Append-only File (AOF) persistence and Redis Database (RDB) persistence. You can enable either one for an instance, but not both. Persistence complements high availability: HA is the first line of defense against node failures and zonal outages, persistence provides disaster recovery when all nodes in a shard fail.

## Signature / Usage

The persistence mode is set with `--persistence-config-mode` (`rdb`, `aof` or `disabled`) on `gcloud memorystore instances create` or `update`; full commands are in [manage-persistence.md](./manage-persistence.md).

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/manage-persistence ("Disable RDB persistence" / "Disable AOF persistence").

Adapted (not in the official docs): upper-case placeholders instead of `instance` and `region-id`.

```bash
gcloud memorystore instances update INSTANCE_ID \
  --location=REGION_ID \
  --persistence-config-mode=disabled
```

## Options / Props

| Priority | Recommended mode | Why |
|----------|------------------|-----|
| Data durability | AOF | Can persist data every second (or every write); RDB snapshots are taken at most hourly. |
| Performance | RDB | Usually places lower performance demands on the instance than AOF; accept some staleness on recovery. |
| Both | AOF with a high shard count | More vCPUs improve performance; AOF still adds some latency in any configuration. |

## Notes

- For best availability and durability, enable both persistence and HA (see [ha-and-replicas.md](./ha-and-replicas.md)).
- Disabling persistence disables both backup and restore; nodes do not load from snapshots created before it was disabled. Try it on a disposable instance first.
- Corrected from the official docs: the manage-persistence example uses lower-case placeholders (`gcloud memorystore instances update instance`, `--location=region-id`).
- Memorystore for Valkey is managed Valkey on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/persistence-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [about-rdb-persistence.md](./about-rdb-persistence.md)
- [about-aof-persistence.md](./about-aof-persistence.md)
- [manage-persistence.md](./manage-persistence.md)
