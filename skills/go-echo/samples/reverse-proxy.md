# Reverse Proxy

Use Echo's `middleware.Proxy` to forward HTTP and WebSocket traffic to multiple upstream servers with round-robin load balancing, optionally limited to a route group.

```go
// upstream/server.go — run as: go run ./upstream server1 :8081
package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
	"golang.org/x/net/websocket"
)

var index = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Upstream Server</title>
		<style>
			h1, p {
				font-weight: 300;
			}
		</style>
	</head>
	<body>
		<h1>HTTP</h1>
		<p>
			Hello from upstream server %s
		</p>
		<h1>WebSocket</h1>
		<p id="output"></p>
		<script>
			var wsURL = new URL('ws', window.location.href)
			wsURL.protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
			var ws = new WebSocket(wsURL)

			ws.onmessage = function(evt) {
				var out = document.getElementById('output');
				out.innerHTML += evt.data + '<br>';
			}
		</script>
	</body>
	</html>
`

func main() {
	name := os.Args[1]
	port := os.Args[2]
	e := echo.New()

	e.Use(middleware.RequestLogger())
	e.Use(middleware.Recover())

	e.GET("/", func(c *echo.Context) error {
		return c.HTML(http.StatusOK, fmt.Sprintf(index, name))
	})

	// WebSocket handler
	e.GET("/ws", func(c *echo.Context) error {
		websocket.Handler(func(ws *websocket.Conn) {
			defer ws.Close()
			for {
				// Write
				err := websocket.Message.Send(ws, fmt.Sprintf("Hello from upstream server %s!", name))
				if err != nil {
					e.Logger.Error("failed to send message", "error", err)
				}
				select {
				case <-ws.Request().Context().Done():
					return
				case <-time.After(1 * time.Second):
					continue
				}
			}
		}).ServeHTTP(c.Response(), c.Request())
		return nil
	})

	sc := echo.StartConfig{Address: port}
	if err := sc.Start(context.Background(), e); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

```go
// server.go — run as: go run . (or go run . -grouped)
package main

import (
	"context"
	"flag"
	"net/http"
	"net/url"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

func main() {
	grouped := flag.Bool("grouped", false, "limit the proxy to the /blog route group")
	flag.Parse()
	e := echo.New()
	e.Use(middleware.RequestLogger())
	e.Use(middleware.Recover())

	// Setup proxy
	url1, err := url.Parse("http://localhost:8081")
	if err != nil {
		e.Logger.Error("failed to parse url", "error", err)
		return
	}
	url2, err := url.Parse("http://localhost:8082")
	if err != nil {
		e.Logger.Error("failed to parse url", "error", err)
		return
	}
	targets := []*middleware.ProxyTarget{
		{URL: url1},
		{URL: url2},
	}
	if *grouped {
		configureBlogProxy(e, targets)
	} else {
		e.Use(middleware.Proxy(middleware.NewRoundRobinBalancer(targets)))
	}

	sc := echo.StartConfig{Address: ":1323"}
	if err := sc.Start(context.Background(), e); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}

// configureBlogProxy limits the proxy middleware to a route group.
func configureBlogProxy(e *echo.Echo, targets []*middleware.ProxyTarget) {
	// Canonicalize the group root so relative WebSocket URLs stay under /blog/.
	e.Any("/blog", func(c *echo.Context) error {
		location := "/blog/"
		if query := c.Request().URL.RawQuery; query != "" {
			location += "?" + query
		}
		return c.Redirect(http.StatusPermanentRedirect, location)
	})
	g := e.Group("/blog")
	g.Use(middleware.ProxyWithConfig(middleware.ProxyConfig{
		Balancer: middleware.NewRoundRobinBalancer(targets),
		Rewrite:  map[string]string{"/blog/*": "/$1"},
	}))
	// Group middleware needs a matching route. The proxy handles the response.
	g.Any("/*", func(c *echo.Context) error { return echo.ErrNotFound })
}
```

## Notes

- From `cookbook/reverse-proxy`, start each upstream in its own terminal (`go run ./upstream server1 :8081`, `go run ./upstream server2 :8082`), then the proxy (`go run .`); browse to `http://localhost:1323`.
- Grouped mode: `go run . -grouped`, then browse to `http://localhost:1323/blog/`. The proxy strips `/blog` through `Rewrite`; group middleware needs a matching route, hence the `g.Any("/*", ...)` placeholder.
- Header behaviour (v5.4.0): Proxy forwards `X-Forwarded-Proto` from `Context#Scheme()`, always sets `X-Real-IP` from `Context#RealIP()`, and no longer forwards `X-Forwarded-Ssl`, `X-Forwarded-Protocol` or `X-Url-Scheme`.
- When another proxy sits before Echo, configure `Echo#SchemeExtractor` and `Echo#IPExtractor` (e.g. `echo.ExtractIPFromRealIPHeader()`) for that trusted proxy; otherwise the upstream may see the proxy's IP or the wrong scheme. Swap in `middleware.NewRandomBalancer(targets)` for random distribution.
