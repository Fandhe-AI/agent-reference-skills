---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture
---

# GKE cluster architecture

A GKE cluster consists of a control plane and worker machines called nodes. GKE Autopilot manages the whole underlying infrastructure (control plane, nodes, system components); in Standard mode GKE manages the control plane and system components while you manage the nodes.

## Signature / Usage

### Describe a cluster (borrowed snippet)

The architecture page has no code. The block below is the example from the gcloud help of `gcloud container clusters describe`; it shows the cluster's control plane and node configuration.

```bash
gcloud container clusters describe sample-cluster
```

### Components

- Control plane: managed by GKE. Runs the Kubernetes API server (`kube-apiserver`), workload controllers, scheduler and cluster state storage. It is the unified endpoint of the cluster; API calls are direct (HTTP/gRPC) or indirect (`kubectl`, Google Cloud console).
- Nodes: Compute Engine VMs that GKE creates, running the container runtime and `kubelet`, plus system DaemonSets (log collection, intra-cluster networking). Managed by GKE in Autopilot, by customers in Standard.
- Cluster state database: GKE clusters store state in either etcd (instances on every control plane VM) or Spanner (not running in the control plane). Every cluster serves the etcd API in the control plane either way.

## Options / Props

### Node management by mode

| Node component | Autopilot mode | Standard mode |
| --- | --- | --- |
| Lifecycle | Fully managed by GKE: automatic upgrades, repairs, health checks, automatic node scaling, node creation/deletion, resizing, labelling for workload separation. | GKE manages automatic upgrades, repairs and health checks. You manage node auto-scaling configuration, manual version upgrades, configuration changes (labels, resizing), and node pool creation/deletion. |
| Visibility | View nodes using `kubectl`. Underlying Compute Engine VMs not visible or accessible in the gcloud CLI or console. | View nodes using `kubectl`, the gcloud CLI and the console; view and access underlying VMs. |
| Connectivity | No direct connection to underlying VMs. | Connect to underlying VMs using SSH. |
| Node OS | Managed by GKE. All nodes use Container-Optimized OS with containerd (`cos_containerd`). | You choose an operating system for your nodes. |
| Machine hardware selection | Request compute classes in Pods; GKE manages machine configuration, scheduling, quantity and lifecycle. | Choose Compute Engine machine types when creating node pools (`--machine-type`); configure sizing, scaling, quantity, scheduling and location. |

## Notes

- Node registration: the `kubelet` opens a TLS connection to the API server and creates a `CertificateSigningRequest` for a unique client certificate, then creates the `Node` object. Shielded GKE Nodes (enabled by default in all new clusters) use a virtual TPM (vTPM) to verify node identity. Optionally a trusted GKE control plane component creates `Node` objects instead of the kubelet (Control Plane node creation, Preview).
- Artifact Registry dependency: when you create or update a cluster, GKE pulls system images from Artifact Registry repositories in the `pkg.dev` or `gcr.io` domain. An outage can make new cluster creation and cluster version upgrades fail. Best practice: deploy across multiple regions.
- Best practice: use `stdout` for containerized application logs so the platform can handle them.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/describe (the source page itself has no code).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [kubernetes-engine-overview.md](./kubernetes-engine-overview.md)
- [autopilot-overview.md](./autopilot-overview.md)
- [choose-cluster-mode.md](./choose-cluster-mode.md)
- [shared-responsibility.md](./shared-responsibility.md)
- [quotas.md](./quotas.md)
