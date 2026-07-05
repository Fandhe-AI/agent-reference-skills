# WebSocket

Upgrade an HTTP connection to WebSocket with `gorilla/websocket` and exchange messages with a browser client.

```go
package main

import (
	"context"
	"fmt"

	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

var upgrader = websocket.Upgrader{}

func hello(c *echo.Context) error {
	ws, err := upgrader.Upgrade(c.Response(), c.Request(), nil)
	if err != nil {
		return err
	}
	defer ws.Close()

	for {
		// Write
		if err := ws.WriteMessage(websocket.TextMessage, []byte("Hello, Client!")); err != nil {
			c.Logger().Error("failed to write WS message", "error", err)
			return nil // connection is broken; stop the loop and close it
		}

		// Read
		_, msg, err := ws.ReadMessage()
		if err != nil {
			c.Logger().Error("failed to read WS message", "error", err)
			return nil // client closed or read failed; exit the handler
		}
		fmt.Printf("%s\n", msg)
	}
}

func main() {
	e := echo.New()

	e.Use(middleware.RequestLogger())
	e.Use(middleware.Recover())
	e.Static("/", "public")

	e.GET("/ws", hello)

	sc := echo.StartConfig{Address: ":1323"}
	if err := sc.Start(context.Background(), e); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

Client-side (served from `public/index.html`):

```html
<script>
  var uri = (location.protocol === 'https:' ? 'wss:' : 'ws:') + '//' + location.host + '/ws';
  var ws = new WebSocket(uri);
  ws.onmessage = function(evt) {
    document.getElementById('output').innerHTML += evt.data + '<br>';
  };
  setInterval(function() { ws.send('Hello, Server!'); }, 1000);
</script>
```

## Notes

- `websocket.Upgrader{}.Upgrade(c.Response(), c.Request(), nil)` performs the HTTP-to-WebSocket handshake.
- Echo also supports `golang.org/x/net/websocket` via `websocket.Handler(...).ServeHTTP(c.Response(), c.Request())` for a stdlib-only alternative.
- The read/write loop keeps the connection open; return from the handler on any read/write error so the loop stops and the deferred `ws.Close()` runs. Ignoring the error would spin the goroutine on a broken connection.
- `e.Static("/", "public")` serves the accompanying HTML/JS client alongside the WebSocket endpoint.
