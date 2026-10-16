---
source: https://echo.labstack.com/cookbook/cors/
---

# CORS

Enable Cross-Origin Resource Sharing with an allow list of origins or a custom origin function.

Allow list of origins, passed directly to `middleware.CORS`:

```go
package main

import (
	"context"
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

var (
	users = []string{"Joe", "Veer", "Zion"}
)

func getUsers(c *echo.Context) error {
	return c.JSON(http.StatusOK, users)
}

func main() {
	e := echo.New()
	e.Use(middleware.RequestLogger())
	e.Use(middleware.Recover())

	// CORS default
	// Allows requests from any origin wth GET, HEAD, PUT, POST or DELETE method.
	// e.Use(middleware.CORS("*"))

	// CORS restricted
	// Allows requests from any `https://labstack.com` or `https://labstack.net` origin
	e.Use(middleware.CORS("https://labstack.com", "https://labstack.net"))

	e.GET("/api/users", getUsers)

	sc := echo.StartConfig{Address: ":1323"}
	if err := sc.Start(context.Background(), e); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

Custom origin function with `CORSWithConfig` and `UnsafeAllowOriginFunc`:

```go
package main

import (
	"context"
	"net/http"
	"strings"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

var (
	users = []string{"Joe", "Veer", "Zion"}
)

func getUsers(c *echo.Context) error {
	return c.JSON(http.StatusOK, users)
}

// allowOrigin takes the origin as an argument and returns:
// - origin to add to the response Access-Control-Allow-Origin header
// - whether the request is allowed or not
// - an optional error. this will stop handler chain execution and return an error response.
//
// return origin, true, err  // blocks request with error
// return origin, true, nil  // allows the origin (sets Access-Control-Allow-Origin)
// return "", false, nil     // origin not allowed
func allowOrigin(c *echo.Context, origin string) (string, bool, error) {
	// In this example we use a naive suffix check but we can imagine various
	// kind of custom logic. For example, an external datasource could be used
	// to maintain the list of allowed origins.
	if strings.HasSuffix(origin, ".example.com") {
		return origin, true, nil
	}
	return "", false, nil
}

func main() {
	e := echo.New()
	e.Use(middleware.RequestLogger())
	e.Use(middleware.Recover())

	// CORS restricted with a custom function to allow origins
	// and with the GET, PUT, POST or DELETE methods allowed.
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		UnsafeAllowOriginFunc: allowOrigin,
		AllowMethods:          []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))

	e.GET("/api/users", getUsers)

	sc := echo.StartConfig{Address: ":1323"}
	if err := sc.Start(context.Background(), e); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

## Notes

- `middleware.CORS(origins...)` takes the allowed origins directly; `middleware.CORS("*")` allows any origin.
- `UnsafeAllowOriginFunc(c, origin) (string, bool, error)` returns the origin to echo back, whether the request is allowed, and an optional error that stops the handler chain with an error response.
- Both programs are separate recipes (`cookbook/cors/origin-list` and `cookbook/cors/origin-func`); use one or the other, not both.
- The official cookbook (echox 94b5f80, cookbook/cors/origin-func/server.go) comments these two returns as "allows CSRF request through" / "falls back to legacy token logic", which is carried over from the CSRF recipe. Per middleware_cors.go (v5.4.0), `true` means the origin is allowed and `false` means it is not; there is no CSRF or token fallback.
