---
source: https://echo.labstack.com/middleware/open-telemetry/
---

# OpenTelemetry

Echo OpenTelemetry (`echo-otel`) is a middleware that provides OpenTelemetry instrumentation for HTTP requests. It is distributed as a separate module, not Echo core.

## Signature / Usage

```go
// go get github.com/labstack/echo-otel/v5
import (
	echootel "github.com/labstack/echo-otel/v5"
	"go.opentelemetry.io/otel/trace"
)

// Simplified form: server name only
e.Use(echootel.NewMiddleware("app.example.com"))

// Full configuration
e.Use(echootel.NewMiddlewareWithConfig(echootel.Config{
	ServerName:     "my-server",
	TracerProvider: tp,

	//Skipper:             nil,
	//OnNextError:         nil,
	//OnExtractionError:   nil,
	//MeterProvider:       nil,
	//Propagators:         nil,
	//SpanStartOptions:    nil,
	//SpanStartAttributes: nil,
	//SpanEndAttributes:   nil,
	//MetricAttributes:    nil,
	//Metrics:             nil,
}))

// Retrieve the tracer from the Echo context
tracer, err := echo.ContextGet[trace.Tracer](c, echootel.TracerKey)
```

## Notes

- Echo v4 applications use `github.com/labstack/echo-otel/v4`. `github.com/labstack/echo-opentelemetry` is the deprecated previous name of this module (see "Migrating from echo-opentelemetry" in the echo-otel README).
- The `Config` fields are listed in the commented-out lines above; the full per-field reference is the `Config` struct in `github.com/labstack/echo-otel` (`otel.go`). The official page renders it from a generated component not included in the source, so types and defaults are not reproduced here.
- The official example exports spans to stdout; any exporter (OTLP, etc.) can be used. See the OpenTelemetry Go exporters documentation.
- docs source: labstack/echox commit 94b5f80, fetched 2026-10-16. Module source: https://github.com/labstack/echo-otel/blob/v5.0.0/README.md
- Related specs: OpenTelemetry HTTP semantic conventions and HTTP metrics spec (opentelemetry.io).

## Related

- [prometheus](./observability-prometheus.md)
- [request-id](./util-request-id.md)
- [logger](./util-logger.md)
