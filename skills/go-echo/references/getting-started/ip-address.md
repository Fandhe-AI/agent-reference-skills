# IP Address Resolution

Echo resolves the client's real IP via `Context#RealIP()`, driven by the `Echo#IPExtractor` function. Because HTTP headers like `X-Forwarded-For` and `X-Real-IP` are client-controllable, the extractor must be chosen deliberately for the network topology in front of the app.

## Signature / Usage

```go
// No reverse proxy in front of Echo: trust only the socket's remote address
e.IPExtractor = echo.ExtractIPDirect()

// Behind a proxy that sets X-Forwarded-For
e.IPExtractor = echo.ExtractIPFromXFFHeader()

// Behind a proxy that sets X-Real-IP
e.IPExtractor = echo.ExtractIPFromRealIPHeader()
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `echo.ExtractIPDirect()` | `func() IPExtractor` | Uses only the network-layer remote address; correct choice when Echo is directly internet-facing with no proxy in front of it |
| `echo.ExtractIPFromXFFHeader(...TrustOption)` | `func(...TrustOption) IPExtractor` | Reads `X-Forwarded-For`, returning the first untrustworthy IP scanned from the right (rightmost is closest to the server) |
| `echo.ExtractIPFromRealIPHeader(...TrustOption)` | `func(...TrustOption) IPExtractor` | Reads the single-value `X-Real-IP` header, subject to the same trust options as XFF |
| `echo.LegacyIPExtractor()` | `func() IPExtractor` | Derives the IP from `X-Forwarded-For` (first IP), then `X-Real-IP`, then `req.RemoteAddr`; no validation, not safe against spoofing unless a trusted proxy strips/replaces the headers. Use `ExtractIPFromXFFHeader` or `ExtractIPFromRealIPHeader` instead |
| `echo.TrustLoopback(bool)` | `TrustOption` | Trust/distrust loopback addresses (`127.0.0.0/8`); trusted by default |
| `echo.TrustLinkLocal(bool)` | `TrustOption` | Trust/distrust link-local unicast addresses (`169.254.0.0/16`); trusted by default |
| `echo.TrustPrivateNet(bool)` | `TrustOption` | Trust/distrust private network ranges (RFC 1918, e.g. `10.0.0.0/8`, `192.168.0.0/16`); trusted by default |
| `echo.TrustIPRange(*net.IPNet)` | `TrustOption` | Adds a custom trusted IP range, e.g. a known load balancer subnet |

## Notes

- In v5, `Context#RealIP()` uses the direct peer address by default (since v5.1.0) and ignores client-supplied IP headers. Set `Echo#IPExtractor` only when a trusted proxy supplies the client IP in a header.
- In v4, the default still trusts `X-Forwarded-For` and `X-Real-IP` from any client; always set an extractor that matches your deployment, especially when using rate limiting or Proxy middleware (see the v4.16.0 release notes).
- The request scheme (HTTP/HTTPS) has a separate trust setting (`Echo#SchemeExtractor`). See [Request Scheme and Trusted Proxies](./request-scheme.md) when configuring a reverse proxy, HTTPS redirect, or HSTS.
- Always configure the outermost proxy at the edge of the infrastructure to strip any client-supplied `X-Forwarded-For` / `X-Real-IP` headers before they reach Echo; otherwise a client can forge its IP by sending these headers directly.
- By default, internal address ranges defined in RFC 6890, RFC 4291, and RFC 4193 are trusted when scanning XFF/`X-Real-IP`.

## Related

- [Request Scheme and Trusted Proxies](./request-scheme.md)
- [Customization](./customization.md)
- [Context (core)](../context/context.md)
