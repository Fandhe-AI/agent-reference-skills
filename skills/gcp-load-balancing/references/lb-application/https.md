---
source: https://docs.cloud.google.com/load-balancing/docs/https
---

# External Application Load Balancer overview

Concepts for configuring an external Application Load Balancer: a proxy-based Layer 7 load balancer behind a single external IP address, in global external, classic or regional external mode. Covers architecture components, backends, firewall ranges, Shared VPC, HTTP/2, HTTP/3, WebSocket, gRPC, TLS and limitations.

## Signature / Usage

### Identify the mode

```bash
gcloud compute forwarding-rules describe FORWARDING_RULE_NAME
```

### Configure HTTP/3 (global external and classic in Premium Tier)

Create the SSL certificate resource first, then set the QUIC override on the target HTTPS proxy.

Adapted (not in the official docs): the required `--url-map` flag and the `--ssl-certificates` flag (the source says a certificate resource must exist first) are added to the create command; without `--url-map` gcloud rejects it.

```bash
gcloud compute target-https-proxies create HTTPS_PROXY_NAME \
    --global \
    --url-map=URL_MAP_NAME \
    --ssl-certificates=SSL_CERTIFICATE_NAME \
    --quic-override=QUIC_SETTING
```

Adapted (not in the official docs): the placeholder is quoted so the body is valid JSON, and the host/path is the `compute.googleapis.com/compute/v1` form used by the other API example in the same page (the source shows `www.googleapis.com/v1/compute/...` and an unquoted value).

```text
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/targetHttpsProxies/TARGET_PROXY_NAME/setQuicOverride

{
  "quicOverride": "QUIC_SETTING"
}
```

### Configure TLS 1.3 early data (0-RTT)

```bash
gcloud compute target-https-proxies update TARGET_HTTPS_PROXY \
  --tls-early-data=TLS_EARLY_DATA_MODE
```

```text
PATCH https://compute.googleapis.com/compute/v1/projects/{project}/global/targetHttpsProxies/TARGET_HTTPS_PROXY
{
    "tlsEarlyData":"TLS_EARLY_DATA_MODE",
    "fingerprint": "FINGERPRINT"
}
```

### Extract source IPs of global internet NEG backends (Linux)

```bash
dig TXT _cloud-eoips.googleusercontent.com | grep -Eo 'ip4:[^ ]+' | cut -d':' -f2
```

### Replace X-Forwarded-For with only client and load balancer IP (backend service flag)

```text
--custom-request-header=x-forwarded-for:{client_ip_address},{server_ip_address}
```

## Options / Props

### Modes

| Mode | Scheme / forwarding rule | Network tier | Notes |
|---|---|---|---|
| Global external | `EXTERNAL_MANAGED`, global | Premium | GFE + Envoy; advanced traffic management; Cloud CDN, Cloud Armor, Service Extensions, IAP |
| Classic | `EXTERNAL`, global | Premium (global) or Standard (regional) | GFE; fewer routing features; no Private Service Connect NEGs, no Service Extensions |
| Regional external | `EXTERNAL_MANAGED`, regional | Premium or Standard | Envoy; needs proxy-only subnet; serves only the configured region |

### Resource scope by mode

| Resource | Global external / Classic | Regional external |
|---|---|---|
| Target proxy | targetHttpProxies / targetHttpsProxies | regionTargetHttpProxies / regionTargetHttpsProxies |
| URL map | urlMaps (classic: subset of features) | regionUrlMaps |
| Backend service | backendServices | regionBackendServices |
| Health check | healthChecks | regionHealthChecks |
| Custom headers | Configured on backend service or bucket (global external: not supported with Cloud CDN) | Configured in the URL map |

### Backend support

| Mode | Instance groups | Zonal NEGs (`GCE_VM_IP_PORT`) | Internet NEGs | Serverless NEGs | Hybrid NEGs | PSC NEGs | Backend buckets | Cloud Armor | Cloud CDN | IAP | Service Extensions |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Global external | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| Classic | Yes | Yes | Yes | Yes | Yes | No | Yes | Yes | Yes (Premium Tier) | Yes | No |
| Regional external | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No | Yes | Yes |

### Backend protocols

| Protocol | Behavior |
|---|---|
| HTTP | HTTP/1.1, no TLS |
| HTTPS | HTTP/1.1 with TLS |
| HTTP2 | HTTP/2 with TLS (unencrypted HTTP/2 not supported) |
| H2C | HTTP/2 over TCP, no TLS required; not supported for classic |

### Backend location rules

