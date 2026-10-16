# Load Balancing with Nginx

Run multiple Echo server instances behind Nginx acting as an external reverse proxy / load balancer.

```go
// server.go — run as: go run server.go server1 :8081
package main

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

var index = `<p>Hello from upstream server %s</p>`

func main() {
	name := os.Args[1]
	port := os.Args[2]
	e := echo.New()
	e.Use(middleware.Recover())
	e.Use(middleware.RequestLogger())

	e.GET("/", func(c *echo.Context) error {
		return c.HTML(http.StatusOK, fmt.Sprintf(index, name))
	})

	sc := echo.StartConfig{Address: port}
	if err := sc.Start(context.Background(), e); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

```nginx
# /etc/nginx/sites-enabled/localhost
upstream localhost {
  server localhost:8081;
  server localhost:8082;
}

server {
  listen          8080;
  server_name     localhost;
  access_log      /var/log/nginx/localhost.access.log combined;

  location / {
    proxy_pass      http://localhost;
  }
}
```

## Notes

- Removed from the official cookbook: the Nginx load-balancing recipe is no longer in the echox cookbook (removed in echox commit `508a246`, 2026-09-30; `94b5f80` keeps `reverse-proxy` for Echo's own proxy); this page is kept as a legacy example.
- Start two Echo instances (`go run server.go server1 :8081`, `go run server.go server2 :8082`), then `service nginx restart` to apply the config.
- Nginx's `upstream` block distributes requests arriving on port `8080` across `8081`/`8082` using round-robin by default.
- Echo v5.4.0 ignores `X-Forwarded-Proto` from untrusted (public) peers: add `proxy_set_header X-Forwarded-Proto $scheme;` to the `location` block so Echo sees the right scheme, and configure `Echo#IPExtractor` (e.g. `echo.ExtractIPFromRealIPHeader()`) with `proxy_set_header X-Real-IP $remote_addr;` if client IPs matter.
- Compare with the `reverse-proxy` sample, which achieves the same result using Echo's own `middleware.Proxy` instead of an external Nginx process.
