# Timeout

Bound the maximum time a request handler is allowed to run using `middleware.ContextTimeout`.

```go
package main

import (
	"context"
	"net/http"
	"time"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.ContextTimeout(5 * time.Second))

	e.GET("/", func(c *echo.Context) error {
		select {
		case <-c.Request().Context().Done():
			return echo.NewHTTPError(http.StatusRequestTimeout, "Request timed out")
		case <-time.After(10 * time.Second):
			return c.String(http.StatusOK, "Hello, World!\n")
		}
	})

	sc := echo.StartConfig{Address: ":1323"}
	if err := sc.Start(context.Background(), e); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

## Notes

- `middleware.ContextTimeout(d)` wraps the request context with `context.WithTimeout`, so `c.Request().Context()` is cancelled after `d` elapses.
- Handlers must actively watch `c.Request().Context().Done()` (e.g. in a `select`) to react to the timeout; the middleware does not forcibly abort long-running code.
- In this example the 5-second middleware timeout fires before the 10-second simulated workload finishes, so the client receives a `408 Request Timeout`.
