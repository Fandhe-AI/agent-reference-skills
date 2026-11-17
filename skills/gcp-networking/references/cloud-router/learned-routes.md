---
source: https://docs.cloud.google.com/network-connectivity/docs/router/concepts/learned-routes
---

# Learned routes

Learned routes are routes that Cloud Router receives from remote peer routers over BGP, or custom learned routes configured on a Cloud Router. This page covers how the VPC network dynamic routing mode affects them and the two best path selection modes (legacy and standard).

## Signature / Usage

### List BGP routes learned on a session

Adapted (not in the official docs): removed the stray closing double quote after `INBOUND` in the gcloud help example, which would leave a quote open in the shell.

```bash
gcloud compute routers list-bgp-routes my-router \
  --region=us-central1 --address-family=IPV4 --peer=my-bgp-peer \
  --route-direction=INBOUND
```

## Options / Props

### Types of learned routes

| Type | Description |
|---|---|
| BGP received routes | BGP routes learned from a remote peer: a physical on-premises router, another Cloud Router, a Router appliance VM (with Network Connectivity Center) or a router from a different cloud provider. |
| Custom learned routes | Configured manually on Cloud Router to simulate routes from a remote peer; useful without administrator control of the remote peer. Automatically withdrawn when the BGP session for a next hop goes down (unlike static routes). The only way to define non-BGP routes for next hops such as Cloud Interconnect VLAN attachments and HA VPN tunnels. |

### Dynamic routing mode

| Mode | Behavior |
|---|---|
| Regional | Each region's dynamic route control plane processes only learned routes from Cloud Router BGP tasks in its own region; resulting dynamic routes have next hops only in that region. |
| Global | Each region's control plane also sends the best path for each prefix to the control planes in all other regions; resulting dynamic routes can have next hops in any region. |

### Best path selection modes

| Step (BGP task) | Legacy | Standard |
|---|---|---|
| 1 | Shortest AS path length | Shortest AS path length |
| 2 | Preferred origin type (IGP over EGP over Incomplete) | Preferred origin type (IGP over EGP over Incomplete) |
| 3 | Smallest MED | Neighbor ASN consideration controlled by `routingConfig.bgpAlwaysCompareMed` |

### Standard mode settings

| Setting | Values / effect |
|---|---|
| `routingConfig.bgpAlwaysCompareMed` | `True`: MED compared regardless of neighbor ASN. `False` or unset: next hops grouped by neighbor ASN, lowest MED kept per group (RFC 4271). |
| `routingConfig.bgpInterRegionCost` | `ADD_COST_TO_MED`: inter-regional cost added to MED (own-region cost is `0`). `DEFAULT` or unset: original MED values. |

### Quotas enforced by the dynamic route control plane

| Quotas enforced by the dynamic route control plane |
|---|
| Unique Cloud Router dynamic route prefixes from own region per region per VPC network. |
| Unique Cloud Router dynamic route prefixes from other regions per region per VPC network. |

### Dynamic route removal on BGP state changes

| Event | Dynamic routes removed |
|---|---|
| Peer graceful restart notification (TCP `FIN` or `RST`) | After the peer router's graceful restart timer expires |
| Peer BGP `CEASE` notification | Immediately |
| Neither, and negotiated hold timer reached | When the hold timer is reached |

## Notes

- Types of learned routes: Cloud Router doesn't re-advertise learned routes unless you use an NCC hybrid spoke with data transfer enabled.
- Best path selection modes: Legacy is the default when a new VPC network is created; Google recommends legacy unless you need standard-mode features or a Google Cloud feature that relies on it. The mode applies to all learned routes through Cloud Router in all regions of a VPC network, including custom learned routes. NCC site-to-site data transfer and NCC for third-party network virtual appliances or Router appliance work with either mode. If the same route is advertised by multiple routing VPCs to one workload VPC (NCC route exchange with VPC spokes), selecting legacy for all VPC networks is recommended.
- Best path selection modes: Legacy: AS path information is only relevant within a single Cloud Router BGP task and isn't used by the dynamic route control plane, so don't rely on AS-path length across different tasks for the same prefix. Standard follows RFC 4271 more closely and considers AS path over all routes of all Cloud Routers in the VPC network (AS path prepending works).
- Standard mode settings: Custom learned routes in standard mode get: AS path of just the peer's ASN (length 1), origin Incomplete, MED equal to the route priority, inter-region cost 0. Resulting dynamic routes have Andromeda route priority `65536` (one more than the lowest static route priority `65535`, so static routes win for the same prefix); lower-ranked extra next hops use `65537`, `65538`, and so on.
- Quotas enforced by the dynamic route control plane: Routes sorting beyond a quota are dropped (see [quotas.md](./quotas.md)); dropped routes appear in the route quota events log in Cloud Logging.
- VPC control plane suppression: A candidate dynamic route is suppressed when its prefix conflicts with a local, peering or NCC subnet route (hybrid subnet routing is an exception), or when its next hop isn't usable. Additional cases: a local dynamic route suppresses an exact-match peering or NCC dynamic route; peering dynamic routes are suppressed when the dynamic routes per region per peering group quota is exceeded.
- Dynamic route removal on BGP state changes: Planned Cloud Interconnect maintenance removes routes whose next hops are the affected VLAN attachments; use 99.99% or 99.9% availability topologies to minimize disruption.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/routers/list-bgp-routes (gcloud 593.0.0 help). The full flag list is in the `gcp-compute` skill.
- Corrected from the official docs: the gcloud help example ends with `--route-direction=INBOUND"` (stray closing quote).
- Route dropping over quota loses connectivity for the dropped prefixes; monitor usage before adding prefixes.
- Custom learned routes: https://docs.cloud.google.com/network-connectivity/docs/router/concepts/custom-learned-routes and https://docs.cloud.google.com/network-connectivity/docs/router/how-to/configure-custom-learned-routes. Troubleshooting: https://docs.cloud.google.com/network-connectivity/docs/router/support/troubleshoot-bgp-routes.
- Source: https://docs.cloud.google.com/network-connectivity/docs/router/concepts/learned-routes (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [how-cloud-router-works.md](./how-cloud-router-works.md)
- [advertised-routes.md](./advertised-routes.md)
- [bgp-route-policies-overview.md](./bgp-route-policies-overview.md)
- [quotas.md](./quotas.md)
