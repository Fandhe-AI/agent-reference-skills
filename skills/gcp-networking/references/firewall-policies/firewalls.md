---
source: https://docs.cloud.google.com/firewall/docs/firewalls
---

# VPC firewall rules

VPC firewall rules apply to a given project and network and allow or deny connections to or from VM instances. Enabled rules are always enforced regardless of instance configuration or OS. The network acts as a distributed firewall: rules are defined at network level but enforced per instance. To apply rules across multiple networks use firewall policies. Creation tasks are in https://docs.cloud.google.com/firewall/docs/using-firewalls.

## Signature / Usage

### Create a rule (example)

```bash
gcloud compute firewall-rules create tcp-rule --allow=tcp:80 \
    --source-ranges="10.0.0.0/22,10.0.0.0/14" \
    --description="Narrowing TCP traffic"
```

## Options / Props

### Components

| Component | Values |
|-----------|--------|
| Direction | ingress or egress (not both); default ingress |
| Priority | integer `0`-`65535` inclusive, default `1000`; duplicates allowed (firewall policy rules: 0 to 2,147,483,647, unique, no default) |
| Action | `allow` or `deny` (one per rule) |
| Enforcement | `enabled` (default) or `disabled` |
| Target | all instances (default), target network tags, or target service accounts |
| Source / destination | IPv4 or IPv6 CIDR ranges (one family per rule); ingress also source tags / service accounts |
| Protocols and ports | omitted = all; `tcp`, `tcp:80`, `tcp:20-22`, `icmp,tcp:80`; names `tcp`, `udp`, `icmp`, `esp`, `ah`, `sctp`, `ipip`, other protocols by IANA number |
| Logs | boolean; logs matching connections to Cloud Logging |

### Specifications

- IPv4 supported; IPv6 supported in networks with IPv6 enabled. Rules cannot be shared across networks, including peered or VPN-connected networks.
- Stateful: return traffic matching the 5-tuple (reversed) is allowed; connection tracking is active if at least one packet is sent every 10 minutes. IPv4: TCP, UDP, SCTP, ICMP; IPv6: TCP, UDP, SCTP, ICMPv6. Only the first fragment of return traffic is allowed by tracking. Rules do not reassemble fragmented TCP packets.
- Changes to enforcement, new enforced rules, or rules that deny previously allowed traffic apply only to new connections.
- A port cannot be given alone: `80` is interpreted as IP protocol 80 (ISO-IP), not TCP port 80. Source-port rules and ICMP types are not supported; IPv6 Hop-by-Hop is not supported.
- A `deny` overrides an `allow` only at the same priority. Target specificity does not matter; the highest priority rule wins.

| Instance machine type | Maximum stateful connections |
|---|---|
| Shared-core machine types | 130,000 |
| Instances with 1-8 vCPUs | 130,000 connections per vCPU |
| Instances with more than 8 vCPUs | 1,040,000 (130,000x8) total |

When the maximum is exceeded, tracking stops for connections with the longest idle interval.

### Pre-populated rules in the default network (can be deleted or modified)

| Rule | Priority | Source ranges | Protocols and ports |
|---|---|---|---|
| `default-allow-internal` | `65534` | `10.128.0.0/9` | `tcp:0-65535 udp:0-65535 icmp` |
| `default-allow-ssh` | `65534` | `0.0.0.0/0` | `tcp:22` |
| `default-allow-rdp` | `65534` | `0.0.0.0/0` | `tcp:3389` |
| `default-allow-icmp` | `65534` | `0.0.0.0/0` | `icmp` |

All are ingress, action `allow`.

### Blocked and limited traffic

