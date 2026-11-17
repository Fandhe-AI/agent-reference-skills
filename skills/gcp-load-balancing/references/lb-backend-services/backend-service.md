---
source: https://docs.cloud.google.com/load-balancing/docs/backend-service
---

# Backend services overview

A backend service defines how Cloud Load Balancing distributes traffic: the protocol to backends, distribution and session settings, health checks and timeouts. A backend service is either global or regional in scope. Load balancers, Envoy proxies and proxyless gRPC clients use it to direct traffic to backends (instance groups or NEGs), distribute traffic by balancing mode, pick the health check, set session affinity and decide whether Cloud CDN, Cloud Armor security policies and Identity-Aware Proxy are enabled.

## Signature / Usage

### Named ports (proxy load balancers with instance group backends)

Set the named port on the instance group, then reference its name on the backend service:

```bash
gcloud compute instance-groups unmanaged set-named-ports my-unmanaged-ig \
    --named-ports=my-service-name:8888
```

```bash
gcloud compute backend-services update my-backend-service \
    --port-name=my-service-name
```

## Options / Props

### Backend services by product

| Product | Max backend services | Scope | Load balancing scheme |
|---|---|---|---|
| Global external Application Load Balancer | Multiple | Global | `EXTERNAL_MANAGED` |
| Classic Application Load Balancer | Multiple | Global (always, in either Network Service Tier) | `EXTERNAL` |
| Regional external Application Load Balancer | Multiple | Regional | `EXTERNAL_MANAGED` |
| Cross-region internal Application Load Balancer | Multiple | Global | `INTERNAL_MANAGED` |
| Regional internal Application Load Balancer | Multiple | Regional | `INTERNAL_MANAGED` |
| Global external proxy Network Load Balancer | 1 | Global | `EXTERNAL_MANAGED` |
| Classic proxy Network Load Balancer | 1 | Global | `EXTERNAL` |
| Regional external proxy Network Load Balancer | 1 without TLS routes; multiple with TLS routes | Regional | `EXTERNAL_MANAGED` |
| Regional internal proxy Network Load Balancer | 1 without TLS routes; multiple with TLS routes | Regional | `INTERNAL_MANAGED` |
| Cross-region internal proxy Network Load Balancer | 1 without TLS routes; multiple with TLS routes | Global | `INTERNAL_MANAGED` |
| Global external passthrough Network Load Balancer | 1 | Global | `EXTERNAL_PASSTHROUGH` |
| Regional external passthrough Network Load Balancer | 1 | Regional | `EXTERNAL` |
| Internal passthrough Network Load Balancer | 1 | Regional, configurable to be globally accessible | `INTERNAL` |
| Cloud Service Mesh | Multiple | Global | `INTERNAL_SELF_MANAGED` |

### Supported backend types by product

| Product | Backend types (one combination per backend service) |
|---|---|
| Global external Application Load Balancer | Instance groups (managed and/or unmanaged); `GCE_VM_IP_PORT` zonal NEGs; `NON_GCP_PRIVATE_IP_PORT` hybrid NEGs; zonal + hybrid NEGs; serverless NEGs (App Engine, Cloud Run, Cloud Run functions); one global internet NEG; PSC NEGs (Google APIs: a single NEG; managed services: one or more) |
| Classic Application Load Balancer | Same as global external, without PSC NEGs |
| Regional external / regional internal Application Load Balancer | Instance groups; zonal NEGs; hybrid NEGs; zonal + hybrid NEGs; a single serverless NEG (Cloud Run or Cloud Run functions 2nd gen only); a single PSC NEG; all regional internet NEGs for an external backend; published service backends (Preview) |
| Cross-region internal Application Load Balancer | Instance groups; zonal NEGs; hybrid NEGs; zonal + hybrid NEGs; a single serverless NEG (Cloud Run or Cloud Run functions 2nd gen only); PSC NEGs (Google APIs: a single NEG; managed services: one or more) |
| Global external proxy Network Load Balancer | Instance groups; zonal NEGs; hybrid NEGs; zonal + hybrid NEGs; PSC NEGs |
| Classic proxy Network Load Balancer | Instance groups; zonal NEGs; hybrid NEGs; zonal + hybrid NEGs |
| Regional external / regional internal proxy Network Load Balancer | Instance groups; zonal NEGs; hybrid NEGs; zonal + hybrid NEGs; regional internet NEGs (external); a single PSC NEG; published service backends (Preview) |
| Cross-region internal proxy Network Load Balancer | Instance groups; zonal NEGs; hybrid NEGs; zonal + hybrid NEGs; PSC NEGs |
| Global / regional external passthrough Network Load Balancer | Instance groups; `GCE_VM_IP` zonal NEGs |
| Internal passthrough Network Load Balancer | Instance groups; `GCE_VM_IP` zonal NEGs; one port mapping NEG |
| Cloud Service Mesh | Instance groups; `GCE_VM_IP_PORT` or `NON_GCP_PRIVATE_IP_PORT` zonal NEGs; one `INTERNET_FQDN_PORT` internet NEG; Service Directory service bindings (Preview); published service backends (Preview) |

