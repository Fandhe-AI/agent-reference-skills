---
source: https://docs.cloud.google.com/load-balancing/docs/network/networklb-backend-service
---

# Backend service-based regional external passthrough Network Load Balancer overview

Regional external passthrough Network Load Balancers are regional, Layer 4, not proxies: they distribute external traffic among instance group or zonal NEG backends in the load balancer's region, keeping source and destination IP addresses, protocol and ports unchanged. Backends terminate the connection and reply directly to clients (direct server return). Backends must be in the same region and project but can be in different VPC networks.

## Signature / Usage

### Inspect a forwarding rule

Snippet taken from https://docs.cloud.google.com/load-balancing/docs/tcp/internal-proxy (the command that determines the mode of a load balancer; it applies to any forwarding rule).

```bash
gcloud compute forwarding-rules describe FORWARDING_RULE_NAME
```

### Components of one load balancer

- One or more regional external IP addresses and forwarding rules
- One regional external backend service (its name is the load balancer name in the console)
- Backends: either all instance groups or all zonal NEGs (`GCE_VM_IP` endpoints)
- A regional health check on the backend service
- Firewall rules that allow load-balanced traffic and health check probes to reach the backend VMs

## Options / Props

### Forwarding rule and backend service protocols

| Traffic to be load balanced | Forwarding rule protocol | Backend service protocol |
|---|---|---|
| TCP | `TCP` | `TCP` or `UNSPECIFIED` |
| TCP | `L3_DEFAULT` | `UNSPECIFIED` |
| UDP | `UDP` | `UDP` or `UNSPECIFIED` |
| UDP | `L3_DEFAULT` | `UNSPECIFIED` |
| ESP, GRE, ICMP/ICMPv6 (echo request only) | `L3_DEFAULT` | `UNSPECIFIED` |

### Limits and constraints

| Item | Value |
|---|---|
| Forwarding rule IPv6 range | a `/96` range from a dual-stack or IPv6-only subnet with an external IPv6 subnet range (`--ipv6-access-type` `EXTERNAL`) |
| `sourceIPRanges` (traffic steering) | comma-separated list of up to 64 source IP addresses or ranges; updatable at any time |
| `L3_DEFAULT` forwarding rules per IP address | only one |
| Backend types per backend service | instance groups or zonal NEGs, not both; zonal NEGs must use `GCE_VM_IP` |
| Backend service protocols | `TCP`, `UDP`, `UNSPECIFIED` |

### Multiple forwarding rules (same regional external IP)

| Multiple forwarding rules (same regional external IP) |
|---|
| A forwarding rule for all ports of a protocol prevents other forwarding rules with the same protocol and IP address. Example: `198.51.100.1` + `TCP` + all ports blocks any other TCP rule on that IP, but two TCP rules with ports `80,443` and range `81-442` can coexist. |
| A single `L3_DEFAULT` rule can coexist with TCP/UDP-specific rules on the same IP as a fallback; it handles a packet only if no protocol-specific rule matches its destination IP, protocol and port. |
| Selection order: eliminate rules whose protocol doesn't match (except `L3_DEFAULT`); eliminate rules whose port doesn't match (all-ports rules stay); if both `L3_DEFAULT` and protocol-specific rules remain, drop the `L3_DEFAULT` ones; if several steering rules remain, pick the one whose source range is the longest-prefix match for the packet's source IP, else the parent rule; zero candidates means the packet is dropped. |
| Applications on backends must bind to all external IP addresses of the load balancer's forwarding rules. |

### IPv6 and dual-stack backends

| Backend type | Requirements |
|---|---|
| Dual-stack | Subnets in the same region as the IPv6 forwarding rule, `ipv6-access-type` `EXTERNAL` or `INTERNAL` (if `INTERNAL`, use a different IPv6-only or `EXTERNAL` dual-stack subnet for the forwarding rule); VM `stack-type` `IPV4_IPV6`; with an `EXTERNAL` backend subnet also `--ipv6-network-tier` `PREMIUM` or `STANDARD` (Preview) |
| IPv6-only | Only managed and unmanaged instance groups; dual-stack or IPv6-only subnets in the forwarding rule's region; VM `stack-type` `IPV6_ONLY`; with an `EXTERNAL` backend subnet `--ipv6-network-tier` must match the subnet's tier |

### Return packets

| Traffic type | Source | Destination |
|---|---|---|
| TCP | The requesting packet's destination | The requesting packet's source |
| UDP, ESP, GRE, ICMP, ICMPv6 | For most use cases, the requesting packet's destination | The requesting packet's source |

### Shared VPC

| Location of load balancing resources (forwarding rule, backend service, health check, backends) | Required location of IP address resource |
|---|---|
| Host project | Host project |
| Service project | Service project or host project |

## Notes

