---
source: https://docs.cloud.google.com/service-extensions/docs/media-cdn-extensions-overview
---

# Media CDN extensions overview

Preview. Service Extensions lets you run Wasm plugins in the Media CDN processing path through edge extensions (`CdnEdgeExtension`), for requirements beyond Media CDN's built-in capabilities such as normalizing headers for caching, custom URL signing or porting legacy CDN behavior.

## Signature / Usage

### Deploy a new plugin version

Snippet taken from https://docs.cloud.google.com/service-extensions/docs/create-plugin (the overview page itself has no code).

Adapted (not in the official docs): `...-docker.pkg.dev` replaced by `REGION-docker.pkg.dev` because `...` is not a valid placeholder.

```bash
gcloud service-extensions wasm-plugins update my-plugin \
    --image=REGION-docker.pkg.dev/my-project/repository/container:tag \
    --main-version=v2
```

## Options / Props

### How edge extensions run

| Step | Description |
|------|-------------|
| 1. Match condition evaluation | Media CDN evaluates the ordered `extensionChains` of the `CdnEdgeExtension`; the first chain whose CEL expression (`matchCondition.celExpression`) is `true` runs and later chains are skipped |
| 2. `REQUEST_HEADERS` | Plugins run sequentially; at most two plugins per extension chain; they can inspect forwarded headers and Envoy attributes, add or rewrite request headers, or return a synthetic response |
| 3. Route matching and origin selection | Uses request headers or URL paths modified by plugins |
| 4. Cache lookup and origin fetch | Cache keys can incorporate modified headers or paths |
| 5. `RESPONSE_HEADERS` | Plugins run sequentially after content comes from cache or origin |
| 6. Delivery to client | Final response headers and body are delivered |

## Notes

- How edge extensions run: CEL match conditions can use hostnames, URL paths, query parameters or HTTP request headers.
- A `CdnEdgeExtension` attaches directly to an `EdgeCacheService` and runs one or more ordered extension chains. Plugins run at the Google edge network in front of the cache.
- Only `REQUEST_HEADERS` and `RESPONSE_HEADERS` events are supported. Media CDN doesn't support callouts (gRPC `ext_proc`), HTTP body callbacks or HTTP trailer processing.
- Plugins can influence cache key generation, validate custom authorization tokens or URL signatures, and serve synthetic responses.
- To request access to Media CDN, contact your Google Cloud sales representative or account team.
- Google Cloud Service Extensions, not Cloudflare Workers (see `cloudflare-workers`) and not the Wasm toolchain itself (see `rust`).
- Source: https://docs.cloud.google.com/service-extensions/docs/media-cdn-extensions-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)
- Adapted from the official docs: `--image=...-docker.pkg.dev/my-project/repository/container:tag` in https://docs.cloud.google.com/service-extensions/docs/create-plugin became `--image=REGION-docker.pkg.dev/my-project/repository/container:tag`.

## Related

- [plugins-overview.md](./plugins-overview.md)
- [create-plugin.md](./create-plugin.md)
- [attributes.md](./attributes.md)
- [quotas.md](./quotas.md)
