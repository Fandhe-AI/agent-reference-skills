# JSONP

Return a JSON payload wrapped in a client-supplied callback function name using `c.JSONP`.

```go
package main

import (
	"context"
	"math/rand"
	"net/http"
	"time"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

func main() {
	e := echo.New()
	e.Use(middleware.RequestLogger())
	e.Use(middleware.Recover())

	e.Static("/", "public")

	e.GET("/jsonp", func(c *echo.Context) error {
		callback := c.QueryParam("callback")
		var content struct {
			Response  string    `json:"response"`
			Timestamp time.Time `json:"timestamp"`
			Random    int       `json:"random"`
		}
		content.Response = "Sent via JSONP"
		content.Timestamp = time.Now().UTC()
		content.Random = rand.Intn(1000)
		return c.JSONP(http.StatusOK, callback, &content)
	})

	sc := echo.StartConfig{Address: ":1323"}
	if err := sc.Start(context.Background(), e); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

## Notes

- `c.JSONP(code, callback, i)` wraps the JSON payload in a call to the callback function named by the `callback` query parameter (e.g. `response({...})`).
- A browser client can request `/jsonp?callback=?` (jQuery-style) to receive the wrapped payload without triggering CORS restrictions.
- JSONP only works for `GET` requests and is largely superseded by CORS for modern cross-origin needs.
