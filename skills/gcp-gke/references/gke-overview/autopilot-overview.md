---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview
---

# GKE Autopilot overview

Autopilot is a managed mode of operation in GKE in which Google manages nodes, scaling, security and other preconfigured settings, and provisions compute resources from your Kubernetes manifests. You can run an entire cluster in Autopilot mode, or run specific workloads in Autopilot mode in Standard clusters (via Autopilot ComputeClasses).

## Signature / Usage

### Check default release channel version (borrowed snippet)

The page has no fenced code (it only mentions the flag `--autopilot-general-profile=no-performance`). All Autopilot clusters are enrolled in a release channel (default: Regular). The block below is taken from the GKE versioning page.

```bash
gcloud container get-server-config \
    --flatten="channels" \
    --filter="channels.channel=RELEASE_CHANNEL" \
    --format="yaml(channels.channel,channels.defaultVersion)" \
    --location=COMPUTE_LOCATION
```

### Container-optimized compute platform (GKE 1.32.3-gke.1927002 and later)

- Nodes can dynamically resize while running, scaling from fractions of a CPU; GKE keeps a pool of pre-provisioned capacity.
- Proactive capacity can increase IP address use. To avoid it, turn it off with the `--autopilot-general-profile=no-performance` flag (reduces provisioning performance for general-purpose workloads).
- Supports x86 (default) and Arm. For Arm use the `kubernetes.io/arch: arm64` node selector, or the `autopilot-arm` / `autopilot-arm-spot` ComputeClasses. Node resizing is not supported for Arm workloads.
- Usable in Autopilot clusters (default for Pods that select no specific hardware) and in Standard clusters (built-in Autopilot ComputeClasses, or `podFamily` priority rules in custom Autopilot ComputeClasses).

## Options / Props

### Pricing models

| Workload type | Model |
| --- | --- |
| General-purpose Pods (container-optimized compute platform; or `Balanced` / `Scale-Out` built-in ComputeClasses in Autopilot clusters) | Pod-based billing |
| Pods that select specific hardware (machine series, accelerators, ComputeClasses) | Node-based billing: pay for hardware plus a node management premium |

### Common requirements

| Use case | Recommendation |
| --- | --- |
| Control node properties when scaling | Custom ComputeClass requested in the workload manifest |
| Autopilot workloads in a Standard cluster | Autopilot ComputeClass |
| Arm workloads | `autopilot-arm` / `autopilot-arm-spot`, or an Arm machine series in a custom ComputeClass |
| Accelerated AI/ML | Request GPUs in a ComputeClass or in the workload manifest |
| Fault-tolerant, lower cost | `autopilot-spot` ComputeClass, Spot VMs in a custom ComputeClass, or Spot Pods (usable with any ComputeClass) |
| Minimal disruption (game servers, work queues) | Autopilot clusters only: Pod annotation `cluster-autoscaler.kubernetes.io/safe-to-evict=false`; protected from node auto-upgrade / scale-down eviction for up to seven days |
| Burst beyond requests | Set `limits` higher than `requests`, or set no limits |

### Scheduling

| Topic | Detail |
| --- | --- |
| `topologyKey` for Pod affinity / anti-affinity | `topology.kubernetes.io/zone`, `kubernetes.io/hostname` |
| Workload separation | Node selectors and node affinity |
| Best practice | With `topologySpreadConstraints` and cluster autoscaling, set `nodeTaintsPolicy: Honor`; `whenUnsatisfiable: ScheduleAnyway` avoids unschedulable Pods during imbalances such as a zone failure |

## Notes

- New Autopilot clusters are regional with a publicly accessible IP address; use network isolation or private clusters for no external IP access. Network policy enforcement uses GKE Dataplane V2 (enabled by default).
- A cluster with no running workloads can scale to zero nodes; system Pods are then unschedulable (expected), and the first workloads schedule more slowly.
- Autopilot enables vertical Pod autoscaling by default; HPA rightsizing with VPA is Preview. Cloud Logging, Cloud Monitoring and Managed Service for Prometheus are enabled by default.
- Version control: maintenance windows, maintenance exclusions, manual control plane upgrade, or newer-channel patch versions.
- SLA covers both the control plane and the compute capacity used by Pods.
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/versioning
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/autopilot-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [choose-cluster-mode.md](./choose-cluster-mode.md)
- [cluster-architecture.md](./cluster-architecture.md)
- [quotas.md](./quotas.md)
- [versioning.md](./versioning.md)