- Forwarding rule and backend service protocols: `L3_DEFAULT` requires accepting all ports: `--ports=ALL` in gcloud, or `allPorts` set to `True` in the API.
- Traffic steering (`sourceIPRanges`): A steering forwarding rule has at least one `sourceIPRanges` entry and needs a parent forwarding rule with the same external IP, protocol and ports but no source range (for example parent `198.51.100.1` TCP 80; steering `198.51.100.1` TCP 80 with `203.0.113.0/24`). A parent rule pointing to a backend service can have a steering rule pointing to a backend service or a target instance. Steering rules of one parent may have overlapping but not identical ranges. All steering rules must be deleted before their parent can be deleted (destructive; try it on a disposable resource first).
- Traffic steering (`sourceIPRanges`): Session affinity across steering changes: it doesn't break if a connection keeps matching the same rule. It always breaks if the newly matched rule's backend service (or target instance) doesn't reference the previously selected VM, or does but isn't configured to persist connections on unhealthy backends and that VM fails health checks. It might break if session affinity and connection tracking mode yield a different tracking hash. For two backend services, make session affinity and connection tracking settings identical manually (not validated); a steering rule pointing to a target instance inherits them from the parent.
- IPv6 and dual-stack backends: IPv6-only VMs can be created in dual-stack and IPv6-only subnets; dual-stack VMs can't be created in IPv6-only subnets.
- Return packets: Applications must listen on the forwarding rule IP or any address (`0.0.0.0` or `::`) and, for port-based protocols, on a port in the forwarding rule.
- Network tiers: regional external IPv4 addresses support Standard and Premium Tier; the IP address and forwarding rule must use the same tier. External IPv6 is available in Premium Tier and Standard Tier (Preview). A custom ephemeral IPv6 address needs gcloud or the API, not the console. Use a reserved IP address if the address must survive forwarding rule deletion or be shared by several rules.
- Backends: unmanaged, zonal managed or regional managed instance groups (regional MIGs spread across zones are best), or `GCE_VM_IP` zonal NEGs in the same region. Instance group backends always send to `nic0`; to reach non-`nic0` interfaces use zonal NEGs whose interface is a load balancer target interface. The backend service has no VPC network; backends can be in the same or different VPC networks if all are in the same region and project and of one type. The load balancer is highly available by design; deploy backends in multiple zones.
- Health checks: regional health checks, any supported protocol; UDP health checks are not supported, so for non-TCP traffic run a TCP-based server (for example HTTP returning `200` only when the application is healthy). Probers use the passthrough probe IP ranges, the destination IP is each forwarding rule IP, and probes go to `nic0` (instance groups) or the NEG subnet's interface.
- Firewall: the load balancer is not a proxy, so create ingress allow firewall rules or hierarchical firewall policy for health checks and client traffic; otherwise the implied deny ingress rule blocks it. Accepting any internet client needs source `0.0.0.0/0` or `::/0`; restrict protocols and ports (especially with `L3_DEFAULT`) and use narrower source ranges where possible.
- Outbound connectivity: backends can initiate internet connections with the forwarding rule IP as source in special cases; responses are load balanced and may land on a different backend (synchronize connection state or use a failover configuration with one primary and one backup). If this path is a security concern, use targeted egress firewall rules.
- Limitations: the console cannot create or modify `L3_DEFAULT` forwarding rules, `UNSPECIFIED` backend service protocol, connection tracking policies or source IP-based traffic steering (use gcloud or REST). VPC Network Peering is not supported. With Dynamic NICs, add local routes for forwarding rule IPs manually.
- Cloud Armor advanced network DDoS protection is supported (Cloud Armor is in the planned `gcp-security`). For GKE use the built-in GKE Service controller (see `gcp-gke`).
- This is Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`). Prices are not copied: see https://cloud.google.com/vpc/network-pricing#cloud-load-balancing.
- The full `gcloud compute forwarding-rules|backend-services ...` flag lists are in the `gcp-compute` skill.
- Source inconsistency: the network tiers statement says "External IPv6 is available in Premium Tier and Standard Tier (Preview)" while the same source also says "Regional external IPv6 addresses are available in both Premium Tier and Standard Tier" without a Preview label, and the forwarding rule concepts page (https://docs.cloud.google.com/load-balancing/docs/forwarding-rule-concepts, retrieved 2026-11-17) says "supports both Premium Tier and Standard Tier ([Preview])" for regional external passthrough. The Preview label here is kept on IPv6 in Standard Tier as the source states it in that sentence.
- Corrected from the official docs: the health check guidance in the source says to bind to "any of the VM's IP addresses (`0.0.0.0` or `::/0`)" while its requirements list says "(`0.0.0.0` or `::`)"; this page uses `0.0.0.0` or `::`, because `::/0` is a CIDR range, not an address an application binds to.
- Source: https://docs.cloud.google.com/load-balancing/docs/network/networklb-backend-service (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/load-balancing/docs/tcp/internal-proxy (retrieved 2026-11-17).

## Related

- [passthrough-network-load-balancer.md](./passthrough-network-load-balancer.md)
- [internal.md](./internal.md)
