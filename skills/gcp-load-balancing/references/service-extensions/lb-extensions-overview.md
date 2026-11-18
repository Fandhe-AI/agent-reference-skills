---
source: https://docs.cloud.google.com/service-extensions/docs/lb-extensions-overview
---

# Cloud Load Balancing and Cloud CDN extensions overview

Service Extensions lets supported Application Load Balancers use plugins or send callouts from the load balancing data path to callout backend services or Google services. Four extension types exist: edge, route, authorization and traffic.

## Signature / Usage

### Import an edge extension

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/service-extensions/lb-edge-extensions/import (gcloud 593.0.0 help).

```bash
gcloud service-extensions lb-edge-extensions import \
  my-edge-extension --source=my-edge-extension.yaml \
  --location=global
```

## Options / Props

### Extension types

| Type | Purpose | Runs |
|------|---------|------|
| Edge (`LbEdgeExtension`) | Manipulate request headers to influence backend service selection and what Cloud CDN serves from cache | Early in request processing, before URL map evaluation; request headers only |
| Route (`LbRouteExtension`) | Influence backend service selection | Early, before the URL map is evaluated; request headers only |
| Authorization | Send authorization requests to a custom authorization engine; can't influence backend selection | On the request path after route extensions and after a backend is selected, just before backends |
| Traffic (`LbTrafficExtension`) | Extra security logic and traffic management; modify headers and payloads of requests and responses; custom logging | Last in the request path, first in the response path |

### Supported Application Load Balancers for user-managed extensions

| Application Load Balancer | Edge plugins | Route plugins | Route callouts | Authorization callouts | Traffic plugins | Traffic callouts |
|---------------------------|--------------|---------------|----------------|------------------------|-----------------|------------------|
| Global external | Yes | No | No | Yes | Yes | Yes |
| Regional external | No | Yes | Yes | Yes | Yes | Yes |
| Regional internal | No | Yes | Yes | Yes | Yes | Yes |
| Cross-region internal | No | Yes | Yes | Yes | Yes | Yes |

### Authorization extension design (Preview)

| Policy profile | What the extension receives |
|----------------|-----------------------------|
| `REQUEST_AUTHZ` | HTTP request headers only, with `ext_proc` or `ext_authz` |
| `CONTENT_AUTHZ` | Headers, body and trailers of requests and responses; must use `FULL_DUPLEX_STREAMED` body mode of `ext_proc` |

### Limitations

| Limitations |
|---|
| A forwarding rule can have only one `LbEdgeExtension`, one `LbTrafficExtension` and one `LbRouteExtension`. |
| For callouts, the callout backend service must be in the same project as the forwarding rule. |
| Cross-project referencing between extensions and forwarding rules isn't supported. |

## Notes

- Supported Application Load Balancers for user-managed extensions: Extensions aren't supported on classic Application Load Balancers.
- Authorization extension design (Preview): In Preview, for regional external and regional internal Application Load Balancers, authorization policies are invoked after route extensions.
- Authorization extension design (Preview): Request-authorization-based extensions run before content-authorization-based ones.
- Order of work after an edge extension: URL map backend selection, Cloud Armor, cache lookup, Cloud Armor for the backend, CORS, stateful session affinity, IAP, authorization extensions, fault injection, traffic extensions, URL rewrites, header manipulation and custom request header variables, redirect or routing with timeouts and retries, request mirroring.
- Order after a route extension: URL map backend selection, Cloud Armor, IAP, fault injection, request header transformations, traffic extensions, URL rewrites, redirect or routing.
- Traffic extension request path: before the call it does fault injection, backend selection, Cloud Armor, IAP and (global external only) Cloud CDN caching policies; after it does URL rewrites, header manipulation, redirects or routing, request mirroring. On the response path it does response header transformations, Cloud Logging and (global external only) Cloud CDN caching.
- Edge and route extensions run before custom headers are added, so they don't see custom headers added by the load balancer; use a supported attribute instead.
- The source also shows figures for the data path stages.
- Google Cloud Load Balancing / Cloud CDN, not Cloudflare or Vercel (see `cloudflare-workers`, `vercel`). Cloud Armor and IAP belong to the `gcp-security` skill.
- Source inconsistency: the `CONTENT_AUTHZ` row above says extensions receive request and response bodies, but the callouts overview (https://docs.cloud.google.com/service-extensions/docs/callouts-overview, retrieved 2026-11-17) says "For authorization extensions, the load balancer doesn't forward any request body to the callout backend service" and "Edge, authorization, and route extensions support only HTTP headers".
- Source: https://docs.cloud.google.com/service-extensions/docs/lb-extensions-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/service-extensions/lb-edge-extensions/import (gcloud 593.0.0 help).

## Related

- [plugins-overview.md](./plugins-overview.md)
- [callouts-overview.md](./callouts-overview.md)
- [configure-traffic-extensions.md](./configure-traffic-extensions.md)
- [attributes.md](./attributes.md)
- [quotas.md](./quotas.md)
