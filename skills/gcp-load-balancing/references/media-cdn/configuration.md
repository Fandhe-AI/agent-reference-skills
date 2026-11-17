---
source: https://docs.cloud.google.com/media-cdn/docs/configuration
---

# Configuration overview

Media CDN provides content delivery, cache off-load, origin shielding, request authorization and integration with external Application Load Balancers, Logging and Monitoring. Configuration is made of three REST API resources, which can be managed with the console, imported YAML / JSON files, or the APIs directly.

## Signature / Usage

### Enable the required services

Both the Network Services API and the Certificate Manager API must be enabled for the project.

```bash
gcloud services enable networkservices.googleapis.com
```

```bash
gcloud services enable certificatemanager.googleapis.com
```

### Example configuration

A representative configuration: a Cloud Storage origin that retries against an alternative origin (AWS S3) on HTTP 404 or 5xx; one keyset with two Ed25519 public keys (rotate monthly, keeping two keys in production); one service with two routes (manifests with short TTLs; video segments protected by signed requests and caching all responses); IPv4, IPv6, logging enabled (default) and a managed SSL certificate. Describe the resources:

```bash
gcloud edge-cache origins describe prod-media-origin
```

```yaml
id: "2295067926314745283"
creationTimestamp: "2019-11-13T09:53:48.757-08:00"
name: "prod-media-origin"
description: ""
originAddress: "gs://bucket_name/"
failoverOrigin: "s3-origin"
retryConditions: [HTTP_5XX, NOT_FOUND]
originProtocol: HTTP2
timeouts:
  connectTimeout: 5s
  maxAttemptsTimeout: 10
  responseTimeout: 6s
```

```yaml
id: "2295067926314745283"
creationTimestamp: "2019-11-13T09:53:48.757-08:00"
name: "s3-origin"
description: ""
originAddress: "media.example.com.s3.amazonaws.com"
retryConditions: [HTTP_5XX, NOT_FOUND]
originProtocol: HTTP2
```

```bash
gcloud edge-cache keysets describe prod-keyset
```

```yaml
id: "2295067926314745283"
creationTimestamp: "2019-11-13T09:53:48.757-08:00"
name: "prod-keyset"
publicKeys:
  - name: "sept-2020-key"
    value: "DThVLjhAKm3VYOvLBAwFZ5XbjVyF98Ias8NZU0WEM9w="
  - name: "aug-2020-key"
    value: "3nQa82ScYgDDAxJrKCqumSEg60VNODGR5dGAveJWsw4="
```

```bash
gcloud edge-cache services describe prod-media-service
```

```yaml
name: "prod-media-service"
edgeSslCertificates:
  - "media-example-com-cert"
  - "video-serving-example-com-cert"
requireTls: true
routing:
  hostRules:
  - description: "prod hostnames"
    hosts:
      - "media.example.com"
      - "video-serving.example.net"
    pathMatcher: "routes"
  pathMatchers:
  - name: "routes"
    routeRules:
    - priority: 1
      description: "prod video segments"
      origin: "prod-media-origin"
      matchRules:
      - pathTemplateMatch: "/**.ts" # HLS segments
      - pathTemplateMatch: "/**.m4s" # DASH / CMAF segments
      routeAction:
        cdnPolicy:
          cacheMode: "FORCE_CACHE_ALL"
          clientTtl: 3600s
          defaultTtl: 86400s
          signedRequestMode: REQUIRE_SIGNATURES
          signedRequestKeySet: "prod-keyset"
      headerAction:
        responseHeadersToAdd:
        - headerName: cache-status
          headerValue: "{cdn_cache_status}"
        - headerName: proxy-status
          headerValue: "{proxy_status}"
    - priority: 2
      description: "prod manifest endpoints"
      origin: "prod-media-origin"
      matchRules:
      - pathTemplateMatch: "/**.m3u8" # HLS playlists
      - pathTemplateMatch: "/**.mpd" # DASH manifests
      routeAction:
        urlRewrite:
          pathPrefixRewrite: "/output/manifests"
        cdnPolicy:
          cacheMode: "CACHE_ALL_STATIC"
          clientTtl: 10s
          defaultTtl: 30s
          maxTtl: 120s
      headerAction:
        responseHeadersToAdd:
        - headerName: cache-status
          headerValue: "{cdn_cache_status}"
        - headerName: proxy-status
          headerValue: "{proxy_status}"
    - priority: 3 # catch all routes should be the lowest priority route
      description: "catch all route"
      origin: "prod-media-origin"
      matchRules:
      - prefixMatch: /
      headerAction:
        responseHeadersToAdd:
        - headerName: cache-status
          headerValue: "{cdn_cache_status}"
        - headerName: proxy-status
          headerValue: "{proxy_status}"
```

