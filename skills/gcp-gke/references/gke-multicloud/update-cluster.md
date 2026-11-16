---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/update-cluster
---

# Update your CNCF-conformant cluster

Updating means changing attributes or the platform version associated with GKE attached clusters. It does not change the Kubernetes version of the cluster or attributes unrelated to GKE attached clusters. Use the gcloud CLI or the console.

## Signature / Usage

### gcloud CLI

```sh
gcloud container attached clusters update CLUSTER_NAME \
  --location GOOGLE_CLOUD_REGION
```

Add `--platform-version` to upgrade the GKE attached clusters software, for example from 1.28.0-gke.1 to 1.28.0-gke.3, or from 1.28.x to 1.29.y.

## Options / Props

| Placeholder | Description |
| --- | --- |
| `CLUSTER_NAME` | Name of the cluster |
| `GOOGLE_CLOUD_REGION` | Google Cloud region administering the cluster |

## Notes

- `update` cannot upgrade a cluster attached with the previous generation of GKE attached clusters (older, unmanaged software, no longer receives features, fixes or support). Migrate with https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/migrate-cluster
- Platform version minor must equal or be one below the cluster's Kubernetes minor version (Kubernetes v1.22.\* can use 1.21.\* or 1.22.\*), so you can upgrade Kubernetes first.
- Console: GKE clusters page > cluster > View more details > Details tab; Edit basics, or "Upgrade available" next to Platform version. Upgrading the platform version does not change the Kubernetes version.
- Other `update` flags are documented at https://docs.cloud.google.com/sdk/gcloud/reference/container/attached/clusters/update
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/update-cluster (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [attach-cluster-generic.md](./attach-cluster-generic.md)
- [detach-cluster.md](./detach-cluster.md)
