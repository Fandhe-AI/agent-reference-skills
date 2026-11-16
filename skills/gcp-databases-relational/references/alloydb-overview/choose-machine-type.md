---
source: https://docs.cloud.google.com/alloydb/docs/choose-machine-type
---

# Choose an AlloyDB machine type

AlloyDB offers the N2, C4A, C4 and Z3 machine series. Primary and read pool instances can use different series, and each can be scaled independently. This page lists series, machine types, regional availability and capacity-planning practices.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/alloydb/docs/instance-primary-create:

```bash
gcloud alloydb instances create INSTANCE_ID \
    --instance-type=PRIMARY \
    --availability-type=AVAILABILITY \
    --region=REGION_ID \
    --cluster=CLUSTER_ID \
    --cpu-count=CPU_COUNT \
    --machine-type=MACHINE_TYPE \
    --project=PROJECT_ID
```

## Options / Props

### Machine series

| Machine series | Core platform and CPU | Primary workload focus | Key differentiator |
|---|---|---|---|
| N2 | 3rd Generation Intel x86 (Ice Lake) | Legacy, general purpose | Available in all regions. |
| C4A | Google Axion ARM | Price performance, high throughput | Best transaction throughput for cache-fitting workloads. |
| C4 | 6th generation Intel x86 (Granite Rapids) with Titanium SSD | Low latency or very large databases | Largest machine options with local SSDs for the fastest cache. |
| Z3 | 4th generation Intel x86 (Sapphire Rapids) with Titanium SSD | Large working dataset, storage intensive | More cached data per vCPU; storage-dense, I/O-intensive. |

### Machine types

| Series | Machine type | vCPUs | Memory (GB) |
|---|---|---|---|
| N2 | `n2-highmem-2` | 2 | 16 |
| N2 | `n2-highmem-4` | 4 | 32 |
| N2 | `n2-highmem-8` | 8 | 64 |
| N2 | `n2-highmem-16` | 16 | 128 |
| N2 | `n2-highmem-32` | 32 | 256 |
| N2 | `n2-highmem-64` | 64 | 512 |
| N2 | `n2-highmem-96` | 96 | 768 |
| N2 | `n2-highmem-128` | 128 | 864 |
| C4A | `c4a-highmem-1` | 1 | 8 |
| C4A | `c4a-highmem-2-lssd` | 2 | 16 |
| C4A | `c4a-highmem-4-lssd` | 4 | 32 |
| C4A | `c4a-highmem-8-lssd` | 8 | 64 |
| C4A | `c4a-highmem-16-lssd` | 16 | 128 |
| C4A | `c4a-highmem-32-lssd` | 32 | 256 |
| C4A | `c4a-highmem-48-lssd` | 48 | 384 |
| C4A | `c4a-highmem-64-lssd` | 64 | 512 |
| C4A | `c4a-highmem-72-lssd` | 72 | 576 |
| C4 | `c4-highmem-4-lssd` | 4 | 32 |
| C4 | `c4-highmem-8-lssd` | 8 | 64 |
| C4 | `c4-highmem-16-lssd` | 16 | 128 |
| C4 | `c4-highmem-24-lssd` | 24 | 192 |
| C4 | `c4-highmem-32-lssd` | 32 | 256 |
| C4 | `c4-highmem-48-lssd` | 48 | 384 |
| C4 | `c4-highmem-96-lssd` | 96 | 768 |
| C4 | `c4-highmem-144-lssd` | 144 | 1152 |
| C4 | `c4-highmem-192-lssd` | 192 | 1536 |
| C4 | `c4-highmem-288-lssd` | 288 | 2304 |
| Z3 standard-lssd | `z3-highmem-14-standard-lssd` | 14 | 112 |
| Z3 standard-lssd | `z3-highmem-22-standard-lssd` | 22 | 176 |
| Z3 standard-lssd | `z3-highmem-44-standard-lssd` | 44 | 352 |
| Z3 standard-lssd | `z3-highmem-88-standard-lssd` | 88 | 704 |
| Z3 high-lssd | `z3-highmem-8-high-lssd` | 8 | 64 |
| Z3 high-lssd | `z3-highmem-16-high-lssd` | 16 | 128 |
| Z3 high-lssd | `z3-highmem-22-high-lssd` | 22 | 176 |
| Z3 high-lssd | `z3-highmem-32-high-lssd` | 32 | 256 |
| Z3 high-lssd | `z3-highmem-44-high-lssd` | 44 | 352 |

