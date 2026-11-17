---
source: https://docs.cloud.google.com/vpc/docs/subnets
---

# Subnets

Subnets are regional resources with IP address ranges, and a VPC network (a global resource) consists of one or more of them. Subnet and subnetwork are synonyms. This page covers stack types, purposes, naming limits, IPv4 ranges (valid, prohibited, unusable, auto mode) and IPv6 ranges.

## Signature / Usage

```bash
gcloud compute networks subnets create subnet-1 \
    --network=network-0 --range=10.10.0.0/24 --region=us-central1
```

```bash
gcloud compute networks subnets describe subnet-1
```

## Options / Props

### Types of subnets (stack types)

| Stack type | Subnet ranges | Compatible VM interfaces |
|---|---|---|
| IPv4-only (single-stack) | IPv4 only | IPv4-only |
| IPv4 and IPv6 (dual-stack) | IPv4 and IPv6 | IPv4-only, dual-stack, IPv6-only |
| IPv6-only (single-stack) | IPv6 only | IPv6-only |

| Types of subnets (stack types) |
|---|
| IPv4-only can be changed to dual-stack. Dual-stack with an external IPv6 range can be changed to IPv4-only. Dual-stack with an internal IPv6 access type cannot be changed to IPv4-only. IPv4-only or dual-stack cannot become IPv6-only and vice versa. |
| Subnets with IPv6 ranges are supported on custom mode networks only (not auto mode, not legacy). Convert an auto mode network to custom mode first. |

### Purposes

| Purpose value | Meaning |
|---|---|
| `PRIVATE` (default; shown as None in the console) | Regular subnet for VMs. Hybrid Subnets are regular subnets with `--allow-cidr-routes-overlap` (can be toggled at any time). |
| `PRIVATE_SERVICE_CONNECT` | Subnet used to publish a managed service by using Private Service Connect. |
| `GLOBAL_MANAGED_PROXY`, `REGIONAL_MANAGED_PROXY` | Proxy-only subnets for Envoy-based load balancers and Secure Web Proxy. |
| `PRIVATE_NAT` | Reserved as source range for Private NAT. |
| `PEER_MIGRATION` | Used to migrate a Shared VPC service to Private Service Connect; can be converted to a regular subnet afterwards. |

### Naming limits

| Naming limits |
|---|
| A subnet cannot share a name with a VPC network in the project unless it is a member of that network. Subnets in the same region must have unique names. |
| Name and region cannot be changed after creation; delete and recreate when no resources use it. |

### IPv4 range limits

| IPv4 range limits |
|---|
| Primary range: used by VM primary internal IPv4 addresses (including GKE nodes), alias IP ranges, internal protocol forwarding and internal load balancer forwarding rules, Cloud DNS inbound server policy entry points, and Private Service Connect endpoints for published services (when purpose is `PRIVATE` or `NONE`). |
| Secondary ranges: optional, used only by alias IP ranges. Alias IP ranges may come from the primary or a secondary range. |
| Each primary or secondary range in a network must be a unique valid CIDR block; the number of secondary ranges is in the per-network limits (see [quota.md](./quota.md)). |
| Primary range can be expanded but not replaced or shrunk. A secondary range can be removed or replaced only if no instances use it. |
| Minimum size is eight addresses (longest mask `/29`); shortest mask is `/4`, but Google recommends limiting size to `/8`. |
| Ranges cannot overlap any allocated range (private services access), another subnet's range in the same network, or subnet ranges in peered networks. |
| Avoid `10.128.0.0/9` (auto mode block): you could not peer or VPN to an auto mode network. Avoid conflicts with on-premises ranges, static route destinations and `172.17.0.0/16` (default Docker bridge). |
| Ranges cannot match, be narrower or broader than a restricted range (for example `169.0.0.0/8` overlaps link-local `169.254.0.0/16`), cannot span an RFC range and privately used public addresses (`172.0.0.0/10`), and cannot span multiple RFC ranges (`192.0.0.0/8`). |

### Valid IPv4 ranges

| Range | Description |
|---|---|
| `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16` | RFC 1918 private |
| `100.64.0.0/10` | RFC 6598 shared address space |
| `192.0.0.0/24` | RFC 6890 IETF protocol assignments |
| `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24` | RFC 5737 documentation (TEST-NET-1/2/3) |
| `192.88.99.0/24` | RFC 7526 IPv6 to IPv4 relay (deprecated) |
| `198.18.0.0/15` | RFC 2544 benchmark testing |
| `240.0.0.0/4` | Class E, reserved. Some operating systems don't support it; verify before use. |
| Privately used public IPv4 | Normally internet-routable addresses used privately; cannot belong to a prohibited range; not announced to the internet. BYOIP ranges and privately used public ranges in the same network must not overlap. With VPC Network Peering their subnet routes are exported by default but peers must explicitly import them. |

### Prohibited IPv4 ranges

