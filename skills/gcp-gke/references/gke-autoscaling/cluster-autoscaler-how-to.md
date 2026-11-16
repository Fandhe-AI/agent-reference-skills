---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/cluster-autoscaler
---

# Autoscaling a cluster

How to enable, verify, and disable the GKE cluster autoscaler on Standard clusters, and how to keep Pods off selected nodes with startup and status taints. Autopilot clusters scale automatically.

## Signature / Usage

### Create a cluster with autoscaling

```bash
gcloud container clusters create CLUSTER_NAME \
    --enable-autoscaling \
    --num-nodes NUM_NODES \
    --min-nodes MIN_NODES \
    --max-nodes MAX_NODES \
    --location=CONTROL_PLANE_LOCATION
```

```bash
gcloud container clusters create my-cluster --enable-autoscaling \
    --num-nodes=30 \
    --min-nodes=15 --max-nodes=50 \
    --location=us-central1
```

```bash
gcloud container clusters create my-cluster --enable-autoscaling \
    --num-nodes 10 \
    --location us-central1 \
    --total-min-nodes 10  --total-max-nodes 60
```

### Add a node pool with autoscaling

```bash
gcloud container node-pools create POOL_NAME \
    --cluster=CLUSTER_NAME \
    --enable-autoscaling \
    --min-nodes=MIN_NODES \
    --max-nodes=MAX_NODES \
    --location=CONTROL_PLANE_LOCATION
```

```bash
gcloud container node-pools create my-node-pool \
    --cluster my-cluster \
    --enable-autoscaling \
    --min-nodes 1 --max-nodes 5 \
    --location us-central1-c
```

### Enable autoscaling on an existing node pool

```bash
gcloud container clusters update CLUSTER_NAME \
    --enable-autoscaling \
    --node-pool=POOL_NAME \
    --min-nodes=MIN_NODES \
    --max-nodes=MAX_NODES \
    --location=CONTROL_PLANE_LOCATION
```

Verify:

Adapted (not in the official docs): added `--location=CONTROL_PLANE_LOCATION`, which the source omits; without it (and without a default `compute/region` or `compute/zone` property) the command fails with "One of [--zone, --region] must be supplied".

```bash
gcloud container node-pools describe NODE_POOL_NAME --cluster=CLUSTER_NAME --location=CONTROL_PLANE_LOCATION |grep autoscaling -A 1
```

Expected output when enabled:

```text
autoscaling:
  enabled: true
```

### Prioritize unused reservations

Adapted (not in the official docs): added `--location=CONTROL_PLANE_LOCATION`, which the source omits (see Notes), and `--enable-autoscaling` with `--min-nodes` / `--max-nodes` and `--num-nodes=0`, because `ANY` needs autoscaling enabled and an initial node count of 0.

```bash
gcloud container node-pools create POOL_NAME \
    --cluster=CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION \
    --num-nodes=0 \
    --enable-autoscaling \
    --min-nodes=MIN_NODES \
    --max-nodes=MAX_NODES \
    --location-policy=ANY
```

### Disable autoscaling on a node pool

```bash
gcloud container clusters update CLUSTER_NAME \
    --no-enable-autoscaling \
    --node-pool=POOL_NAME \
    --location=CONTROL_PLANE_LOCATION
```

The cluster size is fixed at the current default node pool size, which can be manually updated.

## Options / Props

| Placeholder / flag | Description |
|--------------------|-------------|
| `CLUSTER_NAME` | Cluster to create or update |
| `NUM_NODES` | Nodes to create in each location |
| `MIN_NODES` / `MAX_NODES` | Min / max nodes per zone. For the whole node pool (GKE 1.24 and later) use `--total-min-nodes` / `--total-max-nodes` |
| `--total-*-nodes` vs `--min-nodes`/`--max-nodes` | Mutually exclusive |
| `POOL_NAME` | Node pool name; use `default-pool` if you have only one |
| `CONTROL_PLANE_LOCATION` | Region for regional clusters, zone for zonal clusters |

| Taint prefix (GKE 1.28 and later) | Behavior |
|-----------------------------------|----------|
| `startup-taint.cluster-autoscaler.kubernetes.io/` | Node treated as unready but counted in scale-up logic |
| `status-taint.cluster-autoscaler.kubernetes.io/` | Node treated as ready but ignored in scale-up logic; no Pods should run there |
| `ignore-taint.cluster-autoscaler.kubernetes.io/` | Deprecated; treated as startup taints |

## Notes

- Enabling or disabling cluster autoscaling might restart the control plane (several minutes). After autoscaling is on for at least one node pool, further changes do not restart it until autoscaling is disabled for the last node pool. Changes can take up to one minute to propagate.
- To manually resize an autoscaled node pool: disable autoscaling, resize manually, then re-enable with min/max. You cannot resize by changing min/max.
- Do not leave `startup` taints on many nodes for long: the autoscaler might stop working because those nodes are unready and the cluster is treated as broken.
- Corrected from the official docs: `gcloud container node-pools describe NODE_POOL_NAME --cluster=CLUSTER_NAME` and `gcloud container node-pools create POOL_NAME --cluster=CLUSTER_NAME --location-policy=ANY` omitted `--location`; it was added to both.
- Disabling autoscaling and resizing are disruptive operations; try them on a disposable cluster first.
- The source also shows Console steps for each task.
- Corrected from the official docs: the reservation example sets only `--location-policy=ANY`. In `gcloud container node-pools create` help, `--location-policy` belongs to the Cluster autoscaling flag group and "specifies the algorithm used when scaling-up the node pool", and `--enable-autoscaling` needs `--max-nodes` or `--total-max-nodes`; the concepts page adds that for `ANY` "autoscaling has to be enabled and the initial number of nodes has to be set to 0". The example now sets `--num-nodes=0` and enables autoscaling with per-zone `MIN_NODES` / `MAX_NODES`.
- Source (`--location-policy` flag group): `gcloud container node-pools create --help` (gcloud 593.0.0, retrieved 2026-11-14)
- Source (`ANY` requirements): https://docs.cloud.google.com/kubernetes-engine/docs/concepts/cluster-autoscaler (retrieved 2026-11-16)
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/cluster-autoscaler (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cluster-autoscaler.md](./cluster-autoscaler.md)
- [node-auto-provisioning.md](./node-auto-provisioning.md)
