# HTTP/2 Server Push

Proactively push static assets (CSS, JS, images) to the client alongside the initial HTML response over HTTP/2.

```go
package main

import (
	"context"
	"net/http"

	"github.com/labstack/echo/v5"
)

func main() {
	e := echo.New()
	e.Static("/", "static")

	e.GET("/", func(c *echo.Context) (err error) {
		rw, err := echo.UnwrapResponse(c.Response())
		if err != nil {
			return
		}
		if pusher, ok := rw.ResponseWriter.(http.Pusher); ok {
			if err = pusher.Push("/app.css", nil); err != nil {
				return
			}
			if err = pusher.Push("/app.js", nil); err != nil {
				return
			}
			if err = pusher.Push("/echo.png", nil); err != nil {
				return
			}
		}
		return c.File("index.html")
	})

	sc := echo.StartConfig{Address: ":1323"}
	if err := sc.StartTLS(context.Background(), e, "cert.pem", "key.pem"); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

## Notes

- Server push requires an HTTP/2 connection, which requires TLS (`sc.StartTLS`); a self-signed certificate is enough for local testing.
- `echo.UnwrapResponse` exposes the underlying `http.ResponseWriter` so it can be type-asserted to `http.Pusher`.
- If the underlying transport does not support `http.Pusher` (e.g. HTTP/1.1), the type assertion fails silently and clients fall back to requesting assets normally.
