---
source: https://docs.cloud.google.com/parallelstore/docs/overview
---

# Parallelstore overview

Parallelstore is a fully managed, low-latency distributed file system for HPC and data-intensive applications where multiple clients need concurrent access to shared files. It is POSIX-compatible and can be mounted on Compute Engine VMs or GKE (via the Parallelstore CSI driver).

## Signature / Usage

Create an instance with the REST API (request template from the source; field types are placeholders, not a runnable JSON body):

```text
POST https://parallelstore.googleapis.com/v1beta/projects/PROJECT_ID/locations/ZONE/instances?instanceId=INSTANCE_NAME
Authorization: Bearer AUTH_TOKEN
{
  "capacityGib": string,
  "network": string,
  "fileStripeLevel": enum (FileStripeLevel),
  "directoryStripeLevel": enum (DirectoryStripeLevel)
}
```

Snippet taken from https://docs.cloud.google.com/parallelstore/docs/create-instance (the overview twin has no code).

## Options / Props

| Metric | Result |
|---|---|
| Write throughput | 0.5 GiBps per TiB |
| Read throughput | 1.15 GiBps per TiB |
| Read IOPS | 30k IOPS per TiB |
| Write IOPS | 10k IOPS per TiB |
| 4K read latency | 0.3 ms |
| Client processes supported | 4000 |
| Transfer speed (Parallelstore to/from Cloud Storage) | Max 20 GiBps or 5000 files per second |
| Mean time to data loss (MTTDL) | 100 TiB: 2 months; 48 TiB: 4 months; 12 TiB: 16 months |

Usable capacity: 12 TiB to 100 TiB.

## Notes

- Availability: "Parallelstore is available by invitation only. If you'd like to request access to Parallelstore in your Google Cloud project, contact your sales representative." The twin makes no deprecation or end-of-sale statement.
- Parallelstore is a "scratch" file system backed by local SSD with 2+1 erasure coding; MTTDL ranges from 2 to 16 months depending on capacity. Do not use it as the only copy of data.
- Numbers were measured with 256 client connections to a single instance; latency from a single client; striping settings optimized for each metric.
- Batch data transfers to and from Cloud Storage are available from the command line and REST API (https://docs.cloud.google.com/parallelstore/docs/transfer-data); gcloud 593.0.0 has no `parallelstore` command group (see below).
- Pricing: https://cloud.google.com/parallelstore/pricing. Locations: https://docs.cloud.google.com/parallelstore/docs/locations.
- gcloud 593.0.0 has no `parallelstore` command group; the source's `gcloud beta parallelstore ...` commands do not run with this version — use the Console or the Parallelstore REST API (https://docs.cloud.google.com/parallelstore/docs/reference/rest/v1beta/projects.locations.instances#Instance).
- POSIX file storage, not an object API; distinct from Cloud Storage, Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`).
- Source: https://docs.cloud.google.com/parallelstore/docs/overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/parallelstore/docs/create-instance (borrowed snippet)

## Related

- [parallelstore-create-instance.md](./parallelstore-create-instance.md)
- [parallelstore-connect-from-compute-engine.md](./parallelstore-connect-from-compute-engine.md)
- [managed-lustre-overview.md](./managed-lustre-overview.md)
