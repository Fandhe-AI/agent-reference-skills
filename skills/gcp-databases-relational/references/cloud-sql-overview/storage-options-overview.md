---
source: https://docs.cloud.google.com/sql/docs/postgres/storage-options-overview
---

# Cloud SQL storage options overview (PostgreSQL)

Storage options match IOPS, throughput and cost to the workload: Hyperdisk Balanced (customizable performance; N4, C4A, C4, C4D), SSD (low-latency active data; shared core, dedicated core, N2) and HDD (archival and batch; general purpose shared/dedicated core only).

## Signature / Usage

The machine type determines the storage option: `db-perf-optimized-N-2` belongs to the `N2` series, so the storage option is `SSD` (per https://docs.cloud.google.com/sql/docs/postgres/machine-series-overview). Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/create-instance (an N2 machine type set with `--tier`):

```bash
  gcloud sql instances create myinstance \
  --database-version=POSTGRES_16 \
  --tier=db-perf-optimized-N-4 \
  --edition=ENTERPRISE_PLUS \
  --region=us-central1
```

## Options / Props

### Hyperdisk Balanced: maximums by machine series (IOPS / MiB/s)

| Series | vCPUs | Min IOPS / throughput | Max (Balanced) | Max (Balanced HA) |
|--------|-------|-----------------------|----------------|-------------------|
| C4A | 2, 4 | 3,000 / 140 | 50,000 / 800 | 50,000 / 800 |
| C4A | 8 | 3,000 / 140 | 50,000 / 1,000 | 50,000 / 1,000 |
| C4A | 16 | 3,000 / 140 | 80,000 / 2,400 | 80,000 / 1,200 |
| C4A | 32 | 3,000 / 140 | 120,000 / 2,400 | 100,000 / 1,200 |
| C4A | 48, 64, 72 | 3,000 / 140 | 160,000 / 2,400 | 100,000 / 1,200 |
| C4 | 2, 4 | 3,000 / 140 | 50,000 / 400 | 50,000 / 400 |
| C4 | 8 | 3,000 / 140 | 50,000 / 800 | 50,000 / 800 |
| C4D | 2 | 3,000 / 140 | 22,500 / 400 | 22,500 / 400 |
| C4D | 4 | 3,000 / 140 | 50,000 / 400 | 50,000 / 400 |
| C4D | 8 | 3,000 / 140 | 50,000 / 800 | 50,000 / 800 |
| C4D | 16 | 3,000 / 140 | 75,000 / 1,200 | 75,000 / 1,200 |
| C4D | 32, 48 | 3,000 / 140 | 75,000 / 1,600 | 75,000 / 1,600 |
| C4D | 64, 96, 192 | 3,000 / 140 | 160,000 / 2,400 | 100,000 / 2,400 |
| N4 | 0-7 | 3,000 / 140 | 15,000 / 240 | 15,000 / 240 |
| N4 | 8-15 | 3,000 / 140 | 15,000 / 480 | 15,000 / 480 |
| N4 | 16-31 | 3,000 / 140 | 80,000 / 1,200 | 80,000 / 1,200 |
| N4 | 32-47 | 3,000 / 140 | 100,000 / 1,600 | 100,000 / 1,200 |
| N4 | 48+ | 3,000 / 140 | 160,000 / 2,400 | 100,000 / 1,200 |

For N4, read and write IOPS and throughput are combined.

### Hyperdisk Balanced: default IOPS / throughput by disk size (C4A, C4, C4D, N4)

| Disk size | Default IOPS | Default throughput (MiB/s) |
|-----------|--------------|----------------------------|
| 20 - 256 GB | 4,000 | 170 |
| 257 - 512 GB | 7,000 | 240 |
| 513 GB - 1 TB | 10,000 | 500 |
| 1 - 4 TB | 16,000 | 750 |
| 4 - 32 TB | 70,000 (or machine max) | 1,200 (or machine max) |
| 32 - 64 TB | 100,000 (or machine max) | 1,200 (or machine max) |

Defaults are capped at the machine type's maximum. The source's C4A and N4 tables phrase the large-size rows as "Minimum of X or maximum for machine type" (N4 also for the 513 GB-1 TB throughput and 1-4 TB IOPS rows).

### Hyperdisk Balanced custom IOPS and throughput

| Setting | Minimum | Maximum |
|---------|---------|---------|
| IOPS | 3,000 | 500 IOPS per GB capacity; 160,000 (Balanced) / 100,000 (Balanced HA) |
| Throughput | 140 MiB/s | The lesser of the cap and provisioned IOPS / 4, and never above the machine type's maximum (tables above). Cap: 2,400 MiB/s (Balanced); the source gives 1,200 MiB/s for Balanced HA, but its own C4D 32-192 vCPU rows allow 1,600-2,400 MiB/s with Balanced HA. See the Source inconsistency notes |

Limitations: capacity/disk size changes allowed twice every four hours; IOPS and throughput changes once every four hours (more frequent increases can leave storage full for extended periods and affect performance).

### SSD and HDD maximums (IOPS read/write; throughput MiB/s read/write)

| Storage | vCPUs | Zonal IOPS | Zonal throughput | Regional IOPS | Regional throughput |
|---------|-------|-----------|------------------|---------------|---------------------|
| SSD, N2 | 2, 4 | 15,000 / 15,000 | 240 / 240 | 15,000 / 15,000 | 240 / 120 |
| SSD, N2 | 8 | 15,000 / 15,000 | 800 / 800 | 15,000 / 15,000 | 800 / 400 |
| SSD, N2 | 16 | 25,000 / 25,000 | 1,200 / 1,200 | 25,000 / 25,000 | 1,200 / 600 |
| SSD, N2 | 32, 48 | 60,000 / 60,000 | 1,200 / 1,200 | 60,000 / 60,000 | 1,200 / 600 |
| SSD, N2 | 64-128 | 100,000 / 100,000 | 1,200 / 1,200 | 100,000 / 80,000 | 1,200 / 1,000 |
| SSD, general purpose | 1 | 15,000 / 15,000 | 200 / 200 | 15,000 / 15,000 | 200 / 100 |
| SSD, general purpose | 2-7 | 15,000 / 15,000 | 240 / 240 | 15,000 / 15,000 | 240 / 120 |
| SSD, general purpose | 8-15 | 15,000 / 15,000 | 800 / 800 | 15,000 / 15,000 | 800 / 400 |
| SSD, general purpose | 16-31 | 25,000 / 25,000 | 1,200 / 1,200 | 25,000 / 25,000 | 1,200 / 600 |
| SSD, general purpose | 32-63 | 60,000 / 60,000 | 1,200 / 1,200 | 60,000 / 60,000 | 1,200 / 600 |
| SSD, general purpose | 64+ | 100,000 / 100,000 | 1,200 / 1,200 | 100,000 / 80,000 | 1,200 / 1,000 |
| HDD | 1 | 1,000 / 10,000 | 200 / 200 | 1,000 / 10,000 | 200 / 100 |
| HDD | 2-7 | 3,000 / 15,000 | 240 / 240 | 3,000 / 15,000 | 240 / 120 |
| HDD | 8-15 | 5,000 / 15,000 | 800 / 400 | 5,000 / 15,000 | 800 / 200 |
| HDD | 16+ | 7,500 / 15,000 | 1,200 / 400 | 7,500 / 15,000 | 1,200 / 200 |

## Notes

- Source inconsistency: the Cloud SQL page gives the maximum throughput as "the greater of 2,400 MiB/s or the provisioned IOPS divided by 4" (1,200 MiB/s for Balanced HA). Taken literally, 160,000 IOPS would allow 40,000 MiB/s, above the per-machine limits on this page. Compute Engine gives the limit as `MIN (2,400, P/4)` MiB/s for a provisioned IOPS value `P` (Hyperdisk Balanced and Balanced HA), so the table above uses the lesser value and the machine maximum: https://docs.cloud.google.com/compute/docs/disks/hd-types/hyperdisk-balanced#provisioned-tput-limits and https://docs.cloud.google.com/compute/docs/disks/hd-types/hyperdisk-balanced-ha (retrieved 2026-11-16).
- Source inconsistency: the Cloud SQL page's custom-throughput rule caps Hyperdisk Balanced HA at 1,200 MiB/s, while its own C4D table lists 1,600 MiB/s (32, 48 vCPUs) and 2,400 MiB/s (64, 96, 192 vCPUs) as Balanced HA maximums. Compute Engine gives 2,400 MiB/s as the single-volume maximum and `MIN ((2400) MiB/s, P/4)` as the configurable maximum for Hyperdisk Balanced High Availability (https://docs.cloud.google.com/compute/docs/disks/hd-types/hyperdisk-balanced-ha, retrieved 2026-11-16). Treat the per-machine-type Balanced HA column as the limit for a given machine type.
- SSD IOPS and throughput are set by machine type and capacity and can't be configured; for N2 increase storage capacity to raise them. SSD is a Persistent Disk offering.
- HDD may suit large datasets (>10 TB) that are not latency-sensitive, batch scans/writes and archival; not recommended for real-time dashboards.
- Automatic storage increase can be enabled with Hyperdisk Balanced. Storage can be manually shrunk (see "About storage shrink" in the official docs).
- The C4A, C4, C4D tables for default values are condensed into one table; the first columns of the source's Hyperdisk tables are headed "Hyperdisk Balanced/Hyperdisk Balanced HA" for minimums.
- Source: https://docs.cloud.google.com/sql/docs/postgres/storage-options-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/machine-series-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/create-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [machine-series-overview.md](./machine-series-overview.md)
- [editions-intro.md](./editions-intro.md)
- [quotas.md](./quotas.md)
