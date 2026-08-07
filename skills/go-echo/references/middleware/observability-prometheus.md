# Prometheus

Generates Prometheus metrics for HTTP requests, distributed as a separate module (`echo-prometheus`) rather than Echo core. Tracks request duration, request/response sizes, and request counts partitioned by status code and HTTP method.

## Signature / Usage

```go
import "github.com/labstack/echo-prometheus"

e := echo.New()
e.Use(echoprometheus.NewMiddleware("myapp"))
e.GET("/metrics", echoprometheus.NewHandler())
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Skipper` | function | Determines which URLs to exclude from metrics collection |
| `Registerer` | Registry | Custom Prometheus registry for storing metrics |
| `Gatherer` | Registry | Custom registry from which to serve metrics |
| `AfterNext` | callback | Function executed after request processing |
| `LabelFuncs` | map | Custom label definitions or overrides for metrics |
| `HistogramOptsFunc` | function | Modifies histogram metric configurations |
| `CounterOptsFunc` | function | Modifies counter metric configurations |

## Notes

- Requires the separate module `github.com/labstack/echo-prometheus`.
- Collects four default metrics: request duration, response size, request size, and request count.
- Metrics can be served on the same server or a separate port; `NewHandler()` exports them in Prometheus text format for scraping.
- Supports registering custom metrics alongside the built-in ones and filtering collection via `Skipper`.

## Related

- [request-id](./util-request-id.md)
- [logger](./util-logger.md)
