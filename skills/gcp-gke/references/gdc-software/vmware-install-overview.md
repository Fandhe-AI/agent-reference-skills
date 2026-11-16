---
source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/how-to/install-overview
---

# Installation overview and IP address planning (Google Distributed Cloud software only for VMware)

Planning process and steps for a software-only installation on vSphere: plan, set up vSphere, set up Google Cloud resources, create the admin workstation, the admin cluster, user clusters, then deploy a workload. This page also merges "Plan your IP addresses" with a worked static-IP example.

## Signature / Usage

### Installation steps

1. Plan your installation. 2. Set up your vSphere environment. 3. Set up Google Cloud resources (project, service accounts). 4. Create an admin workstation. 5. Create an admin cluster. 6. Create one or more user clusters. 7. Deploy a workload on a user cluster.

### List user clusters enrolled in the GKE On-Prem API

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/container/vmware/clusters/list (the install page itself has no commands): list the clusters managed in a location.

```bash
gcloud container vmware clusters list --location=us-west1
```

## Options / Props

### Planning decisions

| Topic | Guidance |
|-------|----------|
| User clusters | Decide how many user clusters and nodes; an HA control plane needs three nodes, a non-HA control plane one node |
| Load balancing | Choose a load balancer (may need to be set up before creating clusters); choose how to connect to Google |
| Node IPs | DHCP server you provide, or a list of static IPs you provide; enough IPs for nodes and VIPs |
| vSphere layout | Admin and user clusters can share a vSphere cluster or use separate vSphere clusters or separate data centers |
| User cluster tools | `gkectl` on the admin workstation, or console / gcloud CLI / Terraform (cluster is auto-enrolled in the GKE On-Prem API); admin clusters always use `gkectl` |
| GKE On-Prem API enrollment | Optional for admin clusters: `gkeOnPremAPI` section in the config file before creation, or gcloud CLI after creation |

### Example static IP allocation (HA admin cluster, HA user cluster with 5 workers, non-HA user cluster with 4 workers; Controlplane V2, MetalLB)

| Item | Example |
|------|---------|
| Admin workstation and admin cluster subnet | 172.16.20.0/24, gateway 172.16.20.1 |
| User cluster 1 subnet | 172.16.21.0/24, gateway 172.16.21.1 |
| User cluster 2 subnet | 172.16.22.0/24, gateway 172.16.22.1 |
| Admin workstation | 172.16.20.20 |
| Admin cluster nodes (3) | 172.16.20.2 - 172.16.20.4 |
| Admin cluster API server VIP (`controlPlaneVIP`) | 172.16.20.30 |
| User cluster 1 nodes (8 + 1 spare = 9) | 172.16.21.2 - 172.16.21.10 |
| User cluster 1 API server VIP / ingress VIP | 172.16.21.30 / 172.16.21.31 |
| User cluster 1 Service VIPs (10, include the ingress VIP; required by MetalLB) | 172.16.21.31 - 172.16.21.40 |
| User cluster 2 nodes (5 + 1 spare = 6) | 172.16.22.2 - 172.16.22.7 |
| User cluster 2 API server VIP / ingress VIP | 172.16.22.30 / 172.16.22.31 |
| User cluster 2 Service VIPs | 172.16.22.31 - 172.16.22.40 |

### Pod and Service CIDRs (example)

| Purpose | CIDR |
|---------|------|
| Pods in admin, user cluster 1 and user cluster 2 | 192.168.0.0/16 (may be the same for multiple clusters) |
| Services in admin cluster | 10.96.232.0/24 |
| Services in user cluster 1 | 10.96.0.0/20 |
| Services in user cluster 2 | 10.96.128.0/20 |

## Notes

- The extra node IP per user cluster is needed during cluster upgrade, update and auto repair.
- With Controlplane V2, `controlPlaneVIP` must be in the same VLAN as the control plane node IPs in `network.controlPlaneIPBlock`. Kubeception (user cluster control plane in the admin cluster) is not recommended; Controlplane V2 is.
- Service and Pod CIDRs must not overlap with node IPs, load balancer machine IPs, VIPs, or vCenter / DNS / NTP server IPs; RFC 1918 private ranges are recommended, because traffic to addresses inside those ranges is treated as in-cluster.
- You also need the IP of a DNS server usable by the admin workstation and nodes, and the default gateway of each subnet.
- Each user cluster must be registered to a fleet, which requires a fleet host project. The service accounts download cluster components and register clusters to the fleet.
- The word "cluster" means either a vSphere cluster or a GKE cluster.
- Former names: Google Distributed Cloud Virtual, Anthos clusters on VMware.
- Source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/how-to/install-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/kubernetes-engine/distributed-cloud/vmware/docs/how-to/plan-ip-addresses (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sdk/gcloud/reference/container/vmware/clusters/list (gcloud 593.0.0 help text, snippet only, retrieved 2026-11-14)

## Related

- [vmware-overview.md](./vmware-overview.md)
- [vmware-connect-on-prem-gcp.md](./vmware-connect-on-prem-gcp.md)
- [vmware-scalability.md](./vmware-scalability.md)
- [vmware-upgrade-overview.md](./vmware-upgrade-overview.md)
