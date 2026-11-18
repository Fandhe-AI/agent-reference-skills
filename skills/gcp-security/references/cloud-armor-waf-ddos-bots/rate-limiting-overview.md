---
source: https://docs.cloud.google.com/armor/docs/rate-limiting-overview
---

# Rate limiting overview

Cloud Armor rate-based rules protect backends from request floods. There are two rule types: `throttle` (cap requests per client at a threshold) and `rate_based_ban` (temporarily ban clients that exceed a threshold). The threshold applies to each associated backend, is enforced independently in each region, and is approximate. Preview mode lets you see the effect in request logs first.

## Signature / Usage

### gcloud rate limiting flags

Rate-based rules are created with `gcloud compute security-policies rules create PRIORITY --action=throttle` or `--action=rate-based-ban`. The rate limiting part of its synopsis (gcloud 593.0.0 help):

```text
[--ban-duration-sec=BAN_DURATION_SEC]
[--ban-threshold-count=BAN_THRESHOLD_COUNT]
[--ban-threshold-interval-sec=BAN_THRESHOLD_INTERVAL_SEC]
[--conform-action=CONFORM_ACTION] [--description=DESCRIPTION]
[--enforce-on-key=ENFORCE_ON_KEY]
[--enforce-on-key-configs=[[all],[ip],[xff-ip],
  [http-cookie=HTTP_COOKIE],[http-header=HTTP_HEADER],[http-path],[sni],
  [region-code],
  [tls-ja3-fingerprint],[user-ip],[tls-ja4-fingerprint],[asn]],[...]]
[--enforce-on-key-name=ENFORCE_ON_KEY_NAME]
[--exceed-action=EXCEED_ACTION]
[--exceed-redirect-target=EXCEED_REDIRECT_TARGET]
[--exceed-redirect-type=EXCEED_REDIRECT_TYPE] [--preview]
[--rate-limit-threshold-count=RATE_LIMIT_THRESHOLD_COUNT]
[--rate-limit-threshold-interval-sec=RATE_LIMIT_THRESHOLD_INTERVAL_SEC]
```

## Options / Props

### Client key types

| Key type | Meaning |
|----------|---------|
| `ALL` | A single key for all requests that satisfy the rule match condition |
| `IP` | One key per client IP address |
| `HTTP_HEADER` | One key per value of the named header, truncated to the first 128 bytes. Defaults to `ALL` if the header is absent or on an external proxy Network Load Balancer |
| `XFF_IP` | First IP in `X-Forwarded-For`. Defaults to `IP` if the header is absent or the value is not a valid IP, or on an external proxy Network Load Balancer |
| `HTTP_COOKIE` | One key per value of the named cookie, truncated to the first 128 bytes. Defaults to `ALL` if the cookie is absent or on an external proxy Network Load Balancer |
| `HTTP_PATH` | URL path, truncated to the first 128 bytes |
| `SNI` | TLS server name indication, truncated to the first 128 bytes. Defaults to `ALL` on an HTTP session |
| `REGION_CODE` | Country or region the request originates from |
| `TLS_JA4_FINGERPRINT` | JA4 fingerprint for `HTTPS`, `HTTP/2` or `HTTP/3`; defaults to `ALL` if unavailable |
| `TLS_JA3_FINGERPRINT` | JA3 fingerprint for `HTTPS`, `HTTP/2` or `HTTP/3`; defaults to `ALL` if unavailable |
| `USER_IP` | Client IP from the headers in `userIpRequestHeaders`; defaults to `IP` if not configured or not resolvable |
| `ASN` | Autonomous System Number of the client; defaults to `ALL` if unavailable |

### Throttle parameters

| Parameter | Description |
|-----------|-------------|
| `rate_limit_threshold_count` | Requests per client per interval. Minimum 1, maximum 1,000,000 |
| `interval_sec` | 10, 30, 60, 120, 180, 240, 300, 600, 900, 1200, 1800, 2700, or 3600 seconds |
| `exceed_action` | `deny(status)` with 403, 404, 429 or 502 (429 recommended), or `redirect` |
| `exceed_redirect_options.type` | `GOOGLE_RECAPTCHA` or `EXTERNAL_302` |
| `exceed_redirect_options.target` | URL; only applicable when `type` is `EXTERNAL_302` |
| `conform_action` | Always `allow` |

