# Proxy

HTTP/WebSocket reverse-proxy middleware that forwards requests to upstream servers using a configurable load-balancing strategy.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

url1, _ := url.Parse("http://localhost:8081")
url2, _ := url.Parse("http://localhost:8082")

e.Use(middleware.Proxy(middleware.NewRoundRobinBalancer([]*middleware.ProxyTarget{
  {URL: url1},
  {URL: url2},
})))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Function to bypass middleware | `DefaultSkipper` |
| `Balancer` | `ProxyBalancer` | Load-balancing strategy (required) | — |
| `RetryCount` | `int` | Failed-request retry attempts | `0` |
| `RetryFilter` | `func(*echo.Context, error) bool` | Custom retry logic; defaults to retrying `502 Bad Gateway` errors | — |
| `ErrorHandler` | `func(*echo.Context, error) error` | Custom error handling after retries exhausted | — |
| `Rewrite` | `map[string]string` | URL path rewrite rules with capture groups (`$1`, `$2`) | — |
| `RegexRewrite` | `map[*regexp.Regexp]string` | Regex-based rewrite rules with captures | — |
| `ContextKey` | `string` | Key for storing the selected `ProxyTarget` in context | `"target"` |
| `Transport` | `http.RoundTripper` | Custom transport for upstream connections | — |
| `ModifyResponse` | `func(*http.Response) error` | Response modification function | — |

## Notes

- `NewRoundRobinBalancer` and other balancer constructors implement `ProxyBalancer`; custom balancers can be supplied.
- `Rewrite`/`RegexRewrite` can be combined for path transformation before forwarding.
- Since v5.4.0 (v4.16.0), Proxy sets `X-Forwarded-Proto` from `Context#Scheme()` and removes `X-Forwarded-Ssl`, `X-Forwarded-Protocol`, and `X-Url-Scheme` before forwarding. In v5, Proxy also sets `X-Real-IP` from `Context#RealIP()` rather than forwarding a client-supplied value.
- For a chain such as nginx -> Echo Proxy -> upstream, configure `Echo#SchemeExtractor` for the trusted proxy chain (see Request Scheme and Trusted Proxies) and `Echo#IPExtractor` for the trusted incoming IP header (see IP Address Resolution).
- Since v5.4.1, Proxy removes incoming `Forwarded` headers (use the headers generated from the configured IP extractor and scheme instead), and WebSocket requests honor the configured proxy transport, response modifier, target path and query like HTTP requests; upstream WebSocket upgrade responses are validated, and both connections are closed when either side disconnects. Source: https://github.com/labstack/echo/releases/tag/v5.4.1 (fetched 2026-11-14).
- Since v5.4.4, the derived `X-Real-IP` header is retained when the incoming request includes `Connection: X-Real-IP` (mixed-case and duplicate values included), across retries and balancer request replacement, and on WebSocket upgrades. Source: https://github.com/labstack/echo/releases/tag/v5.4.4 (fetched 2026-11-14).

## Related

- [rewrite](./util-rewrite.md)
- [static](./util-static.md)
