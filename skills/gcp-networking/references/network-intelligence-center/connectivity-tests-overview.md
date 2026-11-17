---
source: https://docs.cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/overview
---

# Connectivity Tests overview

Connectivity Tests is a diagnostics tool that checks connectivity between network endpoints. It analyzes your configuration and, in some cases, performs live data plane analysis. It simulates the expected forwarding path of a packet through your VPC network, Cloud VPN tunnels, or VLAN attachments (and the expected inbound path to VPC resources). The API is the Network Management API.

## Signature / Usage

### Describe a test

```bash
gcloud network-management connectivity-tests describe my-test
```

### Rerun a test

```bash
gcloud network-management connectivity-tests rerun my-test
```

## Options / Props

### Configuration analysis: supported endpoints

| Role | Supported endpoints |
|---|---|
| Source | Compute Engine instance; Cloud Run service; Cloud Run job; Cloud Run functions (1st gen); App Engine standard environment; Cloud SQL instance; Database Migration Service private connection; GKE control plane; GKE Pod; internet IP address; IP address from an on-premises network; IP address of a Compute Engine instance / Cloud SQL instance / GKE control plane / GKE Pod; unassigned IP address in a VPC network |
| Destination | Compute Engine instance; Cloud SQL instance; GKE control plane; GKE Pod; external and internal Application Load Balancer; external and internal Proxy Network Load Balancer; external and internal Passthrough Network Load Balancer; Private Service Connect endpoint; Memorystore for Redis Cluster; Memorystore for Redis instance; internet IP address; IP address from an on-premises network; IP address of a forwarding rule / Compute Engine instance / Cloud SQL instance / GKE control plane / GKE Pod / Memorystore for Redis Cluster / Memorystore for Redis instance |

### Configuration analysis: unsupported

| Configuration analysis: unsupported |
|---|
| Firewall policy rules with FQDN objects (a warning is returned if they could affect the flow). |
| Internet NEG backends targeting FQDNs (IP-targeting internet NEGs are supported). |
| Cloud Service Mesh load balancers with `INTERNAL_SELF_MANAGED` forwarding rules. |
| Google Cloud Armor policies are not considered when tracing to an external Application Load Balancer IP. |
| HA VPN gateways connected to Compute Engine instances. |
| Cloud SQL external server replicas defined by DNS names (IP-defined replicas are supported). |
| Cloud Run functions (2nd gen); test the underlying Cloud Run revision instead. |
| App Engine flexible environment; Cloud Run worker pools. |

### Live data plane analysis

| Status | Probes that reached destination |
|---|---|
| Reachable | At least 95% |
| Unreachable | None |
| Partially reachable | More than 0 and less than 95% |

| Role | Supported live data plane endpoints |
|---|---|
| Source | Compute Engine instance; serverless endpoint with a Serverless VPC Access connector (Cloud Run service / job, Cloud Run functions 1st gen, App Engine standard); GKE control plane; Cloud SQL instance; Database Migration Service private connection |
| Destination | Compute Engine instance; internal passthrough Network Load Balancer; Private Service Connect with a producer internal passthrough NLB; internet IP (tested to the network edge location); Cloud Interconnect VLAN attachment; private endpoint of Cloud SQL / Memorystore for Redis Cluster / Memorystore for Redis instance / GKE control plane |

### Result time

| Project size | Google Cloud resources | Response latency (95% of queries) |
|---|---|---|
| Small | Fewer than 50 | 60 seconds |
| Medium | More than 50, fewer than 5000 | 120 seconds |
| Large | More than 5000 | 600 seconds |

## Notes

- Configuration analysis: supported endpoints: Supported networking features (IPv4 and IPv6 whenever applicable): VPC networks, VPC Network Peering, Shared VPC, Private Google Access, Cloud Load Balancing, alias IP ranges, privately used public IPv4 addresses, multiple network interfaces, VPC routing, VPC firewall rules, regional network firewall policies, hierarchical and global network firewall policies, Resource Manager tags for firewalls, policy-based routes, Private Service Connect, IPv6 instances, VPC spokes and hybrid spokes for NCC, Public NAT and Private NAT, Cloud VPN, Cloud Interconnect, Cloud Router (BGP dynamic and static routes).
- Live data plane analysis: Sends multiple probe packets from source to destination (for non-Google destinations, to the network edge location). Supports TCP and UDP only.
- Live data plane analysis: Results also show median and 95th percentile one-way latency.
- Live data plane analysis: Not supported (not executed): internet IP or inbound Interconnect / Cloud VPN / NCC hybrid spoke traffic as source; unassigned VPC IPs as source; same instance as source and destination; non-running instances; GKE Pods; Google APIs and services; external/internal Application and Proxy Network Load Balancers; external passthrough Network Load Balancer; Cloud VPN; NAT64.
- Result time: Results take 30 seconds up to 10 minutes.
- Configuration analysis is based on configuration only and might not represent the data plane. `Packet could be delivered` does not guarantee traffic passes.
- Connectivity Tests has no knowledge of networks outside Google Cloud and does not perform firewall connection tracking (the configuration analysis can simulate it by allowing a return connection when the test initiated the outbound one). It cannot test instances that act as routers, firewalls, NAT gateways, or VPNs.
- For Google-managed services (Cloud SQL, GKE) only an overall reachability result is returned for the Google-owned VPC network.
- Live data plane analysis is a one-time diagnostic, not continuous monitoring; use Performance Dashboard (see performance-dashboard-overview.md). Load balancer backends and ECMP paths are chosen randomly per probe.
- Serverless source IPs are nondeterministic; a random address from the available pool is used per run.
- GKE: to evaluate GKE network policies and IP masquerading, use Pods as test endpoints.
- VPC Service Controls can protect Connectivity Tests (service perimeters); VPC Service Controls is in the planned `gcp-security` skill.
- Snippets taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-management/connectivity-tests/describe and https://docs.cloud.google.com/sdk/gcloud/reference/network-management/connectivity-tests/rerun (gcloud 593.0.0 help). The source page has no code. The full `gcloud compute ...` resource flags are in the `gcp-compute` skill.
- Source: https://docs.cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [network-intelligence-center-overview.md](./network-intelligence-center-overview.md)
- [performance-dashboard-overview.md](./performance-dashboard-overview.md)
- [vpc-flow-logs.md](./vpc-flow-logs.md)
