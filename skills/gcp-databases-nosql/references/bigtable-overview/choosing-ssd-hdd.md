---
source: https://docs.cloud.google.com/bigtable/docs/choosing-ssd-hdd
---

# Choose between SSD and HDD storage

When creating an instance you choose SSD or HDD for its clusters. SSD is the most efficient and cost-effective choice for most use cases; HDD is sometimes appropriate for large, latency-insensitive or infrequently accessed datasets. The choice is permanent.

## Signature / Usage

### Switch storage type with backups

The storage type of an instance cannot be changed (not via the Google Cloud console either). To move a table to the other storage type, use backups:

```text
1. Create or plan to use an instance that uses the storage type you want.
2. Create a backup of the table.
3. Restore from the backup to a new table in the other instance.
```

## Options / Props

### Enterprise edition

| Storage tier | Node capacity | Expected latency | Operations |
|--------------|---------------|------------------|------------|
| SSD instance | 5 TB SSD | Write/read: single-digit ms | Write, read, update, delete |
| SSD, tiered storage enabled | 32 TB (up to 5 TB SSD) | SSD write/read: single-digit ms | Write, read, update, delete |
| SSD, tiered storage enabled | 32 TB (up to 5 TB SSD) | Infrequent access: low double-digit ms | Read-only |
| HDD instance | 16 TB | Write: single-digit ms; read: low double-digit ms | Write, read, update, delete |

### Enterprise Plus edition

Same as Enterprise except tiered storage node capacity is 64 TB (up to 5 TB SSD).

## Notes

- HDD supports only 5% of the read rows per second of SSD (individual row reads are slow due to seek time); large multi-row scans are less affected. HDD throughput is limited: it is possible to reach maximum throughput before CPU reaches 100% (monitor the disk load metric).
- Reads from the infrequent access tier have lower throughput limits than HDD.
- The in-memory tier (Preview) requires SSD and the Enterprise Plus edition. Tiered storage (Preview) requires SSD.
- HDD suits workloads that meet all of: write-heavy and data-driven, latency-insensitive, not user-facing, batch scans/writes with occasional point reads, no plan for 2x node scaling, and (Enterprise Plus) Data Boost for HDD.
- SSD may need more nodes based on stored data (5 TB per node limit), though those nodes are often needed for traffic anyway.
- The source contains no code samples; the fenced block reproduces the backup-based switching steps verbatim.
- Source: https://docs.cloud.google.com/bigtable/docs/choosing-ssd-hdd (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [tiered-storage.md](./tiered-storage.md)
- [performance.md](./performance.md)
- [quotas.md](./quotas.md)
- [instances-clusters-nodes.md](./instances-clusters-nodes.md)
