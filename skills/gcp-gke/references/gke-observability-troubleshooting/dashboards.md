---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/dashboards
---

# GKE pages in the Google Cloud console

Overview of the GKE pages in the Google Cloud console for administrators and developers: GKE overview, Kubernetes clusters, Workloads, Services, Secrets and ConfigMaps, Storage, and Object Browser.

## Signature / Usage

### Required role

If you are not a project owner, you need at least Kubernetes Engine Viewer (`roles/container.viewer`) to view clusters in the console. Clusters outside Google Cloud need additional fleet permissions.

### Inspect a cluster from the command line

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/describe (the source page itself has no code):

Adapted (not in the official docs): added `--location=CONTROL_PLANE_LOCATION`, which the source omits.

```bash
gcloud container clusters describe sample-cluster \
    --location=CONTROL_PLANE_LOCATION
```

## Options / Props

| Page | Purpose |
|---|---|
| GKE overview | Fleet-level view: security concerns, estimated fleet costs, fleet-wide Policy Controller coverage, Config Sync status, resource utilization. |
| Kubernetes clusters | All clusters in the project: create, inspect, edit, connect with Cloud Shell, delete. **Fleet** column for registered clusters. Tabs: **Utilization**, **Observability**, **Cost optimization**. |
| Workloads | Inspect, manage, edit, delete workloads; **Deploy** stateless apps. System objects filtered out by default. |
| Services | Load-balancing Service and traffic-routing Ingress objects plus default networking system objects. |
| Secrets & ConfigMaps | Configuration files, `Secret` and `ConfigMap` objects, env vars. Sensitive `Secret` data is not displayed. |
| Storage | Tabs **Persistent volume claims** and **Storage classes**. |
| Object Browser | All objects in all clusters of the project, filter by API group and Kind, preview YAML. |

### Cluster actions menu

| Action | Effect |
|---|---|
| Edit | Change cluster settings in its details page. |
| Connect | Connect with `kubectl` from the command line, or open Workloads. |
| Delete | Delete the cluster. |
| Register / Unregister | Update fleet membership. |
| Change tier | Change the cluster tier. |

### Cluster details tabs

| Tab | Content |
|---|---|
| Details | Cluster and node pool settings (locked settings show a lock icon); **Upgrade Available** notification. |
| Nodes | Standard clusters only: nodes with requested CPU, memory, storage. |
| Storage | Persistent volumes and storage classes. |
| Observability | Cluster metrics. |
| Logs | Cluster and autoscaler logs. |
| App errors | Recent application errors. |

### Workload details tabs

Overview (utilization, replicas, revisions, containers, **Managed pods**), Details (labels, selectors, autoscaling, Pod specs), Observability, Revision history, Events, YAML (live configuration editor).

## Notes

- The **Equivalent code** button shows gcloud, REST, or Terraform ([Preview](https://cloud.google.com/products#product-launch-stages)) code. Review Terraform code carefully before applying and test it in a safe environment.
- The Workloads page hides managed workloads (for example ReplicaSet and Pod objects under a Deployment); you can see them by clicking into the Deployment with sufficient permissions.
- CRDs installed by third-party components might not appear in the Object Browser.
- If a Service exposes ports on Pods, the Service page prepopulates a `kubectl port-forward` command.
- The Delete and Unregister actions in the cluster menu are destructive; try them on a disposable cluster first.
- The source has no code block; the snippet above is borrowed from the gcloud help text of `clusters describe`. If `--location` / default `compute/region` or `compute/zone` is not set, add `--location=LOCATION`.
- Corrected from the official docs: the source runs `gcloud container clusters describe sample-cluster` without a location, which works only when a default `compute/zone` or `compute/region` is configured; the example now passes `--location=CONTROL_PLANE_LOCATION`.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/dashboards (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/describe (gcloud 593.0.0 help text, retrieved 2026-11-14)

## Related

- [observability.md](./observability.md)
- [configure-metrics.md](./configure-metrics.md)
- [troubleshooting.md](./troubleshooting.md)
