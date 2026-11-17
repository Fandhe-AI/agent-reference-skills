---
source: https://docs.cloud.google.com/distributed-cloud/connected/latest/docs/how-it-works
---

# How Distributed Cloud connected works

Describes the infrastructure, hardware, storage and networking of Google Distributed Cloud connected: Google-certified hardware deployed by a systems integrator (SI), plus a service that manages clusters and node pools through the Google Cloud CLI and the Distributed Cloud Edge Container API. Clusters are registered in your Fleet and accessed with `kubectl`.

## Signature / Usage

### List machines in a region

```bash
gcloud edge-cloud container machines list --location=us-central1
```

## Options / Props

### Entities

| Entity | Description |
|---|---|
| Google Cloud region | Determined by the Google Cloud data center closest to your installation. |
| Kubernetes local control plane | Runs on your Distributed Cloud hardware. A cluster can enter survivability mode when the connection to Google Cloud is temporarily lost. |
| Distributed Cloud connected zone | Logical abstraction for the hardware at your premises; machines in a zone share a single network fabric or fault domain. Different from a Compute Engine zone and not listed with Compute Engine zones in the console. |
| Node | Kubernetes resource that instantiates a physical machine when a node pool is created. |
| Node pool | Logical grouping of nodes within a single zone; for servers, node pools are instantiated and populated automatically. |
| Cluster | A control plane and one or more node pools. |

### Hardware

| Platform | Configuration |
|---|---|
| Distributed Cloud connected servers G1 | One or three Dell XR11 series 1U rackmount machines. |
| Distributed Cloud connected servers G2 | A Dell XR8000 series chassis with one or three XR8610t machine sleds. |

By default you can only order servers in a three-machine configuration. Each server needs at minimum one in-band and one out-of-band connection to a single Layer 2 ToR switch; two ToR switches and two in-band connections per machine (one per switch) are recommended. Workload-connectivity switch ports must be in the same VLAN (additional tagged VLANs can be trunked). The BMC interface connects to one ToR switch and must be configured as an 802.1q trunk with the matching native VLAN.

### Connectivity and limits

- Workloads keep running for up to 7 days without a connection to Google Cloud; after that, Distributed Cloud must contact Google Cloud to refresh authentication tokens and storage encryption keys and to synchronize hardware management and audit logging data.
- Management and audit logging traffic is encrypted and travels over the internet; proxied internet connections are not supported.
- A zone belongs to one Google Cloud project, but individual clusters in the zone can be attached to different projects.
- Storage is exposed through Rakuten Symcloud Storage; local storage is encrypted with LUKS and supports CMEK with Cloud KMS.
- GPU workloads run on NVIDIA L4 GPUs on select hardware configurations; the requirement must be specified when ordering.

### Networking summary

| Component | Description |
|---|---|
| Network | Virtual network with a private address space in the zone, Layer 2-isolated from other networks; spans all machines. A default network is created automatically when a server cluster is instantiated. |
| Subnetwork | Layer 2 VLAN subnetwork with its own broadcast domain and one or more IPv4 ranges; servers only support subnetwork management using VLAN IDs. |

Differences from Google Cloud equivalents: components are local to the zone; a Distributed Cloud network has no direct connectivity to a VPC network; by default networks have no connectivity across zones (cross-zone networking can be configured explicitly). Pre-configured virtual networking settings cannot be modified after the hardware is delivered.

| Role | Required for |
|---|---|
| `roles/edgenetwork.admin` (Edge Network Admin) | Network administrators configuring networking components. |
| `roles/edgenetwork.viewer` (Edge Network Viewer) | Application developers deploying workloads. |

Outbound traffic to the local network and the internet uses the built-in NAT; Pod and Service CIDR blocks are not directly accessible from either. Layer 2 load balancing is based on MetalLB.

## Notes

- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/edge-cloud/container/machines/list (gcloud 593.0.0 help); the source page has no code block.
- Source: https://docs.cloud.google.com/distributed-cloud/connected/latest/docs/how-it-works (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [networking.md](./networking.md)
- [networks.md](./networks.md)
- [subnetworks.md](./subnetworks.md)
