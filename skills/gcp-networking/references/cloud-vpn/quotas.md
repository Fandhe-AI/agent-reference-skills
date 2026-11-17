---
source: https://docs.cloud.google.com/network-connectivity/docs/vpn/quotas
---

# Quotas and limits (Cloud VPN)

Quotas (adjustable, per project) and system limits (fixed) for Cloud VPN, known issues, required roles, and how to check or request quota.

## Signature / Usage

### Check quotas

Replace `PROJECT_ID` with your project ID.

```bash
gcloud compute project-info describe --project PROJECT_ID
```

Used quota in a region:

```bash
gcloud compute regions describe example-region
```

## Options / Props

### Quotas (per project)

Values are shown on the Quotas page of the console (`compute.googleapis.com` metrics).

| Item | Metric | Notes |
|---|---|---|
| VPN gateways per region | `vpn_gateways_per_region` | HA VPN only |
| External VPN gateways | `external_vpn_gateways` | HA VPN only |
| VPN tunnels per region | `vpn_tunnels_per_region` | Combined total of Classic VPN and HA VPN tunnels |
| Routers | `routers` | Cloud Routers in the project, any network and region; networks also have per-region Cloud Router limits; independent of gateway type |
| Target VPN gateways per region | `target_vpn_gateways_per_region` | Classic VPN only |
| Forwarding rules | `forwarding_rules` | Classic VPN only |

Deprecated quotas being replaced: `VPN gateways` (by `VPN gateways per region`), `VPN tunnels` (by `VPN tunnels per region`), `Target VPN gateways` (by `Target VPN gateways per region`).

### System limits (cannot be increased)

| Item | Limit | Notes |
|---|---|---|
| Bandwidth per VPN tunnel (Classic VPN or HA VPN) | 250,000 packets per second, ingress plus egress | Roughly 1 Gbps to 3 Gbps depending on average packet size; traffic is throttled once reached |

### Required roles

| Task | Required role |
|---|---|
| Check quotas for a project | Project Owner (`roles/owner`), Editor (`roles/editor`), or Quota Viewer (`roles/servicemanagement.quotaViewer`) |
| Modify quotas, request more | Owner, Editor, Quota Administrator (`roles/servicemanagement.quotaAdmin`), or a custom role with `serviceusage.quotas.update` |

## Notes

- Exceeding a quota: gcloud prints a `quota exceeded` error and exits with code `1`; an API request returns HTTP `413 Request Entity Too Large`.
- Quotas apply per project and do not guarantee resource availability (for example no free regional external IPs or zonal depletion).
- Known issues: HA VPN resources `compute.vpnGateways` and `compute.externalVpnGateways` are not yet shown in Cloud Asset Inventory or Security Command Center (`compute.vpnTunnels` is listed in both); view HA VPN Cloud Monitoring metrics in Metrics Explorer; for tunnels to AWS use IKEv2 and configure fewer IKE transform sets.
- The source also shows Console steps for checking quota.
- Source: https://docs.cloud.google.com/network-connectivity/docs/vpn/quotas (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [classic-vpn-deprecation.md](./classic-vpn-deprecation.md)
