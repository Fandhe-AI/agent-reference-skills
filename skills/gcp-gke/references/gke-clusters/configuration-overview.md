---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/configuration-overview
---

# About cluster configuration choices

Overview of the main GKE cluster configuration choices (mode, availability, fleet, networking, versions, security, node pools). Many choices cannot be changed after creation, so plan them before creating the cluster.

## Signature / Usage

Minimal commands to create each cluster type (from the pages this overview links to):

```bash
gcloud container clusters create-auto CLUSTER_NAME \
    --location=LOCATION \
    --project=PROJECT_ID
```

```bash
gcloud container clusters create example-cluster \
    --location us-central1-a \
    --node-locations us-central1-a,us-central1-b,us-central1-c
```

Snippets taken from https://docs.cloud.google.com/kubernetes-engine/docs/how-to/creating-an-autopilot-cluster and https://docs.cloud.google.com/kubernetes-engine/docs/how-to/creating-a-zonal-cluster.

## Options / Props

| Cluster choice | Autopilot | Standard |
|----------------|-----------|----------|
| Availability type | Regional | Regional or Zonal |
| Release channel | Rapid, Regular, or Stable | Any channel |
| Cluster versions | Default or another available version | Default or another available version |
| Network routing | VPC-native | VPC-native or Routes-based |
| Network isolation | Customizable | Customizable |
| Kubernetes features | Production | Production or Alpha |

| Setting | Changeable after creation? |
|---------|----------------------------|
| Zonal vs regional; regional cluster's region | No |
| Network, subnet, Pod/Service IP ranges | No |
| VPC-native vs routes-based | No |
| Node service account (Autopilot cluster; Standard node pool) | No |
| Network isolation (control plane endpoints, authorized networks, private nodes) | Yes |
| Release channel | Yes, any time |
| Fleet registration | Yes (moving clusters with live workloads between fleets is not recommended) |
| Node pool settings | Some |

| Topic | Key facts |
|-------|-----------|
| Modes | Autopilot (recommended, fully managed); Standard (configure the infrastructure) |
| Autopilot availability | Always regional |
| Regional default | Each node pool replicated across three zones of the control plane's region |
| Control plane endpoints | Default: internal and external endpoints enabled, DNS-based endpoint disabled |
| Default release channel | Regular (Autopilot and Standard); Autopilot always uses release channels |
| Alpha clusters | Standard only; not for production, cannot be upgraded or added to release channels, expire within 30 days |
| Default Standard node pool | Three nodes per cluster zone, image `cos_containerd`, general-purpose machine type |

### AI zones

Preview; restricted unless AI zones are enabled for the project. Names carry an `ai` suffix, for example `us-central1-ai1a`. Only TPU VMs are supported. To use an AI zone with existing clusters, the control plane must run 1.36.4-gke.1495002 or later, or 1.37.1-gke.1552000 or later. By default GKE does not deploy workloads in AI zones; use ComputeClasses (recommended), node auto-provisioning with `nodeSelector` / `nodeAffinity`, or an AI zone in `--node-locations` on Standard node pools. Non-TPU VMs are allowed only if TPU VM workloads already run in the same zone and the VMs are Spot, reservation-tied, or in a node pool with a specific accelerator-to-general-purpose ratio.

## Notes

- Best practice: use regional clusters for production; for development use regional clusters with zonal node pools (same cost as a zonal cluster). Use VPC-native mode. Use Cloud NAT so Pods reach public resources without direct internet exposure. Choose a release channel and use maintenance windows and exclusions.
- Multi-zone node distribution can incur cross-zone network egress charges.
- If org policy `iam.automaticIamGrantsForDefaultServiceAccounts` is enforced (default for organizations created on or after May 3, 2024), the Compute Engine default service account may not automatically get the GKE node permissions. Prefer a custom node service account with `roles/container.defaultNodeServiceAccount`.
- This page has no Console / Terraform code of its own beyond what is summarized.
- Source inconsistency: this page says alpha clusters "cannot be upgraded or added to release channels", while release-channels.md says "Enroll alpha clusters in the Rapid channel to access alpha patch versions". See release-channels.md for the release-channel page itself.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/configuration-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [creating-an-autopilot-cluster.md](./creating-an-autopilot-cluster.md)
- [creating-a-regional-cluster.md](./creating-a-regional-cluster.md)
- [creating-a-zonal-cluster.md](./creating-a-zonal-cluster.md)
- [managing-clusters.md](./managing-clusters.md)
