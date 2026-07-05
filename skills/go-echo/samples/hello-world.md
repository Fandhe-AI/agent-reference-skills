# Hello World / Basic Server

Minimal Echo server: register logging/recovery middleware, add one route, start listening.

```go
package main

import (
	"context"
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

func main() {
	// Echo instance
	e := echo.New()

	// Middleware
	e.Use(middleware.RequestLogger())
	e.Use(middleware.Recover())

	// Route => handler
	e.GET("/", func(c *echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!\n")
	})

	// Start server
	sc := echo.StartConfig{Address: ":1323"}
	if err := sc.Start(context.Background(), e); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

## Notes

- Register `middleware.RequestLogger()` and `middleware.Recover()` immediately after `echo.New()`.
- `echo.StartConfig{Address: ":1323"}.Start(ctx, e)` starts the HTTP server and blocks until shutdown.
- Run with `go run main.go`, then open `http://localhost:1323`.
