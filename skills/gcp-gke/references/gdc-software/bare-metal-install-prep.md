---
source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/bare-metal/docs/installing/install-prep
---

# Choose a deployment model and cluster creation tools (Google Distributed Cloud software only for bare metal)

Deployment models (admin and user, hybrid, standalone) and the cluster creation overview: choose a cluster type, a tool (`bmctl` or GKE On-Prem API clients), and what happens during cluster creation.

## Signature / Usage

### Cluster type fields

The cluster type is set with `spec.type` in the cluster configuration file and is immutable. Standalone clusters enable the edge profile with `profile` set to `edge`.

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/bare-metal/clusters/list (the gcloud CLI is one of the GKE On-Prem API clients below; list the user clusters managed in a location):

```bash
gcloud container bare-metal clusters list --location=us-west1
```

### Cluster creation tools

- `bmctl` on your admin workstation.
- Google Cloud console, Google Cloud CLI or Terraform (the GKE On-Prem API clients).

## Options / Props

| Model | Description | Control plane nodes | Worker nodes |
|-------|-------------|---------------------|--------------|
| Admin and user | One admin cluster (management only) plus one or more user clusters; centralized control plane and API, isolation between teams and between dev / prod, SSH credentials and service account keys not shared with cluster owners | Admin: 1 non-HA, 3 or more HA. User: 1 non-HA, 3 or more HA (HA per user cluster) | User: 1 or more non-HA, 2 or more HA |
| Hybrid | Admin cluster that also runs user workloads and manages other user clusters; reclaims unused admin capacity | 1 non-HA, 3 or more HA | 1 or more non-HA, 2 or more HA |
| Standalone | Single cluster acting as both admin and user cluster; no separate admin cluster; supports the edge profile | 1 non-HA, 3 or more HA | 1 or more non-HA, 2 or more HA |

- HA mode requires three or more (odd number) control plane nodes; non-HA requires one. Use HA for production. An HA user cluster must have two or more worker nodes.
- Edge profile: reduced resource requirements for edge devices; control plane nodes accept user workloads automatically, so no worker node pool is needed. Can run on a single control plane node (`config-samples#edge-basic`) or several (`config-samples#edge-ha`).

## Notes

- The admin cluster holds sensitive data (SSH credentials for remote installation, Google Cloud service account keys, for example for Artifact Registry): restrict access. Hybrid and standalone models run user workloads in a cluster holding these credentials, which potentially exposes them to workloads.
- Use standalone if you manage every cluster independently, have few worker nodes, support one team or workload type; it fits network-isolated partitions and edge locations.
- Cluster creation runs preflight checks and machine initialization. If creation fails after machine initialization (even if preflight passed), you must delete the cluster (reset nodes) to return nodes to a clean state before retrying. This is destructive; try it on a disposable cluster first. Health checks at the end must all pass for the create operation to succeed.
- Plan for scalability: some dimensions such as `clusterNetwork.pods.cidrBlocks` are immutable. See `bare-metal-limits.md`.
- For managed hardware at the edge, the source points to Google Distributed Cloud connected (out of scope here).
- The source pages contain no code blocks; the code block is the `gcloud container bare-metal clusters list` example from the gcloud reference.
- Former names: Google Distributed Cloud Virtual, Anthos clusters on bare metal.
- Source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/bare-metal/docs/installing/install-prep (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/bare-metal/docs/installing/creating-clusters/create-clusters-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [bare-metal-about-bare-metal.md](./bare-metal-about-bare-metal.md)
- [bare-metal-limits.md](./bare-metal-limits.md)
