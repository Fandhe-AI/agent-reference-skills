# Server-Sent Events (SSE)

Stream periodic events to the browser over `text/event-stream`, flushing after each write and disabling the write timeout.

```go
// event.go
package main

import (
	"bytes"
	"fmt"
	"io"
)

// Event represents a Server-Sent Event.
type Event struct {
	ID    []byte
	Data  []byte
	Event []byte
	Retry []byte
}

func (ev *Event) MarshalTo(w io.Writer) error {
	if len(ev.Data) == 0 {
		return nil
	}
	if _, err := fmt.Fprintf(w, "id: %s\n", ev.ID); err != nil {
		return err
	}
	sd := bytes.Split(ev.Data, []byte("\n"))
	for i := range sd {
		if _, err := fmt.Fprintf(w, "data: %s\n", sd[i]); err != nil {
			return err
		}
	}
	if len(ev.Event) > 0 {
		if _, err := fmt.Fprintf(w, "event: %s\n", ev.Event); err != nil {
			return err
		}
	}
	_, err := fmt.Fprint(w, "\n")
	return err
}
```

```go
// main.go
package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.RequestLogger())
	e.Use(middleware.Recover())
	e.File("/", "./index.html")

	e.GET("/sse", func(c *echo.Context) error {
		log.Printf("SSE client connected, ip: %v", c.RealIP())

		w := c.Response()
		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-cache")
		w.Header().Set("Connection", "keep-alive")

		ticker := time.NewTicker(1 * time.Second)
		defer ticker.Stop()
		count := uint64(0)
		for {
			select {
			case <-c.Request().Context().Done():
				log.Printf("SSE client disconnected, ip: %v", c.RealIP())
				return nil
			case <-ticker.C:
				count++
				event := Event{
					Data: []byte(fmt.Sprintf("count: %d, time: %s", count, time.Now().Format(time.RFC3339Nano))),
				}
				if err := event.MarshalTo(w); err != nil {
					return err
				}
				if err := http.NewResponseController(w).Flush(); err != nil {
					return err
				}
			}
		}
	})

	sc := echo.StartConfig{
		Address: ":8080",
		BeforeServeFunc: func(s *http.Server) error {
			s.WriteTimeout = 0 // IMPORTANT: disable for SSE
			return nil
		},
	}
	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer cancel()

	if err := sc.Start(ctx, e); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

## Notes

- `s.WriteTimeout = 0` in `BeforeServeFunc` is required, otherwise the connection is cut off after the server's default write timeout.
- `http.NewResponseController(w).Flush()` pushes each event to the client immediately instead of buffering.
- The handler exits cleanly via `c.Request().Context().Done()` when the client disconnects.
- For broadcasting the same stream to many subscribers, use a library like `github.com/r3labs/sse/v2` instead of writing the event format manually.
