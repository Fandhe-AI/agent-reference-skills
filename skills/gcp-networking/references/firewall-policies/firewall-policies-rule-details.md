---
source: https://docs.cloud.google.com/firewall/docs/firewall-policies-rule-details
---

# Firewall policy rule components

Components of a firewall policy rule in a hierarchical, global network or regional network firewall policy that applies to a regular VPC network: priority, action, enforcement, Layer 4 configs, logging, targets, sources and destinations. Each rule applies to ingress or egress, not both. For RoCE / RDMA network profiles see https://docs.cloud.google.com/firewall/docs/firewall-for-roce.

## Signature / Usage

### Create a rule in a global network firewall policy (example)

Adapted (not in the official docs): `--layer4-configs=tcp:80` and `--src-ip-ranges=192.0.2.0/24` are added because gcloud 593.0.0 rejects the help example ("argument --layer4-configs: Must be specified") and an ingress rule needs a source range or secure tag; replace the documentation range with your own source range.

```bash
gcloud compute network-firewall-policies rules create 10 \
  --firewall-policy=my-policy --action=allow \
  --layer4-configs=tcp:80 --src-ip-ranges=192.0.2.0/24 \
  --description="example rule" --global-firewall-policy
```

## Options / Props

### Priority

| Priority |
|---|
| Integer from `0` to `2,147,483,647` inclusive; `0` is highest. Every rule in a policy must have a unique priority. Firewall policy rules don't have names. |
| Only the highest-priority matching rule is enforced. Example: a `deny` rule for `0.0.0.0/0` at priority `1000` plus an `allow` rule for tag `tagKeys/123/tagValues/456` on TCP 80: allowed only if the second rule's number is less than `1000`. |

### Action on match

| Action | Behavior |
|--------|----------|
| `allow` | Allows packets for a new connection; stops evaluating the policy and all other rules. If the protocol and policy type support connection tracking, creates a tracking entry permitting ingress and egress packets. |
| `deny` | Disallows packets for a new connection; stops evaluating. Cloud NGFW checks the connection tracking table before rules, so an entry created by an allow rule takes precedence. |
| `apply_security_profile_group` | Intercepts packets for a new connection and sends them to a firewall endpoint or intercept endpoint group; stops evaluating. Creates a tracking entry. Not usable in regional network firewall policies or regional system firewall policies. |
| `goto_next` | Stops evaluating this policy and moves to the next step in the evaluation order. |

### Enforcement and Layer 4 configs

| Enforcement and Layer 4 configs |
|---|
| Enforcement is enabled or disabled; default enabled. |
| Layer 4 configs list: omitted = all protocols and destination ports. Each entry is an IP protocol name (`tcp`, `udp`, `icmp` for IPv4 ICMP, `esp`, `ah`, `sctp`, `ipip`) or IANA number (`17`) without ports, or a single protocol that uses ports with one port or a port range. IPv6 ICMP is protocol number `58`; IPv6 Hop-by-Hop is not supported. Source ports and ICMP types / codes are not supported. |
| Target type `INTERNAL_MANAGED_LB`: only TCP (`tcp` or `6`), no destination ports, must be an ingress rule, destination parameter must be omitted. |

### Logging

| Logging |
|---|
| Same as VPC firewall rules logging, except: the reference field includes the policy ID and a number for the attachment level (`0` = organization, `1` = top-level folder); logs include a `target_resource` field. |
| Logging can be enabled only for `allow`, `deny` and `apply_security_profile_group` rules, not `goto_next`. |
| With `apply_security_profile_group` one log entry is produced when a session is redirected; the firewall endpoint produces its own logs, possibly multiple entries per session. |

### Targets

| Target parameter | Hierarchical | Global | Regional | `INSTANCES` | `INTERNAL_MANAGED_LB` |
|---|---|---|---|---|---|
| Target VPC network resources (`target-resources`) | Yes | No | No | Yes | No |
| Target service accounts (`target-service-accounts`) | Yes | Yes | Yes | Yes | No |
| Target secure tags, network purpose data | No | Yes | Yes | Yes | No |
| Target secure tags, organization purpose data (`organization=auto`) | Yes | Yes | Yes | Yes | No |
| Target forwarding rules (`target-forwarding-rules`) | No | Yes | Yes | No | Yes |

| Item | Details |
|---|---|
| Target type omitted or `INSTANCES` | VM network interfaces (including GKE nodes and App Engine flexible instances); ingress and egress. Target type `INTERNAL_MANAGED_LB`: managed Envoy proxies of internal Application Load Balancers and internal proxy Network Load Balancers. |
| Combinations | `target-resources` with `target-service-accounts` (hierarchical only), or with `target-secure-tags` from an `organization=auto` tag key (hierarchical only). |
| Broadest instance targets | hierarchical = all VM interfaces in any VPC network in projects under the associated folder / organization; global = all VM interfaces in the associated network; regional = all VM interfaces in the region and network of the policy. |
| `target-forwarding-rules` formats | regional `https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/regions/REGION/forwardingRules/FORWARDING_RULE_NAME` or `projects/PROJECT_ID/regions/REGION/forwardingRules/FORWARDING_RULE_NAME`; cross-region `.../projects/PROJECT_ID/global/forwardingRules/FORWARDING_RULE_NAME` or `projects/PROJECT_ID/global/forwardingRules/FORWARDING_RULE_NAME`. |

