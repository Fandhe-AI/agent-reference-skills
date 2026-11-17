---
source: https://docs.cloud.google.com/load-balancing/docs/https/traffic-management-global
---

# Traffic management overview for global external Application Load Balancers

Overview of the advanced traffic management features of the global external Application Load Balancer (always global, always Premium Tier): traffic steering, traffic actions and traffic policies, configured through global URL maps and global backend services. For the classic and regional external modes, see their own traffic management overviews.

## Signature / Usage

### Simple host and path rule

```bash
gcloud compute url-maps describe lb-map
```

```yaml
defaultService: global/backendServices/web-backend-service
hostRules:
- hosts:
  - '*'
  pathMatcher: pathmap
name: lb-map
pathMatchers:
- defaultService: global/backendServices/web-backend-service
  name: pathmap
  pathRules:
  - paths:
    - /video
    - /video/*
    service: global/backendServices/video-backend-service
```

### Advanced host, path and route rule (95% / 5% weighted split)

Adapted (not in the official docs): `priority: 1` is added to the route rule; the Compute Engine API requires a priority on every route rule.

```yaml
defaultService: global/backendServices/service-a
hostRules:
- hosts:
  - '*'
  pathMatcher: matcher1
name: lb-map
pathMatchers:
- defaultService: global/backendServices/service-a
  name: matcher1
  routeRules:
  - matchRules:
    - prefixMatch: ''
    priority: 1
    routeAction:
      weightedBackendServices:
      - backendService: global/backendServices/service-a
        weight: 95
      - backendService: global/backendServices/service-b
        weight: 5
```

### Test host-based matching

```bash
curl -v http://10.1.2.9/video/hd --header 'Host: example.com'
```

## Options / Props

### Feature groups

| Feature | Configured on | Examples |
|---|---|---|
| Traffic steering | URL map | Route by host, path, headers and other request parameters |
| Traffic actions | URL map | Redirects, header transformations, weighted splits, mirroring |
| Traffic policies | Backend service | Locality load balancing policy, consistent hash, outlier detection |

### Route rule components

| Component (`API field`) | Description |
|---|---|
| Priority (`priority`) | Number from 0 through 2,147,483,647 ((2^31)-1) within a path matcher. Lower number is evaluated first (`4` before `25`); first matching rule applies. Gaps allowed; two rules can't share a priority. |
| Description (`description`) | Optional, up to 1,024 characters. |
| Service (`service`) | Full or partial URL of the backend service to use on match. |
| Match rules (`matchRules`) | Criteria on path, HTTP headers, query parameters. All criteria inside one `matchRule` must match; with several `matchRules`, any one matching applies the route actions. Evaluation stops at the first matching match rule. |
| Route action (`routeAction`) | Traffic splitting, URL rewrites, retry and mirroring, fault injection, CORS. |
| Redirect action (`urlRedirect`) | HTTP redirect response; can't be combined with a route action. |
| Header action (`headerAction`) | Request and response header transformations. |

### Route actions

| Route action (`API field`) | Description |
|---|---|
| Redirects (`urlRedirect`) | Returns a configurable 3xx code and sets `Location`. |
| URL rewrites (`urlRewrite`) | Rewrites host, path or both before sending to the backend; `pathTemplateRewrite` supports wildcards. |
| Header transformations (`headerAction`) | Add / remove request headers before the backend, and response headers after. Adding and removing the same header removes it, unless `replace: True` is used with `requestHeadersToAdd`. |
| Traffic mirroring (`requestMirrorPolicy`) | Sends an identical fire-and-forget request to a mirror backend service; the load balancer doesn't wait for its response. |
| Weighted traffic splitting (`weightedBackendServices`) | Distributes traffic proportional to weights; `weight` must be from 0 to 1000. |
| Retries (`retryPolicy`) | Retry conditions, wait time and maximum number of retries. |
| Timeout (`timeout`) | Route timeout, from request fully processed to response fully processed; includes all retries. |
| Fault injection (`faultInjectionPolicy`) | Delay injection (delays a portion of requests) and abort injection (answers a fraction with user-defined HTTP status codes). |
| Security policies (`corsPolicy`) | CORS enforcement settings. |

