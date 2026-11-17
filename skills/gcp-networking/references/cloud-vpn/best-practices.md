---
source: https://docs.cloud.google.com/network-connectivity/docs/vpn/concepts/best-practices
---

# Best practices for Cloud VPN

Recommendations for planning and configuring Cloud VPN: project layout, routing and failover, reliability and security.

## Signature / Usage

### Check tunnel status on a gateway

```bash
gcloud compute vpn-gateways get-status my-gateway \
  --region=us-central1
```

The full flag list is in the `gcp-compute` skill; reference: https://docs.cloud.google.com/sdk/gcloud/reference/compute/vpn-gateways/get-status

## Options / Props

| Best practice | Recommended action |
|---|---|
| Separate project | Keep Cloud VPN and Cloud Router resources in a project separate from other resources, to simplify IAM |
| Dynamic routing | Use dynamic routing with BGP; use HA VPN and BGP-capable on-premises devices. Use Classic VPN only if static routes are required |
| SA lifetime alignment | If configuring tunnels via API, gcloud or Terraform, set Phase 1 to `36000` seconds and Phase 2 to `10800` seconds |
| Template usage | With a downloaded peer template, use the exact lifetimes defined in it; both endpoints must match |
| Tunnel layout | Two HA VPN tunnels: active/passive. More than two: active/active |
| Monitoring | Use the predefined dashboards in the Cloud VPN console: the Observability tab (project-wide tunnel health) and the Monitoring tab (tunnel and gateway logs) |
| Ciphers | Configure the peer with only one cipher per cipher role; use the strongest cipher supported by both sides (the proposal order is not by strength) |
| Firewall | Create secure firewall rules for traffic over Cloud VPN |
| Pre-shared keys | Use strong pre-shared keys |
| Peer IPs | Restrict which IP addresses can be set for peer VPN gateways to prevent unauthorized tunnels |

## Notes

- Mismatched SA lifetimes cause intermittent connection drops and packet loss during key rotation. Console templates often use shorter lifetimes than the Google Cloud defaults for third-party compatibility; do not change them unless the vendor says so.
- Cipher selection can change with the initiator and over time at key rotation, which can affect performance and MTU. For HA VPN tunnel pairs use the same cipher and Phase 2 lifetime on both tunnels. HA VPN between VPC networks auto-negotiates consistently when ciphers are not configured.
- Related pages: peer-side restriction of IP addresses is documented under "Restrict IP addresses for peer VPN gateways" in the Cloud VPN how-to guides.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/vpn-gateways/get-status (gcloud 593.0.0 help).
- Source: https://docs.cloud.google.com/network-connectivity/docs/vpn/concepts/best-practices (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [supported-ike-ciphers.md](./supported-ike-ciphers.md)
- [generating-pre-shared-key.md](./generating-pre-shared-key.md)
- [topologies.md](./topologies.md)
- [overview.md](./overview.md)