### Ingress sources (at least one required)

| Source parameter | Hier. | Global | Regional | `INSTANCES` | `INTERNAL_MANAGED_LB` |
|---|---|---|---|---|---|
| Source IP ranges (IPv4 or IPv6 CIDR) | Yes | Yes | Yes | Yes | Yes |
| Source address groups | Yes | Yes | Yes | Yes | Yes |
| Source domain names (FQDN objects) | Yes | Yes | Yes | Yes | Yes |
| Source secure tags, network purpose | No | Yes | Yes | Yes | No |
| Source secure tags, organization purpose | Yes | Yes | Yes | Yes | No |
| Source geolocations | Yes | Yes | Yes | Yes | No |
| Source Google Threat Intelligence lists | Yes | Yes | Yes | Yes | No |
| Source network context | Yes | Yes | Yes | Yes | Yes |

| Ingress sources (at least one required) |
|---|
| Combination limits: IP ranges contain IPv4 or IPv6, not both; IPv4 and IPv6 address groups/ranges cannot be mixed; the internet network context cannot be used with source secure tags; non-internet, VPC networks and inter-VPC contexts cannot be used with Threat Intelligence lists or geolocations. |
| Matching: without a network context, a packet matches if it matches at least one source parameter; with a network context it must match the context and at least one other parameter. |
| Source secure tags match VM interfaces bound to the tag value; for regional policies the VM must be in a zone of the policy's region; the interface must be in the policy's VPC network, a peered network, or a spoke on the same Network Connectivity Center hub. |

### Egress destinations (at least one required)

| Destination parameter | Hier. | Global | Regional | `INSTANCES` | `INTERNAL_MANAGED_LB` |
|---|---|---|---|---|---|
| Destination IP ranges | Yes | Yes | Yes | Yes | No |
| Destination address groups | Yes | Yes | Yes | Yes | No |
| Destination domain names | Yes | Yes | Yes | Yes | No |
| Destination geolocations | Yes | Yes | Yes | Yes | No |
| Destination Google Threat Intelligence lists | Yes | Yes | Yes | Yes | No |
| Destination network context | Yes | Yes | Yes | Yes | No |

| Egress destinations (at least one required) |
|---|
| Destination Threat Intelligence lists or geolocations cannot be used with destination non-internet network context. Matching logic mirrors the ingress rule. |

## Notes

- With an external IPv4 address or Cloud NAT, egress evaluation occurs before the source is changed to the external address, so omit the Source parameter or include the interface's internal IPv4 address; ingress evaluation occurs after destination NAT, so omit Destination or include the internal IPv4 address.
- If a rule has source IP and destination parameters (or vice versa), parameters are resolved to the same IP version (for example an FQDN resolving to IPv4 and IPv6 uses only IPv4 with an IPv4 source range).
- The `target-forwarding-rules` binding is by forwarding rule ID, not name: a recreated forwarding rule with the same name is not rebound automatically; update the firewall rule. A rule in a global policy with `INTERNAL_MANAGED_LB` and `apply_security_profile_group` must target a single cross-region internal Application Load Balancer.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/network-firewall-policies/rules/create (gcloud 593.0.0 help). The full flag list is in the `gcp-compute` skill.
- Adapted from the official docs: the help example for `network-firewall-policies rules create` omitted the required `--layer4-configs` and, for an ingress rule, `--src-ip-ranges` / `--src-secure-tags`; `--layer4-configs=tcp:80 --src-ip-ranges=192.0.2.0/24` was added.
- Corrected from the official docs: the source states the upper bound as `2,147,483,547`; the Compute Engine API (`FirewallPolicyRule.priority`) documents "a positive value between 0 and 2147483647", so `2,147,483,647` is used.
- Clarified from the official docs: Envoy-based load balancers (internal Application Load Balancers and internal proxy Network Load Balancers) are protected only by global and regional network firewall policies; the Cloud NGFW page (https://docs.cloud.google.com/firewall/docs/about-firewalls, retrieved 2026-11-17) lists hierarchical firewall policies and VPC firewall rules as "Not supported" for them, and Enterprise-tier regional network policies as not supported.
- Source: https://docs.cloud.google.com/firewall/docs/firewall-policies-rule-details (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [firewall-policies-overview.md](./firewall-policies-overview.md)
- [firewall-policies-rule-eval-order.md](./firewall-policies-rule-eval-order.md)
- [network-firewall-policies.md](./network-firewall-policies.md)
- [firewall-policies.md](./firewall-policies.md)
