---
source: https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/spoke-filters-overview
---

# Spoke filters overview

NCC has two types of spoke filters: export filters (which subnet routes a VPC spoke, or which dynamic routes a hybrid spoke, sends to the hub) and import filters (which subnet routes and dynamic routes a hybrid spoke imports from the hub). Filters are configured per spoke.

## Signature / Usage

```bash
gcloud network-connectivity spokes \
    linked-interconnect-attachments update my-spoke \
    --region=us-central1 --description="new spoke description"
```

## Options / Props

### Support by spoke type

| Spoke type | Export filter | Import filter |
|---|---|---|
| VPC spokes, producer VPC spokes | Yes | No |
| VLAN attachment and Cloud VPN hybrid spokes | Yes | Yes |
| Router appliance hybrid spokes | Yes | Yes |
| NCC Gateway spokes | No | No |

### Filter flags and fields

| Filter | gcloud flag | API field | Limit and rules |
|---|---|---|---|
| Include export ranges | `--include-export-ranges` | `includeExportRanges` | Up to 16 unique, nonoverlapping CIDRs (none may match or contain another). IPv4 or IPv6 (Preview); Router appliance spokes IPv4 only. |
| Exclude export ranges | `--exclude-export-ranges` | `excludeExportRanges` | Up to 16 nonoverlapping CIDRs, each fully contained by include export ranges (or defaults). No keywords. Default empty. |
| Include import ranges | `--include-import-ranges` | `includeImportRanges` | Up to 16 nonoverlapping CIDRs; IPv4 or IPv6 (Preview); Router appliance IPv4 only. |
| Exclude import ranges | `--exclude-import-ranges` | `excludeImportRanges` | Up to 16 nonoverlapping CIDRs, each fully contained by include import ranges. No keywords. Default empty. |

### Keywords for include ranges

| Keyword | Meaning | Where |
|---|---|---|
| `ALL_PRIVATE_IPV4_RANGES` | All private IPv4 addresses from subnet ranges exported by a VPC spoke | Export, VPC spoke only |
| `ALL_IPV4_RANGES` | All IPv4 (`0.0.0.0/0`) | VPC or hybrid spoke; import and export |
| `ALL_IPV6_RANGES` | All IPv6 (`::/0`) | VPC or hybrid spoke except Router appliance; import and export |

### Defaults

| Filter | Default |
|---|---|
| VPC spoke include export | Same as `ALL_PRIVATE_IPV4_RANGES` |
| Hybrid spoke include export | Same as `ALL_IPV4_RANGES` |
| Hybrid spoke include import, data transfer disabled | Empty |
| Hybrid spoke include import, data transfer enabled | Only IPv4 transit dynamic routes learned from the hub's other data-transfer hybrid spokes; no hub subnet ranges |

Google recommends specifying explicit include import ranges because the defaults vary and may only apply to transit dynamic routes.

### Export filter rules for VPC spokes

| Subnet range vs filters | Valid | Result |
|---|---|---|
| Not wholly contained in any include export range | Yes | Not sent to hub |
| Intersects but not wholly contained in an include range (e.g. `10.0.0.0/16` vs `10.0.0.0/17`) | No | Google Cloud prevents the conflicting subnet or include range creation |
| Wholly in an include range, no intersection with exclude ranges | Yes | Sent to hub |
| Wholly in an include range but intersects an exclude range | No | Google Cloud prevents the conflicting creation |
| Wholly in an exclude range | Yes | Not sent to hub |

### Export and import filter rules for hybrid spokes

For dynamic routes (export) and hub routes (import) all five scenarios are valid configurations: a route is sent or imported only if wholly contained in an include range and not intersecting any exclude range; routes that are outside, partially overlapping, intersecting an exclude range or inside an exclude range are not sent or imported.

### Advertising NCC-imported routes from a hybrid spoke

| Technique | Notes |
|---|---|
| Import filters plus Cloud Router subnet route advertisement | IPv4 only (import filters support IPv4 only here). Set include import ranges (for example `[ALL_IPV4_RANGES]`) and configure subnet range advertisement on BGP sessions. Regional dynamic routing: only same-region ranges advertised, MED = base priority. Global: all regions; other-region MED = base priority plus inter-regional cost. Import filters can't control advertisement of local subnet ranges. |
| Cloud Router custom advertisements | IPv4 and IPv6 prefixes. Dynamic routing mode doesn't affect them; MED = base priority. A custom advertisement exactly matching an advertised subnet route is ignored. |

Cloud Router outbound BGP policies apply to all advertised routes, including NCC-imported subnet routes.

### Transit dynamic route re-advertisement

Requires all hybrid spokes in the same routing VPC network (site-to-site data transfer prerequisite), site-to-site data transfer enabled on both sending and receiving hybrid spokes, and appropriate import filters on the receiver. Regional routing mode: same-region transit routes re-advertised; global: all regions (MED adds an inter-regional cost for other regions). Cloud Router advertisement mode does not control re-advertisement; only data transfer, export filters and import filters do.

## Notes

- The borrowed example only changes the spoke description; the filter flags are set with the same `update` command. Changing filters changes which routes the hub exchanges, so try them on a disposable hub first.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/network-connectivity/spokes/linked-interconnect-attachments/update (gcloud 593.0.0 help); the filter flags above are listed in the same command's synopsis.
- IPv6 filter ranges are Preview.
- Source inconsistency: this page gives up to 16 CIDRs for each of the include and exclude export and import ranges without distinguishing spoke types, but the NCC quotas page (https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/quotas, retrieved 2026-11-17) lists 16 "include or exclude export CIDR ranges per VPC or producer VPC spoke" and 32 "include or exclude export or import CIDR ranges per hybrid spoke". Check the quota for the spoke type you use.
- Source: https://docs.cloud.google.com/network-connectivity/docs/network-connectivity-center/concepts/spoke-filters-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [vpc-spokes-overview.md](./vpc-spokes-overview.md)
- [dynamic-route-exchange-with-vpc-spokes.md](./dynamic-route-exchange-with-vpc-spokes.md)
- [overview.md](./overview.md)
