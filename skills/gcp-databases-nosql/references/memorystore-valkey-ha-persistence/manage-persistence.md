---
source: https://docs.cloud.google.com/memorystore/docs/valkey/manage-persistence
---

# Manage persistence

Common tasks for RDB and AOF persistence on Memorystore for Valkey: create an instance with persistence, enable it on an existing instance, adjust the RDB interval or start time, pause RDB, adjust the AOF sync setting, and disable persistence.

## Signature / Usage

### Create an instance that uses RDB persistence

Adapted (not in the official docs): lower-case placeholders (`instance`, `region-id`, `replica-count`, `node-type`, `shard-count`, `snapshot-interval`, `time`) replaced with upper-case ones so they cannot be mistaken for literal values; see the table below for the values gcloud accepts.

```bash
gcloud memorystore instances create INSTANCE_ID \
  --location=REGION_ID \
  --endpoints='[{"connections": [{"pscAutoConnection": {"network": "projects/PROJECT_ID/global/networks/NETWORK_ID", "projectId": "PROJECT_ID"}}]}]' \
  --replica-count=REPLICA_COUNT \
  --node-type=NODE_TYPE \
  --shard-count=SHARD_COUNT \
  --persistence-config-mode=rdb \
  --rdb-config-snapshot-period=SNAPSHOT_INTERVAL \
  --rdb-config-snapshot-start-time=START_TIME
```

### Enable RDB persistence for an existing instance

Adapted (not in the official docs): upper-case placeholders instead of `instance`, `region-id`, `snapshot-interval` and `time`.

```bash
gcloud memorystore instances update INSTANCE_ID \
  --location=REGION_ID \
  --persistence-config-mode=rdb \
  --rdb-config-snapshot-period=SNAPSHOT_INTERVAL \
  --rdb-config-snapshot-start-time=START_TIME
```

### Adjust the RDB snapshot interval

Adapted (not in the official docs): upper-case placeholders instead of `instance`, `region-id` and `snapshot-interval`.

```bash
gcloud memorystore instances update INSTANCE_ID \
  --location=REGION_ID \
  --rdb-config-snapshot-period=SNAPSHOT_INTERVAL
```

### Adjust the RDB snapshot start time (also pauses RDB when set to a future time)

Changing the start time also changes the snapshot alignment time. For example, changing from 6:00 AM to 6:30 AM with a snapshot frequency of `1h`, aligns future snapshots at 7:30 AM, 8:30 AM, 9:30 AM and every hour after that.

Adapted (not in the official docs): upper-case placeholders instead of `instance`, `region-id` and `time`.

```bash
gcloud memorystore instances update INSTANCE_ID \
  --location=REGION_ID \
  --rdb-config-snapshot-start-time=START_TIME
```

### Create an instance that uses AOF persistence

Adapted (not in the official docs): upper-case placeholders instead of `instance`, `region-id`, `replica-count`, `node-type`, `shard-count` and `fsync-frequency`; the `--endpoints` line is indented like the others.

```bash
gcloud memorystore instances create INSTANCE_ID \
  --location=REGION_ID \
  --endpoints='[{"connections": [{"pscAutoConnection": {"network": "projects/PROJECT_ID/global/networks/NETWORK_ID", "projectId": "PROJECT_ID"}}]}]' \
  --replica-count=REPLICA_COUNT \
  --node-type=NODE_TYPE \
  --shard-count=SHARD_COUNT \
  --persistence-config-mode=aof \
  --aof-config-append-fsync=FSYNC_FREQUENCY
```

### Adjust the AOF sync setting

Adapted (not in the official docs): upper-case placeholders instead of `instance`, `region-id` and `fsync-frequency`.

```bash
gcloud memorystore instances update INSTANCE_ID \
  --location=REGION_ID \
  --aof-config-append-fsync=FSYNC_FREQUENCY
```

### Disable RDB or AOF persistence

Adapted (not in the official docs): upper-case placeholders instead of `instance` and `region-id`.

```bash
gcloud memorystore instances update INSTANCE_ID \
  --location=REGION_ID \
  --persistence-config-mode=disabled
```

## Options / Props

| Placeholder | Description |
|-------------|-------------|
| `INSTANCE_ID` | Instance ID: 1 to 63 characters, lowercase letters, numbers or hyphens; starts with a lowercase letter, ends with a lowercase letter or number. |
| `REGION_ID` | Region for the instance. |
| `PROJECT_ID` / `NETWORK_ID` | Project and network used for the PSC auto connection. |
| `REPLICA_COUNT` | Replicas per shard, `0`-`5`. |
| `NODE_TYPE` | Node type for the instance. |
| `SHARD_COUNT` | Number of shards; determines total memory capacity. |
| `SNAPSHOT_INTERVAL` | gcloud accepts `one-hour`, `six-hours`, `twelve-hours`, `twenty-four-hours`. The source lists `1h`, `6h`, `12h`, `24h` (default `24h`), which gcloud rejects as invalid choices. |
| `START_TIME` | RDB snapshot start time in the "ISO 1801" format (as written in the source), e.g. `2024-04-08T03:00:00Z`. If omitted on create or enable, the first snapshot is taken immediately. |
| `FSYNC_FREQUENCY` | gcloud accepts `always`, `every-sec`, `never`. The source lists `always`, `everysec`, `no` (default `everysec`); gcloud rejects `everysec` and `no`. |

## Notes

- Enabling or disabling persistence on an existing instance might require maintenance.
- Pausing RDB (start time in the future) leaves stale backups and the instance may recover with stale data; for long pauses consider disabling RDB instead.
- Disabling persistence disables both backup and restore; nodes do not load from snapshots created before persistence was disabled. Try it on a disposable instance first.
- Caution kept from the source: use the `shared-core-nano` node type only for development or testing (no SLA).
- Corrected from the official docs: the examples use lower-case placeholders (`instance`, `--location=region-id`, `--replica-count=replica-count`, `--node-type=node-type`, `--shard-count=shard-count`, `--rdb-config-snapshot-period=snapshot-interval`, `--rdb-config-snapshot-start-time=time`, `--aof-config-append-fsync=fsync-frequency`) next to `PROJECT_ID` / `NETWORK_ID`, and document the values `1h` / `6h` / `12h` / `24h` and `everysec` / `no`, which the gcloud CLI (SDK 593.0.0) rejects; the flag values above follow the gcloud help.
- The source also shows Console steps (Data persistence strategy, Configurations > Persistence). Monitor with Cloud Monitoring persistence metrics.
- Memorystore for Valkey is managed Valkey on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/manage-persistence (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Flag values: https://docs.cloud.google.com/sdk/gcloud/reference/memorystore/instances/update

## Related

- [persistence-overview.md](./persistence-overview.md)
- [about-rdb-persistence.md](./about-rdb-persistence.md)
- [about-aof-persistence.md](./about-aof-persistence.md)
