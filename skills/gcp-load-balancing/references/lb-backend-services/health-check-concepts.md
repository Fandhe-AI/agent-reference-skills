---
source: https://docs.cloud.google.com/load-balancing/docs/health-check-concepts
---

# Health checks overview

Configurable health checks for Google Cloud load balancer backends, Cloud Service Mesh backends and application-based autohealing of managed instance groups. Dedicated software tasks (probers) send probes per the health check resource; consecutive successes or failures decide whether a backend is healthy and eligible for new requests or connections.

## Signature / Usage

Snippet from the gcloud help (EXAMPLES of `gcloud compute health-checks create http2`):

```bash
gcloud compute health-checks create http2 my-health-check-name
```

## Options / Props

### Categories and protocols

| Item | Details |
|---|---|
| Health checks (regional or global) | gRPC, gRPC (with TLS), TCP, SSL, HTTP, HTTPS, HTTP/2. |
| Legacy health checks | legacy global HTTP and HTTPS. Neither converts to the other category. |

### Which health check per load balancer

| Load balancer | Category and scope |
|---|---|
| Global external Application LB, classic Application LB, global external proxy Network LB, classic proxy Network LB, cross-region internal Application LB, cross-region internal proxy Network LB | Health check, global |
| Regional external / regional internal Application LB, regional internal / regional external proxy Network LB | Health check, regional |
| Global external passthrough Network LB | Health check, global |
| Regional external passthrough Network LB | Backend service-based: regional health check. Target pool-based: legacy global HTTP health check |
| Internal passthrough Network LB | Health check, global or regional |

### Probe settings and defaults

| Flag | Default | Purpose |
|---|---|---|
| `check-interval` | `5s` | Start of one probe to start of the next from the same prober |
| `timeout` | `5s` | Wait for a response; must be <= check interval |
| `healthy-threshold` | `2` | Consecutive successes for a previously unhealthy (`UNHEALTHY` or `TIMEOUT`) backend to become healthy; new backends may become healthy after one success |
| `unhealthy-threshold` | `2` | Consecutive failures for a previously healthy (`HEALTHY` or `DRAINING`) backend to become unhealthy; existing connections aren't terminated immediately |
| `--port` / `--use-serving-port` | Port required | Legacy health checks have only `--port` |
| `--proxy-header` | | Any protocol except legacy |
| `--host` | | HTTP, HTTPS, HTTP/2 and legacy |

### Success criteria

| Protocol | Rule |
|---|---|
| HTTP, HTTPS, HTTP/2 | HTTP `200 (OK)` before timeout (301/302 are unhealthy). Default path `/` (`--request-path`); optional `--response` must match the first 1,024 ASCII bytes of the body |
| TCP | Open a TCP connection before timeout; closed by prober FIN/RST or backend FIN (a backend RST after prober FIN might fail the probe) |
| SSL | TCP connection plus TLS/SSL handshake before timeout |
| TCP, SSL strings | `--request` and `--response`: single-byte printable ASCII, each max 1,024 characters; response must match exactly; `--request` alone checks no response |
| gRPC | `grpc` (insecure backends) and `grpc_with_tls` (unauthenticated TLS, no identity check); service must reply status `OK` with `SERVING` / `NOT_SERVING` |
| Legacy | HTTP `200 OK` |

### Probe source IP ranges (allow in ingress firewall rules)

| Load balancer / backends | IPv4 | IPv6 |
|---|---|---|
| GFE-based (global external Application, classic Application, global external proxy, classic proxy) and managed Envoy-based; internal passthrough; Cloud Service Mesh; instance groups and `GCE_VM_IP_PORT` NEGs | `35.191.0.0/16` | `2600:2d00:1:b029::/64` |
| Global external passthrough Network LB | `136.124.104.0/22`, `136.124.108.0/22` | `2600:1904:7::/48`, `2600:1904:8::/48` |
| Regional external passthrough Network LB | `35.191.0.0/16`, `209.85.152.0/22` (target pools), `209.85.204.0/22` | `2600:1901:8001::/48` |

### Behavior when all backends are unhealthy

| Load balancer | Behavior |
|---|---|
| Classic Application LB | HTTP `502` |
| Global external, cross-region internal, regional external, regional internal Application LB | HTTP `503` |
| Proxy Network LBs | New client TCP connections terminated |
| Global external passthrough Network LB | Fail over to the next closest region with healthy backends; if all unhealthy globally, distribute among unhealthy backends per target capacities |
| Internal passthrough and backend service-based regional external passthrough | Drop if failover policy says drop; otherwise distribute among unhealthy backends per failover config and weights |
| Target pool-based regional external passthrough | Distribute among all unhealthy backends |

## Notes

- Which health check per load balancer: Legacy health checks for external Application LBs aren't recommended: supported on global external and classic Application LBs only with instance group backends serving HTTP or HTTPS; not supported on regional external Application LB. A target pool-based regional external passthrough LB must use a legacy HTTP health check (not HTTPS, not non-legacy) and VMs must run an HTTP service. For gRPC backend services use only gRPC or TCP health checks. Some Envoy-based load balancers with hybrid NEG backends don't support gRPC health checks.
- Probe source IP ranges (allow in ingress firewall rules): Hybrid NEGs and regional internet NEGs behind managed Envoy load balancers are checked from the proxy-only subnet; Cloud Service Mesh hybrid and internet NEGs from your Envoy proxies. Internet NEGs (global), serverless NEGs and PSC NEGs don't support health checks. Target pool-based external passthrough LBs may proxy probes via the metadata server `169.254.169.254` (always allowed, IPv4 only).
- Probe frequency: Each prober applies interval and timeout, and generally 5 to 10 probers run simultaneously, so logs show more probes than configured. Frequency multiplies by the number of unique forwarding rule IPs (passthrough; a global external passthrough rule has two IPs), by the number of target proxies (Application LBs per URL map; proxy Network LBs per backend service), and sums across backend services sharing a backend.
- Create ingress `allow` firewall rules for all probe ranges, limited to the health check protocols and ports; the implied deny ingress rule otherwise marks backends unhealthy. Probe ranges can't be used for VPC subnets, and Google edge routers drop spoofed packets from them. Firewall configuration is covered by the `gcp-networking` skill.
- Probers don't validate certificates (self-signed, expired, any CN/SAN are accepted). Custom request headers added by the load balancer aren't added to probes.
- Probers only contact running VMs. Health check settings are per backend service (or target pool), not per backend. Passthrough applications must bind to the load balancer IP (or `0.0.0.0`).
- Cloud Service Mesh: Envoy performs checks (HTTP, HTTPS, HTTP/2, TCP) for `INTERNET_FQDN_PORT` and `NON_GCP_PRIVATE_IP_PORT` endpoints; no health check can be set when a Service Directory service is bound.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/health-checks/create/http2 (gcloud 593.0.0 help). Full flags are in the `gcp-compute` skill. Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`) or Vercel (`vercel`).
- Source inconsistency: the probe range table here lists only `35.191.0.0/16` (IPv4) for instance groups, `GCE_VM_IP_PORT` NEGs and hybrid connectivity NEGs, but the hybrid NEG page (https://docs.cloud.google.com/load-balancing/docs/negs/hybrid-neg-concepts, retrieved 2026-11-17) says "The ranges to be allowed are: `35.191.0.0/16` and `130.211.0.0/22`". When hybrid NEGs are backends, allow both ranges.
- Source: https://docs.cloud.google.com/load-balancing/docs/health-check-concepts (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [backend-service.md](./backend-service.md)
- [enabling-connection-draining.md](./enabling-connection-draining.md)
