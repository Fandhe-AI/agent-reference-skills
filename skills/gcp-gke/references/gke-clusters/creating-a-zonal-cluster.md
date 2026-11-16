---
source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/creating-a-zonal-cluster
---

# Create a zonal cluster

How to create a Standard zonal cluster, which has a single control plane instance in a single zone; nodes can be in one zone or several. Regional clusters are the best practice for production because they offer higher availability.

## Signature / Usage

### Create a zonal cluster

With a specific release channel:

```bash
gcloud container clusters create CLUSTER_NAME \
    --release-channel CHANNEL \
    --location CONTROL_PLANE_LOCATION \
    --node-locations COMPUTE_ZONE,COMPUTE_ZONE1
```

With a specific version:

```bash
gcloud container clusters create CLUSTER_NAME \
    --cluster-version VERSION \
    --location CONTROL_PLANE_LOCATION \
    --node-locations COMPUTE_ZONE,COMPUTE_ZONE1
```

Multi-zonal example: control plane in `us-central1-a`, nodes in three zones (default three nodes per zone, so nine nodes):

```bash
gcloud container clusters create example-cluster \
    --location us-central1-a \
    --node-locations us-central1-a,us-central1-b,us-central1-c
```

Custom, minimally-privileged node service account flag:

```text
--service-account=SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com
```

Grant the node role first (default node SA shown in the source; best practice is a custom account):

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
    --member="serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
    --role="roles/container.defaultNodeServiceAccount"
```

## Options / Props

| Variable | Description |
|----------|-------------|
| `CLUSTER_NAME` | Name of the new cluster |
| `CHANNEL` | `rapid`, `regular`, `stable`, or `None` (deprecated); default `regular` |
| `CONTROL_PLANE_LOCATION` | Compute Engine zone of the control plane |
| `VERSION` | GKE version |
| `COMPUTE_ZONE,COMPUTE_ZONE1,[...]` | Node zones; all in the control plane's region; for zonal clusters `--node-locations` must contain the cluster's primary zone |
| `--node-locations` | May be omitted for a single-zone cluster |
| Default machine type | `e2-medium` (Console) |

## Notes

- After creation a cluster cannot change from zonal to regional or from regional to zonal.
- With `--cluster-version`, the cluster uses that version and is enrolled in the most mature release channel where it is available.
- New clusters have `cos-metrics-enabled` enabled by default (kernel crash logs via dmesg; may include user logs if a privileged container writes to a bind-mounted `/dev/kmsg`).
- Best practice: use a custom, least-privilege node service account (`roles/container.defaultNodeServiceAccount`) instead of the Compute Engine default service account; granting the role to the default account is shown by the source but is not the recommended setup.
- The node service account cannot be modified on an existing node pool. Org policy `constraints/compute.vmExternalIpAccess` set to `Deny All` makes public cluster creation fail.
- The previous console cluster templates (first cluster, CPU / memory intensive, GPU, highly available) were removed from the console but are still reachable via template URLs.
- The source also shows Console and Terraform forms; they are omitted here. The source's bare code fences were tagged `bash` here.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/how-to/creating-a-zonal-cluster (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating-a-regional-cluster.md](./creating-a-regional-cluster.md)
- [configuration-overview.md](./configuration-overview.md)
- [cluster-access-for-kubectl.md](./cluster-access-for-kubectl.md)
- [managing-clusters.md](./managing-clusters.md)
