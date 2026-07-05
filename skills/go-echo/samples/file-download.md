# File Download

Serve files for inline display or forced download using `c.File`, `c.Inline`, and `c.Attachment`.

```go
package main

import (
	"context"

	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
)

func main() {
	e := echo.New()

	e.Use(middleware.RequestLogger())
	e.Use(middleware.Recover())

	e.GET("/", func(c *echo.Context) error {
		return c.File("index.html")
	})

	// Serves the file as-is (browser decides how to render it)
	e.GET("/file", func(c *echo.Context) error {
		return c.File("echo.svg")
	})

	// Forces inline display with Content-Disposition: inline
	e.GET("/inline", func(c *echo.Context) error {
		return c.Inline("inline.txt", "inline.txt")
	})

	// Forces a "Save As" download with Content-Disposition: attachment
	e.GET("/attachment", func(c *echo.Context) error {
		return c.Attachment("attachment.txt", "attachment.txt")
	})

	sc := echo.StartConfig{Address: ":1323"}
	if err := sc.Start(context.Background(), e); err != nil {
		e.Logger.Error("failed to start server", "error", err)
	}
}
```

## Notes

- `c.File(path)` streams the file with content type inferred from its extension; no `Content-Disposition` header is set.
- `c.Inline(path, name)` sets `Content-Disposition: inline; filename=...`, prompting the browser to display it.
- `c.Attachment(path, name)` sets `Content-Disposition: attachment; filename=...`, prompting a download dialog.
