# HTTP/2 Server

Serve HTTP/2 over TLS; Go's `net/http` negotiates HTTP/2 automatically once a TLS certificate is configured.

```go
package main

import (
	"context"
	"fmt"
	"net/http"

	"github.com/labstack/echo/v5"
)

func main() {
	e := echo.New()
	e.GET("/request", func(c *echo.Context) error {
		req := c.Request()
		format := `
			<code>
				Protocol: %s<br>
				Host: %s<br>
				Remote Address: %s<br>
				Method: %s<br>
				Path: %s<br>
			</code>
		`
		return c.HTML(http.StatusOK, fmt.Sprintf(format, req.Proto, req.Host, req.RemoteAddr, req.Method, req.URL.Path))
	})
	sc := echo.StartConfig{Address: ":1323"}
	if err := sc.StartTLS(context.Background(), e, "cert.pem", "key.pem"); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

## Notes

- Generate a local certificate with `go run $GOROOT/src/crypto/tls/generate_cert.go --host localhost` before running the server.
- `sc.StartTLS` enables TLS; the Go standard library negotiates HTTP/2 automatically over TLS via ALPN, no extra configuration is required.
- Verify by requesting `https://localhost:1323/request` — the response shows `Protocol: HTTP/2.0`.
