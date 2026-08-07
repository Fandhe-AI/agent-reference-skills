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

- Start two Echo instances (`go run server.go server1 :8081`, `go run server.go server2 :8082`), then `service nginx restart` to apply the config.
- Nginx's `upstream` block distributes requests arriving on port `8080` across `8081`/`8082` using round-robin by default.
- Compare with the `reverse-proxy` sample, which achieves the same result using Echo's own `middleware.Proxy` instead of an external Nginx process.
