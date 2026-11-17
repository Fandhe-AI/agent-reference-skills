---
source: https://docs.cloud.google.com/nat/docs/nat-rules-overview
---

# Cloud NAT rules

A NAT rule defines a match condition and an action; when a packet matches, Cloud NAT applies the action. Public NAT supports source-based and destination-based rules; Private NAT supports only source-based rules (Preview).

## Signature / Usage

### Rule expression (CEL)

```text
inIpRange(destination.ip, "198.51.100.0/24")
```

### Create a rule (gcloud help example)

```bash
gcloud compute routers nats rules create 1 --nat=my-nat \
    --router=my-router --region=us-central1 \
    --match='inIpRange(destination.ip, "203.0.113.0/24")' \
    --source-nat-active-ips=a1
```

## Options / Props

### Public NAT vs Private NAT

| Characteristic | Public NAT | Private NAT |
|---|---|---|
| Rule types | Source-based or destination-based | Source-based only (Preview) |
| Combinations | Only source or only destination addresses | Source addresses combined with the next hop |
| IP version | IPv4 only | IPv4 only |
| IP forwarding support | Yes (source-based) | Yes |
| Destinations | Internet | Private networks |
| Unmatched traffic | Default rule or drop | Drop |

### Specifications (both)

| Item | Value |
|---|---|
| Priority | 0 (highest) to 65,000 (lowest); unique per rule |
| Evaluation | Highest priority first; first match applies |
| Match range | `0.0.0.0/0` not allowed |
| Overlap | NAT IPs or subnets must not overlap across rules |

### Public NAT specifications

| Public NAT specifications |
|---|
| Default rule priority 65,001, range `0.0.0.0/0`; not applied to forwarded packets (a source-based rule is required for those). |
| Rules require NAT IP allocate option `MANUAL_ONLY`. |
| All NAT IPs in a rule must be the same tier (no Premium and Standard mix, including the default rule). |
| At most one rule applies per packet; on source/destination match the higher priority wins. Match ranges must not overlap across rules. |
| A rule needs non-empty `Active` or `Drain` IPs; an empty `Active` set drops new matching connections. |
| Rules cannot be added to a gateway with endpoint-independent mapping (EIM) enabled, and EIM cannot be enabled on a gateway that has rules. |

### Private NAT specifications (Preview)

| Private NAT specifications (Preview) |
|---|
| Only source-based rules; all rules in a gateway must specify the same destination next hop type, including the NCC hub name; first rule matching source IP and next hop applies. |
| Match ranges must not overlap or be identical; no match drops traffic. |

### CEL attributes and operations

| Attribute | NAT type | Description |
|---|---|---|
| `source.ip` | Public, Private | Source IP of the outgoing packet |
| `destination.ip` | Public | Destination IP of the outgoing packet |
| `nexthop.hub` | Private | Destination NCC hub |
| `nexthop.is_hybrid` | Private | Hybrid destinations through Cloud Interconnect or Cloud VPN |

| Operation | Description |
|---|---|
| `inIpRange(string, string) -> bool` | True if the CIDR range in `y` contains the IP in `x` |
| `\|\|` | True if `x` or `y` is true |
| `==` | True if `x` equals `y` |
| `&&` (Private NAT only) | True if both are true |

### Port allocation

| Port allocation |
|---|
| `minPortsPerVm` is applied independently per rule (including default); a VM exhausting a rule's ports drops new connections matching that rule. One NAT IP has 64,512 usable ports, so `minPortsPerVm` 1,024 supports 63 VMs per IP (64,512 / 1,024). |
| Default rule: ports for each VM served by the gateway. Source-based: only if the VM's primary IP or alias range matches the rule source. Destination-based: each VM gets ports from the default rule and every destination rule. |
| VMs with IP forwarding get `minPortsPerVm` from the default rule and every source-based rule at once; the default rule does not process their forwarded traffic, and packets matching no source-based rule are dropped. |
| `minExtraIpsNeeded` (from `routers.getRouterStatus`) shows how many IPs a rule needs. |

## Notes

- Example expressions (Private NAT, from the source): `nexthop.hub` takes the form `//networkconnectivity.googleapis.com/projects/PROJECT_ID/locations/global/hubs/HUB`; for Hybrid NAT use `nexthop.is_hybrid`. Source examples for Public NAT: `source.ip == "10.0.0.25"`, `inIpRange(source.ip, "10.0.2.0/24")`, and `||` combinations; destination examples: `destination.ip == "198.51.100.20"`, `inIpRange(destination.ip, "198.51.100.10/30")`.
- Private NAT rules are Preview ("Pre-GA Offerings Terms"; as is, limited support). Source-based Private NAT matching with the next hop is also Preview.
- Rule limits: see quota.md (150 per gateway, 2,500 per Cloud Router).
- Worked examples in the source: IP forwarding VM with two source rules (`192.168.1.0/24` to `203.0.113.10`, `192.168.2.0/24` to `203.0.113.20`, default `203.0.113.30`); destination rules needing two gateways when one subnet differs.
- Second snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/nats/rules/create (gcloud 593.0.0 help). The full flag list is in the `gcp-compute` skill.
- Source: https://docs.cloud.google.com/nat/docs/nat-rules-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [public-nat.md](./public-nat.md)
- [private-nat.md](./private-nat.md)
- [ports-and-addresses.md](./ports-and-addresses.md)
- [quota.md](./quota.md)