| Range | Description |
|---|---|
| Google public IPs (https://gstatic.com/ipranges/goog.txt) | Google APIs and services, Google Cloud netblocks |
| `199.36.153.4/30`, `199.36.153.8/30` | Private Google Access virtual IPs |
| `0.0.0.0/8` | RFC 1122 current network |
| `127.0.0.0/8` | RFC 1122 local host |
| `169.254.0.0/16` | RFC 3927 link-local |
| `224.0.0.0/4` | RFC 5771 multicast |
| `255.255.255.255/32` | Limited broadcast |

### Unusable IPv4 addresses (primary range only)

| Address | Example (`10.1.2.0/24`) |
|---|---|
| Network address (first) | `10.1.2.0` |
| Default gateway (second) | `10.1.2.1` |
| Second-to-last (reserved for future use) | `10.1.2.254` |
| Broadcast (last) | `10.1.2.255` |

### Auto mode IPv4 ranges (`/20` per region, inside `10.128.0.0/9`)

| Region | CIDR | Region | CIDR |
|---|---|---|---|
| africa-south1 | 10.218.0.0/20 | europe-west12 | 10.210.0.0/20 |
| asia-east1 | 10.140.0.0/20 | europe-southwest1 | 10.204.0.0/20 |
| asia-east2 | 10.170.0.0/20 | me-central1 | 10.212.0.0/20 |
| asia-northeast1 | 10.146.0.0/20 | me-central2 | 10.216.0.0/20 |
| asia-northeast2 | 10.174.0.0/20 | me-west1 | 10.208.0.0/20 |
| asia-northeast3 | 10.178.0.0/20 | northamerica-northeast1 | 10.162.0.0/20 |
| asia-south1 | 10.160.0.0/20 | northamerica-northeast2 | 10.188.0.0/20 |
| asia-south2 | 10.190.0.0/20 | northamerica-south1 | 10.224.0.0/20 |
| asia-southeast1 | 10.148.0.0/20 | southamerica-east1 | 10.158.0.0/20 |
| asia-southeast2 | 10.184.0.0/20 | southamerica-west1 | 10.194.0.0/20 |
| asia-southeast3 | 10.232.0.0/20 | us-central1 | 10.128.0.0/20 |
| australia-southeast1 | 10.152.0.0/20 | us-east1 | 10.142.0.0/20 |
| australia-southeast2 | 10.192.0.0/20 | us-east4 | 10.150.0.0/20 |
| europe-central2 | 10.186.0.0/20 | us-east5 | 10.202.0.0/20 |
| europe-north1 | 10.166.0.0/20 | us-south1 | 10.206.0.0/20 |
| europe-north2 | 10.226.0.0/20 | us-west1 | 10.138.0.0/20 |
| europe-west1 | 10.132.0.0/20 | us-west2 | 10.168.0.0/20 |
| europe-west2 | 10.154.0.0/20 | us-west3 | 10.180.0.0/20 |
| europe-west3 | 10.156.0.0/20 | us-west4 | 10.182.0.0/20 |
| europe-west4 | 10.164.0.0/20 | europe-west6 | 10.172.0.0/20 |
| europe-west8 | 10.198.0.0/20 | europe-west9 | 10.200.0.0/20 |
| europe-west10 | 10.214.0.0/20 | | |

### IPv6 ranges

| Resource | Size | Details |
|---|---|---|
| VPC network | `/48` | Internal ULA range from within `fd20::/20`; must be assigned to the network before enabling internal ULA subnets. Automatic or user-selected. Unique within Google Cloud; cannot be removed or changed once assigned. Use an internal range resource to reserve parts of it. |
| Subnet | `/64` | Access type internal or external (not both). Internal: ULA `/64` from the network `/48`. External: GUA `/64` assigned by Google; first half (`/65`) for VMs, second half (`/65`) for Cloud Load Balancing. BYOIP sub-prefixes can supply either type. |
| VM interface | `/96` | First address provided via DHCPv6; internal or external depends on the subnet access type. |
| Forwarding rule (internal passthrough NLB, regional external passthrough NLB, protocol forwarding) | `/96` or BYOIP sub-prefix | Internal: internal `/96` from the subnet; external: from the subnet external range, or a BYOIP sub-prefix in forwarding rule creation mode. |

| IPv6 ranges |
|---|
| IPv6 subnets are available in all regions. The access type cannot be changed after creation. A subnet's network service tier can be chosen when enabling IPv6 and cannot be changed after it is set or inherited from the project. External IPv6 is available in Standard Tier (Preview) and Premium Tier. |
| BYOIP external subnet ranges can only be used for external `/96` ranges of VM NICs (forwarding rule BYOIP addresses are not part of a subnet). Resources must use addresses from their own `/65` half, otherwise Google Cloud returns an error. A subnet with `ipv6AccessType` `EXTERNAL` and non-empty `ipCollection` was created with BYOIP. |
| The first and last `/96` of a subnet's internal `/64` are reserved for system use (for example `fd20:db8::/96` and `fd20:db8:0:0:ffff:ffff::/96` for `fd20:db8::/64`). |

## Notes

- Purposes: In most cases the purpose cannot be changed after creation.
- Unusable IPv4 addresses (primary range only): All addresses of secondary ranges are usable. The virtual gateway does not respond to ICMP or decrement TTL; secondary ranges have no gateway. Connectivity checks must not treat an unpingable gateway as failure.
- Auto mode IPv4 ranges (`/20` per region, inside `10.128.0.0/9`): The source also lists, per region, the default gateway (first address plus one) and usable range (second address to the second-to-last, for example `10.128.0.2` to `10.128.15.253` for us-central1).
- The source has no code; gcloud snippets are taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/subnets/create and https://docs.cloud.google.com/sdk/gcloud/reference/compute/networks/subnets/describe (gcloud 593.0.0 help). Full flags are in the `gcp-compute` skill.
- Deleting a subnet or removing a secondary range breaks resources that use it; try on a disposable network first.
- Reserve address ranges for Private Google Access and auto mode blocks before planning on-premises connectivity.
- Source: https://docs.cloud.google.com/vpc/docs/subnets (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc.md](./vpc.md)
- [ipv6-support.md](./ipv6-support.md)
- [quota.md](./quota.md)
- [mtu.md](./mtu.md)
