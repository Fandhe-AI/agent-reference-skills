---
source: https://docs.cloud.google.com/load-balancing/docs/choosing-load-balancer
---

# Choose a load balancer

Decision guide for picking a Google Cloud load balancer by traffic type, external vs internal, global vs regional, Network Service Tier, and proxy vs passthrough.

## Signature / Usage

Once chosen, the type is expressed on the forwarding rule through the load-balancing scheme. Example (regional internal forwarding rule to a backend service):

```bash
gcloud compute forwarding-rules create RULE_NAME \
    --load-balancing-scheme=INTERNAL \
    --backend-service=SERVICE_NAME --subnet=SUBNET_NAME \
    --network=default --region=REGION --ports=80-82
```

## Options / Props

### Traffic type

| Load balancer type | Traffic type |
|--------------------|--------------|
| Application Load Balancers | HTTP or HTTPS |
| Passthrough Network Load Balancers | TCP or UDP; also ESP, GRE, ICMP, ICMPv6 |
| Proxy Network Load Balancers | TCP with optional SSL offload |

### Scope resilience

| Scope | Architecture | Zonal outage | Regional outage |
|-------|--------------|--------------|-----------------|
| Global | Distributed across all regions | Resilient | Resilient |
| Cross-region | Distributed across multiple regions | Resilient | Resilient |
| Regional | Distributed across multiple zones in the region | Resilient | Not resilient (an outage in the region affects its regional load balancers) |

### Network Service Tiers

| Tier | Behavior |
|------|----------|
| Premium (default) | Traffic uses Google's global backbone, entering and exiting at the edge closest to the client. Global external Application Load Balancer and global external proxy Network Load Balancer can only be Premium. All internal load balancers always use the backbone (Premium); Internet egress charges do not apply to their traffic |
| Standard | Traffic enters and exits Google's network at the peering point closest to the load balancer's region. Not all load balancers support it. Tier is chosen per resource (for example the external IP address), so Standard and Premium can be mixed |

### Summary

| Load balancer | Mode | Traffic | Tier | Scheme |
|---------------|------|---------|------|--------|
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

- Choose an Application Load Balancer for flexible HTTP(S) features; a proxy Network Load Balancer for TCP proxying to backends in one or more regions; a passthrough Network Load Balancer to preserve client source IPs, avoid proxy overhead, and support UDP, ESP and ICMP. Global external Application Load Balancer and global external proxy Network Load Balancer each have two modes of operation: global and classic.
- External load balancers carry internet traffic to your VPC network; internal ones carry traffic from clients in the same VPC network or connected through VPC Network Peering, Cloud VPN or Cloud Interconnect.
- Global load balancers: only external ones are global. For internal load balancers with multi-region backends use cross-region, which uses a regional internal IP from a regional subnet, unlike a global load balancer's single anycast IP with IPv6 termination. Choose regional when backends are in one region, only IPv4 termination is needed, or jurisdictional compliance requires TLS termination in one region. Global load balancers terminate TLS at globally distributed locations.
- Proxy load balancers terminate client connections and open new ones to backends (GFEs or Envoy); they do not preserve client IPs by default and connections to backends come from different GFE or Envoy IPs. For authentication that depends on a stable source IP use passthrough; for Application Load Balancers the source recommends Identity-Aware Proxy (IAP). Passthrough load balancers do not terminate connections; backends respond directly to clients (direct server return).
- `EXTERNAL_MANAGED` backend services can attach to `EXTERNAL` forwarding rules, not the reverse; migrate `EXTERNAL` resources with https://docs.cloud.google.com/load-balancing/docs/https/migrate-from-classic-global.
- Regional internal load balancers accept only same-region clients unless global access is enabled on the forwarding rule.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/forwarding-rules/create (gcloud 593.0.0 help). The source page has no code. The full flag list is in the `gcp-compute` skill.
- Google Cloud Load Balancing is not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Source: https://docs.cloud.google.com/load-balancing/docs/choosing-load-balancer (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [load-balancing-overview.md](./load-balancing-overview.md)
- [features.md](./features.md)
- [forwarding-rule-concepts.md](./forwarding-rule-concepts.md)
