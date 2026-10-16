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
- Removed from the official cookbook: the JSONP recipe is no longer in the echox cookbook (removed in echox commit `508a246`, 2026-09-30; checked at `94b5f80`); this page is kept as a legacy example.
- Since v5.4.0, `Context.JSONP` and `Context.JSONPBlob` accept only an empty callback, a JavaScript identifier, or a dot-separated path of identifiers (ASCII letters, digits, `_`, `$`). Any other callback returns a 400 error wrapping `ErrInvalidJSONPCallback` and writes nothing; responses carry `X-Content-Type-Options: nosniff`.
- JSONP lets any website read the response with the user's cookies, so do not use it for data that needs authentication; prefer the CORS middleware (see the `cors` sample).
