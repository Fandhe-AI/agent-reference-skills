---
source: https://docs.cloud.google.com/cluster-director/docs/quotas
---

# Quotas and limits for Cluster Director

API, compute, storage and networking quotas needed to create and manage clusters. Insufficient quota causes deployment and scaling errors. Quotas generally apply per project. Request changes with Cloud Quotas (see https://docs.cloud.google.com/docs/quotas/help/request_increase).

## Signature / Usage

### List clusters in a location

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/cluster-director/clusters/list (gcloud 593.0.0 help):

```bash
gcloud cluster-director clusters list --location=us-central1-a
```

## Options / Props

### Cluster Director API quotas

| Quota name | Description |
|---|---|
| Cluster Director clusters per region | Total active clusters per project and region. |
| Create requests per minute per region | Rate of `clusters.create` requests. |
| Delete requests per minute per region | Rate of `clusters.delete` requests. |
| Get requests per minute per region | Rate of `clusters.get` requests. |
| List requests per minute per region | Rate of `clusters.list` requests. |
| Update requests per minute per region | Rate of `clusters.patch` requests. |

### Underlying service quotas

| Service | Needed for | Reference |
|---|---|---|
| Compute Engine | Instances and attached GPUs, TPUs (Preview), Local SSD; includes regional quota. TPU VMs in Cluster Director consume Compute Engine API (`compute.googleapis.com`) quotas, not Cloud TPU API (`tpu.googleapis.com`) quotas. | https://docs.cloud.google.com/compute/quotas-limits |
| Filestore or Managed Lustre | Shared `/home` for Slurm clusters. Managed Lustre Dynamic tier: allocate `dynamic_tier_capacity` quota for an existing VPC network. | https://docs.cloud.google.com/filestore/docs/limits, https://docs.cloud.google.com/managed-lustre/docs/quotas |
| Networking | VPC networks, subnets, external IP addresses, firewall rules | https://docs.cloud.google.com/vpc/docs/quota |
| Cloud Storage (optional) | Buckets as storage service | https://docs.cloud.google.com/storage/quotas |
| Hyperdisk pools (optional) | Compute Engine storage pool quota for boot disks of compute and login nodesets | https://docs.cloud.google.com/compute/docs/disks/storage-pools#hdsp-limits |

## Notes

- With future reservations for capacity blocks or in calendar mode you do not need to request quota (see https://docs.cloud.google.com/cluster-director/docs/obtain-capacity). Flex-start and Spot are charged against preemptible quota, on-demand against standard quota; see [choose-consumption-option.md](./choose-consumption-option.md).
- Cluster Director's REST method pages are at `https://docs.cloud.google.com/cluster-director/docs/reference/rest/v1/projects.locations.clusters/create` (and `/delete`, `/get`, `/list`, `/patch`).
- VPC networks and Cloud Storage quotas themselves are in the planned `gcp-networking` and in `gcp-storage`.
- The source page shows no commands; the snippet is borrowed from https://docs.cloud.google.com/sdk/gcloud/reference/cluster-director/clusters/list (gcloud 593.0.0 help).
- Source inconsistency: the gcloud 593.0.0 `clusters create` examples (and compute.md, networking.md, storage.md) use `--location=us-central1`, while the `clusters list`, `describe`, `update` and `delete` examples use `--location=us-central1-a` ("To list all clusters in particular location us-central1-a"). The help gives the cluster resource format `projects/{project}/locations/{locations}/clusters/{cluster}`, so pass the location the cluster was created in.
- Source (`--location` in the cluster examples): `gcloud cluster-director clusters create --help`, `gcloud cluster-director clusters list --help`, `gcloud cluster-director clusters describe --help`, `gcloud cluster-director clusters update --help`, `gcloud cluster-director clusters delete --help` (gcloud 593.0.0, retrieved 2026-11-14)
- Source (compared pages): https://docs.cloud.google.com/cluster-director/docs/compute (compute.md), https://docs.cloud.google.com/cluster-director/docs/networking (networking.md), https://docs.cloud.google.com/cluster-director/docs/storage (storage.md) (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/cluster-director/docs/quotas (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [choose-consumption-option.md](./choose-consumption-option.md)
- [storage.md](./storage.md)
- [networking.md](./networking.md)
