---
source: https://docs.cloud.google.com/load-balancing/docs/features
---

# Load balancer feature comparison

Comparative matrix of Cloud Load Balancing features across Application, proxy Network and passthrough Network load balancers, internal and external. Abbreviations below: App = Application LB, Proxy = proxy Network LB, Pass = passthrough Network LB, Int = internal, Ext = external; modes are global, classic, regional, cross-region.

## Signature / Usage

List backend services (a core object behind most features below):

```bash
gcloud compute backend-services list
```

## Options / Props

### Protocols, client to load balancer

| Feature | App Int | App Ext | Proxy Int | Proxy Ext | Pass Int | Pass Ext |
|---------|---------|---------|-----------|-----------|----------|----------|
| HTTP/HTTPS (HTTP/1.0) | - | Global and classic only | - | - | - | - |
| HTTP/HTTPS (HTTP/1.1) | Yes, no QUIC | Yes; no QUIC for regional | - | - | - | - |
| HTTP/2 over TLS, H2C, gRPC | Yes | Yes (H2C: global and regional only) | - | - | - | - |
| HTTP/3 (IETF QUIC) | - | Global and classic only | - | - | - | - |
| SSL or TCP | - | - | TCP only | Regional: TCP only; global and classic: SSL or TCP | - | - |
| TCP, UDP, `L3_DEFAULT` | - | - | - | - | Yes | Yes |
| WebSockets | Yes | Yes | - | - | - | - |
| TLS early data | - | Yes (HTTPS over TCP and HTTP/3) | - | - | - | - |

### Protocols, load balancer to backends

| Feature | Applies to |
|---------|-----------|
| HTTP or HTTPS (HTTP/1.1); HTTP/2 over TLS including gRPC; H2C | App Int and Ext (H2C: global and regional only for Ext) |
| SSL or TCP | Proxy Int (TCP only), Proxy Ext (regional TCP only; global and classic SSL or TCP) |
| TCP, UDP, or `UNSPECIFIED` | Pass Int; Pass Ext regional |
| `UNSPECIFIED` | Pass Ext global |

### Backends

| Feature | Support |
|---------|---------|
| Multi-region backends | App Int cross-region only; App Ext global and classic; Proxy Int cross-region only; Proxy Ext global and classic; Pass Ext global only |
| Single-region backends | App Int regional; App Ext regional and classic; Proxy Int regional; Proxy Ext regional and classic; Pass Int; Pass Ext regional |
| Cloud Storage backend buckets | App Int and Ext |
| Internet NEGs | App Int regional only; App Ext global, regional, classic; Proxy Int regional only; Proxy Ext regional only |
| URL map with multiple backend services | App only |
| Zonal NEGs | `GCE_VM_IP_PORT` for App and Proxy; `GCE_VM_IP` for Pass |
| Private Service Connect NEGs | App and Proxy Int; App and Proxy Ext global and regional only |
| Hybrid NEGs | App and Proxy Int and Ext |
| Serverless backends | App Int and Ext |
| Self-managed Kubernetes and GKE | App; Pass (Pass Ext regional only) |
| Dual-stack backends | All; App Ext and Proxy Ext global and regional only; Pass Ext global and regional |
| IPv6-only backends | Pass Int; Pass Ext global and regional |

### Health checks

| Feature | Support |
|---------|---------|
| gRPC (with/without TLS) | App, Proxy, Pass (Envoy-based regional LBs with hybrid NEGs do not support gRPC health checks) |
| HTTP, HTTPS, HTTP/2 | All; Proxy Ext only classic and regional (HTTP, HTTPS, HTTP/2) |
| SSL, TCP | All |
| Request path (HTTP, HTTPS, HTTP/2) | App |
| Request string or path (TCP, SSL) | Proxy |
| Expected response string | All |
| Distributed Envoy health checks | App Int, Proxy Int; App Ext and Proxy Ext regional only |

### IP addresses

