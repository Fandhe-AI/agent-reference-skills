---
source: https://docs.cloud.google.com/network-connectivity/docs/router/concepts/advertised-routes
---

# Advertised routes

Advertised routes are the Cloud Router BGP prefixes advertised to BGP peers (for example an on-premises router): local subnet ranges, NCC-imported subnet ranges, NCC-imported transit dynamic routes and custom IPv4 / IPv6 prefixes. Advertisement mode is configurable at the router level and at the BGP session level.

## Signature / Usage

### Create a router with custom advertisement

`--set-advertisement-groups=ALL_SUBNETS` is valid only with `--advertisement-mode=CUSTOM`.

Adapted (not in the official docs): the official template marks optional flags with square brackets (`[--flag=VALUE]`), which makes the command unrunnable and is a glob pattern in zsh; the brackets are removed, `--advertisement-mode` is set to `CUSTOM` (the only mode the following two flags are valid with), the unrelated optional flags are dropped, and the missing space before the continuation backslash after `--region=REGION` is added. The other optional flags are listed on the creation page.

```bash
gcloud compute routers create ROUTER_NAME \
    --project=PROJECT_ID \
    --network=NETWORK \
    --region=REGION \
    --asn=ASN_NUMBER \
    --advertisement-mode=CUSTOM \
    --set-advertisement-groups=ALL_SUBNETS \
    --set-advertisement-ranges=CUSTOM_ADVERTISED_RANGES
```

## Options / Props

### Advertisement modes

| Level | Mode | Behavior |
|---|---|---|
| Router | default | Advertises subnet ranges. |
| Router | custom | Full control over advertised IP addresses. |
| BGP session | default | Advertises per the router-level mode. |
| BGP session | custom | Full control over advertised IP addresses. |

The router's advertisement mode doesn't control whether NCC-imported transit dynamic routes are re-advertised.

### Effective advertisements

| Router mode | BGP session mode | Effective advertised prefixes |
|---|---|---|
| default | default | Inherits router config: subnet ranges. |
| custom | default | Inherits router config: custom advertisement. |
| default or custom | custom | Does not inherit; session advertises per custom advertisement. |

### Subnet range advertisement

- Local IPv4 subnet ranges in the Cloud Router's VPC network; NCC-imported IPv4 subnet ranges (Cloud Router in a hybrid spoke whose import filter allows subnet routes from an NCC hub); local IPv6 subnet ranges (extra requirements below). Advertisements update automatically on subnet lifecycle activity.
- Regional dynamic routing mode: only subnet ranges in the Cloud Router's region, MED equal to the session base priority.
- Global dynamic routing mode: subnet ranges in all regions; same-region MED equals the base priority, other regions add an inter-regional cost.
- Privately used public IPv4 ranges in subnets: the other network might not be able to reach internet resources at those public addresses.
- Internal subnet IPv6 ranges are included automatically only when the product (for example the HA VPN gateway) uses a dual-stack or IPv6-only stack type and the IPv6 BGP session is configured and enabled (or the IPv4 session is configured for IPv6 route exchange). External subnet IPv6 ranges are never advertised automatically; include them as custom ranges.

### Custom advertisement

You can advertise default route prefixes such as `0.0.0.0/0` or `::/0` for all BGP sessions on a Cloud Router. Options:

| Option | Behavior |
|---|---|
| Advertise only custom IPv4 and IPv6 prefixes | Only specified ranges, no subnet ranges; MED always equals the base priority. |
| Custom prefixes in addition to subnet ranges | Subnet ranges per dynamic routing mode; custom range MED always equals the base priority; a custom range exactly matching an advertised subnet route is ignored. |

### Advertised priority (MED)

The per-session base advertised priority is used as the BGP MED. Custom ranges and same-region subnet ranges use only the base priority. Subnet ranges from other regions use base priority plus inter-regional cost when the network is in global dynamic routing mode and the session advertises subnet ranges. Region-to-region costs can change periodically (for example with network performance), which can change routing.

| Example (global mode, base priority 100) | Region cost | Advertised MED |
|---|---|---|
| `10.0.1.0/24` in `us-central1` via `central-tunnel-*` | 0 | 100 |
| `10.0.1.0/24` via `west-tunnel-*` | 250 | 350 |
| `10.0.2.0/24` in `europe-west1` via `central-tunnel-*` / `west-tunnel-*` | 300 / 350 | 400 / 450 |
| Active-passive: secondary tunnel base priority 351, `10.0.1.0/24` via `west-tunnel-1` | 250 | 601 |

## Notes

- To keep a 99.99% availability SLA with HA VPN, Partner Interconnect or Dedicated Interconnect, advertise the same prefixes on all links, possibly with different priorities.
- Caution from the source: the on-premises route selection might not prefer the lower-MED route because other attributes (router ID, origin ASN) affect BGP best-path selection; check your device documentation.
- Base priority adjustment doesn't work for site-to-site re-advertisement; use BGP route policies for finer control. Re-advertising NCC-imported transit dynamic routes is controlled only by the hybrid spoke settings (site-to-site data transfer, export filters, import filters).
- Maximum custom advertised routes per BGP session: see [quotas.md](./quotas.md).
- Source inconsistency: the worked example's prerequisites list the region as `us-west-1` once while the rest of the same page uses `us-west1`; both are kept as written in the source.
- Snippet taken from https://docs.cloud.google.com/network-connectivity/docs/router/how-to/create-router-vpc-network (this page has no code). Updating priority and custom advertisements are official pages: https://docs.cloud.google.com/network-connectivity/docs/router/how-to/updating-priority and https://docs.cloud.google.com/network-connectivity/docs/router/how-to/advertising-custom-ip. The full flag list is in the `gcp-compute` skill.
- Adapted from the official docs: the source command template wrote optional flags in square brackets (for example `[--keepalive-interval=KEEPALIVE_TIMER]`); they are removed from the fence so the command parses.
- Source: https://docs.cloud.google.com/network-connectivity/docs/router/concepts/advertised-routes (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [learned-routes.md](./learned-routes.md)
- [bgp-route-policies-overview.md](./bgp-route-policies-overview.md)
- [create-router-vpc-network.md](./create-router-vpc-network.md)
