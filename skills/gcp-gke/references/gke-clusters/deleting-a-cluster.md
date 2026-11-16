---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/deleting-a-cluster
---

# Delete a cluster

How to delete a GKE cluster and what GKE removes or retains when you do.

## Signature / Usage

```bash
gcloud container clusters delete CLUSTER_NAME
```

Replace `CLUSTER_NAME` with the name of the cluster to delete.

## Options / Props

| Resource | On cluster deletion |
|----------|---------------------|
| Control plane resources | Deleted |
| All node instances and Pods on them | Deleted |
| Firewalls and routes created by GKE at cluster creation | Deleted |
| Data in `hostPath` and `emptyDir` volumes | Deleted |
| Fleet membership | Deleted if registered to a fleet, unless registered with a legacy command |
| Load balancer resources | GKE attempts to delete them; for clusters with hundreds of Services or more, some may remain |
| Persistent disk volumes | Retained |

## Notes

- Destructive: deleting a cluster cannot be undone. Try it on a disposable cluster first.
- Delete `type: LoadBalancer` Services before deleting the cluster, as the source recommends.
- Console: Actions > Delete next to the cluster, confirm; multiple clusters can be selected and deleted together.
- To block deletion of critical clusters see the IAM deny policy in [managing-clusters.md](./managing-clusters.md).
- Persistent storage handling is covered at https://docs.cloud.google.com/kubernetes-engine/docs/concepts/persistent-volumes#persistent-storage-cluster-deletion
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/deleting-a-cluster (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [managing-clusters.md](./managing-clusters.md)
- Reference: https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/delete
