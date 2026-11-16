---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/choose-cluster-mode
---

# Choose a GKE mode of operation

GKE offers two modes of operation, Autopilot (recommended) and Standard. The mode determines who manages the infrastructure, how you are billed, and how much flexibility you have. You can apply a mode to individual workloads or to entire clusters.

## Signature / Usage

### Create an Autopilot cluster (borrowed snippet)

The page has no code. The block below is the example from the gcloud help of `gcloud container clusters create-auto` (Autopilot is the recommended mode).

```bash
gcloud container clusters create-auto sample-cluster
```

## Options / Props

### Autopilot vs Standard workloads

| Autopilot workloads | Standard workloads |
| --- | --- |
| Ideal for most production workloads. | Ideal for workloads that require special privileges or granular control over workload infrastructure. |
| GKE provisions compute resources based on your Kubernetes workload specifications. | You manage resource allocation and Pod placement on specific nodes. |
| Can use the Autopilot container-optimized compute platform. | You plan node capacity in Standard node pools and configure scaling of node sizes and quantity. |
| GKE maximizes node resource usage by bin-packing Pods. | You plan placement by node size and manage bin-packing yourself. |
| Best-practice constraints applied by default, such as preventing privileged Pods. | You can configure Pods any way you want, such as enabling privileged mode. |
| Run in Autopilot clusters or in Standard clusters. | Run only in Standard clusters. |

### Autopilot vs Standard clusters

| Autopilot clusters | Standard clusters |
| --- | --- |
| GKE manages cluster infrastructure including nodes and scaling, with defaults such as security constraints. | You control the infrastructure and can change most settings, including your own node pools, node settings, security policies and scaling. |
| Pre-configured with Google best practices; run only Autopilot workloads. | Can run both Autopilot and Standard workloads. |

## Notes

- Best practice: use Autopilot for most workloads unless the application requires privileges or configuration options that do not meet Autopilot constraints. Unless you need the granular control of Standard clusters, use Autopilot clusters.
- To run Autopilot workloads in a Standard cluster you use a compute class, a GKE feature that declaratively controls node configuration options during scaling; GKE manages bin-packing, resource scaling and infrastructure for those workloads.
- Workload in an Autopilot cluster always runs in Autopilot mode; a workload in a Standard cluster uses Standard mode unless Autopilot mode is selected for it.
- The mode affects charges; see Google Kubernetes Engine pricing. For whether GKE as a platform is the right choice see the GKE overview and "GKE and Cloud Run" (Cloud Run itself is in `gcp-run`).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/clusters/create-auto (the source page itself has no code).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/choose-cluster-mode (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [autopilot-overview.md](./autopilot-overview.md)
- [cluster-architecture.md](./cluster-architecture.md)
- [kubernetes-engine-overview.md](./kubernetes-engine-overview.md)
