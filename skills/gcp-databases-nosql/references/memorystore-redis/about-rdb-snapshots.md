---
source: https://docs.cloud.google.com/memorystore/docs/redis/about-rdb-snapshots
---

# About RDB snapshots

RDB snapshots store complete point-in-time snapshots on persistent storage at a schedule you choose, for internal instance recovery. They add no cost to billing.

## Signature / Usage

Base create command (it sets no persistence options; snapshots are enabled by default in the Console, and enabling snapshots or setting the interval and start time is covered on the source's managing-rdb-snapshots page, not here):

```bash
gcloud redis instances create INSTANCE_ID --size=SIZE --region=REGION_ID
```

## Options / Props

| Setting | Value |
|---|---|
| Snapshot interval | `1h`, `6h`, `12h` or `24h` (minimum `1h`, maximum `24h`) |
| Start time | optional; if omitted the first snapshot runs as soon as possible and the interval is honored |
| Redis version | 5.0 or greater |
| Snapshots kept | only the last successful snapshot is available for recovery |
| Best-practice `maxmemory-gb` | 80% of instance capacity (20% reserved for overhead) |
| Key volume | about 200 million keys or more can make snapshots and recoveries slow |

### Recovery behavior

| Tier | Behavior |
|---|---|
| Basic | Recovers from the most recent snapshot on every restart (failure, scaling, version upgrade) |
| Standard | Fails over to a replica by default; recovers from a snapshot only if both primary and replica restart and no replica is available |

## Notes

- Snapshots are for internal recovery only; you cannot access or manually restore them. Use export and import for manual backups. On Standard Tier snapshots are taken on the replica, never on the primary.
- Schedule is best effort. A failed or overlong snapshot makes the next one start right after; an in-progress snapshot at a scheduled time completes first. Set an interval long enough for the snapshot to finish.
- To pause snapshots temporarily, move the start time to a future date; the last snapshot is retained for at least 7 days. Avoid dates that cause unacceptable staleness.
- Worst-case data loss on recovery is the interval since the last good snapshot started plus the time to save the next one; use the `last_success_age` metric. Applications must tolerate stale data. Recovery failure is rare and recovers the instance with no data.
- The instance is unavailable during recovery (see the `RDB recovery remaining time` metric). To mitigate, create a new instance and redirect traffic, then transfer restored data. Deleting an instance during recovery can take up to 20 minutes and loses all snapshot data (destructive; try on a disposable instance).
- Snapshots use fork and copy-on-write; memory can double in the worst case. Disable then re-enable snapshots to delete stale snapshots. Alert on RDB snapshot `last_status`, `last_success_age`, and `redis.googleapis.com/server/uptime`; `in_progress` helps correlate performance impact. Schedule snapshots in low-traffic periods.
- Snippet taken from https://docs.cloud.google.com/memorystore/docs/redis/create-manage-instances (the source page itself has no commands; enabling and adjusting snapshots is on the managing-rdb-snapshots page).
- Source: https://docs.cloud.google.com/memorystore/docs/redis/about-rdb-snapshots (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [high-availability-for-memorystore-for-redis.md](./high-availability-for-memorystore-for-redis.md)
- [redis-tiers.md](./redis-tiers.md)
