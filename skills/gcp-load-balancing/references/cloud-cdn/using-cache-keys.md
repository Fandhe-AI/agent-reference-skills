---
source: https://docs.cloud.google.com/cdn/docs/using-cache-keys
---

# Customize cache keys

How to customize Cloud CDN cache keys on a backend service or backend bucket: omit or include the protocol, host and query string, use query string include or exclude lists, HTTP headers and named cookies. Changing the cache key configuration can cause a sudden drop in the cache hit ratio, and changing it does not necessarily invalidate cached entries if new requests use the same key as old ones.

## Signature / Usage

### Exclude protocol, host and query string (backend service)

```bash
gcloud compute backend-services update BACKEND_SERVICE \
    --no-cache-key-include-protocol \
    --no-cache-key-include-host \
    --no-cache-key-include-query-string
```

REST: the source uses `PUT https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/backendServices/BACKEND_SERVICE` (or `.../global/backendBuckets/BACKEND_BUCKET`) with this fragment in the body. `PUT` (`update`) sends the whole resource, so the fragment must be merged into the full backend service or backend bucket resource; to send only the fragment use `PATCH` (`patch`, JSON merge patch) on the same URL:

Adapted (not in the official docs): `cacheKeyPolicy` is a single object in the Compute Engine REST API, not an array, so the source's `[ ]` wrapper is removed.

```text
"cdnPolicy": {
  "cacheKeyPolicy": {
    "includeProtocol": false,
    "includeHost": false,
    "includeQueryString": false
  }
}
```

### Add the protocol, host and query string back

Any unspecified flags are left unchanged.

```bash
gcloud compute backend-services update BACKEND_SERVICE \
    --cache-key-include-protocol \
    --cache-key-include-host \
    --cache-key-include-query-string
```

### Query string include list or exclude list

```bash
gcloud compute backend-services update BACKEND_SERVICE \
    --cache-key-include-query-string \
    --cache-key-query-string-whitelist user
```

```bash
gcloud compute backend-services update BACKEND_SERVICE \
    --cache-key-include-query-string \
    --cache-key-query-string-blacklist user
```

Backend bucket include list:

```bash
gcloud compute backend-buckets update BACKEND_BUCKET \
    --cache-key-query-string-whitelist user
```

REST fragments (`QUERY_STRINGS` is a comma-separated list of parameters; use `queryStringBlacklist` for an exclude list):

Adapted (not in the official docs): `cacheKeyPolicy` is a single object in the Compute Engine REST API, not an array, so the source's `[ ]` wrapper is removed.

```text
"cdnPolicy": {
  "cacheKeyPolicy": {
    "queryStringWhitelist": [QUERY_STRINGS]
  }
}
```

### HTTP headers (gcloud CLI 369.0.0 or later)

```text
gcloud compute backend-services update BACKEND_SERVICE \
    --cache-key-include-http-header=[HEADER_FIELD_NAMES,...]
```

Adapted (not in the official docs): `cacheKeyPolicy` is a single object in the Compute Engine REST API, not an array, so the source's `[ ]` wrapper is removed.

```text
"cdnPolicy": {
  "cacheKeyPolicy": {
    "includeHttpHeaders": [HEADER_FIELD_NAMES]
  }
}
```

### Named cookies (gcloud CLI 369.0.0 or later)

```text
gcloud compute backend-services update BACKEND_SERVICE \
    --cache-key-include-named-cookie=[NAMED_COOKIES,...]
```

Adapted (not in the official docs): `cacheKeyPolicy` is a single object in the Compute Engine REST API, not an array, so the source's `[ ]` wrapper is removed.

```text
"cdnPolicy": {
  "cacheKeyPolicy": {
    "includeNamedCookies": [NAMED_COOKIES]
  }
}
```

## Options / Props

| Setting | gcloud flag | `cacheKeyPolicy` field |
|---------|-------------|------------------------|
| Protocol | `--[no-]cache-key-include-protocol` | `includeProtocol` |
| Host | `--[no-]cache-key-include-host` | `includeHost` |
| Query string | `--[no-]cache-key-include-query-string` | `includeQueryString` |
| Query string include list | `--cache-key-query-string-whitelist` | `queryStringWhitelist` |
| Query string exclude list | `--cache-key-query-string-blacklist` | `queryStringBlacklist` |
| HTTP headers | `--cache-key-include-http-header` | `includeHttpHeaders` |
| Named cookies | `--cache-key-include-named-cookie` | `includeNamedCookies` |

| Item |
|---|
| Backend buckets don't include the protocol or host in the cache key; they include a set of Cloud Storage-specific query string parameters that can be extended by a list of parameter names. |
| `HEADER_FIELD_NAMES` and `NAMED_COOKIES` are comma-separated lists. If a cache key header is also a custom request header, you can't use the full range of custom header variables. |

## Notes

- Google Cloud CDN, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`) cache keys.
- Caution from the source: excluding components from cache keys can cause Cloud CDN to serve content intended for one user to another. Before excluding a component, ensure that responses from your backend don't vary based on it.
- Corrected from the official docs: the REST fragments wrote `"cacheKeyPolicy": [ { ... } ]`, but `cdnPolicy.cacheKeyPolicy` is a single object in the Compute Engine REST API (Discovery `compute.v1`), so the array brackets are removed. The fragments are request body fragments, not standalone JSON. `--cache-key-include-http-header=[HEADER_FIELD_NAMES,...]` and `--cache-key-include-named-cookie=[NAMED_COOKIES,...]` keep the source's bracket notation, so they are in `text` fences. The full flag list is in the `gcp-compute` skill.
- The `--cache-key-query-string-whitelist` / `--cache-key-query-string-blacklist` flag names are the gcloud names used in the source.
- The source also shows Console steps (Cloud CDN page, **Cache performance**, **Cache key**: Custom) which are omitted. To check whether responses come from cache, see the Cloud CDN logging page.
- Clarified from the official docs: the REST fragments on this page are partial bodies. In the Compute Engine Discovery document `compute.v1`, `backendServices.update` / `backendBuckets.update` "Updates the specified ... resource with the data included in the request" (the request replaces the resource), while `patch` "supports PATCH semantics and uses the JSON merge patch format"; send the fragment alone only with `PATCH`.
- Source: https://docs.cloud.google.com/cdn/docs/using-cache-keys (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [caching.md](./caching.md)
- [using-cache-modes.md](./using-cache-modes.md)
- [cache-invalidation-overview.md](./cache-invalidation-overview.md)
