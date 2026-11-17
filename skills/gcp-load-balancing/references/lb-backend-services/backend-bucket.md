---
source: https://docs.cloud.google.com/load-balancing/docs/backend-bucket
---

# Backend buckets overview

A backend bucket lets an Application Load Balancer use a Cloud Storage bucket as a backend, recommended for static content such as images or video. For dynamic HTTP(S) content use backend services.

## Signature / Usage

Snippets below come from the gcloud help (EXAMPLES of `gcloud compute backend-buckets list`).

```bash
gcloud compute backend-buckets list
```

```bash
gcloud compute backend-buckets list --uri
```

## Options / Props

| Item | Detail |
|---|---|
| Load balancers supporting backend buckets | Global external Application Load Balancer; classic Application Load Balancer; regional external Application Load Balancer; cross-region internal Application Load Balancer; regional internal Application Load Balancer |
| Resources | Global: `backendBuckets`; regional: `regionBackendBuckets`; `gcloud compute backend-buckets` covers both |
| Cloud CDN | Optional but recommended on the backend bucket. Without it only origin `Cache-Control` headers control caching of smaller content. With it: cache modes, signed URLs, cache invalidation, caching of content larger than 10 MiB |

## Notes

- Alternative: a Private Service Connect NEG pointing at Cloud Storage API endpoints gives a private path but doesn't grant access to private buckets; you must make sure the client authenticates to Cloud Storage.
- Cloud Storage by default uses the same cache that Cloud CDN uses.
- Sample architecture: a URL map sends paths containing `/love-to-fetch/` to a bucket in `us-east1`; all other requests go to a bucket in `europe-north1`.
- Public exposure: serving a bucket through an external load balancer exposes its objects to the internet; keep bucket access and authentication in mind.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-buckets/list (gcloud 593.0.0 help). Full flags are in the `gcp-compute` skill. Bucket-side configuration is in the `gcp-storage` skill. Google Cloud Load Balancing / Cloud CDN, not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Setup guides: https://docs.cloud.google.com/load-balancing/docs/https/setup-global-ext-https-buckets , https://docs.cloud.google.com/load-balancing/docs/https/setup-reg-ext-app-lb-backend-buckets , https://docs.cloud.google.com/load-balancing/docs/https/ext-load-balancer-backend-buckets , https://docs.cloud.google.com/load-balancing/docs/l7-internal/setup-cross-region-internal-https-buckets , https://docs.cloud.google.com/load-balancing/docs/l7-internal/setup-regional-internal-buckets
- Source: https://docs.cloud.google.com/load-balancing/docs/backend-bucket (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [backend-service.md](./backend-service.md)
