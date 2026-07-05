# Template Rendering (html/template)

Render server-side HTML by implementing the `echo.Renderer` interface with `html/template`.

```go
package main

import (
	"html/template"
	"io"
	"net/http"

	"github.com/labstack/echo/v5"
)

type TemplateRenderer struct {
	templates *template.Template
}

func (t *TemplateRenderer) Render(c *echo.Context, w io.Writer, name string, data any) error {
	if viewContext, isMap := data.(map[string]any); isMap {
		viewContext["reverse"] = c.RouteInfo().Reverse
	}
	return t.templates.ExecuteTemplate(w, name, data)
}

func main() {
	e := echo.New()
	e.Renderer = &TemplateRenderer{
		templates: template.Must(template.ParseGlob("main/*.html")),
	}

	e.GET("/something/:name", func(c *echo.Context) error {
		return c.Render(http.StatusOK, "template.html", map[string]any{
			"name": "Dolly!",
		})
	})

	if err := e.Start(":1323"); err != nil {
		e.Logger.Error("shutting down the server", "error", err)
	}
}
```

```html
<!-- main/template.html -->
<html>
<body>
<h1>Hello {{index . "name"}}</h1>
<p>{{ with $x := index . "reverse" }}
   {{ call $x "foobar" }}
{{ end }}</p>
</body>
</html>
```

## Notes

- `e.Renderer` must implement `Render(c *echo.Context, w io.Writer, name string, data any) error` to be usable from `c.Render`.
- `template.ParseGlob("main/*.html")` compiles all matching templates once at startup; `name` in `c.Render` selects which one to execute.
- `c.RouteInfo().Reverse` is injected into the data map so templates can build reverse URLs for the current route.