| Feature | Support |
|---------|---------|
| Regional internal IPv4 / IPv6 | App Int, Proxy Int, Pass Int |
| Global external IPv4 / IPv6 (BYOIP for IPv4) | App Ext and Proxy Ext global and classic (Premium only); Pass Ext global (Premium only, two IPs) |
| Regional external IPv4 / IPv6 | App Ext and Proxy Ext regional and classic (classic: Standard only); Pass Ext regional (target pool-based: no IPv6) |
| Multiple forwarding rules on one IP (unique protocol and port) | All |
| Client IP preservation | App: `X-Forwarded-For`; Proxy: PROXY protocol; Pass: native |

### Network topologies

| Feature | Support |
|---------|---------|
| Network Service Tiers | Internal: Premium. Global: Premium. Classic and regional: Premium or Standard |
| Backends in different VPC networks | App, Proxy, Pass Ext (not Pass Int) |
| Shared VPC backends | All |
| Cross-project service referencing | App Int; App Ext global and regional only |
| Load balancer as next hop | Pass Int |
| Multi-NIC | All; instance group backends receive on `nic0` only, multi-NIC for passthrough only with zonal NEGs of `GCE_VM_IP` endpoints |
| Internal clients in any region | Via global access; cross-region has it on by default |

### Failover and availability

| Feature | Support |
|---------|---------|
| Zonal outage resilience | All |
| Regional outage resilience | App Int and Proxy Int cross-region only; App Ext and Proxy Ext global and classic (Premium); Pass Ext global only |
| Active-active across load balancers | App Int cross-region; App Ext global and regional |
| Active-passive across load balancers | App Ext global and regional |
| Dual IP high availability | Pass Ext global |
| Configurable failover, unhealthy behavior, connection draining on failover | Pass Int; Pass Ext regional (backend service-based; target pool uses backup pools and cannot configure connection draining) |

### Session affinity

| Option | Support |
|--------|---------|
| Headers, HTTP cookie, stateful cookie | App Int; App Ext global and regional only |
| Generated cookie | App |
| `CLIENT_IP_NO_DESTINATION` (1-tuple) | Pass Int |
| `CLIENT_IP` (2-tuple) | App, Proxy, Pass |
| `CLIENT_IP_PROTO` (3-tuple), `CLIENT_IP_PORT_PROTO` (5-tuple) | Pass |
| `NONE` | All (5-tuple when ports exist, else 3-tuple) |

### Load balancing methods

| Feature | Support |
|---------|---------|
| Balancing mode: connection | Proxy; Pass Int; Pass Ext regional |
| Balancing mode: custom metrics, rate (RPS) | App |
| Balancing mode: in-flight | App Int; App Ext global and regional only |
| Balancing mode: rate (packets per second) | Pass Ext global only |
| Balancing mode: backend utilization (instance groups only) | App, Proxy; Pass Ext global only |
| Locality policy | App Int; App Ext global and regional only; Proxy Int; Proxy Ext global and regional only; Pass Ext |
| Configurable maximum capacity per instance group or NEG | App, Proxy; Pass Ext global only |
| Circuit breaking | App Int; App Ext regional only; Proxy Int; Proxy Ext regional only |
| Weight-based load balancing | App Int; App Ext global and regional; Pass Ext regional (not target pool-based) |

### Routing and traffic management

| Feature | Support |
|---------|---------|
| L7 request routing, retries, redirects, URL rewrites | App Int and Ext |
| Fault injection, header transformations, traffic splitting, outlier detection, retry failed requests | App Int; App Ext global and regional only |
| Traffic mirroring | App Int; App Ext global and regional; Proxy Int; Proxy Ext regional (not for serverless NEG backends) |
| Configurable timeouts | App, Proxy |
| Custom request and response headers (backend service) | App Ext global and regional only |
| Custom error responses | App Ext global only |
| Service load balancing policy | App Int; App Ext global and regional; Proxy Int cross-region only; Proxy Ext global only |
| Connection tracking policy | Pass Int; Pass Ext (global does not support `PER_SESSION`) |
| Source IP-based traffic steering | Backend service-based regional external passthrough only |

### Autoscaling, security and integrations

