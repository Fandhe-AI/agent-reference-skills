---
source: https://docs.cloud.google.com/network-connectivity/docs/router/reference/bgp-route-policy-reference
---

# BGP route policy attribute reference

Match attributes, match operations, action attributes and action operations for Cloud Router BGP route policies, written in the Common Expression Language (CEL). A policy is an ordered list of terms, each with a condition and an action; a policy applies in one direction only (import for learned routes, export for advertised routes) but can be applied to multiple BGP peers.

## Signature / Usage

### Add a term that drops a destination

```bash
gcloud compute routers add-route-policy-term my-router \
  --region=us-central1 --policy-name=my-policy --priority=0 \
  --match="destination == '192.168.0.0/16'" --actions="drop()"
```

## Options / Props

### Match attributes

| Attribute | Description |
|---|---|
| `communities` | List of communities attributed to the BGP route |
| `destination` | The IP range for the BGP route |

### Match operations

| Operation | Description |
|---|---|
| `communities.matchesEvery('65001:1234')` | True if communities are a superset of the list `'65001:1234'`. Import only. |
| `destination == '192.168.0.0/24'` | True on exact match. |
| `destination != '192.168.0.0/24'` | True if not an exact match. |
| `destination.inAnyRange(r)` | True if the route is in range r: a CIDR string, the abstract type returned by `prefix()` or its fluent methods (such as `longer()`), or a heterogeneous list of these. Negatable with `!`. |
| `prefix('192.168.0.0/24')` | Prefix match object for the CIDR range, used with `destination.inAnyRange()`. |
| `prefix('192.168.0.0/24').longer()` | Range from the input prefix length plus one to the per-family max (`/32` or `/128`). |
| `prefix().orLonger()` | Range from the input prefix to the per-family max (`/32` or `/128`). |
| `prefix().lengthRange(20, 30)` | Range with start `/20` and end `/30`. |
| `prefix().upTo(30)` | Range with end `/30`. |
| `communitySets('regional')` | Communities named in the community set `regional` on the router. |
| `prefixSets('local')` | Prefixes named in the prefix set `local` on the router. |
| `x \|\| y` | True if either is true; x and y must be boolean expressions using `communities` or `destination`. |

### Vendor comparison (prefix ranges)

| Cloud Router | Cisco | Juniper |
|---|---|---|
| `prefix('192.168.0.0/24')` | `192.168.0.0/24` | `192.168.0.0/24 exact` |
| `prefix('192.168.0.0/24').longer()` | `192.168.0.0/24 ge 25 le 32` | `192.168.0.0/24 longer` |
| `prefix('192.168.0.0/24').orLonger()` | `192.168.0.0/24 le 32` | `192.168.0.0/24 orlonger` |
| `prefix('192.168.0.0/24').lengthRange(25, 30)` | `192.168.0.0/24 ge 25 le 30` | `192.168.0.0/24 prefix-length-range /25-/30` |
| `prefix('192.168.0.0/24').upTo(30)` | `192.168.0.0/24 le 30` | `192.168.0.0/24 up to /30` |

### Match all routes

| Expression | Matches |
|---|---|
| `communities.matchesEvery([])` | All routes for import policies |
| `destination.inAnyRange(prefix('0.0.0.0/0').orLonger())` | All IPv4, import or export |
| `destination.inAnyRange(prefix('::/0').orLonger())` | All IPv6, import or export |
| `destination.inAnyRange([prefix('0.0.0.0/0').orLonger(), prefix('::/0').orLonger()])` | All routes, import or export |

### Action attributes

| Attribute | Description | Restrictions |
|---|---|---|
| `asPath` | AS numbers the BGP route update traversed | Export and import |
| `communities` | The route's communities | Export only |
| `med` | Multi-exit discriminator | Export and import |

### Action operations

| Operation | Description | Restrictions |
|---|---|---|
| `accept()` | Accepts the route and stops further evaluation of policies or terms | None |
| `drop()` | Filters out the route and stops further evaluation | None |
| `nextPolicy()` | Stops remaining terms in this policy and moves to the next applied policy | None |
| `asPath.prependSequence([1, 2, 3])` | Prepends AS numbers (32-bit integers) as a sequence | None |
| `communities.add('65001:1234')` | Adds a community (single or list) | Export only |
| `communities.remove('65001:1234')` | Removes a community (single or list) | Export only |
| `communities.replaceAll(['65001:1234'])` | Replaces the list; can be empty | Export only |
| `med.set(12345)` | Sets MED; unsigned integer from `0` to 2^32 - 1 | None |
| `med.add(12345)` | Adds to MED; if the result exceeds 2^32 - 1, MED is set to 2^32 - 1 | None |
| `med.subtract(12345)` | Subtracts from MED; if the result is below 0, MED is set to `0` | None |

## Notes

- Match operations: All conditions are effectively zero or more `destination` match operations connected by OR: `(D0 || D1 || ... || Dm)`.
- Private communities mapped to these Google-owned ASNs are ignored by Cloud Router in `communities.add`, `remove` and `replaceAll`: 6432, 15169, 16550, 16591, 19448, 19527, 22859, 26910, 32381, 36039, 36384, 36385, 36492, 55023.
- Rendering note: the source page prints the MED range as `0` to `232` and `232 - 1` (the superscript was lost) and once as `2^32^ - 1`; the table above writes it as 2^32 - 1, the form the source itself uses once.
- `drop()` terms, and a drop-all match such as `destination.inAnyRange([prefix('0.0.0.0/0').orLonger(), prefix('::/0').orLonger()])`, can remove routes and break connectivity; try them on a disposable router or peer first. Route policy limits (terms, match elements, action elements, named sets) are in [quotas.md](./quotas.md).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/add-route-policy-term (gcloud 593.0.0 help); the page itself has no code. The full flag list is in the `gcp-compute` skill.
- Source: https://docs.cloud.google.com/network-connectivity/docs/router/reference/bgp-route-policy-reference (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [bgp-route-policies-overview.md](./bgp-route-policies-overview.md)
- [quotas.md](./quotas.md)
