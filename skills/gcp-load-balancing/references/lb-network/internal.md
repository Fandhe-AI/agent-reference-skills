---
source: https://docs.cloud.google.com/load-balancing/docs/internal
---

# Internal passthrough Network Load Balancer overview

An internal passthrough Network Load Balancer is a regional, Layer 4 load balancer built on the Andromeda network virtualization stack. It distributes traffic among internal VMs in one region of a VPC network behind an internal IP address reachable only from the same VPC network or networks connected to it. It doesn't terminate connections; responses return by direct server return.

## Signature / Usage

### Create an internal forwarding rule

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/forwarding-rules/create (gcloud 593.0.0 help).

```bash
gcloud compute forwarding-rules create RULE_NAME \
    --load-balancing-scheme=INTERNAL \
    --backend-service=SERVICE_NAME --subnet=SUBNET_NAME \
    --network=default --region=REGION --ports=80-82
```

### Use it when

- You need a high-performance pass-through Layer 4 load balancer for TCP, UDP, ICMP, ICMPv6, SCTP, ESP, AH and GRE.
- TLS may be terminated by backends (the load balancer cannot terminate SSL).
- You must forward original packets un-proxied (client source IP preserved), or migrate an existing pass-through setup unchanged.

## Options / Props

### Supported configuration