| Feature | Support |
|---------|---------|
| MIG autoscaling on serving capacity | App Int; App Ext global and classic only |
| Autohealing, connection draining | All (target pool-based passthrough: no connection draining) |
| Google-managed SSL certificates | App Int; App Ext (global and classic: Compute Engine and Certificate Manager; regional: Certificate Manager only); Proxy Ext global and classic with a target SSL proxy |
| SSL offload, SSL policies | App; Proxy Ext global and classic (target SSL proxy only) |
| Frontend mTLS | App Int and Ext |
| Backend mTLS, authorization policies, CORS | App Int; App Ext global and regional only |
| Identity-Aware Proxy | App (incompatible with Cloud CDN) |
| Service rate limiting policies | App Int regional only (Preview) |
| Cloud CDN | App Ext global and classic (Premium) |
| Service Extensions | App Int and Ext |
| Internal Compute Engine DNS names | App Int and Proxy Int regional only; Pass Int |
| Automatic Service Directory registration (Preview) | App Int, Pass Int |
| App Hub | All |

### Cloud Armor protection for external load balancers

| Load balancer | Security policy types |
|---------------|-----------------------|
| Global external Application, Classic Application | Backend security policy, edge security policy |
| Regional external Application | Regional backend security policy |
| Global external proxy Network, Classic proxy Network | Backend security policy |
| Regional external passthrough Network | Network edge security policy |

## Notes

- Protocols, load balancer to backends: `UNSPECIFIED` enables TCP, UDP, ESP, GRE, ICMP, ICMPv6 for global and regional external passthrough, and TCP, UDP, ICMP, ICMPv6, SCTP, ESP, AH, GRE for internal passthrough. The backend service protocol is ignored for Application LBs with serverless NEG backends.
- Health checks: Health checks are not supported for Application LBs with serverless NEG backends. Target pool-based passthrough supports only legacy HTTP health checks. Regional external Application LB does not support legacy health checks; global external and classic Application LBs support them only with instance group backends serving HTTP or HTTPS.
- Load balancing methods: Custom metrics, in-flight, rate, utilization, max capacity and circuit breaking are not supported with serverless NEG backends.
- This is a condensed restatement of the source feature tables; the source page lists each cell with an info link per load balancer mode. Check https://docs.cloud.google.com/load-balancing/docs/features before relying on a single cell, especially for Preview items (global external passthrough Network LB, Service Directory registration, service rate limiting).
- The source also shows monitoring (byte, packet, RTT, request latency, connection and HTTP request count metrics) and logging (HTTP request and response logs for Application LBs; connection logs for Network LBs) comparison tables, omitted here.
- Advanced network DDoS protection can also be configured for regional external passthrough Network LBs, protocol forwarding and VMs with public IPs.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-services/list (gcloud 593.0.0 help). The source page has no code. The full flag list is in the `gcp-compute` skill. Cloud Armor, Certificate Manager and IAP are in the `gcp-security` skill; Cloud CDN and Service Extensions are in this skill's other categories.
- Google Cloud Load Balancing is not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Source inconsistency: this page says App Ext supports "H2C support for global and regional modes only" (client to load balancer), but the external Application Load Balancer page (https://docs.cloud.google.com/load-balancing/docs/https, retrieved 2026-11-17) says "For the client to load balancer connection, H2C is not supported on global external Application Load Balancers or classic Application Load Balancers".
- Source inconsistency: this page lists TLS early data for the Application Load Balancer without a mode qualifier, but the external Application Load Balancer page (https://docs.cloud.google.com/load-balancing/docs/https, retrieved 2026-11-17) says it "is supported on the target HTTPS proxy of the following external Application Load Balancers" and lists only global external and classic.
- Source inconsistency: this page lists Service Extensions for both internal and external Application Load Balancers without a mode qualifier, but the Service Extensions overview (https://docs.cloud.google.com/service-extensions/docs/lb-extensions-overview, retrieved 2026-11-17) says "Extensions aren't supported on classic Application Load Balancers".
- Source inconsistency: this page lists custom request and response headers (configured on the backend service) as "Only global and regional modes", but the external Application Load Balancer page (https://docs.cloud.google.com/load-balancing/docs/https, retrieved 2026-11-17) says classic is "Configured on the backend service or backend bucket" and regional external is "Configured in the URL map".
- Source: https://docs.cloud.google.com/load-balancing/docs/features (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [load-balancing-overview.md](./load-balancing-overview.md)
- [choosing-load-balancer.md](./choosing-load-balancer.md)
- [quotas.md](./quotas.md)