| Mode | Rule |
|---|---|
| Global external | Backends in any VPC network within the same organization; no peering needed. Buckets in any project of the organization |
| Classic | Backends and buckets in the same project as the load balancer; instance group / NEG may use a different VPC network in that project |
| Regional external | Instance groups, zonal and hybrid NEGs in the same project and region as the backend service; backend VPC network must equal the forwarding rule's network, or be connected through VPC Network Peering (with subnet route exchange covering proxy-only subnet), or both be VPC spokes of the same NCC hub. Other backend types: same VPC network and region |

### Firewall source ranges

| Mode | Health check ranges | Request source ranges |
|---|---|---|
| Global external | IPv4 `35.191.0.0/16`; IPv6 `2600:2d00:1:b029::/64` | Instance groups, zonal NEGs: `130.211.0.0/22`, `35.191.0.0/16` (IPv6 `2600:2d00:1:1::/64`); hybrid NEGs: `130.211.0.0/22`, `35.191.0.0/16`; internet NEGs: ranges in the `_cloud-eoips.googleusercontent.com` TXT record; serverless NEGs and buckets: Google production network |
| Classic | IPv4 `35.191.0.0/16` | Same as global external for IPv4 (no IPv6 range listed) |
| Regional external | IPv4 `35.191.0.0/16`; IPv6 `2600:2d00:1:b029::/64` (not required for hybrid NEGs only) | The configured proxy-only subnet; for dual-stack proxy-only subnets set the IPv6 source range explicitly (for example `::/0` or the subnet's IPv6 range) |

### HTTP/3 `quicOverride` values and support

| Value | Behavior |
|---|---|
| `NONE` (default) | HTTP/3 advertised (Google QUIC not advertised); console name Automatic (Default) |
| `ENABLE` | HTTP/3 advertised (the API reference text also says "Google QUIC"; see Notes) |
| `DISABLE` | Advertising of HTTP/3 and Google QUIC disabled; no `alt-svc` header |

### TLS early data modes (default `DISABLED`; global external and classic only)

| Mode | Behavior |
|---|---|
| `STRICT` | Early data for GET, HEAD, OPTIONS, TRACE without query parameters; others rejected with `425` |
| `PERMISSIVE` | Early data for safe methods; query parameters allowed |
| `DISABLED` | Early data not advertised |
| `UNRESTRICTED` | Any method incl. POST; not recommended for most workloads |

### Other limits and behaviors

| Item | Value |
|---|---|
| Forwarding rule ports | One port from 1-65535 per rule |
| HTTP/2 max concurrent streams to backend | Server's `SETTINGS_MAX_CONCURRENT_STREAMS`, capped at `100`; `0` prevents forwarding |
| TLS to clients | TLS 1.0, 1.1, 1.2, 1.3 accepted by default |
| TLS to backend | Global/regional external: TLS 1.2 or 1.3; classic: 1.0-1.3 |
| Proxy-added headers | `Via: 1.1 google`, `X-Forwarded-Proto`, `X-Forwarded-For: [SUPPLIED_VALUE,]CLIENT_IP,LOAD_BALANCER_IP`; `X-Cloud-Trace-Context` added by global and classic (not regional) |
| H2C client to load balancer | Automatic on regional external; not supported on global external or classic |
| Cross-project service referencing | Global external: any project in the organization; regional external: Shared VPC required; not supported for classic |

## Notes

- Modes: You can't edit the mode after creation; delete and recreate the load balancer.
- Backend support: Backends on one backend service must all be instance groups or all the same NEG type; the exception is `GCE_VM_IP_PORT` zonal NEGs plus hybrid NEGs for hybrid architectures. IAP and Cloud CDN can't both be enabled on the same backend service. Instance group backends receive packets on `nic0` only; use NEG backends for other interfaces.
- Firewall source ranges: Allow the full health check ranges; allowing only a subset can cause health check failures and HTTP `502` responses. Firewall rules apply at VM level, not on GFEs, and can't block traffic to the load balancer (use Cloud Armor for global external and classic).
- HTTP/3 `quicOverride` values and support: HTTP/3 support: global external Yes; classic Premium Yes; classic Standard No; regional external No. Supported only client to load balancer. Advertised via `alt-svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000`. Google QUIC support was removed April 2023.
- TLS early data modes (default `DISABLED`; global external and classic only): A stale `FINGERPRINT` on PATCH returns `412 Precondition Failed`.
- Google Cloud Load Balancing — not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Regional external load balancers require a `REGIONAL_MANAGED_PROXY` proxy-only subnet in each region and VPC network (see proxy-only-subnets.md). IPv6 forwarding rules require a custom mode network with `--enable-ula-internal-ipv6` and a dual-stack or `IPV6_ONLY` subnet with `ipv6-access-type` `EXTERNAL`; the rule references a `/96` from the subnet's `/64`.
- Only the two IPs appended by the load balancer (`CLIENT_IP,LOAD_BALANCER_IP`) in `X-Forwarded-For` can be trusted. The custom-header example discards existing values permanently; keep the original in another custom header if needed.
- Global Front End (Preview) bundles global external Application Load Balancer, Cloud Armor, Cloud CDN and Service Extensions under Global Front End Enterprise pricing. Google tag gateway for advertisers is supported only on global external load balancers.
- Cross-project service referencing needs `roles/compute.loadBalancerServiceUser` for admins referencing another project's backend service; use unique backend service names across projects. Global external cannot reference a cross-project backend service with App Engine serverless NEG backends; regional external cannot with regional internet NEG backends. Cache invalidation in cross-project setups must be issued by principals with frontend-project roles (for example Compute Network Admin).
- HTTP/2 limits: no connection pooling or server push to backends; gRPC errors appear as `200 OK` in logs. WebSocket needs no configuration (HTTP/1.1 `Upgrade` or HTTP/2 extended `CONNECT`); backend `426` or `502` ends the upgrade.
- Limitations: no `close_notify` on SSL termination; only lowercase domains in CN/SAN; no SNI to backends except Internet NEGs; no early `200 OK` before POST payload is proxied (GFE closes the connection); classic adds `Content-Length: 0` to `DELETE` requests, which can trigger Cloud Armor rules; in the console, Premium Tier regional external offers only Standard-Tier regions (use gcloud / API for others).
- High availability: global-to-regional active-passive or active-active failover with Cloud DNS failover or geolocation routing policies.
- Changing a load balancer's mode or deleting forwarding rules is connectivity-breaking; try on a disposable resource first. TLS 1.3 early data can replay requests: keep it disabled unless the backend rejects non-idempotent early requests with `425 Too Early`.
- Adapted from the official docs: the HTTP/3 gcloud example originally had only `--global` and `--quic-override=QUIC_SETTING` (gcloud requires `--url-map`; see https://docs.cloud.google.com/sdk/gcloud/reference/compute/target-https-proxies/create). The HTTP/3 API example originally read `POST https://www.googleapis.com/v1/compute/projects/PROJECT_ID/global/targetHttpsProxies/TARGET_PROXY_NAME/setQuicOverride` with `"quicOverride": QUIC_SETTING` (unquoted).
- The source also shows Console steps. Cloud Armor, Certificate Manager (mTLS trust stores) and IAP are covered by the `gcp-security` skill.
- Corrected from the official docs: the source shows the `alt-svc` header value as `h3=":443"; ma=2592000,h3-29=":443"; ma=2592000"` with an unbalanced trailing double quote; the trailing quote is removed here because it is not part of a valid header value.
- Source inconsistency: the HTTP/3 section says "Google QUIC (also known as gQUIC) support was removed in April 2023", but the `quicOverride` API description says "`ENABLE`: Advertises HTTP/3 and Google QUIC to clients" and "`DISABLE`: Doesn't advertise HTTP/3 or Google QUIC to clients", while the gcloud description says "`ENABLE`: advertises HTTP/3 to clients" and the value table lists only HTTP/3 for `ENABLE`. The table above follows the value table and gcloud text.
- Source inconsistency: the Backend support table above says Cloud CDN is supported on global external and classic, and Custom headers are "Not supported with Cloud CDN" on global external, but the Cloud CDN caching page (https://docs.cloud.google.com/cdn/docs/caching, retrieved 2026-11-17) describes custom request headers used as cache-key headers and the custom headers page (https://docs.cloud.google.com/load-balancing/docs/https/custom-headers-global, retrieved 2026-11-17) documents `cdn_cache_status` for Cloud CDN-enabled backends. Treat the "Not supported with Cloud CDN" cell as the source's statement for this page only.
- Source inconsistency: the health check source ranges above (global external and classic: `35.191.0.0/16` only) differ from the hybrid NEG page (https://docs.cloud.google.com/load-balancing/docs/negs/hybrid-neg-concepts, retrieved 2026-11-17), which says "The ranges to be allowed are: `35.191.0.0/16` and `130.211.0.0/22`". `130.211.0.0/22` is also a documented GFE request source range here. When hybrid NEGs are backends, allow both ranges.
- Source inconsistency: the load balancer overview page (https://docs.cloud.google.com/load-balancing/docs/features, retrieved 2026-11-17) lists TLS early data without a mode qualifier and Service Extensions for all Application Load Balancers, and lists custom headers as "Only global and regional modes"; this page scopes TLS early data to global external and classic, says Service Extensions are not available on classic, and says classic configures custom headers on the backend service or bucket. This page follows the https page text for those cells.
- Source: https://docs.cloud.google.com/load-balancing/docs/https (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [application-load-balancer.md](./application-load-balancer.md)
- [proxy-only-subnets.md](./proxy-only-subnets.md)
