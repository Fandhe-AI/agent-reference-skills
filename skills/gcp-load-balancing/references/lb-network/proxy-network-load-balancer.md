---
source: https://docs.cloud.google.com/load-balancing/docs/proxy-network-load-balancer
---

# Proxy Network Load Balancer overview

Proxy Network Load Balancers are Layer 4 reverse proxy load balancers that distribute TCP traffic to backends in a VPC network or other environments (on-premises, other clouds). Traffic is terminated at the load balancing layer and forwarded to the closest available backend over TCP. They are for TCP traffic only, with or without SSL; for HTTP(S) use an Application Load Balancer.

## Signature / Usage

### Identify the mode of a load balancer

Snippet taken from https://docs.cloud.google.com/load-balancing/docs/tcp/internal-proxy.

```bash
gcloud compute forwarding-rules describe FORWARDING_RULE_NAME
```

Check the load balancing scheme, region and network tier of the output.

## Options / Props

### External proxy Network Load Balancer modes

| Deployment mode | Network service tier | Load-balancing scheme | IP address | Frontend ports |
|---|---|---|---|---|
| Global external | Premium Tier | EXTERNAL_MANAGED | IPv4, IPv6 | Exactly one port from 1-65535 |
| Classic | Global in Premium Tier, regional in Standard Tier | EXTERNAL | IPv4; IPv6 (requires Premium Tier) | Exactly one port from 1-65535 |
| Regional external | Premium or Standard Tier | EXTERNAL_MANAGED | IPv4, IPv6 | Exactly one port from 1-65535 |

### Internal proxy Network Load Balancer modes

| Deployment mode | Network service tier | Load-balancing scheme | IP address | Frontend ports |
|---|---|---|---|---|
| Regional internal | Premium Tier | INTERNAL_MANAGED | IPv4, IPv6 | Exactly one port from 1-65535 |
| Cross-region internal | Premium Tier | INTERNAL_MANAGED | IPv4, IPv6 | Exactly one port from 1-65535 |

### Features

| Features |
|---|
| All ports 1-65535 allowed; port remapping (for example frontend TCP 80, backend connections on TCP 8080); the PROXY protocol relays the client source IP address and port to backends. |
| TLS/SSL offload (external): global external and classic proxy Network Load Balancers offload TLS with an SSL proxy; connections to backends use SSL (recommended) or TCP. For CPU efficiency use ECDSA SSL certificates, TLS 1.2 and prefer `ECDHE-ECDSA-AES128-GCM-SHA256` between the load balancer and backends. SSL policies control the SSL features negotiated with clients. |
| IPv6 termination: client IPv6 is terminated and proxied over IPv4 or IPv6 (dual-stack backends); classic load balancers proxy only over IPv4 to backends. |
| Cloud Armor security policies can protect external load balancers from DDoS and targeted attacks (Cloud Armor is in `gcp-security`). |
| Geographic TLS termination: TLS terminates at globally distributed locations; use Standard Network Tier to force termination on backends in one region only. |
| Internal: Envoy-based regional Layer 4; locality policies within an instance group or NEG; global access (clients from any region); access from connected networks through VPC Network Peering, Cloud VPN or Cloud Interconnect. |
| App Hub: resources of global/regional external and cross-region/regional internal proxy Network Load Balancers can be designated as services in App Hub applications. |

## Notes

- Internal proxy Network Load Balancer modes: `*_MANAGED` means the load balancer is a managed service on Google Front Ends (GFEs) or on the open source Envoy proxy.
- Cross-region internal high availability: A cross-region internal proxy Network Load Balancer uses a global backend service referencing backends in several regions. If backends in region A are down, traffic fails over to region B. With frontend VIPs in two regions, the service survives a complete regional outage. Setup guides: https://docs.cloud.google.com/load-balancing/docs/l7-internal/setting-up-l7-cross-reg-internal and https://docs.cloud.google.com/load-balancing/docs/l7-internal/setting-up-l7-cross-reg-hybrid.
- The classic mode (scheme `EXTERNAL`) is listed as a separate deployment mode from the global and regional external modes; the source states no retirement date.
- Source: https://docs.cloud.google.com/load-balancing/docs/proxy-network-load-balancer (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/load-balancing/docs/tcp/internal-proxy (retrieved 2026-11-17).
- This is Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`). The full `gcloud compute ...` flag lists are in the `gcp-compute` skill.

## Related

- [internal-proxy.md](./internal-proxy.md)
- [passthrough-network-load-balancer.md](./passthrough-network-load-balancer.md)
