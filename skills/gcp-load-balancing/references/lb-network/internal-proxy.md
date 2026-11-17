---
source: https://docs.cloud.google.com/load-balancing/docs/tcp/internal-proxy
---

# Internal proxy Network Load Balancer overview

The internal proxy Network Load Balancer is a Layer 4 load balancer powered by open source Envoy and the Andromeda network virtualization stack. It runs and scales TCP traffic behind a regional internal IP address reachable only from the same VPC network or connected networks. Envoy terminates the client TCP connection and opens a second TCP connection to backends in Google Cloud, on-premises or other clouds.

## Signature / Usage

### Identify the mode

```bash
gcloud compute forwarding-rules describe FORWARDING_RULE_NAME
```

Check the scheme, region and tier in the output (see table below). After creation a load balancer's mode cannot be edited: you must delete it and create a new one (destructive; try on a disposable resource first). In the console, a blank region on the Load Balancers tab means cross-region mode.

## Options / Props

### Modes

| Mode | Load balancing scheme | Forwarding rule |
|---|---|---|
| Regional internal proxy Network Load Balancer | INTERNAL_MANAGED | Regional |
| Cross-region internal proxy Network Load Balancer | INTERNAL_MANAGED | Global |

| Feature | Regional | Cross-region |
|---|---|---|
| VIP | From a subnet in a specific region | From a subnet in a specific region; VIPs from several regions can share one global backend service |
| Client access | Not global by default; global access optional | Always globally accessible |
| Backends | Regional, same region as the proxy | Global, any region |
| Failover | Healthy backends in the same region | Healthy backends in the same or other regions |

### Proxy-only subnet (one per region of a VPC network used)