### Rate-based ban parameters

| Parameter | Description |
|-----------|-------------|
| `rate_limit_threshold_count` | Requests per client per interval. Minimum 1, maximum 10,000 |
| `interval_sec` | Same values as throttle |
| `exceed_action`, `exceed_redirect_options`, `conform_action` | Same as throttle |
| `ban_threshold_count` | Optional second threshold; the client is banned only if the total requests (all incoming requests before throttling) exceed it |
| `ban_threshold_interval_sec` | 10, 30, 60, 120, 180, 240, 300, 600, 900, 1200, 1800, 2700, or 3600 seconds |
| `ban_duration_sec` | Extra seconds banned after `interval_sec` ends: 60, 120, 180, 240, 300, 600, 900, 1200, 1800, 2700, or 3600 |

### Default rate limiting security policy

| Item | Value |
|------|-------|
| Default threshold (policy created with the load balancer) | 500 requests per one-minute interval (`rate_limit_threshold_count` 500, `interval_sec` 60) |
| Tuning | Enable Cloud Logging; set the threshold to the 99th percentile of the maximum requests per IP per minute over a day or longer |
| If legitimate traffic is still blocked | Enable caching (Cloud CDN or Media CDN); increase the throttle interval; use `rate_based_ban` (for example, ban clients that exceed limits 10 times within a minute for 15 minutes) |

## Notes

- Client key types: Up to three keys can be combined. Multiple `HTTP-HEADER` or `HTTP-COOKIE` keys are allowed; only one of each other key type.
- Changing action: a `rate_based_ban` rule cannot later be changed to `throttle`; a `throttle` rule can be changed to `rate_based_ban`.
- Threshold scope: the threshold applies to each associated backend (two backend services with a 1,000 requests per minute threshold each allow 1,000 per minute). Enforcement is independent per region, so a service in two regions may see twice the threshold. Limits are approximate, and in rare cases enforced in more regions than deployed; use rate limiting for abuse mitigation or availability, not strict quota or licensing enforcement.
- `REGION_CODE` keys use the request's origin region, not the backends' region.
- Examples in the source: 2,000 requests in 1,200 seconds with 2,500 sent throttles about 20 percent of traffic; with `ban_duration_sec` 3600 a client is banned 3,600 seconds past the interval.
- Cloud Armor rate limiting is enforced on load balancers at the network edge (for DDoS from untrusted clients); service rate limiting is enforced on an internal Application Load Balancer and Secure Web Proxy (for trusted but misbehaving clients). The `fairshare` action exists only in internal service security policies; no Cloud Armor policy can be configured for TCP traffic routing in Cloud Service Mesh.
- Rate-limiting key data is service data, not customer data; review key types whose values might contain sensitive information if access transparency or access approval applies.
- reCAPTCHA integration: rate limit action-tokens, session-tokens and exemption cookies (see `bot-management.md`). Custom error responses can be applied to `throttle` and `rate_based_ban` traffic; for global external Application Load Balancers custom responses can also target specific status codes.
- Use preview mode and request logs to check a rule before enforcing it. A rate-based ban or a `deny` action takes effect on production traffic and can block legitimate clients.
- The help lists `--exceed-action` values `deny-403`, `deny-404`, `deny-429`, `deny-502`, `deny`, `redirect`. The full flag list is in the `gcp-compute` skill.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/security-policies/rules/create (gcloud 593.0.0 help, SYNOPSIS).
- Source: https://docs.cloud.google.com/armor/docs/rate-limiting-overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [bot-management.md](./bot-management.md)
- [configure-waf.md](./configure-waf.md)
- [adaptive-protection-overview.md](./adaptive-protection-overview.md)
