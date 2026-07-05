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

## Related

- [rewrite](./util-rewrite.md)
- [static](./util-static.md)
