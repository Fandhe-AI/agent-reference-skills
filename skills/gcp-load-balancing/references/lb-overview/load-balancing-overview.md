---
source: https://docs.cloud.google.com/load-balancing/docs/load-balancing-overview
---

# Cloud Load Balancing overview

Cloud Load Balancing is a fully distributed, software-defined managed service built on Maglev, Andromeda, Google Front Ends (GFEs) and Envoy. It offers Application Load Balancers (Layer 7) and Network Load Balancers (Layer 4, proxy or passthrough), each in external or internal form and in global, cross-region, regional or classic mode.

## Signature / Usage

### Get help for load-balancing gcloud commands

Load-balancing commands live in the `gcloud compute` group. Use `--help` for details on any command.

```bash
gcloud compute http-health-checks create --help
```

## Options / Props

### Key features

| Feature | Summary |
|---------|---------|
| Single anycast IP | One anycast IP is the frontend for backends in all regions; cross-region load balancing with automatic multi-region failover |
| Autoscaling | No pre-warming; scales from zero to full traffic in seconds |
| Software-defined | Not instance- or device-based |
| Layer 4 and Layer 7 | L4 on TCP, UDP, ESP, GRE, ICMP, ICMPv6; L7 routing on HTTP header and URI |
| External / internal | External for internet clients; internal for clients inside Google Cloud |
| Global / regional | Global supports backends in multiple regions; regional supports backends in one region (a regional load balancer's IP is in one region but is globally accessible) |
| Network tiers | Premium Tier uses Google's global backbone; Standard Tier uses the public internet. Some load balancers are Premium Tier only |
| Advanced features | IPv6 load balancing, source IP-based traffic steering, weighted load balancing, WebSockets, user-defined request headers, protocol forwarding for private VIPs |
| Integrations | Cloud CDN (global external Application Load Balancer and classic Application Load Balancer), Google Cloud Armor, Cloud Trace (distributed tracing via a telemetry policy on the forwarding rule) |

### Load balancer types by access

| Type | External | Internal |
|------|----------|----------|
| Application Load Balancers (HTTP/HTTPS, L7) | global external, regional external, classic | cross-region internal, regional internal |
| Proxy Network Load Balancers (TCP, optional SSL offload) | global external, regional external, classic | cross-region internal, regional internal |
| Passthrough Network Load Balancers | global external (Preview), regional external | regional internal |

### Underlying technology

| Load balancer | Technology |
|---------------|------------|
| Global external Application Load Balancer | Envoy-based GFE |
| Classic Application Load Balancer | GFE |
| Regional external / cross-region internal / regional internal Application Load Balancer | Envoy |
| Global external proxy Network Load Balancer | Envoy-based GFE |
| Classic proxy Network Load Balancer | GFE |
| Regional external / regional internal / cross-region internal proxy Network Load Balancer | Envoy |
| Global external passthrough Network Load Balancer (Preview) | Maglev |
| Regional external passthrough Network Load Balancer | Maglev |
| Internal passthrough Network Load Balancer | Andromeda |

### Summary of load balancers

| Load balancer | Mode | Traffic | Network service tier | Scheme |
|---------------|------|---------|----------------------|--------|
| Application | Global external | HTTP or HTTPS | Premium | `EXTERNAL_MANAGED` |
| Application | Regional external | HTTP or HTTPS | Premium or Standard | `EXTERNAL_MANAGED` |
| Application | Classic | HTTP or HTTPS | Global in Premium, regional in Standard | `EXTERNAL` |
| Application | Regional internal | HTTP or HTTPS | Premium | `INTERNAL_MANAGED` |
| Application | Cross-region internal | HTTP or HTTPS | Premium | `INTERNAL_MANAGED` |
| Proxy Network | Global external | TCP with optional SSL offload | Premium | `EXTERNAL_MANAGED` |
| Proxy Network | Regional external | TCP | Premium or Standard | `EXTERNAL_MANAGED` |
| Proxy Network | Classic | TCP with optional SSL offload | Global in Premium, regional in Standard | `EXTERNAL` |
| Proxy Network | Regional internal | TCP without SSL offload | Premium | `INTERNAL_MANAGED` |
| Proxy Network | Cross-region internal | TCP without SSL offload | Premium | `INTERNAL_MANAGED` |
| Passthrough Network | Global external (Preview) | TCP, UDP, ESP, GRE, ICMP, ICMPv6 | Premium | `EXTERNAL_PASSTHROUGH` |
| Passthrough Network | Regional external | TCP, UDP, ESP, GRE, ICMP, ICMPv6 | Premium or Standard | `EXTERNAL` |
| Passthrough Network | Internal (always regional) | TCP, UDP, ICMP, ICMPv6, SCTP, ESP, AH, GRE | Premium | `INTERNAL` |

## Notes

- Key features: Distributed tracing is supported on global external, regional external, regional internal Application Load Balancers, and cross-region internal Application Load Balancers (Preview).
- Application Load Balancers: external ones run on GFEs or Envoy proxies; global external supports multi-region backends, regional external one region only; classic is global in Premium Tier but single-region in Standard Tier. Internal ones are built on Andromeda and Envoy; regional internal supports backends in one region, cross-region internal supports multi-region backends and is always globally accessible.
- Proxy Network Load Balancers terminate TCP at the load balancer and forward to the closest available backend. Choose them for a reverse proxy with advanced traffic controls and backends on-premises or in other clouds.
- Passthrough Network Load Balancers do not terminate connections: packets reach backend VMs with source/destination IPs, protocol and ports unchanged, and responses go straight to clients (direct server return). The global external passthrough Network Load Balancer (Preview) provides two anycast IPs, each in a separate availability group, and supports backend services only. The regional external one supports a backend service or a target pool; backend services are recommended for new deployments.
- The `EXTERNAL`/`EXTERNAL_MANAGED` scheme mix: `EXTERNAL_MANAGED` backend services can attach to `EXTERNAL` forwarding rules, but `EXTERNAL` backend services cannot attach to `EXTERNAL_MANAGED` forwarding rules. Migration from classic to global external Application Load Balancer is described at https://docs.cloud.google.com/load-balancing/docs/https/migrate-from-classic-global.
- By default regional internal load balancers accept only same-region clients; enable global access on the forwarding rule to allow other regions.
- Interfaces: gcloud CLI, Google Cloud console, REST API, Terraform. Only the gcloud help command is shown above.
- Google Cloud Load Balancing is not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`). The machine-generated `gcloud compute` pages and the Compute Engine REST API for these resources are in the `gcp-compute` skill. Cloud Armor and Certificate Manager are in the `gcp-security` skill.
- Source inconsistency: the source says "a regional load balancer is globally accessible", but its footnote says "By default, regional internal load balancers only allow traffic from clients in the same region as the load balancer. However, you can allow traffic from clients in other regions by enabling *global access* on the forwarding rule." Regional internal load balancers need global access for clients in other regions.
- Source: https://docs.cloud.google.com/load-balancing/docs/load-balancing-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [choosing-load-balancer.md](./choosing-load-balancer.md)
- [features.md](./features.md)
- [load-balancer-resource-model.md](./load-balancer-resource-model.md)
- [forwarding-rule-concepts.md](./forwarding-rule-concepts.md)
- [quotas.md](./quotas.md)
