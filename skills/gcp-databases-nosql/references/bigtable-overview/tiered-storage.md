---
source: https://docs.cloud.google.com/bigtable/docs/tiered-storage
---

# Tiered storage overview

Preview. Tiered storage automatically moves older, infrequently accessed data from SSD to a lower-cost infrequent access tier using an age-based policy configured per table, so large historical datasets stay affordable while active data keeps SSD performance. No change to read or write code is needed.

## Signature / Usage

### Rolling window example

```text
For example, assume the current server time is 2024-07-24 10:00:00 PT and you
set an age threshold of 60 days. At this moment, Bigtable
considers any data with a timestamp older than 2024-05-28 10:00:00 PT (60 days
before the current server time) to be outside the window. This older data is
stored in the infrequent access tier.
```

### Filter by time range

For data that is recent and within the age threshold, use a timestamp range filter as the primary filter or at the top level of a filter chain so the query reads only from SSD. Without it, Bigtable checks both tiers to guarantee all data is returned, which can increase latency. With a 60-day threshold, query with a time range inside the 60-day window.

### Move data back to SSD

- Increase the tiering policy age threshold.
- Disable tiered storage (see costs).
- Rewrite the data with a new timestamp (creates a duplicate; the old copy stays in infrequent access until removed by deletion or an age-based garbage collection policy).

## Options / Props

| Item | Value |
|------|-------|
| Edition | Enterprise and Enterprise Plus; Data Boost for tiered storage only in Enterprise Plus |
| Capacity | 32 TB per node (Enterprise), up to 64 TB per node (Enterprise Plus) |
| Instances | SSD instances only; not available for HDD |
| Minimum age threshold | 30 days |
| Hot backups | Not supported |
| Scope | Configured at table level; policy applies to the whole table |

### Metrics

| Metric | Description |
|--------|-------------|
| `disk/bytes_used` | Bytes stored in each tier; `storage_type` label: `ssd` or `infrequent_access` |
| `server/read_latencies_by_storage_tier` | Read time per tier; `storage_tier` label: `ssd`, `infrequent_access`, `ssd+infrequent_access`, or `unknown` |
| `server/read_request_count_by_storage_tier` | Read requests per tier; same `storage_tier` label values |
| `table/bytes_transferred_to_infrequent_access` | Uncompressed data written directly or moved from SSD to infrequent access |

## Notes

- Movement is based only on the cell timestamp, not read frequency; it happens in the background during compaction (on average a week) and is bidirectional.
- Backups: a backup taken before tiering was enabled restores as a non-tiered table; a backup of a tiered table restores as tiered.
- Costs: infrequent access storage has its own rate; moving data from SSD (or writing directly) is charged at the table compaction rate; configuring tiered storage and moving data back to SSD are free. Frequent movement between SSD and infrequent access can incur costs and slow compaction. Disabling tiered storage bills all data as SSD; set the age threshold above your oldest data first and disable after compaction to avoid SSD charges while data is still in infrequent access. Storage billing metrics can take up to 2 hours to update.
- The source contains no code samples; the fenced block quotes the rolling window example verbatim from the page.
- Source: https://docs.cloud.google.com/bigtable/docs/tiered-storage (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [choosing-ssd-hdd.md](./choosing-ssd-hdd.md)
- [editions-overview.md](./editions-overview.md)
- [quotas.md](./quotas.md)
- [performance.md](./performance.md)