### Protocol to the backends

| Product family | Protocol options |
|---|---|
| Application Load Balancer | HTTP, HTTPS, HTTP/2 |
| Proxy Network Load Balancer | TCP or SSL (regional proxy Network Load Balancers support only TCP) |
| Global external passthrough Network Load Balancer | UNSPECIFIED |
| Regional passthrough Network Load Balancer | TCP, UDP, or UNSPECIFIED |
| Cloud Service Mesh | HTTP, HTTPS, HTTP/2, gRPC, TCP |

### Balancing modes

| Concept | Values |
|---|---|
| Balancing mode | `CONNECTION` (new TCP connections), `RATE` (HTTP requests/s for Application Load Balancers; packets/s for global external passthrough), `IN_FLIGHT` (in-flight HTTP requests; use instead of `RATE` if requests take more than a second), `UTILIZATION` (approximate CPU utilization of VMs in a zone of an instance group), `CUSTOM_METRICS` |
| Traffic duration (Application Load Balancer, Cloud Service Mesh) | `SHORT` (default; responses in under one second), `LONG`; set with `gcloud compute backend-services add-backend --traffic-duration` or the `trafficDuration` attribute |
| Capacity scaler | `0` = backend completely drained (not allowed with a single backend); `0.1`-`1.0` = percentage of capacity in use |

#### Balancing modes by backend (Yes = supported)

| Backend | CONNECTION | RATE | IN_FLIGHT | UTILIZATION | CUSTOM_METRICS |
|---|---|---|---|---|---|
| Application LB / Service Mesh, SHORT: instance groups | No | Yes | No | Yes | Yes |
| Application LB / Service Mesh, SHORT: `GCE_VM_IP_PORT` or hybrid NEGs | No | Yes | No | No | Yes |
| Application LB / Service Mesh, LONG: instance groups | No | No | Yes | Yes | Yes |
| Application LB / Service Mesh, LONG: `GCE_VM_IP_PORT` or hybrid NEGs | No | No | Yes | No | Yes |
| Proxy Network LB: instance groups | Yes | No | No | Yes | No |
| Proxy Network LB: `GCE_VM_IP_PORT` or hybrid NEGs | Yes | No | No | No | No |

### Target capacity parameters

| Mode | Per zone | Per instance (zonal and regional MIG) | Per endpoint (NEG) |
|---|---|---|---|
| `CONNECTION` | `max-connections` (not regional MIG) | `max-connections-per-instance` | `max-connections-per-endpoint` |
| `RATE` | `max-rate` (not regional MIG) | `max-rate-per-instance` | `max-rate-per-endpoint` |
| `IN_FLIGHT` | `max-in-flight-requests` (not regional MIG) | `max-in-flight-requests-per-instance` | `max-in-flight-requests-per-endpoint` |
| `UTILIZATION` | `max-utilization`, optionally combined with the rate / in-flight / connections parameter; whichever reaches its target first sets capacity | | |
| `CUSTOM_METRICS` | `backends[].customMetrics[].maxUtilization`, optionally combined with the rate / in-flight parameter | | |

### Load balancing locality policy (`localityLbPolicy`)

| Load balancer | Supported options |
|---|---|
| Application LBs (global external, regional external, cross-region internal, regional internal) | `ROUND_ROBIN`, `LEAST_REQUEST`, `RING_HASH`, `RANDOM`, `ORIGINAL_DESTINATION` (not global external), `MAGLEV`, `WEIGHTED_ROUND_ROBIN` |
| Proxy Network LBs (global external, regional external, cross-region internal, regional internal) | `ROUND_ROBIN`, `LEAST_REQUEST`, `RING_HASH`, `RANDOM`, `MAGLEV`, `ORIGINAL_DESTINATION` (not global external) |
| Global external passthrough Network LB | `MAGLEV` |
| Regional external passthrough Network LB | `MAGLEV`, `WEIGHTED_MAGLEV` |
| Internal passthrough Network LB, classic Application LB, classic proxy Network LB | Not supported |

### Timeouts, affinity, subsetting

| Setting | Value |
|---|---|
| Backend service timeout | Default 30 s; range 1 - 2,147,483,647 s. Application LBs: request/response timeout. Proxy Network LBs: idle time before the proxy closes the connection. Passthrough: ignored. Cloud Service Mesh proxyless gRPC: `timeoutSec` unsupported, use `maxStreamDuration` |
| Session affinity default | `NONE` = 5-tuple hash (source IP, source port, destination IP, destination port, protocol); best effort only |
| IP address selection policy (proxy LBs) | Only IPv4; Prefer IPv6 (happy eyeballs fallback to IPv4); Only IPv6 (IPv4-only backends become unhealthy and clients get HTTP `503`) |
| Backend subsetting, regional internal Application LB (Preview) | Not supported by cross-region internal Application LB; requires session affinity `NONE`; `--subsetting-policy` and `--session-affinity` both default to `NONE` and only one can be changed at a time; toggling breaks existing connections |
| Backend subsetting, internal passthrough Network LB | Without subsetting, up to 250 backend instances or endpoints; only 5-tuple session affinity; Packet Mirroring unsupported; toggling breaks existing connections; no charge |

