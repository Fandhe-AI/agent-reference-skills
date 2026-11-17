---
source: https://docs.cloud.google.com/cdn/docs/cache-invalidation-overview
---

# Cache invalidation overview

Cache invalidation (cache purging) declares cached content invalid so the entry is removed and refilled from the backend on the next request. Invalidation requests are rate limited to 500 per minute per project; each takes effect in about 10 seconds. Cloud CDN doesn't restrict the number of objects or total size of invalidated objects per request.

## Signature / Usage

An origin response can attach cache tags with the `Cache-Tag` header (comma-separated; multiple `Cache-Tag` headers in one response are allowed):

```text
Cache-Tag: release-v1, frontend, js
```

## Options / Props

### Matchers

| Matcher | Rules | Examples |
|---------|-------|----------|
| Host (`host`) | Case-insensitive exact match or single-level leading wildcard (`*.`); max 1,024 characters; IDNs in Unicode or Punycode. Default (no host): all hostnames on the URL map. | `www.example.com`, `*.example.com` |
| Path (`path`) | Must start with `/`; max 1,024 characters; no `?` or `#`; `*` only as final character (prefix match). `/*` = everything. Compared with the pre-rewrite path if URL rewrites exist. | `/images/cat.jpg`, `/images/*`, `/picture*` |
| HTTP status (`httpStatus`) | One integer `200`-`599` via gcloud / API (at most one per request); console offers cacheable codes `200`, `203`, `204`, `206`, `300`, `301`, `302`, `307`, `308`, `404`, `405`, `410`, `421`, `451`, `501`. | `404`, `301` |
| Content type (`contentType`) | `TYPE/SUBTYPE`, case-insensitive; each part 1-64 characters, starts with ASCII alphanumeric, only alphanumerics or `!#$&-^_.+`; no wildcards; no parameters (cached `Content-Type` parameters are ignored). | `text/css`, `image/jpeg` |
| Backend (`backendService` / `backendBucket`) | At most one per request. gcloud: `--backend-service` / `--backend-bucket` (name or full path). API: `backendService` field for both, with project number path. | `projects/PROJECT_NUMBER/global/backendServices/BACKEND_SERVICE_NAME`, `projects/PROJECT_NUMBER/global/backendBuckets/BACKEND_BUCKET_NAME` |
| Cache tags (`cacheTags`, gcloud `--tags`) | Exact match against the `Cache-Tag` response header; up to 10 tags per request, evaluated with `OR`. | `release-v1`, `frontend,js` |

### Host wildcard rules

| Host wildcard rules |
|---|
| `*` only as first character and immediately followed by `.`; `sub.*.example.com`, `www.example.*` and `*example.com` aren't supported. |
| `*.example.com` matches one subdomain level only: not the apex `example.com` and not `dev.api.example.com` (use `*.api.example.com`). |

### Cache tag limits

| Limit | Value |
|-------|-------|
| Max length per tag | 120 bytes |
| Max total tag size per cached object | 4 KiB (4,096 bytes) |
| Max tags per cached object | 50 |
| Max tags per invalidation request | 10 |

| Cache tag limits |
|---|
| Tags: visible US-ASCII `0x21`-`0x7E`, excluding commas; leading and trailing spaces trimmed. |
| A response exceeding a limit isn't cached, and Cloud CDN logs `RESPONSE_CACHE_TAG_INVALID` in `LoadBalancerLogEntry.cacheDecision`. |

## Notes

- Combining matchers: An invalidation request needs at least one matcher. Different matcher types (`path`, `host`, `cacheTags`, `httpStatus`, `contentType`, `backendService`) combine with `AND`; multiple tags within `cacheTags` combine with `OR` (and `AND` with the other matchers).
- Google Cloud CDN, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`) purge.
- Warning from the source: invalidating an entire backend service or backend bucket purges all its cached objects on the selected load balancer (URL map) at once, which can spike cache fill requests to backends. Combine with a path, host or status matcher where possible. Invalidation is destructive for cache content; try it on a disposable resource first.
- Verify the backend returns updated content before invalidating, otherwise outdated content can be cached again. Invalidation doesn't affect browser caches or third-party ISP caches. Use it in exceptional circumstances; prefer proper expiration times or versioned URLs.
- A path pattern can't selectively invalidate objects that differ only by query string (for example `/images.php?image=fred.png`); use `/images.php` or distinct cache tags.
- Because Cloud CDN is distributed, an invalidation may be reported complete while a few caches haven't processed it yet (rare, self-correcting).
- Shared VPC cross-project service referencing: invalidation is configured in the frontend project (forwarding rule, target proxy, URL map). Service project administrators don't have permission by default; principals need IAM roles for configuring load balancer resources in the frontend project, for example Compute Network Admin (`roles/compute.networkAdmin`).
- This page is an overview and has no gcloud invalidation commands; the how-to is on the Cloud CDN "Invalidate cached content" page (https://docs.cloud.google.com/cdn/docs/invalidating-cached-content). Snippet shown is the source's `Cache-Tag` header example.
- Source: https://docs.cloud.google.com/cdn/docs/cache-invalidation-overview (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [caching.md](./caching.md)
- [using-cache-keys.md](./using-cache-keys.md)
- [overview.md](./overview.md)
