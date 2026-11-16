---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/creating-a-regional-cluster
---

# Create a regional cluster

How to create a Standard regional cluster, whose control plane is replicated across multiple zones for availability during upgrades, maintenance or zonal disruption. Shows single-zone and multi-zone node pool variants.

## Signature / Usage

### Prerequisites

Enable the GKE API, install/initialize gcloud, have at least Kubernetes Engine Cluster Admin, and grant the node service account `roles/container.defaultNodeServiceAccount` (see [creating-an-autopilot-cluster.md](./creating-an-autopilot-cluster.md) for the grant commands). Set the project first:

```bash
gcloud config set project PROJECT_ID
# gcloud config set billing/quota_project PROJECT_ID
```

### Regional cluster with a single-zone node pool

Control plane is replicated across zones; nodes run in one zone only.

```bash
gcloud container clusters create CLUSTER_NAME \
    --location CONTROL_PLANE_LOCATION \
    --node-locations COMPUTE_ZONE \
    --release-channel CHANNEL
```

With a specific version:

```bash
gcloud container clusters create CLUSTER_NAME \
    --location CONTROL_PLANE_LOCATION \
    --node-locations COMPUTE_ZONE \
    --cluster-version VERSION
```

Examples (three nodes by default, or two with `--num-nodes 2`):

```bash
gcloud container clusters create my-regional-cluster \
    --location us-west1 \
    --node-locations us-west1-c
```

```bash
gcloud container clusters create my-regional-cluster \
    --location us-west1 \
    --node-locations us-west1-c \
    --num-nodes 2
```

### Regional cluster with a multi-zone node pool (default)

```bash
gcloud container clusters create CLUSTER_NAME \
    --location CONTROL_PLANE_LOCATION \
    --release-channel CHANNEL
```

```bash
gcloud container clusters create CLUSTER_NAME \
    --location CONTROL_PLANE_LOCATION \
    --cluster-version VERSION
```

Examples: nine nodes (three zones, three each), six nodes (`--num-nodes 2`), or six nodes in two zones via `--node-locations`:

```bash
gcloud container clusters create my-regional-cluster --location us-west1
```

```bash
gcloud container clusters create my-regional-cluster \
    --location us-west1 \
    --num-nodes 2
```

```bash
gcloud container clusters create my-regional-cluster \
    --location us-central1 \
    --node-locations us-central1-b,us-central1-c
```

### Custom node service account

```text
--service-account=SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com
```

## Options / Props

| Variable | Description |
|----------|-------------|
| `CLUSTER_NAME` | Name of the new regional cluster |
| `CONTROL_PLANE_LOCATION` | Compute Engine region of the control plane, for example `us-central1` |
| `COMPUTE_ZONE` | Zone for the node pool; must be in the same region as the control plane |
| `CHANNEL` | `rapid`, `regular`, `stable`, or `None` (deprecated); default `regular` |
| `VERSION` | GKE version for the cluster |
| Default node placement | Each node pool replicated across three zones of the region |
| `--node-locations` | Optional; overrides default zones (regions with more than three zones, or fewer zones preferred) |
| Default machine type | `e2-medium` (Console) |

## Notes

- A regional cluster cannot be converted to a zonal cluster after creation. Autopilot clusters are always regional.
- Regional clusters replicate resources across zones and consume additional quotas.
- With `--cluster-version` on the single-zone page, the cluster is enrolled in the most mature release channel where that version is available; on the multi-zone page the source states the cluster is not enrolled in a release channel (the two sections differ in the source).
- The node service account cannot be modified on an existing node pool after creation.
- Org policy `constraints/compute.vmExternalIpAccess` set to `Deny All` makes public cluster creation fail.
- After creation, configure `kubectl` (see [cluster-access-for-kubectl.md](./cluster-access-for-kubectl.md)).
- The source also shows Console and Terraform forms; they are omitted here.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/creating-a-regional-cluster (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating-a-zonal-cluster.md](./creating-a-zonal-cluster.md)
- [configuration-overview.md](./configuration-overview.md)
- [creating-an-autopilot-cluster.md](./creating-an-autopilot-cluster.md)
- Reference: https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/create
