# Quickstart

Echo is a high performance, minimalist Go web framework. This page walks through creating a module, adding Echo, and running a minimal "Hello, World!" server.

## Signature / Usage

```go
package main

import (
	"net/http"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

func main() {
	e := echo.New()
	e.Use(middleware.RequestLogger())
	e.Use(middleware.Recover())

	e.GET("/", func(c *echo.Context) error {
		return c.JSON(http.StatusOK, map[string]string{"message": "Hello, World!"})
	})

	if err := e.Start(":1323"); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

Steps:

1. `go mod init myapp`
2. `go get github.com/labstack/echo/v5`
3. Save the code above as `main.go`
4. `go run main.go`
5. Open `http://localhost:1323`

## Notes

- Requires Go 1.25 or newer; verify with `go version`.
- The router dispatches requests with zero dynamic memory allocation per route.
- `middleware.RequestLogger()` and `middleware.Recover()` are commonly registered right after `echo.New()`.

## Related

- [Installation](./installation.md)
- [Customization](./customization.md)
