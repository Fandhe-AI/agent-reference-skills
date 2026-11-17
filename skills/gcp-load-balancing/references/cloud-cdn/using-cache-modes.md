---
source: https://docs.cloud.google.com/cdn/docs/using-cache-modes
---

# Change cache modes

How to change the cache mode of a Cloud CDN-enabled backend service or backend bucket. Requires Cloud CDN to be enabled and gcloud CLI version `309.0.0` or later.

## Signature / Usage

### Update gcloud

```bash
gcloud components update
```

### Set the cache mode with gcloud

Use the `--cache-mode` flag of `gcloud compute backend-services create|update` or `gcloud compute backend-buckets create|update` (the full flag list is in the `gcp-compute` skill):

```text
gcloud compute backend-services (create | update) BACKEND_SERVICE_NAME
    --cache-mode=CACHE_MODE
```

```text
gcloud compute backend-buckets (create | update) BACKEND_BUCKET_NAME
    --cache-mode=CACHE_MODE
```

### Set the cache mode with the REST API

Use `backendBuckets.insert` / `update` or `backendServices.insert` / `update`:

```text
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/backendBuckets
PUT https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/backendBuckets/BACKEND_BUCKET
POST https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/backendServices
PUT https://compute.googleapis.com/compute/v1/projects/PROJECT_ID/global/backendServices/BACKEND_SERVICE
```

Add the following snippet to the JSON request body (shown exactly as in the source, which omits the closing braces):

```text
"cdnPolicy": {
  "cacheMode": (CACHE_ALL_STATIC | USE_ORIGIN_HEADERS | FORCE_CACHE_ALL)
```

## Options / Props

| `CACHE_MODE` | Console option | Behavior |
|--------------|----------------|----------|
| `CACHE_ALL_STATIC` (default) | Cache static content (recommended) | Automatically caches static content. Responses marked uncacheable (`private` or `no-store` in `Cache-Control`) aren't cached. Dynamic content must have valid caching headers to be cached. |
| `USE_ORIGIN_HEADERS` | Use origin settings based on Cache-Control headers | Origin must set valid caching headers. Responses without them aren't cached at Google's edge and need a full trip to the origin on every request. |
| `FORCE_CACHE_ALL` | Force cache all content | Caches all successful responses, ignoring `private` or `no-store`. Can cache private, per-user content. Only enable on backends that don't serve private or dynamic content, such as Cloud Storage buckets. |

## Notes

- Google Cloud CDN, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`) caching.
- `FORCE_CACHE_ALL` can serve one user's private content to others. Do not enable it on backends that serve private or dynamic content (the source's own warning).
- Console option: Load Balancing page, edit the external Application Load Balancer, edit the backend, then select **Cache mode**.
- The REST fragment is shown as in the source (an unclosed fragment, not valid standalone JSON), so it is in a `text` fence. The source also repeats the mode descriptions after the snippet and shows Console steps; both are omitted.
- Clarified from the official docs: the `PUT` URLs (`backendBuckets.update` / `backendServices.update`) send the whole resource, so the `cdnPolicy` snippet must be merged into the full resource body. In the Compute Engine Discovery document `compute.v1`, only `patch` "supports PATCH semantics and uses the JSON merge patch format"; use `PATCH` on the same URL to send just the snippet.
- Source: https://docs.cloud.google.com/cdn/docs/using-cache-modes (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [caching.md](./caching.md)
- [using-cache-keys.md](./using-cache-keys.md)