- Packet rate and bandwidth accounted per VM, per NIC / IP, bounded by machine type.
- Incoming DHCP offers/acks (UDP 68 DHCPv4, UDP 546 DHCPv6) blocked except from the metadata server.
- External IP addresses accept only TCP, UDP, ICMP, IPIP, AH, ESP, SCTP and GRE; load balancer forwarding rules and Cloud VPN add further restrictions.
- Egress to TCP port 25 of external IPs is blocked by default (removed automatically for low-risk projects; TLS on 465 / 587 excluded; internal IPs unaffected). If allowed, egress rules must allow it, the route must use the default internet gateway, and the instance must meet internet access requirements. Prevent it with egress deny rules.

### Always allowed traffic

Rules and hierarchical policies do not apply to metadata server traffic (`169.254.169.254`, `fd20:ce::254`; DHCP, DNS, instance metadata, NTP) or packets to the instance's own NIC addresses (primary internal IPv4, alias IP ranges, IPv6, forwarding-rule IPs of load balancer backends or protocol-forwarding targets, loopback, overlay addresses).

### Targets, sources and service accounts vs tags

- Ingress targets receive the packet; destination defaults to NIC addresses, alias ranges, external IPv4, IPv6, forwarding rule IPs and custom static route next-hop ranges. Egress with IP forwarding disabled (default) can only emit the NIC's own source addresses.
- Default ingress source `0.0.0.0/0` (no IPv6). Default egress destination `0.0.0.0/0` (no IPv6). Source tags / service accounts imply only the primary internal IPv4 or IPv6 addresses (not alias or external ranges); combined with ranges the source is the union.
- Network tags and service accounts cannot be mixed in one rule: target tags exclude source service accounts (and IP ranges + service accounts); target service account excludes source tags (and IP ranges + tags).
- Network tags can be edited by anyone who can edit the instance (for example Compute Engine Instance Admin); service accounts require Service Account User; changing an instance's service account needs a stop and restart. Service account rules apply to the GKE node, not the Pod; GKE Workload Identity Federation service accounts cannot be used.
- Service accounts must exist in the rule's project (standalone VPC) or the host or any service project (Shared VPC); otherwise the rule is not enforced.

### Roles and permissions

| Task | Permission | Sample role |
|---|---|---|
| Create / delete / update | `compute.firewalls.create` / `delete` / `update` | Compute Security Admin (`roles/compute.securityAdmin`) |
| View details / list | `compute.firewalls.get` / `list` | Compute Network Viewer (`roles/compute.networkViewer`) |

## Notes

- Best practices: least privilege, restrict protocols and ports, hierarchical rules for never-allowed traffic, service accounts for allow-rule targets, few IP-based rules, use firewall policies with address groups / FQDN objects / geolocation objects (may incur Cloud NGFW Standard data processing charges), enable firewall rules logging and Firewall Insights (logging can incur costs).
- The default network's `default-allow-ssh` and `default-allow-rdp` rules allow `0.0.0.0/0` as the source for ports 22 and 3389; the source states they can be deleted or modified. Review them before relying on the default network.
- Deleting or disabling rules changes what traffic reaches instances and can break connectivity; try it on a disposable network first.
- Product interactions: firewall rules control which protocols and ports reach passthrough load balancer backends, but not what a proxy load balancer's forwarding rule accepts (they control proxy-to-backend traffic); they do not control which ports Cloud VPN gateways accept; GKE creates firewall rules automatically. Load balancer details are in the `gcp-load-balancing` skill; GKE in `gcp-gke`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/firewall-rules/create (gcloud 593.0.0 help). The full flag list is in the `gcp-compute` skill.
- Corrected from the official docs: the source states the firewall policy rule priority range as `0 to 2,147,483,547`; the Compute Engine API (`FirewallPolicyRule.priority`) documents "a positive value between 0 and 2147483647", so `2,147,483,647` is used.
- Source: https://docs.cloud.google.com/firewall/docs/firewalls (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [firewall-policies-overview.md](./firewall-policies-overview.md)
- [firewall-policies-rule-eval-order.md](./firewall-policies-rule-eval-order.md)
- [firewall-policies-rule-details.md](./firewall-policies-rule-details.md)
