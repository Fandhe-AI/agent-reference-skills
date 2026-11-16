---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/kubernetes-engine-overview
---

# GKE overview

Google Kubernetes Engine (GKE) is a managed implementation of the Kubernetes open source container orchestration platform. Google Cloud manages the control plane and system components; in Autopilot mode (the recommended way to run GKE) it also manages the worker nodes. The page is for Operators and Developers who want a scalable, automated, managed Kubernetes solution.

## Signature / Usage

### Check available versions (borrowed snippet)

The overview page has no code. The following block is taken from the GKE versioning page (see Notes); `RELEASE_CHANNEL` is `RAPID`, `REGULAR`, `STABLE` or `EXTENDED`, and `COMPUTE_LOCATION` is a Compute Engine location.

```bash
gcloud container get-server-config \
    --flatten="channels" \
    --filter="channels.channel=RELEASE_CHANNEL" \
    --format="yaml(channels.channel,channels.validVersions)" \
    --location=COMPUTE_LOCATION
```

### How GKE works

- A GKE environment consists of nodes (Compute Engine VMs) grouped into a cluster.
- Apps (workloads) are packaged into containers and deployed as Pods to nodes; you use the Kubernetes API to administer, scale and monitor them.
- The control plane (a set of management nodes running system components such as the Kubernetes API server) is managed by Google Cloud.
- Google Cloud automatically upgrades component versions for stability and security.

## Options / Props

### Benefits of GKE

| Area | Benefits |
| --- | --- |
| Platform management | Fully-managed nodes in Autopilot mode with built-in hardening; managed upgrades with release channels; maintenance windows and exclusions; node upgrade strategies in Standard mode; automatic node scaling (Autopilot, or node auto-provisioning in Standard); node auto-repair; fleet-based team management; Connect gateway; Config Sync; built-in logging and monitoring; Cloud Build and Cloud Deploy integration. |
| Improved security posture | Container-Optimized OS; built-in security measures; Policy Controller; automatic upgrades; security posture dashboard; Google Cloud Observability integration. |
| Cost optimization | Autopilot: pay only for compute resources your running Pods request. Standard: pay for all resources on nodes regardless of Pod requests. Spot Pods for fault-tolerant workloads. |
| Reliability and availability | >99% monthly uptime SLO; Pod-level SLA in Autopilot clusters; highly-available control plane and worker nodes in Autopilot and regional Standard clusters; proactive deprecation recommendations; multi-cluster Service capabilities. |

### Modes of operation

| Mode | Summary |
| --- | --- |
| Autopilot | Recommended. Google Cloud manages nodes; workload-focused, cost-optimized, production-ready. |
| Standard | Use only for a specific need to manually manage node pools and clusters. |

## Notes

- Best practice from the source: configure the application CI/CD pipeline to use Cloud Build, Cloud Deploy and Artifact Registry. For VM workloads consider Migrate for GKE to containerize without rewriting apps.
- Best practice: use alpha clusters to try alpha/beta Kubernetes features or upcoming minor versions; review the implications before enabling beta APIs in production clusters.
- GKE has a free tier for cluster management fees (see GKE pricing).
- Policy Controller (listed under security benefits) has support ending 2027-12-31. Source: https://docs.cloud.google.com/kubernetes-engine/docs/deprecations/policy-controller (retrieved 2026-11-16)
- GKE runs Kubernetes workloads on Google Cloud: distinct from Cloudflare Containers / Sandbox SDK (`cloudflare-sandbox-containers`) and from Cloud Run (`gcp-run`).
- Snippet taken from https://docs.cloud.google.com/kubernetes-engine/versioning
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/kubernetes-engine-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cluster-architecture.md](./cluster-architecture.md)
- [autopilot-overview.md](./autopilot-overview.md)
- [choose-cluster-mode.md](./choose-cluster-mode.md)
- [versioning.md](./versioning.md)
