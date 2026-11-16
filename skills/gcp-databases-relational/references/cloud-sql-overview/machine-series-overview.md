---
source: https://docs.cloud.google.com/sql/docs/postgres/machine-series-overview
---

# Machine series overview (Cloud SQL for PostgreSQL)

A machine series is a curated set of processor and hardware configurations. The series you choose determines the edition, storage option and location available. Each series provides machine types (for example `db-perf-optimized-N-2` in the `N2` series uses `SSD`).

## Signature / Usage

Data cache is enabled automatically for Enterprise Plus and is not supported on C4D, so add `--no-enable-data-cache` to the creation command for an Enterprise Plus instance on C4D (8 vCPUs or larger). Custom machine types are named `db-custom-N4-{CPUs}-{Memory}` (N4) and `db-custom-{CPUs}-{Memory}` (dedicated core).

Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/create-instance (an N2 Enterprise Plus machine type set with `--tier`):

```bash
  gcloud sql instances create myinstance \
  --database-version=POSTGRES_16 \
  --tier=db-perf-optimized-N-4 \
  --edition=ENTERPRISE_PLUS \
  --region=us-central1
```

## Options / Props

### Series by edition

| Edition | Series | Storage option |
|---------|--------|----------------|
| Enterprise Plus | C4A, C4, C4D | Hyperdisk Balanced |
| Enterprise Plus | N2 | SSD |
| Enterprise | N4 | Hyperdisk Balanced |
| Enterprise | General purpose shared core / dedicated core | SSD or HDD |

- N2: x86, balanced price-performance, 1 vCPU:8 GB. C4A: ARM (Google Axion, Arm Neoverse V2); instance must be PostgreSQL 13 or later (version 12 not supported). C4: x86. C4D: x86, 5th Gen AMD EPYC (Turin) and Titanium; data cache not supported. N4: Intel Emerald Rapids, 1 vCPU:8 GB.

### N2 machine types (SSD)

| Machine type | vCPUs | Memory (GB) | Optional Data Cache (GB) |
|--------------|-------|-------------|--------------------------|
| `db-perf-optimized-N-2` | 2 | 16 | 375 |
| `db-perf-optimized-N-4` | 4 | 32 | 375 |
| `db-perf-optimized-N-8` | 8 | 64 | 375 |
| `db-perf-optimized-N-16` | 16 | 128 | 750 |
| `db-perf-optimized-N-32` | 32 | 256 | 1,500 |
| `db-perf-optimized-N-48` | 48 | 384 | 3,000 |
| `db-perf-optimized-N-64` | 64 | 512 | 6,000 |
| `db-perf-optimized-N-80` | 80 | 640 | 6,000 |
| `db-perf-optimized-N-96` | 96 | 768 | 6,000 |
| `db-perf-optimized-N-128` | 128 | 864 | 9,000 |

### C4A machine types

| Machine type | vCPUs | Memory (GB) | Optional Data Cache (GB) |
|--------------|-------|-------------|--------------------------|
| `db-c4a-highmem-2` | 2 | 16 | Not available |
| `db-c4a-highmem-4` | 4 | 32 | 375 |
| `db-c4a-highmem-8` | 8 | 64 | 750 |
| `db-c4a-highmem-16` | 16 | 128 | 1,500 |
| `db-c4a-highmem-32` | 32 | 256 | 2,250 |
| `db-c4a-highmem-48` | 48 | 384 | 3,750 |
| `db-c4a-highmem-64` | 64 | 512 | 5,250 |
| `db-c4a-highmem-72` | 72 | 576 | 6,000 |

### C4 and C4D machine types

| Machine type | vCPUs | Memory (GB) |
|--------------|-------|-------------|
| `db-perf-optimized-C4-2` / `-4` / `-8` | 2 / 4 / 8 | 15 / 31 / 62 |
| `db-perf-optimized-C4D-2` | 2 | 15 |
| `db-perf-optimized-C4D-4` | 4 | 31 |
| `db-perf-optimized-C4D-8` | 8 | 63 |
| `db-perf-optimized-C4D-16` | 16 | 126 |
| `db-perf-optimized-C4D-32` | 32 | 252 |
| `db-perf-optimized-C4D-48` | 48 | 378 |
| `db-perf-optimized-C4D-64` | 64 | 504 |
| `db-perf-optimized-C4D-96` | 96 | 756 |
| `db-perf-optimized-C4D-192` | 192 | 1,512 |

### Enterprise edition series

| Series | Machine types and rules |
|--------|-------------------------|
| N4 (`db-custom-N4-{CPUs}-{Memory}`) | vCPUs 2 to 80 in increments of 2; memory 2 GB to 640 GB, min 2 GB per vCPU, max 8 GB per vCPU (e.g. `db-custom-N4-2-*`: 4 to 16 GB) |
| Shared core | `db-f1-micro` (1 vCPU, 0.614 GB), `db-g1-small` (1 vCPU, 1.7 GB); SSD or HDD |
| Dedicated core (`db-custom-{CPUs}-{Memory}`) | vCPUs 1 or an even number 2 to 96 (up to 80 in select regions); memory 0.9 to 6.5 GB per vCPU, multiple of 256 MB, at least 3.75 GB (3840 MB) |

## Notes

- Availability depends on edition, region and database version; see the region availability overview in the official docs.
- Source inconsistency: N4 maximum memory is 640 GB here and 624 GB in https://docs.cloud.google.com/sql/docs/postgres/editions-intro.
- Source: https://docs.cloud.google.com/sql/docs/postgres/machine-series-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/create-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [editions-intro.md](./editions-intro.md)
- [storage-options-overview.md](./storage-options-overview.md)
