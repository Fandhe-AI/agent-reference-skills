---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/node-pools
---

# Add and manage node pools

How to add, view, scale, upgrade, downgrade and delete node pools in GKE Standard clusters (Standard node pools plus Autopilot-managed node pools, where noted). Prerequisites: the Kubernetes Engine API enabled, the latest gcloud CLI, and an existing Standard cluster. Set `compute/region` (or `compute/zone` for zonal clusters) to avoid `One of [--zone, --region] must be supplied`.

## Signature / Usage

### Grant the node service account role

Nodes need at least `roles/container.defaultNodeServiceAccount`. By default GKE uses the Compute Engine default service account; the best practice is a custom, minimally privileged service account instead.

```bash
gcloud projects describe PROJECT_ID \
    --format="value(projectNumber)"
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member="serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
    --role="roles/container.defaultNodeServiceAccount"
```

### Add, list and describe

```bash
gcloud container node-pools create POOL_NAME \
    --cluster CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION \
    --service-account SERVICE_ACCOUNT
```

If the command times out although the pool was created, list all pools (including not fully provisioned ones):

```bash
gcloud container node-pools list --cluster CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION
```

```bash
gcloud container node-pools describe POOL_NAME \
    --cluster CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION
```

### Scale horizontally and vertically

```bash
gcloud container clusters resize CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION \
    --node-pool POOL_NAME \
    --num-nodes NUM_NODES
```

Change machine attributes (at least one of the three flags is required; this recreates the nodes):

```bash
gcloud container node-pools update POOL_NAME \
    --cluster CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION \
    --machine-type MACHINE_TYPE \
    --disk-type DISK_TYPE \
    --disk-size DISK_SIZE
```

### Upgrade and downgrade

```bash
gcloud container clusters upgrade CLUSTER_NAME \
  --node-pool=NODE_POOL_NAME \
  --location=CONTROL_PLANE_LOCATION
```

```bash
gcloud container clusters upgrade CLUSTER_NAME \
  --node-pool=NODE_POOL_NAME \
  --location=CONTROL_PLANE_LOCATION \
  --cluster-version VERSION
```

### Deploy a Pod to a specific node pool

Adapted (not in the official docs): restored the YAML indentation of the `nodeSelector` block, which was flattened in the source.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
  labels:
    env: test
spec:
  containers:
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
  nodeSelector:
    cloud.google.com/gke-nodepool: POOL_NAME
```

### Delete a node pool and PDB handling

```bash
gcloud container node-pools delete POOL_NAME \
    --cluster CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION
```

Adapted (not in the official docs): added the missing `\` line continuation after `POOL_NAME`, which the source omits.

```bash
gcloud container node-pools update POOL_NAME \
    --cluster=CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION \
    --respect-pdb-during-node-pool-deletion
```

Adapted (not in the official docs): added the missing `\` line continuation after `POOL_NAME`.

```bash
gcloud container node-pools update POOL_NAME \
    --cluster=CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION \
    --no-respect-pdb-during-node-pool-deletion
```

## Options / Props

| Item | Description |
|------|-------------|
| `POOL_NAME` | Name of the node pool |
| `CONTROL_PLANE_LOCATION` | Region for regional clusters, zone for zonal clusters |
| `SERVICE_ACCOUNT` | IAM service account for the nodes; format `SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com` |
| `NUM_NODES` | Nodes per zone for multi-zonal or regional clusters; omit `--node-pool` if the cluster has one pool |
| `DISK_TYPE` | `pd-standard`, `pd-ssd`, `pd-balanced` or `hyperdisk-balanced`, depending on machine series; `hyperdisk-extreme` / `hyperdisk-throughput` cannot be boot disks |
| `DISK_SIZE` | Boot disk size in GB; default 100 GB |
| `VERSION` | Target Kubernetes version, e.g. `1.34.1-gke.1293000` or `latest` |

## Notes

- Autopilot-managed node pools in Standard clusters: manual upgrade via gcloud only; they cannot be deleted (GKE cleans them up). Upgrades always use surge strategy.
- Changing machine type, disk type or disk size recreates nodes immediately using the node upgrade strategy, regardless of maintenance policies; disabling auto-upgrades does not prevent it.
- Auto-upgrade is on by default for Standard pools; control planes are compatible with nodes up to two minor versions earlier. Strategies: surge, blue-green, autoscaled blue-green (Preview). Concurrent node pool upgrades are Preview.
- PDBs and termination grace periods are respected for at most 1 hour during upgrades; after that GKE upgrades anyway, even with `maxUnavailable: 0`. Use blue-green with soak time for more flexibility.
- Labels added to individual nodes with `kubectl` may not persist across upgrades; apply labels at node pool level. Data to keep must live on persistent volumes.
- Downgrade: only a fully completed upgrade can be downgraded (a partial upgrade can only be rolled back). Set a maintenance exclusion first, then manually upgrade to an earlier version.
- Accelerator (GPU/TPU) instances do not live migrate; align host maintenance with node upgrades.
- Deleting a node pool removes nodes and workloads and does not respect PDBs by default; the PDB setting does not affect pool deletion during cluster deletion. It is destructive; try it on a disposable cluster first.
- The `add-iam-policy-binding` example grants the role to the Compute Engine default service account; the source recommends a custom minimally privileged service account instead.
- The source also shows Console and Terraform.
- Corrected from the official docs: the two `node-pools update ... --respect-pdb-during-node-pool-deletion` / `--no-respect-pdb-during-node-pool-deletion` commands originally had `POOL_NAME` without a trailing `\`; and the Pod `nodeSelector` block was flattened.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/node-pools (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [node-pools.md](./node-pools.md)
- [node-auto-repair.md](./node-auto-repair.md)
- [node-images.md](./node-images.md)
- [spot-vms.md](./spot-vms.md)
