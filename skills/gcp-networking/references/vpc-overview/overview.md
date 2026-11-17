---
source: https://docs.cloud.google.com/vpc/docs/overview
---

# Virtual Private Cloud (VPC) overview

VPC provides global, scalable, flexible networking for Compute Engine VM instances, Google Kubernetes Engine (GKE) clusters, and serverless workloads. This page is a high-level map of VPC concepts: networks, firewall rules, routes, forwarding rules, IP addresses, sharing and peering, hybrid connectivity, load balancing and private access to services.

## Signature / Usage

Borrowed gcloud commands for listing the networks the concepts below apply to:

```bash
gcloud compute networks list
```

```bash
gcloud compute networks list --uri
```

## Options / Props

| Concept | What it is | Details page |
|---|---|---|
| VPC network | Global resource: a list of regional subnets in data centers connected by a global WAN; logically isolated from other VPC networks. | [vpc.md](./vpc.md) |
| Firewall rules | Distributed virtual firewall per VPC network. Two implied rules block all incoming and allow all outgoing connections. The `default` network adds rules such as `default-allow-internal`. | https://docs.cloud.google.com/vpc/docs/firewalls |
| Routes | Tell VMs and the network how to send traffic. Each network has system-generated routes (between subnets, and to the internet from eligible instances); you can add custom static routes. | https://docs.cloud.google.com/vpc/docs/routes |
| Forwarding rules | Direct traffic *to* a Google Cloud resource by IP address, protocol and port. Destinations: target instances, load balancer targets (backend services, target proxies, target pools), Classic VPN gateways. | https://docs.cloud.google.com/load-balancing/docs/forwarding-rule-concepts |
| IP addresses | Used by VMs, forwarding rules and GKE containers. | https://docs.cloud.google.com/vpc/docs/ip-addresses |
| Alias IP ranges | Give each service on one VM a different internal IP address; the network forwards packets to the VM. | https://docs.cloud.google.com/vpc/docs/alias-ip |
| Multiple network interfaces | Several NICs on one VM, for example a network appliance VM acting as gateway between VPC networks or to the internet. | https://docs.cloud.google.com/vpc/docs/multiple-interfaces-concepts |
| Network Connectivity Center (NCC) | Hub-and-spoke connectivity. VPC spokes connect two or more VPC networks to an NCC hub so they exchange subnet routes; hundreds of VPC spokes can be managed from one hub. | https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/overview |
| VPC Network Peering | Private connectivity between VPC networks in the same project, different projects or different organizations, using internal IP addresses only. | https://docs.cloud.google.com/vpc/docs/vpc-peering |
| Shared VPC | Share a VPC network from a host project to other projects in the organization; grant access to the whole network or selected subnets through IAM. | https://docs.cloud.google.com/vpc/docs/shared-vpc |
| Cloud VPN | Secure VPN from the VPC network to an on-premises network or another cloud provider. | https://docs.cloud.google.com/network-connectivity/docs/vpn |
| Cloud Interconnect | High-speed physical connection to an on-premises network. | https://docs.cloud.google.com/network-connectivity/docs/interconnect |
| Hybrid Subnets (Preview) | A single logical subnet combining an on-premises network segment with a VPC subnet, to migrate workloads without changing IP addresses. | https://docs.cloud.google.com/vpc/docs/hybrid-subnets |
| Cloud Load Balancing | Several load balancing configurations across many backend types. | https://docs.cloud.google.com/load-balancing/docs/load-balancing-overview |
| Private access to services | Private Service Connect, Private Google Access and private services access let VMs without an external IP address reach supported services. | https://docs.cloud.google.com/vpc/docs/private-access-options |

## Notes

- A VPC network provides connectivity for VMs (including GKE clusters, serverless workloads and other products built on Compute Engine VMs), built-in internal passthrough Network Load Balancers and proxy systems for internal Application Load Balancers, connectivity to on-premises networks through Cloud VPN tunnels and Cloud Interconnect VLAN attachments, and distribution of traffic from Google Cloud external load balancers to backends.
- VPC Network Peering exchanges subnet routes for private IP ranges automatically; you can configure whether subnet routes for privately re-used public IP ranges and custom static and dynamic routes are exchanged. IAM policies are never exchanged: Network and Security Admins of one network do not automatically get those roles on the peered network.
- Hybrid Subnets is Preview: subject to the "Pre-GA Offerings Terms"; pre-GA features are available "as is" and might have limited support.
- The gcloud examples above are borrowed from the gcloud reference because the source page has no code. The full flag list for `gcloud compute networks ...` is in the `gcp-compute` skill. Load balancer details are in the `gcp-load-balancing` skill.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/list (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/vpc/docs/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc.md](./vpc.md)
- [subnets.md](./subnets.md)
- [mtu.md](./mtu.md)
- [quota.md](./quota.md)
