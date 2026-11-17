---
source: https://docs.cloud.google.com/nat/docs/overview
---

# Cloud NAT overview

Cloud NAT provides network address translation (NAT) for outbound traffic to the internet, Virtual Private Cloud (VPC) networks, on-premises networks, and other cloud provider networks. A gateway is created in the region of the subnets that need NAT; it is a distributed, software-defined managed service (Andromeda), not proxy VMs or appliances.

## Signature / Usage

### Create a gateway (gcloud help example)

Snippet taken from the `gcloud compute routers nats create` help EXAMPLES (see Notes): automatically allocated NAT IP addresses for all subnet ranges of the region.

```bash
gcloud compute routers nats create nat1 --router=my-router \
    --auto-allocate-nat-external-ips --nat-all-subnet-ip-ranges
```

## Options / Props

### Resources translated

- Compute Engine VM instances
- Google Kubernetes Engine (GKE) clusters
- Cloud Run instances
- Cloud Run functions instances
- App Engine standard environment instances
- Regional internet network endpoint groups (NEGs)

### Supported resources by NAT type

| Resource | Public NAT | Private NAT |
|---|---|---|
| Compute Engine VM instances | Yes | Yes |
| GKE clusters | Yes | Yes |
| Cloud Run, Cloud Run functions, and App Engine (see note) | Yes | Yes |
| Regional internet NEGs | Yes | Not applicable |

Serverless endpoints supported: Cloud Run instances (services and jobs) and Cloud Run functions instances through Direct VPC egress (recommended) or Serverless VPC Access; App Engine standard environment instances through Serverless VPC Access.

### Private NAT destinations

| Destination | Description |
|---|---|
| Another VPC network | NAT for VPC networks attached to a Network Connectivity Center (NCC) hub: Private NAT for NCC spokes (NAT44) and NAT64 in Private NAT |
| Same VPC network | NAT for IPv6 traffic within the same VPC network (NAT64 in Private NAT) |
| On-premises or another cloud provider network | NAT for networks connected through NCC hybrid spokes (NAT44, NAT64), or through Cloud Interconnect or Cloud VPN (Hybrid NAT, NAT44; NAT64) |

## Notes

- A single gateway provides either Public NAT or Private NAT; two separate gateways can serve the same subnet with both types. Both types translate IPv4 to IPv4 and IPv6 to IPv4.
- Cloud NAT supports address translation for established inbound response packets only; it does not allow unsolicited inbound connections.
- Public NAT lets resources without external IPv4 addresses reach IPv4 internet destinations. Traffic to Google APIs and services is routed through Private Google Access even when the VM uses Public NAT.
- Private NAT is for private-to-private translation; if the VPC network has IPv4 subnets that overlap the destination network, the gateway translates source traffic to unique addresses so resources can reach any non-overlapping subnets of the destination.
- A NAT gateway is configured on a Cloud Router, which is only the control plane; packets do not pass through the gateway or the router.
- Cloud NAT does not reduce per-VM network bandwidth. Logging and Cloud Monitoring metrics are available; Network Analyzer publishes Cloud NAT insights.
- Egress is subject to egress firewall rules. Pricing: see https://cloud.google.com/nat/pricing (not copied).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/nats/create (gcloud 593.0.0 help). The full flag list is in the `gcp-compute` skill.
- Source: https://docs.cloud.google.com/nat/docs/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [public-nat.md](./public-nat.md)
- [private-nat.md](./private-nat.md)
- [ports-and-addresses.md](./ports-and-addresses.md)
- [nat-rules-overview.md](./nat-rules-overview.md)
- [nat-product-interactions.md](./nat-product-interactions.md)
- [quota.md](./quota.md)
