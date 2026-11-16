---
source: https://docs.cloud.google.com/compute/docs/instances/committed-use-discounts-overview
---

# Committed use discounts (CUDs) overview

Committed use discounts reward 1-year or 3-year commitments, either to a minimum amount of resource usage (resource-based CUDs) or to a minimum hourly spend (compute flexible CUDs). The two kinds are mutually exclusive for any given usage and apply in a fixed order. Some spend-based CUDs automatically migrate to a new consumption model; the migration date appears on the Billing Overview page in the console.

## Signature / Usage

### Purchase a resource-based commitment

```bash
gcloud compute commitments create commitment-1 --plan=12-month \
    --resources=memory=9GB,vcpu=4 --region=us-central1
```

## Options / Props

### Resource-based vs compute flexible

| | Resource-based CUDs | Compute flexible CUDs |
|---|---|---|
| Commit to | Minimum Compute Engine resources in a region | Minimum hourly spend, per Cloud Billing account |
| Services | Compute Engine SKUs (including instances used by GKE, Managed Service for Apache Spark, Managed Service for Apache Airflow 1, Vertex AI) | Compute Engine, GKE, Cloud Run |
| Scope | Region and project; with CUD sharing, all projects in the billing account. New billing accounts created on or after June 16, 2026 have sharing enabled by default | Whole Cloud Billing account, any project or region |
| Cancel | Not after purchase | Not after purchase |

### Resource-based commitments

- Eligible resources: vCPUs, memory, GPUs, Local SSD disks, sole-tenant nodes, OS licenses, block storage capacity (Exapool capacity only; not Hyperdisk Storage Pools, individual Hyperdisk or Persistent Disk volumes).
- Categories (cannot be combined): hardware (up to 70% for memory-optimized series, up to 55% for all others), software license (up to 79% SLES, up to 63% SLES for SAP, up to 20% RHEL), block storage.
- Active the following day at 12 AM US and Canadian Pacific Time; billed monthly for the term regardless of usage.

### Compute flexible CUD eligibility

- vCPUs, memory and Local SSD disks of: General purpose C3, C3D, C4, C4A, C4D, E2, N1, N2, N2D, N4, N4D, N4A; Compute-optimized H3, H4D, C2, C2D; Network-optimized C4N, M4N; Memory-optimized M1, M2, M3, M4, M4N; Storage-optimized Z3, Z4D, Z4M; Accelerator-optimized G2, G4 (attached GPUs eligible for G2 and G4 only). Sole-tenancy premium is also eligible.
- Memory-optimized instances get a discount only with 3-year commitments; a 1-year commitment consumed on that usage gives no discount.

| Service | Spend eligible on | 1-year | 3-year |
|---|---|---|---|
| Compute Engine | vCPUs and memory of M1, M2, M3, M4 | No discounts | 63% |
| Compute Engine | vCPUs and memory of H3, H4D | 17% | 38% |
| Compute Engine | vCPUs and memory of C2, C2D, C3, C3D, C4, C4A, C4D, E2, N1, N2, N2D, N4, N4D, N4A | 28% | 46% |
| Compute Engine | vCPUs and memory of C4N, M4N | 28% | 54% |
| Compute Engine | vCPUs, memory, NVIDIA L4 GPUs of G2 | 21% | 43% |
| Compute Engine | vCPUs, memory, NVIDIA RTX PRO 6000 GPUs of G4 | 16% | 42% |
| Compute Engine | Local SSD disks on supported series | 28% | 46% |
| Compute Engine | Sole-tenancy premium | 28% | 46% |
| GKE | Standard and Autopilot | 28% | 46% |
| Cloud Run | Request-based services; Cloud Run functions | 17% | 17% |
| Cloud Run | Instance-based services, jobs, worker pools, instances | 28% | 46% |

Discounts may differ for billing accounts with other on-demand compute savings in effect.

### How compute flexible commitments work

- Hourly commitment fee is paid for the whole term. Purchase in minute 49 or earlier of an hour: active at the next hour; minute 50 or later: active at the hour after next.
- Consumption model IDs: `D97B-0795-975B` (1-year) and `70D7-D1AB-12A4` (3-year). Cost exports show `Compute Flexible CUDs - 1 Year` / `- 3 Year`, a `Commitment Fee SKU` line, and overage with consumption model `Default`.
- Utilization order: (1) service-specific commitments first; (2) oldest compute flexible commitment; (3) usage with the highest discount first within a commitment; (4) remainder in proportion to remaining eligible spend across Compute Engine, GKE, Cloud Run.
- Example (3-year, US$100/hour, 46%): covers up to US$185.19 on-demand per hour (US$100 / (1 - 0.46)); US$200 of usage costs US$100 + US$14.81 overage = US$114.81 per hour; unused commitment is not rolled over.
- Compute flexible commitments do not support attached reservations. For G2 or G4 capacity, create a standalone reservation; the commitment still applies to usage consuming it if the spend is eligible.

### Order of discount application (per hour)

1. Resource-based commitments.
2. Compute flexible commitments for remaining eligible usage.
3. On-demand rates (possibly with sustained use discounts) for the rest.

A portion of usage receives only one kind of discount.

### Limitations

- Compute flexible commitments: purchased only at the Cloud Billing account level; GPUs eligible only for G2 and G4; not applicable to Spot VMs or preemptible VMs.
- Managed Service for Apache Spark with reservations: no resource-based CUDs. Dataflow with reservations: only specifically targeted reservations that specify accelerators (GPUs or TPUs).

## Notes

- Purchases cannot be canceled and bill for the full term; review the Service Specific Terms first and try the flow on a non-production billing account if possible.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/commitments/create (gcloud 593.0.0 help). The twin itself contains no code. Purchase steps for spend-based commitments are at https://docs.cloud.google.com/docs/cuds-multiprice.
- Prices and per-series rates are not copied; see the Compute Engine pricing tables (https://docs.cloud.google.com/compute/vm-instance-pricing).
- Source inconsistency: the source lists M4N under both "Network-optimized: C4N and M4N machine series" and "Memory-optimized: M1, M2, M3, M4, and M4N machine series", and says "For memory-optimized compute instances, compute flexible CUDs are available only for 3-year commitments", while its discount table gives "vCPUs and memory of C4N and M4N machine series" a 1-year rate of 28% (3-year 54%) and lists only "M1, M2, M3, and M4" with "No discounts" for 1 year.
- Source: https://docs.cloud.google.com/compute/docs/instances/committed-use-discounts-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [reservations-overview.md](./reservations-overview.md)
- [future-reservations-overview.md](./future-reservations-overview.md)
- [spot.md](./spot.md)
