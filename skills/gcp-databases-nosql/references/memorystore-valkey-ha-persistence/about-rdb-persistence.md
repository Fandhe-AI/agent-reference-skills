---
source: https://docs.cloud.google.com/memorystore/docs/valkey/about-rdb-persistence
---

# About RDB persistence

RDB persistence saves snapshots to durable storage at an interval you choose (minimum 1 hour, maximum 24 hours). It adds no billing cost and suits workloads that tolerate some staleness after recovery. Snapshots are used only for automated recovery, not manual restores, and only the most recent snapshot is retained.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/memorystore/docs/valkey/manage-persistence ("Enable RDB persistence for an existing instance"; other RDB commands are in [manage-persistence.md](./manage-persistence.md)).

Adapted (not in the official docs): upper-case placeholders instead of `instance`, `region-id`, `snapshot-interval` and `time`; SNAPSHOT_INTERVAL takes the gcloud values `one-hour`, `six-hours`, `twelve-hours` or `twenty-four-hours`.

```bash
gcloud memorystore instances update INSTANCE_ID \
  --location=REGION_ID \
  --persistence-config-mode=rdb \
  --rdb-config-snapshot-period=SNAPSHOT_INTERVAL \
  --rdb-config-snapshot-start-time=START_TIME
```

## Options / Props

| Item | Value |
|------|-------|
| Snapshot intervals | `1h`, `6h`, `12h`, `24h` (as written in the source; gcloud flag values `one-hour`, `six-hours`, `twelve-hours`, `twenty-four-hours`) |
| START_TIME | RDB snapshot start time, e.g. `2024-04-08T03:00:00Z` |
| Schedule time zone | UTC (local start times shift by an hour at DST changes) |
| Snapshot retry on failure | immediate, exponential backoff of 5 to 300 seconds |
| Worst-case staleness on recovery | interval since the last good snapshot started + time to save the next snapshot |
| Staleness metric | `rdb_last_success_ages` |

## Notes

- Example schedule: start time 4 AM and interval 1 hour means snapshots start at 4 AM on the day RDB is enabled and continue every hour.
- Pausing: set the start time to the future; the last snapshot is retained and used if a node fails and cannot recover from a replica. Resume by adjusting the schedule.
- Recovery: nodes fail over to replicas first; only if both primary and replica fail simultaneously (or no replica data is available) does the node recover from the snapshot. The node is unavailable during recovery, and recovery time depends on snapshot size. Recovery failures are retried repeatedly until success.
- After scaling up, snapshots do not include new shards until the next scheduled snapshot. Enabling or disabling persistence might require maintenance.
- You cannot enable both AOF and RDB. Monitor snapshots and alert on failed snapshots; failures can indicate overloaded nodes. Performance impact is visible in Cloud Monitoring CPU and memory metrics.
- Corrected from the official docs: the manage-persistence example uses lower-case placeholders (`gcloud memorystore instances update instance`, `--location=region-id`, `--rdb-config-snapshot-period=snapshot-interval`, `--rdb-config-snapshot-start-time=time`) and the interval values `1h` / `6h` / `12h` / `24h`, which gcloud (SDK 593.0.0) rejects as invalid choices.
- Memorystore for Valkey is managed Valkey on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/about-rdb-persistence (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [persistence-overview.md](./persistence-overview.md)
- [about-aof-persistence.md](./about-aof-persistence.md)
- [manage-persistence.md](./manage-persistence.md)
- [ha-and-replicas.md](./ha-and-replicas.md)