| Mode | `--purpose` | `--stack-type` |
|---|---|---|
| Regional | `REGIONAL_MANAGED_PROXY` (shared by all regional Envoy-based load balancers in the region and network; can't be shared with cross-region load balancers) | `IPV4_IPV6` to terminate IPv6 or IPv4; `IPV4_ONLY` to terminate IPv4 |
| Cross-region | `GLOBAL_MANAGED_PROXY` (needed in each region where configured; shared by cross-region proxies in the same region and network) | `IPV4_IPV6` or `IPV4_ONLY` |

### Frontend resources

| Mode | Forwarding rule / address | Target proxy | TLS route | Backend service | Health check |
|---|---|---|---|---|---|
| Regional | Regional `forwardingRules`, regional address (`--purpose` `SHARED_LOADBALANCER_VIP`) | Regional `regionTargetTcpProxies` | Regional `tlsRoutes` | Regional `regionBackendServices` | Regional `regionHealthChecks` |
| Cross-region | Global `globalForwardingRules`, regional addresses (`SHARED_LOADBALANCER_VIP`) | Global `targetTcpProxies` | Global `tlsRoutes` | Global `backendServices` | Global `healthChecks` |

| Frontend resources |
|---|
| A forwarding rule references one regional IP address and a single port from 1-65535; for more ports create more forwarding rules. Clients must use TCP. Reserve a static address; otherwise update DNS records when a recreated rule gets a new ephemeral IP. |
| IPv6: custom mode VPC network with `--enable-ula-internal-ipv6`; forwarding rule subnet dual-stack (`IPv4_IPv6`) or `IPV6_ONLY` with `ipv6-access-type` `INTERNAL`; the rule references a `/96` range of the subnet's `/64` internal range (reserved, custom ephemeral or auto-assigned). A custom ephemeral IPv6 address needs gcloud or the API. |
| The original client IP and port aren't preserved unless you use the PROXY protocol. |
| Each target proxy references either one backend service or one or more TLS routes, not both. Without TLS routes there is a single backend service per load balancer. Attach TLS routes with `gcloud network-services tls-routes` (https://cloud.google.com/sdk/gcloud/reference/network-services/tls-routes). |

### Supported backends

| Mode | Instance groups | Zonal NEGs | Internet NEGs | Serverless NEGs | Hybrid NEGs | PSC NEGs | GKE |
|---|---|---|---|---|---|---|---|
| Regional | Yes | Yes (`GCE_VM_IP_PORT`) | Yes (regional NEGs only) | No | Yes | Yes | No |
| Cross-region | Yes | Yes (`GCE_VM_IP_PORT`) | No | No | Yes | Yes | No |

### Client access

| Global access disabled | Global access enabled |
|---|---|
| Same region as the load balancer; same or peered VPC network. On-premises through Cloud VPN tunnels or VLAN attachments in the same region. | Any region; same or peered VPC network. On-premises through tunnels or attachments in any region. |

### Failover

| Mode | Behavior | All backends unhealthy |
|---|---|---|
| Regional | Gentle per-zone failover: traffic moves to another zone when the healthy ratio in a zone drops below 70% (not configurable) | Connection terminated |
| Cross-region | Automatic failover to healthy backends in the same or other regions | Connection terminated |

## Notes

- Proxy-only subnet (one per region of a VPC network used): The proxy-only subnet is used only by Envoy proxies. The load balancer's IP is not in it; backends receive connections from it.
- Supported backends: Use one backend type per service (instance groups or NEGs); zonal and hybrid NEGs can be mixed. Enable connection draining to reduce interruptions. Balancing mode (regional): `CONNECTION` (groups or NEGs) or `UTILIZATION` (instance groups only). Protocol to backends: TCP only.
- Backend networks: Backends of instance groups, zonal and hybrid NEGs must be in the backend service's project and region but may use a different VPC network in that project, provided the backend network matches the forwarding rule's network, or is connected by VPC Network Peering (with subnet route exchange covering proxy-only subnet and backend subnets), or both are VPC spokes of the same Network Connectivity Center hub (import/export filters must allow it). Cloud VPN, Cloud Interconnect or NCC can also connect them. Other backend types must be in the same VPC network and region. Instance group backends receive packets on `nic0`; use NEGs for non-`nic0` interfaces. If the backend subnet stack type includes IPv6 its `ipv6-access-type` must be `INTERNAL`; an `IPV4_ONLY` proxy-only subnet only reaches backends over IPv4.
- Firewall: Allow ingress from Google health check probe ranges and from the proxy-only subnet to the health check destination port, instance group named-port numbers and `GCE_VM_IP_PORT` endpoint ports. Exceptions: no probe rule for hybrid NEGs (still needed if mixed with zonal NEGs); health checks are optional for regional internet NEGs, whose traffic comes from the proxy-only subnet and is NAT-translated by Cloud NAT. Cloud NGFW Essentials and Standard firewall policies can control client access to the forwarding rules.
- Client access: Cross-region mode has global access on by default.
- SNI-based routing with TLS routes (TLS passthrough): A TLS route maps SNI hostnames to backend services; the load balancer reads the SNI from `ClientHello` and passes the encrypted stream through without decrypting it. It closes the connection if the client doesn't use TLS, sends no SNI, sends an invalid DNS name, or an SNI matching no TLS route. Matching is by longest suffix: with routes `*.foo.com`, `*.bar.foo.com` and `baz.bar.foo.com`, `baz.bar.foo.com` matches the exact route, `qux.bar.foo.com` matches `*.bar.foo.com`, `qux.qux.foo.com` matches `*.foo.com`. Limitations: a target TCP proxy references one backend service or TLS routes, not both; HTTP connection coalescing isn't detected and can misroute HTTP requests.
- Session affinity: `NONE` (default; 5-tuple hash) or `CLIENT_IP` (2-tuple of source and destination IP). `--session-affinity` and `--subsetting-policy` both default to `NONE` and only one can be changed at a time. Affinity can break when the selected backend is removed or unhealthy, its group or NEG is full (prefer `RATE` or `CONNECTION` over `UTILIZATION`), or the total or healthy number of backends changes. Don't rely on it for authentication or security.
- Shared VPC: The internal IP address, forwarding rule, target proxy, regional internal backend service and health check must be in the service project of the backends; the address and forwarding rule reference the same subnet in the host project's Shared VPC network.
- Limitations: no Shared VPC with the frontend in one project and backend service and backends in another service project (cross-project service referencing). Google guarantees no TCP connection lifetime (Envoy restarts); clients must tolerate drops.
- Traffic distribution: a client's connections go to the same zone while healthy backends have capacity; after backend selection, `localityLbPolicy` on the regional backend service sets the algorithm. Quotas: https://docs.cloud.google.com/load-balancing/docs/quotas.
- GKE applications can use standalone zonal NEGs (you create the Service that creates the NEG and attach it to the backend service); GKE side is in `gcp-gke`.
- This is Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`). The full `gcloud compute ...` flag lists are in the `gcp-compute` skill.
- The source also shows a Console flow for identifying the mode.
- Source inconsistency: the session affinity advice says to "use the `RATE` or `CONNECTION` balancing mode" instead of `UTILIZATION`, but the same source lists only `CONNECTION` and `UTILIZATION` as balancing modes for internal proxy Network Load Balancer backends, so only `CONNECTION` applies here.
- Source: https://docs.cloud.google.com/load-balancing/docs/tcp/internal-proxy (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [proxy-network-load-balancer.md](./proxy-network-load-balancer.md)
- [passthrough-network-load-balancer.md](./passthrough-network-load-balancer.md)
