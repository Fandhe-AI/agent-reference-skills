---
source: https://docs.cloud.google.com/filestore/docs/service-tiers
---

# Filestore service tiers

Filestore tiers vary in capacity, performance and features: Zonal, Regional, Multishares for GKE (Enterprise), plus legacy Basic HDD and Basic SSD.

## Signature / Usage

Select a tier with `--tier` when creating an instance (tier cannot change later). Regional example with custom performance:

```bash
gcloud filestore instances create render1 \
  --project=myproject \
  --region=us-central1 \
  --tier=REGIONAL \
  --performance=max-iops-per-tb=17000 \
  --network=name="default",reserved-ip-range="10.0.7.0/29" \
  --flags-file=nfs-export-options.json
```

## Options / Props

| Service tier | Provisionable capacity | Scalability | Performance | Availability | Protocol | Data protection |
|---|---|---|---|---|---|---|
| Zonal | 1 TiB to 9.75 TiB | Up or down in 256 GiB units | Configurable | Zonal | NFSv3, NFSv4.1 | Backups, Snapshots, Replication |
| Zonal | 10 TiB to 100 TiB | Up or down in 2.5 TiB units | Configurable | Zonal | NFSv3, NFSv4.1 | Backups, Snapshots, Replication |
| Regional | 100 GiB to 10,239 GiB | Up or down in 1 GiB units | Configurable | Regional | NFSv3, NFSv4.1 | Backups, Snapshots, Replication |
| Regional | 10 TiB to 100 TiB | Up or down in 2.5 TiB units | Configurable | Regional | NFSv3, NFSv4.1 | Backups, Snapshots, Replication |
| Multishares for GKE (Enterprise) | 1 TiB to 10 TiB | Up or down in 256 GiB units | Scales with capacity | Regional | NFSv3, NFSv4.1 | Backups, Snapshots, Replication |
| Basic HDD (on GKE) | 100 GiB to 63.9 TiB | Up only in 1 GiB units | Standard fixed | Zonal | NFSv3 | Backups |
| Basic HDD | 1 TiB to 63.9 TiB | Up only in 1 GiB units | Standard fixed | Zonal | NFSv3 | Backups |
| Basic SSD | 2.5 TiB to 63.9 TiB | Up only in 1 GiB units | Premium fixed | Zonal | NFSv3 | Backups |

Regional capacity ranges:

| Capacity range | Specifications |
|---|---|
| Lower | 100 GiB to 10,239 GiB (about 0.097 TiB to 9.99 TiB); capacity increment 1 GiB; IOPS increment 100 |
| Higher | 10 TiB to 100 TiB; capacity increment 2.5 TiB; IOPS increment 1,000 |

Below 1024 GiB you must use custom performance: fixed IOPS not lower than 2,000, or an IOPS per TiB ratio between 4,000 and 17,000 with calculated IOPS not lower than 2,000.

## Notes

- Zonal: optimized for HPC, batch compute, media rendering. Regional: continuous availability and regional resilience. Multishares for GKE (Enterprise): GKE workloads needing high availability and multiple shares. Basic tiers are legacy (automation backward compatibility or specific cost/performance needs).
- Source inconsistency: the service-tiers page's tier table lists "Backups, Snapshots, Replication" as data protection for "Multishares for GKE (Enterprise)", while the backups page says Filestore multishares for GKE are not supported for standard or enhanced backups and the snapshots page says Enterprise snapshots cannot be combined with Filestore multishares. The tier name makes it ambiguous whether the table row means the Enterprise tier or the multishares feature.
- Basic HDD on GKE means basic HDD instances with minimum 100 GiB provisioned with the Filestore CSI driver; those below 1 TiB consume 1 TiB of quota.
- Project capacity and instance quota depend on region and tier; check the Quotas & Limits page in the console. Pricing: https://cloud.google.com/filestore/pricing
- Filestore is managed NFS file storage, not an object API (distinct from Cloud Storage and Cloud Storage FUSE).
- Source: https://docs.cloud.google.com/filestore/docs/service-tiers (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/filestore/docs/creating-instances.

## Related

- [overview.md](./overview.md)
- [creating-instances.md](./creating-instances.md)
- [limits.md](./limits.md)
