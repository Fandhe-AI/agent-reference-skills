---
source: https://docs.cloud.google.com/network-connectivity/docs/vpn/concepts/order-of-routes
---

# Order of routes

How custom routes whose next hop is a Cloud VPN tunnel interact with subnet routes, what happens when tunnels are down, and how ECMP distributes traffic over tunnels.

## Signature / Usage

### Create a static route (generic gcloud example)

```bash
gcloud compute routes create route-name \
    --destination-range=0.0.0.0/0 \
    --next-hop-gateway=default-internet-gateway
```

The full flag list is in the `gcp-compute` skill; reference: https://docs.cloud.google.com/sdk/gcloud/reference/compute/routes/create

## Options / Props

### Subnet routes vs on-premises range `10.2.0.0/16` (IPv6: `fd20:a:b:c::/64`)

| Google Cloud subnet range | Static (Classic VPN only) | Dynamic (BGP, Classic VPN or HA VPN) |
|---|---|---|
| Same as on-premises range | Google Cloud does not let you create a static route with that destination and a Cloud VPN tunnel next hop | Cloud Router ignores the advertised route; traffic stays in the VPC network |
| Broader (smaller mask, for example `10.0.0.0/8`, `fd20:a:b::/48`) | Not allowed to create the static route | Cloud Router ignores advertised routes that match or fit within the subnet range; traffic stays in the VPC network |
| Narrower (longer mask, for example `10.2.99.0/24`, `fd20:a:b:c::/80`) | Static route to `10.2.0.0/16` can be created, but traffic to `10.2.99.0/24` stays in the VPC network | Cloud Router accepts the route to `10.2.0.0/16`; traffic to `10.2.99.0/24` stays in the VPC network |

## Notes

- Subnet routes vs on-premises range `10.2.0.0/16` (IPv6: `fd20:a:b:c::/64`): Classic VPN does not support IPv6. This page says IPv6 traffic works only on HA VPN gateways with the dual stack type (IPv4 and IPv6); the Cloud VPN overview also lists the `IPV6_ONLY` stack type (see Notes).
- A Cloud Router always manages an HA VPN tunnel and a Classic VPN tunnel that uses dynamic routing; it creates and removes dynamic routes and advertises subnet or custom routes. The VPC network's dynamic routing mode controls what it imports and exports. Policy-based and route-based Classic VPN tunnels use static routes: the console creates them from the remote ranges, gcloud does not (create them manually).
- Dynamic routing, tunnel down: Cloud Router removes the learned routes; detection time depends on the BGP keepalive interval and hold timer. Routes return when the tunnel re-establishes. Some packet loss is expected.
- Static routing, tunnel down: a tunnel without an established IKE SA is never a valid next hop. With several static routes for the same destination, tunnels without IKE SAs are disregarded before priority is considered (example: priorities 10 (down), 20 (up), 30 (up) for `192.168.168.0/24` sends traffic to the priority 20 route; if tunnel 10 comes back it is used). If all tunnels for a destination are down, traffic is dropped even if a broader route (`192.168.0.0/16`) has a working tunnel, because the most specific destination always wins. Expect packet loss when traffic switches tunnels.
- ECMP: for dynamic and static routing, routes with the same destination, same priority and active tunnels are balanced per flow by hash. To test, use `iperf3` with multiple simultaneous TCP streams, ideally from several VMs; `ping` is not sufficient because ICMP has no ports and the hash uses only source and destination addresses, so a single tunnel is chosen.
- The borrowed example is only a generic `gcloud compute routes create` illustration: its next hop is `default-internet-gateway` (a default route to the internet), not a Cloud VPN tunnel. A route that uses a tunnel as next hop takes `--next-hop-vpn-tunnel` (and `--next-hop-vpn-tunnel-region`), as listed in the command help. Do not run the example on a production network: adding or changing routes can break connectivity, so try routes on a disposable network first.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/routes/create (gcloud 593.0.0 help).
- Source inconsistency: this page says IPv6 is supported only with the dual stack type, but the Cloud VPN overview (https://docs.cloud.google.com/network-connectivity/docs/vpn/concepts/overview, retrieved 2026-11-17) says to "use the `IPV6_ONLY` or `IPV4_IPV6` stack type" when creating an HA VPN gateway and tunnels for IPv6 traffic. Both stack types carry IPv6.
- Source: https://docs.cloud.google.com/network-connectivity/docs/vpn/concepts/order-of-routes (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [choosing-networks-routing.md](./choosing-networks-routing.md)
- [topologies.md](./topologies.md)
- [overview.md](./overview.md)
