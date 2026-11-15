---
source: https://docs.cloud.google.com/managed-lustre/docs/overview
---

# Managed Lustre overview

Google Cloud Managed Lustre is a fully managed parallel file system optimized for AI and HPC applications, with multi-petabyte capacity and up to 10 TBps throughput, developed in collaboration with DDN.

## Signature / Usage

Inspect an existing instance; the creation status is the value of `state` (see the create-instance page for the create command):

```bash
gcloud lustre instances describe INSTANCE_NAME \
  --location=ZONE
```

Snippet taken from https://docs.cloud.google.com/managed-lustre/docs/create-instance (the overview twin has no code).

## Options / Props

| Metric | Result |
|---|---|
| Storage capacity | From 9,000 GiB up to 84,016,000 GiB (80.1 PiB) |
| Throughput | Up to 10 TBps |
| IOPS | Up to 5,800 read IOPS per TiB; up to 5,600 write IOPS per TiB |
| Metadata performance | Per 72 GBps of throughput, up to: 410,000 stats per second, 115,000 creates per second, 95,000 deletes per second. Up to a maximum of 22 times the base value. |
| Maximum file size | 0.5 PiB |

## Notes

- Highlights: POSIX compliance; integrated with Compute Engine and GKE; high-speed on-demand transfers to and from Cloud Storage and automated synchronization from Cloud Storage with a Cloud Storage mirror (https://docs.cloud.google.com/managed-lustre/docs/storage-mirror).
- Use cases: HPC, machine learning (training and inference datasets), automated training data synchronization.
- Data protection: all data is encrypted at rest. The Lustre protocol itself does not encrypt client-server traffic, but all in-transit data to and within Google Cloud is encrypted, including transfers between Managed Lustre and Cloud Storage.
- Performance tiers: https://docs.cloud.google.com/managed-lustre/docs/performance-tiers. Pricing: https://cloud.google.com/products/managed-lustre/pricing.
- Managed Lustre is a POSIX file system, not an object API. It is distinct from Cloud Storage objects, Cloudflare R2 (`cloudflare-storage`) and Supabase Storage (`supabase`). GPU/ML compute stacks are in `nvidia-cuda`, not here.
- Source: https://docs.cloud.google.com/managed-lustre/docs/overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/managed-lustre/docs/create-instance (borrowed snippet)

## Related

- [managed-lustre-create-instance.md](./managed-lustre-create-instance.md)
- [managed-lustre-quotas.md](./managed-lustre-quotas.md)
- [managed-lustre-connect-from-compute-engine.md](./managed-lustre-connect-from-compute-engine.md)
