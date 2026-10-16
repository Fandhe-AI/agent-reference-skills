---
source: https://echo.labstack.com/guide/request-scheme/
---

# Request Scheme and Trusted Proxies

`Context#Scheme()` tells Echo whether a request used HTTP or HTTPS. HTTPS redirects, HSTS, and the Proxy middleware rely on it. Echo only honors forwarded-scheme headers when the direct peer is trusted.

## Signature / Usage

```go
_, gclb1, _ := net.ParseCIDR("35.191.0.0/16")
_, gclb2, _ := net.ParseCIDR("130.211.0.0/22")
e.SchemeExtractor = echo.ExtractSchemeFromHeaders(
	echo.TrustIPRange(gclb1),
	echo.TrustIPRange(gclb2),
)
```

Import `net` and `github.com/labstack/echo/v5` for this v5 example. For v4, use `github.com/labstack/echo/v4` instead.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Echo#SchemeExtractor` | field | Controls how the request scheme is determined. In v5, `Config.SchemeExtractor` can set it when creating Echo |
| `echo.ExtractSchemeFromHeaders(...)` | extractor | Default. Uses `X-Forwarded-Proto`, `X-Forwarded-Protocol`, `X-Forwarded-Ssl`, or `X-Url-Scheme` only when the direct peer is trusted |
| `echo.ExtractSchemeDirect()` | extractor | Ignores forwarding headers; the connection itself determines the scheme |
| `echo.LegacySchemeExtractor()` | extractor | Restores the older behavior; unsafe if an untrusted client can reach the app or a proxy forwards a client-supplied scheme header |
| `echo.TrustIPRange(*net.IPNet)` | `TrustOption` | Explicitly trusts a proxy address range |

## Notes

- Since Echo v5.4.0 and v4.16.0, forwarded-scheme headers are used only when the direct peer is a loopback, link-local, or private address, or a Unix socket. This prevents a public client from sending `X-Forwarded-Proto: https` over HTTP to bypass an HTTPS redirect.
- When `X-Forwarded-Proto` is present, Echo uses only its last value and returns the scheme in lowercase. An invalid value becomes `http`; Echo does not fall back to another forwarded-scheme header.
- The trusted proxy must overwrite `X-Forwarded-Proto` with the scheme it observed, not pass through a client-supplied value. For nginx: `proxy_set_header X-Forwarded-Proto $scheme;`.
- If the direct proxy has a public address, or uses `100.64.0.0/10`, explicitly trust its ranges. Otherwise Echo ignores its `X-Forwarded-Proto`: HTTPS redirects can loop and Secure middleware will not send HSTS. This applies to Cloudflare, CloudFront, and Azure Front Door connecting to a public origin, and to GCP external HTTP(S) load balancers or GKE Ingress. Trust only the ranges your deployment uses.
- Proxies on the same host or a private network, and Unix sockets, keep working with the default extractor. If an adapter replaces `RemoteAddr` with the client's address, configure the extractor for the actual deployment.
- Scheme and client IP are separate decisions; configure `Echo#IPExtractor` for client IPs.
- docs source: labstack/echox commit 94b5f80, fetched 2026-10-16.

## Related

- [IP Address Resolution](./ip-address.md)
- [Customization](./customization.md)
