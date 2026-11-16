---
source: https://docs.cloud.google.com/memorystore/docs/valkey/about-aof-persistence
---

# About AOF persistence

AOF persistence prioritizes durability by recording every write command to an append-only file and replaying it sequentially after a failure or restart. Unlike RDB persistence, AOF persistence cannot be paused.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/manage-persistence ("Adjust the AOF sync setting"; other AOF commands are in [manage-persistence.md](./manage-persistence.md)).

Adapted (not in the official docs): upper-case placeholders instead of `instance`, `region-id` and `fsync-frequency`; FSYNC_FREQUENCY takes the gcloud values `always`, `every-sec` or `never`.

```bash
gcloud memorystore instances update INSTANCE_ID \
  --location=REGION_ID \
  --aof-config-append-fsync=FSYNC_FREQUENCY
```

## Options / Props

Sync setting (`appendfsync`) decides how often in-memory cached data is saved to durable storage.

| Value | Behavior |
|-------|----------|
| `always` | Saves data to storage for every write (best durability, performance tradeoff). |
| `everysec` | Saves data every second (default; recommended). |
| `no` | Relies on the operating system to flush, which typically happens every 30 seconds. |

## Notes

- Before AOF logs reach durable storage they sit in OS memory; a failure or restart in that window can lose those writes.
- Enabling or disabling AOF might require instance maintenance. You cannot enable both AOF and RDB.
- The table lists the Valkey `appendfsync` values used in the source. The gcloud flag `--aof-config-append-fsync` accepts `always`, `every-sec` and `never` (SDK 593.0.0 help); the source's `everysec` and `no` are rejected as invalid choices.
- Corrected from the official docs: the manage-persistence example uses lower-case placeholders (`gcloud memorystore instances update instance`, `--location=region-id`, `--aof-config-append-fsync=fsync-frequency`).
- Use AOF together with a highly available instance for resilience during maintenance or unexpected failures.
- Memorystore for Valkey is managed Valkey on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/about-aof-persistence (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [persistence-overview.md](./persistence-overview.md)
- [about-rdb-persistence.md](./about-rdb-persistence.md)
- [manage-persistence.md](./manage-persistence.md)
- [ha-and-replicas.md](./ha-and-replicas.md)
