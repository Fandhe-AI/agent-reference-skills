# Auto TLS

Automatically obtain and renew TLS certificates from Let's Encrypt using `golang.org/x/crypto/acme/autocert`.

```go
package main

import (
	"context"
	"log/slog"
	"net/http"
	"os"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
	"golang.org/x/crypto/acme/autocert"
)

func main() {
	e := echo.New()
	e.Logger = slog.New(slog.NewJSONHandler(os.Stdout, nil))

	e.Use(middleware.Recover())
	e.Use(middleware.RequestLogger())

	e.GET("/", func(c *echo.Context) error {
		return c.HTML(http.StatusOK, `
			<h1>Welcome to Echo!</h1>
			<h3>TLS certificates automatically installed from Let's Encrypt :)</h3>
		`)
	})

	m := &autocert.Manager{
		Prompt:     autocert.AcceptTOS,
		HostPolicy: autocert.HostWhitelist("example.com", "www.example.com"),
		Cache:      autocert.DirCache("/var/www/.cache"),
	}

	sc := echo.StartConfig{
		Address:   ":443",
		TLSConfig: m.TLSConfig(),
	}
	if err := sc.Start(context.Background(), e); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

## Notes

- `HostPolicy: autocert.HostWhitelist(...)` restricts which domains certificates are issued for, preventing abuse.
- `Cache: autocert.DirCache(...)` persists issued certificates to disk to avoid hitting Let's Encrypt rate limits on restart.
- The server must listen on `:443` for the ACME HTTP-01/TLS-ALPN-01 challenge to succeed.
- To manage the underlying `http.Server` directly instead of `echo.StartConfig`, set `TLSConfig.GetCertificate` to `autoTLSManager.GetCertificate` and `NextProtos` to `[]string{acme.ALPNProto}`, then call `s.ListenAndServeTLS("", "")`.
