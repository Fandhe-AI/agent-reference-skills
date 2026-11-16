---
source: https://docs.cloud.google.com/bigtable/docs/change-streams-overview
---

# Change streams overview

Bigtable change streams provide change data capture (CDC): data changes to a table are captured as data change records as they happen and can be streamed for processing, analytics, audit or archival. You enable a change stream on a table with a retention period of 1 to 7 days.

## Signature / Usage

### Enable, update or disable a change stream

Enable a change stream with a retention period of 1 day, or update the retention period to 1 day (example from the gcloud reference):

```bash
gcloud bigtable instances tables update my-table \
    --instance=my-instance --change-stream-retention-period=1d
```

Disable a change stream (example from the gcloud reference):

```bash
gcloud bigtable instances tables update my-table \
    --instance=my-instance --clear-change-stream-retention-period
```

### Monitor and read

Metric names the source gives for monitoring change streams: `change_stream_log_used_bytes` (bytes used by the change stream records) and `cpu_load_by_app_profile_by_method_by_table` (CPU utilization by change streams).

Recommended ways to read a stream (not raw API calls): Dataflow templates (Bigtable change streams to BigQuery, to Pub/Sub), the Bigtable Beam connector, or the Java client library. The underlying Data API method is `ReadChangeStream`.

## Options / Props

| Topic | Detail |
|---|---|
| Retention period | 1 to 7 days |
| Captured | Writes, deletions and updates from `MutateRow`, `MutateRows`, `CheckAndMutateRow`, `ReadModifyWriteRow`; deletions by garbage collection; rows deleted with Admin API `DropRowRange` |
| Not captured | Schema changes (column family add/modify) and replication topology changes (cluster add/remove) |
| Ordering | Commit timestamp order per row key and cluster; no ordering guarantee across different row keys or clusters |
| Old values | A data change record does not contain the old value |
| Reading requirement | App profile with single-cluster routing; with Dataflow, single-row transactions must be enabled |
| CPU impact | About +10% CPU when enabled; about +20 to 30% while processing (for example Dataflow) |
| Storage | A day of change records takes about 1.5 times the storage of the data written that day; billed at standard storage rates; not counted in storage utilization (% max) |

### Data change record contents

Entries (write: column family, qualifier, timestamp, value; cell deletion: family, qualifier, timestamp range; column family deletion; row deletion becomes a list of column family deletions), row key, change type (user-initiated or garbage collection), ID of the cluster that received the change, commit timestamp, tie breaker (for built-in conflict resolution), token (to resume an interrupted stream), estimated low watermark.

## Notes

- All changes in one record were applied atomically in a single RPC. The commit timestamp is assigned when the first cluster receives the write; the record on other clusters has the same commit timestamp.
- Partitions: a stream is split into partitions (each tied to a tablet) for parallel reading; you cannot configure or monitor them, but the Java client exposes them so you can handle splits and merges. Dataflow templates and the Beam connector handle partition changes for you.
- Watermarks: `estimatedLowWatermark` estimates how recently a partition caught up with replication across all clusters; it is an estimate, not a guarantee that no data is still to arrive. If one partition's watermark stalls (cluster overload, network delay, unavailability), the stream-wide low watermark and any pipeline stall. The Beam connector sets output timestamps to zero to handle this.
- A table and its change stream share cluster nodes and storage; in a replicated instance each cluster stores a copy. Add nodes (or raise autoscaling maximum) for compute, not for change stream storage.
- Cross-region reads incur network charges; Dataflow adds its own processing costs.
- Avoid `DropRowRange` on a change stream-enabled table; if unavoidable it can take a long time and CPU usage increases.
- Bigtable is a wide-column NoSQL database, not a relational one.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/tables/update (the change streams overview has no code block). A table can also be created with a change stream: `gcloud bigtable instances tables create` with `--change-stream-retention-period`.
- Source: https://docs.cloud.google.com/bigtable/docs/change-streams-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [monitoring-instance.md](./monitoring-instance.md)
- [backups.md](./backups.md)