| Item | Value |
|---|---|
| Backend service | One, scheme `INTERNAL`, regional, single VPC network |
| Backends | Managed/unmanaged instance groups, or `GCE_VM_IP` zonal NEGs (endpoints must be primary internal IPs in the NEG's subnet and zone) in one region and VPC network; instance groups or NEGs, not both |
| IP versions | IPv4 and IPv6 with instance group backends; `GCE_VM_IP` zonal NEGs support IPv4 only |
| Forwarding rule protocols (IPv4) | `TCP`, `UDP`, `L3_DEFAULT` |
| Forwarding rule protocols (IPv6) | `TCP`, `UDP` |
| Backend service protocols (IPv4) | `TCP`, `UDP`, `UNSPECIFIED` |
| Backend service protocols (IPv6) | `TCP`, `UDP` |
| Ports per forwarding rule | 1 to 5 ports, or `ALL` |
| Clients | Same region (default), any region with global access |
| Not supported | Backend VMs in multiple regions; traffic from the internet (unless used with an external load balancer); IPv6 packets with fragmented headers |

| Traffic to be load-balanced | Forwarding rule protocol | Backend service protocol |
|---|---|---|
| TCP (IPv4 or IPv6) | `TCP` | `TCP or UNSPECIFIED` |
| UDP (IPv4 or IPv6) | `UDP` | `UDP or UNSPECIFIED` |
| TCP, UDP, ICMP, ICMPv6, SCTP, ESP, AH, and GRE | `L3_DEFAULT` | `UNSPECIFIED` |

### Client access

| Global access disabled | Global access enabled |
|---|---|
| Clients in the same region and in the same VPC network or one connected by VPC Network Peering. On-premises clients through Cloud VPN tunnels or VLAN attachments in the same region. | Clients in any region (same or peered VPC network). On-premises clients through tunnels or attachments in any region. |

### IP addresses and forwarding rules

| IP addresses and forwarding rules |
|---|
| IPv4: an address from the subnet's primary IPv4 range (reserved, custom ephemeral or auto-assigned ephemeral). IPv6: a `/96` range from the subnet's `/64` internal IPv6 range; the subnet must be dual-stack or IPv6-only with `ipv6-access-type` `INTERNAL`. A custom ephemeral IPv6 address needs gcloud or the API (not the console). |
| The forwarding rule must reference a subnet in the same VPC network and region as the backend components (not necessarily the backend subnet). For both IPv4 and IPv6, create two forwarding rules (the IPv6 one pointing only to dual-stack backends; both may share one backend service referencing dual-stack backends). |
| For more than five specific ports: use all ports, then ingress allow firewall rules for the wanted ports on the backend VMs. |
| A forwarding rule cannot be modified after creation; to change ports or the internal IP address, delete and recreate it (connectivity-breaking; try on a disposable resource first). |
| Multiple forwarding rules for one backend service: unique IPs, or a shared IP with different sets of up to five ports each. |

### Dual-stack and IPv6-only backends

| Backend type | Requirements |
|---|---|
| Dual-stack | Dual-stack subnets in the forwarding rule's region, `ipv6-access-type` `INTERNAL` or `EXTERNAL` (if `EXTERNAL`, use a different dual-stack or IPv6-only `INTERNAL` subnet for the forwarding rule); VM `stack-type` `IPV4_IPV6`; with `EXTERNAL` also `--ipv6-network-tier` `PREMIUM` |
| IPv6-only | Only unmanaged instance groups; dual-stack or IPv6-only subnets in the region; VM `stack-type` `IPV6_ONLY`; with `EXTERNAL` also `--ipv6-network-tier` `PREMIUM` |

### Return packets

| Traffic type | Source | Destination |
|---|---|---|
| TCP, SCTP | The requesting packet's destination | The requesting packet's source |
| UDP, ICMP, ICMPv6, ESP, AH, and GRE | For most use cases, the requesting packet's destination | The requesting packet's source |

## Notes

- Supported configuration: `L3_DEFAULT` requires `--ports=ALL` (gcloud) or `allPorts` `True` (API).
- Client access: Forwarding rules stay regional with global access; `allowGlobalAccess` is set to `true`.
- Backend service VPC network: Set with `--network`, or implicitly by the first forwarding rule's subnet network, the first instance group (its `nic0` network) or the first `GCE_VM_IP` zonal NEG; it cannot change afterwards. Rules: forwarding rule subnets must be in the backend service's network (even connected networks don't qualify); instance groups must use that network on `nic0` or each VM needs a load balancer target interface there; zonal NEG network must match.
- Shared VPC: The internal IP address, internal forwarding rule, regional internal backend service and health check must all be in the service project where the backend VMs are; the address and forwarding rule must reference the same subnet in the Shared VPC network of the host project. If the subnet is in the service project's own VPC network, the load balancer is local to that service project.
- Backend VMs need the Linux or Windows guest environment (guest agent) or equivalent, able to reach the metadata server (`metadata.google.internal`, 169.254.169.254) to install the local route for the load balancer IP (GKE Container-Optimized OS nodes use `iptables`). Applications must bind to the forwarding rule IP or any address (`0.0.0.0` or `::`) and a forwarded port.
- Firewall: allow ingress from the IPv4/IPv6 health check source ranges and from client source ranges (VPC firewall rules or hierarchical policies).
- Health checks: global or regional, any supported protocol and port; all protocols rely on TCP, so for other traffic run a TCP-based server (for example HTTP returning `200` only when the application works). Probes go to the interface in the backend service's network, with destination IP of each forwarding rule IP.
- Backend subsetting is optional; enable it only if you need more than 250 backend VMs on one load balancer. The load balancer is highly available by design; use regional managed instance groups or multiple zonal groups in different zones.
- Quotas: see https://docs.cloud.google.com/load-balancing/docs/quotas. Limitations: the console cannot create this load balancer with zonal NEG backends; with Dynamic NICs add local routes for forwarding rule IPs manually. Works with custom and auto mode VPC networks and existing legacy networks.
- This is Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- The full `gcloud compute forwarding-rules|backend-services ...` flag lists are in the `gcp-compute` skill. The source page has no code samples.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/forwarding-rules/create (gcloud 593.0.0 help).
- Corrected from the official docs: the source says to bind "to any address (`0.0.0.0/0` for IPv4 or `::/0` for IPv6)" in the multiple-forwarding-rules guidance and "(`0.0.0.0`)" in the health check guidance, but "(`0.0.0.0` or `::`)" in the requirements list; this page uses `0.0.0.0` or `::`, because `/0` forms are CIDR ranges, not addresses an application binds to.
- Source: https://docs.cloud.google.com/load-balancing/docs/internal (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [passthrough-network-load-balancer.md](./passthrough-network-load-balancer.md)
- [networklb-backend-service.md](./networklb-backend-service.md)
