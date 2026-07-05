# RateLimiter

Restricts the number of requests from an identifier (typically client IP) within a time window, using a pluggable store.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

e.Use(middleware.RateLimiter(middleware.NewRateLimiterMemoryStore(20.0))) // 20 req/sec

// Custom configuration
config := middleware.RateLimiterConfig{
  Store: middleware.NewRateLimiterMemoryStoreWithConfig(
    middleware.RateLimiterMemoryStoreConfig{
      Rate: 10, Burst: 30, ExpiresIn: 3 * time.Minute,
    },
  ),
  IdentifierExtractor: func(c *echo.Context) (string, error) {
    return c.RealIP(), nil
  },
  DenyHandler: func(c *echo.Context, identifier string, err error) error {
    return c.JSON(http.StatusTooManyRequests, nil)
  },
}
e.Use(middleware.RateLimiterWithConfig(config))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Determines which requests bypass rate limiting | `DefaultSkipper` |
| `BeforeFunc` | `BeforeFunc` | Hook executed before rate-limit evaluation | — |
| `IdentifierExtractor` | function | Extracts a visitor identifier from context | Uses `c.RealIP()` |
| `Store` | `RateLimiterStore` | Backend storage/tracking mechanism | In-memory store |
| `ErrorHandler` | function | Called when identifier extraction fails | Returns `403` |
| `DenyHandler` | function | Called when the rate limit is exceeded | Returns `429` |

## Notes

- The default in-memory store is optimized for correctness, not for massive concurrent loads or very large identifier sets (>16k).
- Implement the `RateLimiterStore` interface for a custom backend (e.g. Redis) at scale.
- Errors: `ErrRateLimitExceeded` (429), `ErrExtractorError` (403).

## Related

- [key-auth](./auth-key-auth.md)
- [context-timeout](./util-context-timeout.md)
