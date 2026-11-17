---
source: https://docs.cloud.google.com/network-connectivity/docs/router/concepts/overview
---

# Cloud Router overview

Cloud Router is a distributed and fully managed offering that connects on-premises networks through BGP speaker and responder capabilities. It works with Cloud Interconnect, Cloud VPN and Router appliances to create dynamic routes in VPC networks from BGP-received and custom learned routes. Andromeda handles all packet routing and forwarding; Cloud Routers only manage the corresponding BGP sessions and provide no packet routing or forwarding capability.

## Signature / Usage

### Create a Cloud Router

The full creation guide, including the optional flags, is in [create-router-vpc-network.md](./create-router-vpc-network.md).

Adapted (not in the official docs): the official template marks optional flags with square brackets (`[--flag=VALUE]`), which makes the command unrunnable and is a glob pattern in zsh; the brackets and the optional flags are removed, and the missing space before the continuation backslash after `--region=REGION` is added. Optional flags (`--advertisement-mode`, `--set-advertisement-groups`, `--set-advertisement-ranges`, `--bgp-identifier-range`, `--keepalive-interval`, `--encrypted-interconnect-router`) are described in the page text.

```bash
gcloud compute routers create ROUTER_NAME \
    --project=PROJECT_ID \
    --network=NETWORK \
    --region=REGION \
    --asn=ASN_NUMBER
```

## Options / Props

### Products that use Cloud Router

| Product | Dynamic routing with Cloud Router |
|---|---|
| Dedicated Interconnect | Required |
| Cross-Cloud Interconnect | Required |
| Partner Interconnect | Required |
| Router appliances | Required |
| HA VPN | Required |
| Classic VPN | Optional |

Cloud NAT relies on Cloud Routers for control plane capabilities, but not for BGP session management.

### Key features

- BGP session management, including Bidirectional Forwarding Detection (BFD) and MD5 authentication.
- Advertised routes: advertise IP ranges to your network when you use a supported product.
- Learned routes: routes received from BGP peers and custom learned routes become dynamic routes in VPC networks.
- BGP route policies: rules to filter BGP routes or modify BGP route attributes.

### IP protocol support

IPv6 route exchange works through BGP over IPv6 or BGP over IPv4 using multiprotocol BGP (MP-BGP). Supported session types:

| Session type | Prefixes exchanged |
|---|---|
| IPv4 BGP session | IPv4 only |
| IPv6 BGP session | IPv6 only |
| IPv4 BGP session using MP-BGP | IPv4 and IPv6 |
| IPv6 BGP session using MP-BGP | IPv4 and IPv6 |

IPv6 BGP peering and IPv6 route exchange aren't supported for Classic VPN tunnels, Router appliance (part of Network Connectivity Center) and Cross-Cloud Interconnect VLAN attachments. You can configure an IPv4 BGP session and an IPv6 BGP session simultaneously for an HA VPN tunnel or a Dedicated Interconnect VLAN attachment; the IPv4 session then exchanges only IPv4 routes and the IPv6 session only IPv6 routes.

## Notes

- Classic VPN: Cloud Router can be used with Classic VPN only to support dynamic routing for tunnels that connect to third-party VPN gateway software running on Google Cloud VM instances; all other dynamic routing functionality for Classic VPN is deprecated (see https://docs.cloud.google.com/network-connectivity/docs/vpn/deprecations/classic-vpn-deprecation).
- Snippet taken from https://docs.cloud.google.com/network-connectivity/docs/router/how-to/create-router-vpc-network (the overview itself has no code).
- The full flag list of `gcloud compute routers ...` is in the `gcp-compute` skill. BFD, MD5 authentication, best practices and key terms are official pages: https://docs.cloud.google.com/network-connectivity/docs/router/concepts/bfd, https://docs.cloud.google.com/network-connectivity/docs/router/how-to/use-md5-authentication, https://docs.cloud.google.com/network-connectivity/docs/router/concepts/best-practices, https://docs.cloud.google.com/network-connectivity/docs/router/concepts/key-terms.
- Adapted from the official docs: the source command template wrote optional flags in square brackets (for example `[--keepalive-interval=KEEPALIVE_TIMER]`); they are removed from the fence so the command parses.
- Source inconsistency: this page says Classic VPN dynamic routing remains available for tunnels to VPN gateway software on Compute Engine VMs, but the Classic VPN deprecation page (https://docs.cloud.google.com/network-connectivity/docs/vpn/deprecations/classic-vpn-deprecation, retrieved 2026-11-17) says that as of August 1, 2025 "the creation of Classic VPN tunnels using dynamic routing (BGP) is no longer supported, regardless of the gateway the tunnel connects to", including VPN gateway software in a Compute Engine VM, and that existing unmodified BGP tunnels keep passing traffic without an availability SLA. Create new dynamic-routing connections with HA VPN.
- Source: https://docs.cloud.google.com/network-connectivity/docs/router/concepts/overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [how-cloud-router-works.md](./how-cloud-router-works.md)
- [learned-routes.md](./learned-routes.md)
- [advertised-routes.md](./advertised-routes.md)
- [bgp-route-policies-overview.md](./bgp-route-policies-overview.md)
- [create-router-vpc-network.md](./create-router-vpc-network.md)
- [quotas.md](./quotas.md)