### Import and export configurations

The gcloud CLI exports and imports YAML or JSON (for continuous delivery, infrastructure-as-code, staging copies, version-control snapshots). Use the `export` sub-command for a service, `EdgeCacheOrigin` or `EdgeCacheKeyset`.

```bash
gcloud edge-cache services export SERVICE_NAME \
    --destination=my-service.yaml
```

```text
Exported [projects/my-project/locations/global/edgeCacheServices/SERVICE_NAME] to 'my-service.yaml'.
```

Import as a new service or as an in-place update of an existing service:

```bash
gcloud edge-cache services import new-staging-service \
    --source=my-service.yaml
```

### Asynchronous operations

`gcloud` create / update / delete commands block by default; the REST API is asynchronous. Use `--async` to return an operation ID immediately, then inspect it. Example error when `logConfig.sampleRate` is set without `logConfig.enable = true`:

```bash
gcloud edge-cache operations describe operation-1611525680496-5b9ac8fbb7f58-90a7a822-f0c1e8c6
```

```yaml
done: true
error:
  message: "Logs sample rate must not be specified without enabling logging."
name: projects/my-project/locations/global/operations/operation-1611525680496-5b9ac8fbb7f58-90a7a822-f0c1e8c6
```

```bash
gcloud edge-cache operations list
```

## Options / Props

| Resource | Purpose |
|----------|---------|
| `EdgeCacheService` | Client-facing configuration (TLS, IP addressing), routing, CDN configuration (cache modes, TTLs, signing) and security policies. |
| `EdgeCacheOrigin` | Per-origin configuration for any HTTP-based origin, plus retry conditions when content is unavailable or unreachable (for example a redundant video packager). |
| `EdgeCacheKeyset` (optional) | Set of public keys used to validate that client requests were signed by your infrastructure / CMS. Associated with an `EdgeCacheService`; can be shared across multiple services. |

| IAM role | Notes |
|----------|-------|
| `roles/networkservices.edgeCacheAdmin` | Predefined Media CDN role. |
| `roles/networkservices.edgeCacheUser` | Predefined Media CDN role. |
| `roles/networkservices.edgeCacheViewer` | Predefined Media CDN role. |

| Import behavior | Detail |
|-----------------|--------|
| IP addresses | Not imported; they are dedicated to each service and services cannot share IP addresses. |
| `selfLink` | Output only, not imported (based on the resource name). |
| `id` | Output only, not imported (automatically generated). |

## Notes

- The IAM roles reference page for `networkservices` does not list these three roles (see Notes).
- The IAM roles are visible only in projects where Media CDN is enabled (see the overview page for how to request access).
- The source also shows Console steps (enable the APIs, Go to Media CDN) and a Terraform pointer; omitted here. To list recent operations, `gcloud edge-cache operations list` prints END_TIME, ID, TARGET and DONE columns.
- The describe outputs above are example output from the source, not input to create resources; the `publicKeys` values are public keys, not secrets. Keep private signing keys out of version control and out of logs.
- Google Cloud Media CDN — not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`). Full `gcloud edge-cache` flags are in the `gcp-networking` skill's generated references.
- Source inconsistency: in the source's `describe` output example for the origin `prod-media-origin`, `maxAttemptsTimeout` is shown as `10` without a unit, while the sibling fields are `5s` and `6s` and the origins page describes these fields as durations (for example `10s`). The output is kept as shown in the source.
- Source inconsistency: this page lists `roles/networkservices.edgeCacheAdmin`, `roles/networkservices.edgeCacheUser` and `roles/networkservices.edgeCacheViewer` as Media CDN's predefined roles, but the IAM roles reference for Network Services (https://docs.cloud.google.com/iam/docs/roles-permissions/networkservices, retrieved 2026-11-17) does not list them. Check a role with `gcloud iam roles describe` before granting it.
- Source: https://docs.cloud.google.com/media-cdn/docs/configuration (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [origins.md](./origins.md)
- [routing.md](./routing.md)
- [caching.md](./caching.md)
