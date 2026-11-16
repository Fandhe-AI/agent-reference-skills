---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/persistent-volume-attach-limits
---

# About persistent volume attach limits on GKE nodes

How many Persistent Disk and Hyperdisk volumes can attach to a GKE node, how the Compute Engine persistent disk CSI driver (PDCSI) reports the limit to the kubelet, and how to override it per node pool with a node label.

## Signature / Usage

### Override the limit on a new node pool

Available on GKE `1.32.4-gke.1698000` and later, and `1.33.1-gke.1386000` and later. Replace `NODE_POOL_NAME`, `CLUSTER_NAME` and `VALUE`.

```bash
gcloud container node-pools create NODE_POOL_NAME \
    --cluster=CLUSTER_NAME \
    --node-labels=node-restriction.kubernetes.io/gke-volume-attach-limit-override=VALUE
```

### Override the limit on an existing node pool

```bash
gcloud container node-pools update NODE_POOL_NAME \
    --cluster=CLUSTER_NAME \
    --node-labels=node-restriction.kubernetes.io/gke-volume-attach-limit-override=VALUE
```

Then restart the `pdcsi-node` DaemonSet; the new limit applies once the `pdcsi-node` Pods are `Running`.

```bash
kubectl rollout restart ds pdcsi-node -n kube-system
```

### Verify the override

Replace `NODE_NAME` with a node from the node pool.

```bash
kubectl get node NODE_NAME --show-labels
```

```bash
kubectl describe node NODE_NAME
```

The labels output should include `node-restriction.kubernetes.io/gke-volume-attach-limit-override`; the capacity should show `attachable-volumes-gce-pd` matching the override value.

## Options / Props

| Item | Value |
| --- | --- |
| Node label | `node-restriction.kubernetes.io/gke-volume-attach-limit-override: VALUE` |
| `VALUE` | Integer between `0` and `127`. A value higher than 127 is ignored and the driver default is used. |
| Scope | One attach limit per node pool, applied to all its nodes. |
| Default, before 4th generation machines | Aggregate limit of 128 disks (127 data disks plus one boot disk) for Persistent Disk and Hyperdisk combined. |
| Default, 3rd generation (for example C3) | Fixed 128 reported to Kubernetes, which can exceed the real limit (Hyperdisk limits depend on vCPU count and type) and leave Pods `Pending`. |
| Default, 4th generation (for example C4) | Calculated from the node vCPU count; typically 8-128 persistent volumes. |

## Notes

- `node-pools update --node-labels` replaces all user-specified Kubernetes labels on the pool's nodes (gcloud help, https://docs.cloud.google.com/sdk/gcloud/reference/container/node-pools/update); include your existing labels in the value or they are dropped.
- The source's `gcloud container node-pools create` / `update` commands omit `--location`; add `--location=CONTROL_PLANE_LOCATION` unless a default `compute/region` or `compute/zone` property is set.
- If PDCSI reports a number higher than the actual limit, Pods needing volumes fail to schedule and stay `Pending`; this is the main reason to override on third generation machine types.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/persistent-volume-attach-limits (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [gce-pd-csi-driver.md](./gce-pd-csi-driver.md)
- [hyperdisk.md](./hyperdisk.md)
- [persistent-volumes.md](./persistent-volumes.md)
