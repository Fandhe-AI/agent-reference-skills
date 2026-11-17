---
source: https://docs.cloud.google.com/load-balancing/docs/application-load-balancer
---

# Application Load Balancer overview

The Application Load Balancer is a proxy-based Layer 7 load balancer that distributes HTTP and HTTPS traffic to backends hosted on Compute Engine, GKE, Cloud Storage and Cloud Run, as well as external backends reached over the internet or hybrid connectivity. It is offered in external (global, regional, classic) and internal (regional, cross-region) deployment modes.

## Signature / Usage

### Identify the load balancing scheme of a deployment

The load balancing scheme is an attribute of the forwarding rule and the backend service. Inspect it on the forwarding rule:

```bash
gcloud compute forwarding-rules describe FORWARDING_RULE_NAME
```

Check the `loadBalancingScheme`, region and network tier in the output. The full flag list for `gcloud compute forwarding-rules` is in the `gcp-compute` skill (official reference: https://docs.cloud.google.com/sdk/gcloud/reference/compute/forwarding-rules/describe).

## Options / Props

### External Application Load Balancer modes

| Deployment mode | Network service tier | Load balancing scheme | IP address | Frontend ports |
|---|---|---|---|---|
| Global external | Premium Tier | `EXTERNAL_MANAGED` | IPv4, IPv6 | Exactly one port from 1-65535 |
| Regional external | Premium or Standard Tier | `EXTERNAL_MANAGED` | IPv4, IPv6 | Exactly one port from 1-65535 |
| Classic | Global in Premium Tier, regional in Standard Tier | `EXTERNAL` | IPv4, IPv6 (IPv6 requires Premium Tier) | Exactly one port from 1-65535 |

### Internal Application Load Balancer modes

| Deployment mode | Network service tier | Load balancing scheme | IP address | Frontend ports |
|---|---|---|---|---|
| Regional internal | Premium Tier | `INTERNAL_MANAGED` | IPv4, IPv6 | Exactly one port from 1-65535 |
| Cross-region internal | Premium Tier | `INTERNAL_MANAGED` | IPv4, IPv6 | Exactly one port from 1-65535 |

### Capabilities by family

| Capability | External | Internal |
|---|---|---|
| IPv6 termination | Yes; client IPv6 is terminated and proxied over IPv4 or IPv6 (IPv6 only if backends are dual-stack). Classic proxies over IPv4 only | Yes; same proxying rule |
| Traffic management | Mirroring, weight-based splitting, header transformations | Locality policies within an instance group / NEG |
| Cloud CDN, Cloud Armor | Supported | Not listed in this page |
| Global access / connected networks | n/a | Global access lets clients from any region reach it; peering, Cloud VPN or Cloud Interconnect networks can reach it |
| GKE | Gateway or Ingress (fully orchestrated), or standalone NEGs | Ingress (fully orchestrated) |

### GKE deployment options

| Option | Supported by |
|---|---|
| GKE Gateway controller | Global external, classic, regional internal Application Load Balancers only |
| GKE Ingress controller | External and internal Application Load Balancers |
| Standalone zonal NEGs (forwarding rules, health checks deployed manually) | External and internal Application Load Balancers |

## Notes

- Internal Application Load Balancer modes: The cross-region internal load balancer uses global resources and can be deployed in one or multiple regions that you choose.
- Google Cloud Load Balancing — not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- `_MANAGED` in the load balancing scheme means the load balancer is implemented as a managed service on Google Front Ends (GFEs) or on the open source Envoy proxy. Global external and classic load balancers use GFEs; global external and regional external load balancers use Envoy for advanced traffic management; internal Application Load Balancers are Envoy-based regional Layer 7 load balancers.
- `EXTERNAL_MANAGED` backend services can be attached to `EXTERNAL` forwarding rules, but `EXTERNAL` backend services cannot be attached to `EXTERNAL_MANAGED` forwarding rules. The classic mode is the older mode; the page recommends migrating `EXTERNAL` resources to `EXTERNAL_MANAGED` (https://docs.cloud.google.com/load-balancing/docs/https/migrate-from-classic-global).
- Serverless NEG backends: regional external, regional internal and cross-region internal Application Load Balancers support only Cloud Run backends; the global external load balancer supports Cloud Run, Cloud Run functions and App Engine. Internet NEGs (single FQDN:Port or IP:Port, global or regional) reach public external backends; hybrid NEGs (IP:Port) reach backends over Cloud Interconnect or Cloud VPN.
- Cross-region failover is available with global external, classic and cross-region internal Application Load Balancers when global backend services have backends in multiple regions. Load-balancer-level failover can use Cloud DNS routing policies and health checks.
- Weight-based traffic splitting example from the source: 95% to the previous version and 5% to the new one, then shifted gradually. Service Extensions can inject custom logic into supported Application Load Balancers (see the `gcp-load-balancing` Service Extensions pages).
- Cloud Armor, IAP and Certificate Manager are covered by the planned `gcp-security` skill. The source also shows architecture diagrams and no further code.
- Snippet taken from https://docs.cloud.google.com/load-balancing/docs/https (the source overview has no code block).
- Source inconsistency: the internal Application Load Balancer feature list says "Compatibility with GKE by using Ingress (fully orchestrated)", while the GKE deployment options on the same page say the GKE Gateway controller is "Supported only by the global external Application Load Balancers, classic Application Load Balancers, and regional internal Application Load Balancers". The external Application Load Balancer page (https://docs.cloud.google.com/load-balancing/docs/https, retrieved 2026-11-17) lists GKE compatibility per mode: global external "using Gateway (fully orchestrated) or Standalone NEGs (manual orchestration)", classic "Gateway (fully orchestrated), Ingress (fully orchestrated), or Standalone NEGs (manual orchestration)", and regional external "Standalone NEGs (manual orchestration)". The GKE row in the capability table above merges the external modes; use the per-mode statements when choosing a controller.
- Source: https://docs.cloud.google.com/load-balancing/docs/application-load-balancer (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [https.md](./https.md)
- [proxy-only-subnets.md](./proxy-only-subnets.md)
