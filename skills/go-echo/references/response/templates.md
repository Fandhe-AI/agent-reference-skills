# Templates

Renders a named template with data and sends the result as an HTML response, via a pluggable `Renderer` interface (typically backed by `html/template`).

## Signature / Usage

```go
Context#Render(code int, name string, data any) error

type Renderer interface {
	Render(c *echo.Context, w io.Writer, name string, data any) error
}
```

```go
type Template struct {
	templates *template.Template
}

func (t *Template) Render(c *echo.Context, w io.Writer, name string, data any) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func Hello(c *echo.Context) error {
	return c.Render(http.StatusOK, "hello", "World")
}

func main() {
	e := echo.New()
	e.Renderer = &Template{
		templates: template.Must(template.ParseGlob("public/views/*.html")),
	}
	e.GET("/hello", Hello)
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| code | int | HTTP status code to send |
| name | string | Template name to execute |
| data | any | Data passed to the template |
| e.Renderer | echo.Renderer | Registered on `*echo.Echo` before use; must implement `Render` |

## Notes

- Echo does not ship a default renderer for `Render()` beyond the `Renderer` interface itself; register a custom implementation (commonly wrapping `html/template`) via `e.Renderer`.
- Pass `c.RouteInfo().Reverse` through the data map to generate URIs dynamically inside templates (route reversal).

## Related

- [HTML](./html.md)
- [Static Files](./static-files.md)
