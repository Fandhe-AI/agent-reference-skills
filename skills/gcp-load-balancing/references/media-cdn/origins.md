---
source: https://docs.cloud.google.com/media-cdn/docs/origins
---

# Origins overview

Media CDN fetches content from origins hosted in Google Cloud, another cloud or on-premises. Origin configuration says how to connect, when and how to fail over, retry and time out, and which protocol to use. This page covers origin requirements, shielding, request collapsing, protocols, host headers, IP allowlisting, timeouts, retries and failover.

## Signature / Usage

### Allow only Media CDN at the origin

Use an IP allowlist at the origin so that only the ranges Google uses to send requests to external origins can connect. The current ranges are published as JSON:

```text
https://www.gstatic.com/ipranges/mediacdn.json
```

### Origin features

- Origins can be defined per host and per route (one `EdgeCacheService` can map to multiple origins, for example manifests, segments, static content).
- Reachable over HTTP/2, HTTPS and unencrypted HTTP/1.1.
- Retries and failover are configured per origin (hard errors such as connectivity failure, or HTTP `404 Not Found` / `429 Too Many Requests`), only for `GET`, `HEAD` and `OPTIONS`.
- Private resources in Google Cloud or on-premises can be reached through an external Application Load Balancer used as origin.
- Redirect-following is configured per origin.

## Options / Props

### Origin requirements

#### To cache origin responses larger than 1 MiB, `GET` responses must include

| Details |
|---|
| A `Last-Modified` or `ETag` header (validator). |
| A valid HTTP `Date` header. |
| A valid `Content-Length` header. |
| `Content-Range` in response to a `Range GET`, in the form `bytes x-y/z` (z = object size). |

### Origin protocols

| Protocol | Supported | SSL (TLS) required |
|---|---|---|
| HTTP/2 | Yes (default) | Yes |
| HTTPS (HTTP/1.1 over TLS) | Yes | Yes |
| HTTP/1.1 | Yes | No |

| Origin protocols |
|---|
| HTTP/2 and HTTPS require a valid, publicly trusted certificate: unexpired, signed by a public CA, with a Subject Alternative Name matching the hostname sent to the origin. |
| Set the protocol per origin to `HTTP` (HTTP/1.1) or `HTTPS` (HTTP/1.1 over TLS) if HTTP/2 is unsupported. Media CDN does not negotiate an alternative protocol (no HTTP/2 fallback to HTTP/1.1, and vice versa). |
| Port `80` for HTTP; port `443` for HTTPS and HTTP/2. |

### Origin Host header / SNI

#### By default the client `Host` header is used. What the origin sees

| Client Request | `EdgeCacheService.hostRewrite` | `EdgeCacheOrigin.hostRewrite` | originAddress | Host header / TLS SNI at origin |
|---|---|---|---|---|
| media.example.com | None | None | backend.example.com | media.example.com |
| media.example.com | service.example.com | None | backend.example.com | service.example.com |
| media.example.com | None | origin.example.com | backend.example.com | origin.example.com |
| media.example.com | service.example.com | origin.example.com | backend.example.com | origin.example.com |
| media.example.com | service.example.com | origin.example.com | gs://vod-content-bucket | set automatically based on the bucket name |

### Firewall source ranges for origins

| IP address type | Request source IP range |
|---|---|
| IPv4 | 136.124.4.0/22 |
| IPv6 | 2001:4860:4864:a::/64 |

### Timeouts

| Field | Default | Description |
|---|---|---|
| `connectTimeout` | 5 seconds | Max time from starting the origin request until Media CDN determines whether the response is usable (request creation, DNS, TLS handshake, TCP/QUIC connection, response headers with the status code). Allowed 1 to 15 seconds. Applies independently per origin attempt. |
| `maxAttemptsTimeout` | 15 seconds | Max time across all connection attempts including failover origins and redirects (a redirect counts as an additional attempt) before an error is returned; HTTP `504` if reached before a response. Allowed 1 to 30 seconds. Only the first value is used (the origin configured for the route). |
| `readTimeout` | 15 seconds | Max wait between reads of a single response; capped by `responseTimeout`. Allowed 1 to 30 seconds. On expiry the response is truncated and logged. |
| `responseTimeout` | 30 seconds | Max duration for a response to complete, measured from the first body bytes. Allowed 1 to 120 seconds. On expiry the response is truncated and logged. |

| Timeouts |
|---|
| At most four origin attempts across all origins, regardless of each origin's `maxAttempts`. |
| `connectTimeout`, `readTimeout`, `responseTimeout` come from the `EdgeCacheOrigin` of each attempt; redirected origins use the values of the origin that encountered the redirect. |
| Example: Origin A (`maxAttemptsTimeout` 5s, `maxAttempts` 1, failover Origin B, `connectTimeout` 5s) failing within 1 second leaves about 4 seconds for Origin B. Origin C (`maxAttemptsTimeout` 10s, `maxAttempts` 3, no failover) is attempted up to three times within 10 seconds. |

