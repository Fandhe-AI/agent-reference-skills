# Graceful Shutdown

Shut down the Echo server cleanly on `SIGINT`/`SIGTERM` using `echo.StartConfig`'s `GracefulTimeout`.

```go
package main

import (
	"context"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/labstack/echo/v5"
)

func main() {
	e := echo.New()
	e.GET("/", func(c *echo.Context) error {
		time.Sleep(5 * time.Second)
		return c.JSON(http.StatusOK, "OK")
	})

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	sc := echo.StartConfig{
		Address:         ":1323",
		GracefulTimeout: 5 * time.Second,
	}
	if err := sc.Start(ctx, e); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

## Notes

- `signal.NotifyContext` cancels `ctx` when `SIGINT`/`SIGTERM` is received, which triggers `sc.Start` to begin shutdown.
- `GracefulTimeout` bounds how long in-flight requests are allowed to finish before the listener is force-closed.
- To manage the underlying `http.Server` directly (e.g. custom timeouts), start it in a goroutine and call `s.Shutdown(ctx)` on signal instead of using `echo.StartConfig`.
