---
source: https://docs.cloud.google.com/network-connectivity/docs/vpn/deprecations/classic-vpn-deprecation
---

# Classic VPN dynamic routing deprecation

Dynamic routing (BGP) for Classic VPN tunnels was deprecated on August 1, 2025. Workloads that need BGP for VPN connectivity must use HA VPN.

## Signature / Usage

### Create the HA VPN replacement gateway

```bash
gcloud compute vpn-gateways create my-vpn-gateway \
  --region=us-central1 --network=default
```

The full flag list is in the `gcp-compute` skill; reference: https://docs.cloud.google.com/sdk/gcloud/reference/compute/vpn-gateways/create

## Options / Props

| Configuration | Status |
|---|---|
| New Classic VPN tunnels with dynamic routing (BGP) via Cloud Router, to any gateway (including gateway software in a Compute Engine VM or outside Google Cloud) | Cannot be created since August 1, 2025 |
| Existing, unmodified Classic VPN tunnels with BGP | Not supported; continue to pass traffic but without an availability SLA |
| Classic VPN tunnels with static routing, Classic VPN gateway to and from on-premises VPN gateways | Supported (can still be created) |
| Classic VPN tunnels with static routing, Classic VPN gateway to and from a Compute Engine VM acting as a VPN gateway | Supported |

## Notes

- If you delete a Classic VPN tunnel configured with BGP you cannot recreate it with BGP; any change that requires recreating or modifying BGP settings must use HA VPN.
- Retain Classic VPN only if on-premises devices do not support BGP; upgrading them to BGP and using HA VPN is strongly recommended. HA VPN is the only path for BGP in Cloud VPN.
- Billing: HA VPN needs tunnels in pairs, both billed at the same hourly rate; if one tunnel is used solely for failover, outbound data transfer is charged only for the active tunnel. As of August 1, 2025, traffic still on Classic VPN is charged at standard Classic VPN rates. See the Cloud VPN pricing page.
- Migration needs a maintenance window and routing or infrastructure changes; see "Move to HA VPN" in the Cloud VPN how-to guides for checklists. Prefer HA VPN topologies in [topologies.md](./topologies.md).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/vpn-gateways/create (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/network-connectivity/docs/vpn/deprecations/classic-vpn-deprecation (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [topologies.md](./topologies.md)
- [choosing-networks-routing.md](./choosing-networks-routing.md)