## Notes

- Protocol to the backends: One protocol per backend service, no fallback. Changing it makes backends inaccessible through load balancers for a few minutes.
- Balancing modes: The `IN_FLIGHT` balancing mode with a `LONG` traffic duration applies to Application Load Balancers except classic Application Load Balancers, and to Cloud Service Mesh backends.
- Balancing modes: Global external passthrough Network Load Balancer: `RATE` (instance groups and `GCE_VM_IP` NEGs) and `UTILIZATION` (instance groups only). Regional passthrough Network Load Balancers use `CONNECTION` only and support no target capacity or capacity scaler. Internet, serverless and PSC NEGs support none of balancing mode, target capacity or capacity scaler.
- Target capacity parameters: With N instances, h healthy, per-instance value X: zonal target capacity is `N * X`, average per instance `(N * X) / h`. With `max-*` per zone X: average `X / h`. `UTILIZATION` for global external passthrough: defaults to `max-utilization` 0.8 (80%) if `max-utilization` and `max-rate-per-instance` are omitted.
- Load balancing locality policy (`localityLbPolicy`): Values: `ROUND_ROBIN` (default), `LEAST_REQUEST`, `RING_HASH`, `RANDOM`, `ORIGINAL_DESTINATION`, `MAGLEV`, `WEIGHTED_MAGLEV` (regional external passthrough only; needs a non-legacy HTTP-based health check returning `X-Load-Balancing-Endpoint-Weight`), `WEIGHTED_ROUND_ROBIN` (custom metrics).
- Load balancing locality policy (`localityLbPolicy`): Proxy-based default: `ROUND_ROBIN` when session affinity is `NONE`, `MAGLEV` otherwise. Passthrough default: `MAGLEV`. Configure with `gcloud compute backend-services create --locality-lb-policy` or the `localityLbPolicy` field.
- Instance groups: a VM can belong to only one load-balanced instance group. The same group may serve several backend services, but `UTILIZATION` and `CUSTOM_METRICS` are incompatible with every other mode, so such a group also can't back a passthrough Network Load Balancer (`CONNECTION`). No single command changes the balancing mode on several backend services; remove the group from all but one, change the mode, then re-add.
- Named ports apply only to instance group backends of proxy load balancers; NEGs define ports on endpoints. Passthrough load balancers don't use them.
- A single backend service can't mix instance groups and zonal NEGs. A backend instance group or NEG can't be deleted while a backend service references it.
- Health checks: required for instance group and zonal NEG backends; backend services with a serverless NEG or global internet NEG must not reference one.
- Cloud CDN and IAP can't be enabled on the same backend service. Cloud Armor can be enabled on global external / classic Application LB, global external / classic proxy Network LB and regional external passthrough Network LB.
- Standard Tier with classic LBs: backend service stays global, but the forwarding rule and IP are regional and all backends must be in the forwarding rule's region.
- `EXTERNAL_MANAGED` backend services can attach to `EXTERNAL` forwarding rules, not vice versa. Service Directory service bindings (Preview) can no longer be created; the Cloud Service Mesh integration will be deprecated.
- Static content on global external or classic Application LB: consider backend buckets instead (see [backend-bucket.md](./backend-bucket.md)).
- The full `gcloud compute backend-services` flag list is in the `gcp-compute` skill: https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-services . Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Source also shows tables of IPv6/dual-stack footnotes and console steps; per-mode arithmetic is condensed above.
- Corrected from the official docs: the source spells the in-flight balancing mode `IN-FLIGHT` in some places (the mode list and "use the `RATE`, `IN-FLIGHT`, or `CONNECTION` balancing modes") and `IN_FLIGHT` in others (the balancing mode tables and the in-flight section); this page uses `IN_FLIGHT` throughout. The source also writes the target capacity parameter as `max-flight-requests-per-endpoint` once; this page uses `max-in-flight-requests-per-endpoint`, the form used in the source's in-flight section.
- Source inconsistency: the SHORT / LONG traffic duration tables in the source list "Application Load Balancer" backends without a classic exception, but the in-flight section says "Application Load Balancers (except classic Application Load Balancers) and Cloud Service Mesh backends with a long traffic duration setting can use the `IN_FLIGHT` balancing mode". The exception is applied above.
- Source: https://docs.cloud.google.com/load-balancing/docs/backend-service (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [health-check-concepts.md](./health-check-concepts.md)
- [enabling-connection-draining.md](./enabling-connection-draining.md)
- [backend-bucket.md](./backend-bucket.md)
