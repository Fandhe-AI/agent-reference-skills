---
source: https://docs.cloud.google.com/network-connectivity/docs/vpn/concepts/choosing-networks-routing
---

# Networks and tunnel routing

Which VPC network types Cloud VPN supports, which routing option each tunnel type uses (dynamic BGP or static policy-based / route-based), and how traffic selectors work.

## Signature / Usage

### Create a static route manually (gcloud)

When you create a policy-based or route-based Classic VPN tunnel with gcloud, routes are not created automatically. Generic `gcloud compute routes create` example:

```bash
gcloud compute routes create route-name \
    --destination-range=0.0.0.0/0 \
    --next-hop-gateway=default-internet-gateway
```

For a Cloud VPN tunnel as next hop, the peer-gateway page refers to the `--next-hop-vpn-tunnel` setting on the route. The full flag list is in the `gcp-compute` skill; reference: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routes/create

## Options / Props

### Traffic selectors by tunnel type

| Tunnel type | Local traffic selector | Remote traffic selector | Routes to the peer network |
|---|---|---|---|
| HA VPN (requires dynamic BGP) | Always `0.0.0.0/0` (IPv4), `0.0.0.0/0,::/0` (dual stack) or `::/0` (IPv6 only) | Same as local | Cloud Router learns peer routes and adds them as custom dynamic routes |
| Policy-based (Classic VPN) | Configurable | Required | Console creates custom static routes; with gcloud you must create them |
| Route-based (Classic VPN) | Always `0.0.0.0/0` | Always `0.0.0.0/0` | Console creates custom static routes; with gcloud you must create them |

### Multiple CIDRs per traffic selector (policy-based Classic VPN)

| IKE version | Support |
|---|---|
| IKEv1 | No. Single CIDR for each of the local and remote selectors (single Child SA) |
| IKEv2 | Yes, if the peer uses a single Child SA containing all CIDRs, the IKE proposal stays within Cloud VPN's maximum MTU of 1460 bytes (otherwise tunnels do not establish), and the peer's own CIDR limit is respected. Best practice: 30 or fewer CIDRs per selector |

## Notes

- Supported networks: custom mode VPC, auto mode VPC and legacy networks. Prefer custom mode; legacy networks have no subnets and cannot be converted. To connect two VPC networks with Cloud VPN, at least one must be custom mode (auto mode networks share the same internal ranges). Avoid auto mode internal ranges on the network the tunnels connect to; avoid switching the mode of a network that has tunnels (you may need to re-create tunnels, not gateways).
- HA VPN supports dynamic routing only; Classic VPN supports static routing. Classic VPN with dynamic routing is allowed only when connecting to gateway software in a Compute Engine VM (see [classic-vpn-deprecation.md](./classic-vpn-deprecation.md) for the BGP deprecation on August 1, 2025).
- Dynamic routing uses a Cloud Router in the tunnel's region. The VPC network's dynamic routing mode decides whether learned routes apply in the tunnel's region only or in all regions, and which subnet routes are advertised; custom route advertisements add to this. The dynamic routing mode affects only Cloud Routers, not policy-based or route-based tunnels.
- Traffic selectors cannot be edited; delete and re-create the tunnel (and the peer counterpart). The gateway need not be deleted. A traffic selector is not a route.
- Auto mode network with no custom local selector: the local selector is the primary range of the subnet in the tunnel's region. Legacy network: the entire RFC 1918 range of the network.
- Most gateways forward only when source fits the local and destination fits the remote selector. Selectors of `0.0.0.0/0` or `::/0` on both sides are equivalent to route-based VPN. Keep the Cloud VPN local selector equal to the peer's remote selector and vice versa, and make both as specific as possible.
- IKEv2 tip: put all local and remote ranges into one Phase 2 / Quick Mode entry so a single Child SA is negotiated. Gateways that create a unique Child SA per CIDR are not compatible with Cloud VPN; two Phase 2 entries can fail or be intermittent.
- Strategies when the peer creates multiple Child SAs or the proposal would exceed 1460 bytes: use dynamic routing with broad selectors; use route-based or broad policy-based selectors with more specific static routes created separately via gcloud; or use several policy-based tunnels with one CIDR pair each (each needs a unique peer IP; routes created by the console for several tunnels with the same remote selectors can produce identical destinations with different next hops and unpredictable results).
- The borrowed example is only a generic `gcloud compute routes create` illustration: its next hop is `default-internet-gateway` (a default route to the internet), not a Cloud VPN tunnel. A route that uses a tunnel as next hop takes `--next-hop-vpn-tunnel` (and `--next-hop-vpn-tunnel-region`), as listed in the command help. Do not run the example on a production network: adding or changing routes can break connectivity, so try routes on a disposable network first.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/routes/create (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/network-connectivity/docs/vpn/concepts/choosing-networks-routing (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [order-of-routes.md](./order-of-routes.md)
- [configuring-peer-gateway.md](./configuring-peer-gateway.md)