### Regional availability

A series launches in a region only if the underlying Compute Engine platform is available in all three zones of that region (AlloyDB requires HA). N2 is in every region listed below. Regions with additional series:

| Region | C4A | C4 | Z3 |
|---|---|---|---|
| `asia-east1` | yes | yes | -- |
| `asia-northeast1` | -- | yes | yes |
| `asia-northeast3` | -- | yes | -- |
| `asia-south2` | -- | yes | -- |
| `asia-southeast1` | yes | yes | yes |
| `europe-west1` | yes | yes | yes |
| `europe-west2` | yes | yes | yes |
| `europe-west3` | yes | -- | yes |
| `europe-west4` | yes | yes | yes |
| `northamerica-northeast2` | -- | yes | -- |
| `northamerica-south1` | -- | yes | yes |
| `us-central1` | yes | -- | yes |
| `us-east1` | yes | -- | yes |
| `us-east4` | yes | yes | yes |
| `us-east5` | -- | yes | yes |
| `us-south1` | -- | -- | yes |
| `us-west1` | -- | yes | yes |
| `us-west3` | -- | yes | -- |
| `us-west4` | -- | yes | -- |

All other N2 regions (`africa-south1`, `asia-east2`, `asia-northeast2`, `asia-south1`, `asia-southeast2`, `asia-southeast3`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-southwest1`, `europe-north1`, `europe-north2`, `europe-west6`, `europe-west8`, `europe-west9`, `europe-west10`, `europe-west12`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `southamerica-east1`, `southamerica-west1`, `us-east7`, `us-west2`) have N2 only.

## Notes

- Cross-machine-series: for example a primary on N2 and read pools on C4, C4A or Z3. In an HA cluster the standby automatically uses the primary's series and type.
- Primary vertical scaling: resize within a series (N2 8 vCPUs to N2 16 vCPUs) or change series (N2 16 vCPUs to C4A 32 vCPUs).
- Read pool horizontal scaling: all nodes in one read pool must use the same series and type; a new node cannot use a different series. To serve reads from several series at once, deploy separate read pool instances.
- Caution: changing a read pool's machine series replaces its nodes (new nodes are provisioned, traffic is routed to them, the read pool IP stays unchanged, the originals are deleted). This needs slight downtime and momentarily interrupts active client connections.
- Source inconsistency: the regional table in the source has a malformed `asia-northeast2` row (three cells, no Z3 value) and the first header row is duplicated; that row is treated here as N2 only. Verify against the official page.
- Source inconsistency: this page spells the Z3 types `z3-highmem-N-standard-lssd` and `z3-highmem-N-high-lssd`, but gcloud 593.0.0 `--machine-type` spells them `z3-highmem-N-standardlssd` and `z3-highmem-N-highlssd` (no hyphen before `lssd`; `gcloud alloydb instances create --help`); use that form with gcloud. The read pool creation page also uses `z3-highmem-14-standardlssd`.
- Source inconsistency: this page lists `us-east7` as an N2 region, which the AlloyDB locations page does not list.
- Capacity planning: an operation can fail when a region or zone lacks hardware for a series even with quota remaining. Evaluate several series (each draws from distinct hardware pools), change a read pool's machine type without touching the primary, spread reads over several read pools, and consider another region (cross-region traffic adds latency and inter-region transfer charges). With cross-region replication, check the secondary has enough vCPU and memory before promote or switchover.
- Retry failed create / start / scale requests with exponential backoff; retry interrupted maintenance via self-service maintenance.
- Scale during off-peak hours and use schedule-based read pool autoscaling ahead of predictable peaks. Compute Engine reservations do not apply to AlloyDB, and zones cannot be pinned for HA clusters (AlloyDB selects zones in the region).
- Source: https://docs.cloud.google.com/alloydb/docs/choose-machine-type (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [instance-primary-create.md](./instance-primary-create.md)
- [instance-read-pool-create.md](./instance-read-pool-create.md)
- [quotas.md](./quotas.md)
- [locations.md](./locations.md)