### Retry conditions

| Condition | Default | Description |
|---|---|---|
| `CONNECT_FAILURE` | yes | Retry on routing, DNS and TLS handshake errors, and TCP/UDP timeouts. |
| `HTTP_5XX` | no | Retry on any HTTP 5xx status code. |
| `GATEWAY_ERROR` | no | Only status codes `502`, `503`, `504`. |
| `RETRIABLE_4XX` | no | Retriable 4xx codes, including `409` and `429`. |
| `NOT_FOUND` | no | Retry on HTTP `404`. |
| `FORBIDDEN` | no | Retry on HTTP `403`. |

### Failover behavior

| Scenario | Failover configured | User-facing status |
|---|---|---|
| No HTTP response from the origin after two attempts (default). | No | HTTP `502 Bad Gateway` |
| Primary fails to connect (TLS handshake error); failover origin returns HTTP `404`. | Yes | HTTP `404 Not Found` |
| Both primary and failover give no HTTP status code. | Yes | HTTP `502 Bad Gateway` |

## Notes

- Origin requirements: Small responses (less than 1 MiB) lacking these headers might be evicted from cache more quickly. The default origin protocol is HTTP/2; set the protocol per origin if the origin only supports HTTP/1.1.
- Supported origins: Any publicly reachable HTTP endpoint: Cloud Storage buckets (including private buckets via IAM service accounts), external Application Load Balancers, Amazon S3-compatible buckets (including private buckets using AWS Signature Version 4), other public object storage such as Azure Blob Storage, and public web servers (public VMs or on-premises hosts). Connectivity is over secure tunnels and Google's global backbone.
- Origin Host header / SNI: The primary and failover origins see the same host header if they share the same `routeRule` or `hostRewrite`. `hostRewrite` is ignored for Cloud Storage origins. TLS SNI (HTTP/3, HTTP/2, HTTPS) equals the host header sent to the origin.
- Firewall source ranges for origins: These ranges might change; check the Media CDN release notes frequently and update firewall configuration.
- Retry conditions: `maxAttempts` defaults to `1`. Origin connections are retried up to a maximum of three times (failover connections count toward it) before an HTTP `502 Bad Gateway` is returned. Retries and failover apply only to `GET`, `HEAD`, `OPTIONS`; an unsafe method failing on the first attempt gets `502 Bad Gateway` with no retry or failover. A primary origin is set with `originAddress`, with an optional `failoverOrigin` pointing at another origin resource.
- Failover behavior: If retry and failover requests keep failing with a status matching `retryConditions`, `502 Bad Gateway` is returned after attempts are exhausted. For active health checking, round-robin or load-aware steering across origins, use an external Application Load Balancer as the primary origin.
- Origin shielding: three caching layers (deep edge caches; Google's peering edge as mid-tier; long-tail caches within Google's network as the origin shield). Default shielding is on and based on the end user's location, not the origin's.
- Flexible shielding (advanced): configures a single geographic shield region, typically near a centralized origin, so all cache fills go through shield caches in or near that region. An inappropriate region can increase latency; default shielding is highly recommended unless a centralized origin serves globally distributed users. It works with any origin type.
- Request collapsing is the default: multiple cache fills for the same cache key collapse into one origin request per edge node. The leader of the collapsed session makes the origin request, so the origin sees only that client's headers (including User-Agent). Requests with different cache keys cannot be collapsed. Both the client-facing and the collapsed fill requests are logged.
- Source figures: more than 95% of cache fill uses a dedicated long-tail cache node within the region; cache fill between origin and Google's edge is over Google's private backbone. Offload varies by configuration and workload.
- Use best practice for failover: keep content and `Vary`, `ETag`, `Last-Modified` behavior consistent across origins.
- Warning from the source: configuring redirects from an untrusted or attacker-controlled origin can expose the configuration to open redirect vulnerabilities; configure origin redirection only for origins you trust and control, including every origin in a redirect chain.
- Prefer private Cloud Storage buckets reached through IAM service accounts over making a bucket publicly readable (`allUsers`); Media CDN and its origins expose content to the internet.
- Security: an origin reachable from the public internet should be restricted with the allowlisted ranges above; keep the ranges updated from `mediacdn.json`.
- Google Cloud Media CDN — not Cloudflare (`cloudflare-workers`, `cloudflare-pages`) or Vercel (`vercel`).
- Source inconsistency: the source says `maxAttempts` "defaults to `1`", but its failover scenario table says "receives no HTTP response after two attempts (default)". Both statements are kept as written.
- Source inconsistency: the source says "Media CDN makes at most four origin attempts across all origins" and also that it "retries origin connections up to a maximum of three" times (failover connections count toward "the limit of three"). Both numbers are kept as written; the source does not state whether the three retries exclude the first attempt.
- Source: https://docs.cloud.google.com/media-cdn/docs/origins (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [configuration.md](./configuration.md)
- [routing.md](./routing.md)
- [caching.md](./caching.md)
