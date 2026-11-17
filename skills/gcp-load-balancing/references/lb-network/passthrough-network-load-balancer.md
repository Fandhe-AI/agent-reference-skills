---
source: https://docs.cloud.google.com/load-balancing/docs/passthrough-network-load-balancer
---

# Passthrough Network Load Balancer overview

Passthrough Network Load Balancers are Layer 4 passthrough load balancers (not proxies). Backends receive packets with the original source and destination IP addresses, protocol and (for port-based protocols) ports unchanged; connections terminate at the backends and responses go directly to clients (direct server return, DSR). Backends are in the load balancer's region, except for the global external passthrough Network Load Balancer, which spans multiple regions.

## Signature / Usage

### Inspect the forwarding rule of a load balancer

Snippet taken from https://docs.cloud.google.com/load-balancing/docs/tcp/internal-proxy (the command that determines the mode of a load balancer; it applies to any forwarding rule).

```bash
gcloud compute forwarding-rules describe FORWARDING_RULE_NAME
```

### When to use a passthrough Network Load Balancer

- Original client packets must reach backends un-proxied (for example to preserve the client source IP address).
- You need TCP, UDP, ESP, GRE, ICMP and ICMPv6 load balancing, or a TCP port that other load balancers don't support.
- SSL traffic may be decrypted by the backends (the load balancer cannot); you manage backend SSL certificates yourself, because Google-managed SSL certificates are only available for proxy load balancers.
- You have an existing passthrough setup to migrate without changes.

## Options / Props

### Deployment modes

| Mode | Scope | Traffic type | Network service tier | Load-balancing scheme | IP address | Frontend ports | Load balancing mode |
|---|---|---|---|---|---|---|---|
| Global external passthrough Network Load Balancer (Preview) (internet clients) | Global | TCP, UDP, ESP, GRE, ICMP, and ICMPv6 | Premium | EXTERNAL_PASSTHROUGH | IPv4 and IPv6 | A list of up to five ports, a range of ports, or all ports | `RATE` and `UTILIZATION` |
| Regional external passthrough Network Load Balancer (internet clients) | Regional | TCP, UDP, ESP, GRE, ICMP, and ICMPv6 | Premium or Standard | EXTERNAL | IPv4 and IPv6 | A list of up to five ports, a range of ports, or all ports | `CONNECTION` |
| Internal passthrough Network Load Balancer (VPC or connected networks) | Regional | TCP, UDP, ICMP, ICMPv6, SCTP, ESP, AH, and GRE | Premium | INTERNAL | IPv4 and IPv6 | A list of up to five ports, a range of ports, or all ports | `CONNECTION` |

## Notes

- Deployment modes: The load-balancing scheme is an attribute of the forwarding rule and the backend service.
- Global external: built on globally distributed Maglevs. Backends (instance groups or NEGs) can be in multiple regions. If a region is at capacity, new connections beyond capacity spill over to the next closest region(s) while existing connections stay; if a region is down, traffic fails over to the next closest region with capacity (needs eligible backends in two or more regions). Each load balancer gets two external IP addresses served by disjoint availability groups (AG0 and AG1). Clients: any internet client, Google Cloud VMs with external IPs, VMs with internet access through Cloud NAT or instance-based NAT.
- Regional external: backends (instance groups or NEGs) must be in the same region and project as the load balancer but can be in different VPC networks. Premium Tier IP: traffic uses Google's backbone and enters/exits at the edge point closest to the client; Standard Tier IP: traffic enters/exits at the peering point closest to the load balancer's region. Backend service-based load balancers support IPv4/IPv6, TCP/UDP/ESP/GRE/ICMP/ICMPv6, managed and unmanaged instance groups, zonal NEGs with `GCE_VM_IP` endpoints, failover policies and non-legacy health checks; GKE uses the built-in GKE Service controller; App Hub is supported.
- Target pool-based regional external load balancers are the legacy backend: TCP or UDP only, and forwarding rules support only external IPv4 addresses. Migration to backend services is described in "Migrate load balancers from target pools to backend services" (https://docs.cloud.google.com/load-balancing/docs/network/transition-to-backend-services).
- Internal: built on the Andromeda network virtualization stack; supports only regional backends; configurable in Premium Tier only. Reachable from connected networks through VPC Network Peering, Cloud VPN and Cloud Interconnect. Can be a next hop of a static route (IPv4 or IPv6; processes all supported traffic regardless of forwarding-rule and backend-service protocols; supports hub-and-spoke through VPC Network Peering and load balancing to `nic0` through `nic7`). Global access lets web-tier clients in another region reach it.
- Private Service Connect port mapping services use port mapping NEGs and look similar but don't load balance: PSC forwards traffic to service ports on producer VMs based on the client destination port. Traffic sent to a port mapping service from the same VPC network as the service is dropped.
- This is Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- The source diagrams are omitted. The full `gcloud compute ...` flag lists are in the `gcp-compute` skill.
- Snippet taken from https://docs.cloud.google.com/load-balancing/docs/tcp/internal-proxy (retrieved 2026-11-17). The source page has no code samples.
- Clarified from the official docs: this page does not label the global external passthrough Network Load Balancer as Preview, but the load balancer overview (https://docs.cloud.google.com/load-balancing/docs/load-balancing-overview, retrieved 2026-11-17) lists "Global external passthrough Network Load Balancer ([Preview])" and the load balancer selection page (https://docs.cloud.google.com/load-balancing/docs/choosing-load-balancer, retrieved 2026-11-17) marks "Global external" passthrough as Preview. The Preview label is added in the table above.
- Source: https://docs.cloud.google.com/load-balancing/docs/passthrough-network-load-balancer (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [networklb-backend-service.md](./networklb-backend-service.md)
- [internal.md](./internal.md)
- [proxy-network-load-balancer.md](./proxy-network-load-balancer.md)
