---
source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/detach-cluster
---

# Detach your CNCF-conformant cluster

Detaching deregisters a cluster from Google Cloud fleet management and removes the associated software from the cluster. The Kubernetes cluster itself is not deleted.

## Signature / Usage

### gcloud CLI

`--ignore-errors` forces the detach even if some in-cluster resources can't be deleted. `--allow-missing` makes the delete request return success even if the cluster can't be found.

```bash
gcloud container attached clusters delete CLUSTER_NAME \
  --ignore-errors \
  --allow-missing \
  --location=GOOGLE_CLOUD_REGION
```

## Options / Props

| Placeholder / flag | Description |
| --- | --- |
| `CLUSTER_NAME` | Name of the cluster |
| `GOOGLE_CLOUD_REGION` | Region administering the cluster |
| `--ignore-errors` | Optional; detach even if some in-cluster resources can't be deleted |
| `--allow-missing` | Optional; return success when the cluster is not found |

## Notes

- Destructive: all Google Cloud resources related to the cluster (fleet membership resources, workload identity pool OIDC providers) are deleted. Try it on a disposable cluster first.
- Features not managed by GKE attached clusters, such as Config Sync and Cloud Service Mesh, must be cleaned up manually.
- Console (Preview, subject to Pre-GA Offerings Terms): GKE clusters page > cluster > View more details > Delete, then type the cluster name and Confirm.
- Source: https://docs.cloud.google.com/kubernetes-engine/multi-cloud/docs/attached/generic/how-to/detach-cluster (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [attach-cluster-generic.md](./attach-cluster-generic.md)
- [update-cluster.md](./update-cluster.md)