### Traffic policies (global backend service)

| Policy (`API field`) | Description |
|---|---|
| Load balancing locality policy (`LocalityLbPolicy`) | After the backend is chosen by balancing mode, distributes among instances or endpoints within each zone. For regional managed instance groups it applies to each zone. |
| Session affinity (`consistentHash`) | HTTP cookie, HTTP header, client IP, stateful cookie and generated cookie affinity (best effort). Honored only if the locality policy is `RING_HASH` or `MAGLEV`. |
| Outlier detection (`outlierDetection`) | Criteria for evicting unhealthy VMs or NEG endpoints and for letting them back in. |

## Notes

- Route actions: One of these can be chosen: route to a single `service`, split with `weightedBackendServices`, or `urlRedirect`. `service` and `weightedBackendServices` can be combined with `requestMirrorPolicy`, `urlRewrite`, `retryPolicy`, `timeout`, `faultInjectionPolicy`, `corsPolicy` (fields of `routeAction`) and `headerAction`; `urlRedirect` cannot be used with a route action (see the Source inconsistency line below).
- Routing is two-phase: the URL map selects a backend service or backend bucket, then the backend service selects an instance. Simple host/path rules and advanced host/path/route rules are mutually exclusive in one URL map. Path rules use longest-path-match-first (any order); route rules use priority order.
- Traffic mirroring is supported when both backend services use managed instance groups, zonal NEGs or hybrid NEGs; not supported for internet NEGs, serverless NEGs and Private Service Connect backends. Requests to the mirrored backend service generate no Cloud Logging / Cloud Monitoring logs or metrics.
- Traffic policies (locality policy, session affinity, outlier detection) aren't supported with internet NEG backends.
- Don't configure session affinity with weighted traffic splitting; the weighted splitting configuration takes precedence.
- Service Extensions can add callouts and plugins at authorization, edge, route and traffic extension points of supported Application Load Balancers.
- Google Cloud Load Balancing, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Source inconsistency: the source says traffic policies "aren't supported with internet NEG backends", but the internet NEG page (https://docs.cloud.google.com/load-balancing/docs/negs/internet-neg-concepts, retrieved 2026-11-17) says the advanced traffic management features (mirroring, retry policies and traffic policies) "aren't supported with *global* internet NEG backends", and regional internet NEGs use Envoy-based algorithms. Read the restriction as applying to global internet NEGs, which are the only internet NEGs that the global external Application Load Balancer supports.
- The table uses the source's concept names; the Compute Engine v1 API field for the locality policy is `BackendService.localityLbPolicy`.
- Source inconsistency: the source says "you can combine any one of the previously mentioned route actions" (which include `urlRedirect`) with mirroring, rewrites, retries, timeouts, fault injection, CORS and header actions, but its own table says `urlRedirect` "cannot be used in conjunction with a route action", and the Compute Engine v1 Discovery document says "Only one of urlRedirect, service or routeAction.weightedBackendService can be set". `requestMirrorPolicy`, `urlRewrite`, `retryPolicy`, `timeout`, `faultInjectionPolicy` and `corsPolicy` are fields of `HttpRouteAction`, so they are not available on a redirect rule; `headerAction` is a separate field of the rule.
- Adapted from the official docs: the source's 95% / 5% split URL map has a route rule without `priority`; the `HttpRouteRule.priority` description in the Compute Engine v1 Discovery document says "Priority for each rule must be set to a number from 0 to 2147483647 inclusive", so `priority: 1` was added.
- Source: https://docs.cloud.google.com/load-balancing/docs/https/traffic-management-global (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [url-map-concepts.md](./url-map-concepts.md)
- [custom-headers-global.md](./custom-headers-global.md)
- [setting-up-global-http-https-redirect.md](./setting-up-global-http-https-redirect.md)
- Set up traffic management: https://docs.cloud.google.com/load-balancing/docs/https/setting-up-global-traffic-mgmt
