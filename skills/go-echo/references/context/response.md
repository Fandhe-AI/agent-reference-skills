# Response Helpers

Methods on `echo.Context` for writing the HTTP response body in various formats, serving files, redirecting, and rendering templates.

## Signature / Usage

```go
func Hello(c *echo.Context) error {
    return c.JSON(http.StatusOK, map[string]string{"message": "Hello, World!"})
}
```

## Options / Props

| Name | Signature | Description |
| --- | --- | --- |
| `String` | `String(code int, s string) error` | Sends a plain text response |
| `HTML` | `HTML(code int, html string) error` | Sends a simple HTML string (use `Render` for dynamic templates) |
| `HTMLBlob` | `HTMLBlob(code int, b []byte) error` | Sends an HTML blob, handy for template engines that output `[]byte` |
| `JSON` | `JSON(code int, i any) error` | Encodes a Go value as JSON and sends it |
| `JSONPretty` | `JSONPretty(code int, i any, indent string) error` | Sends indented, pretty-printed JSON |
| `JSONBlob` | `JSONBlob(code int, b []byte) error` | Sends pre-encoded JSON bytes directly (e.g. from a database) |
| `JSONP` | `JSONP(code int, callback string, i any) error` | Encodes a value as JSON wrapped in a JSONP callback |
| `JSONPBlob` | `JSONPBlob(code int, callback string, b []byte) error` | Sends pre-encoded JSON as a JSONP payload |
| `XML` | `XML(code int, i any) error` | Encodes a Go value as XML and sends it |
| `XMLPretty` | `XMLPretty(code int, i any, indent string) error` | Sends indented, pretty-printed XML |
| `XMLBlob` | `XMLBlob(code int, b []byte) error` | Sends pre-encoded XML bytes directly |
| `Blob` | `Blob(code int, contentType string, b []byte) error` | Sends arbitrary bytes with a given content type |
| `Stream` | `Stream(code int, contentType string, r io.Reader) error` | Streams a response body from an `io.Reader` |
| `File` | `File(file string) error` | Serves a file from disk; sets content type and handles caching automatically |
| `FileFS` | `FileFS(file string, filesystem fs.FS) error` | Serves a file from a given `fs.FS` |
| `Attachment` | `Attachment(file, name string) error` | Like `File`, but sends `Content-Disposition: attachment` for download |
| `Inline` | `Inline(file, name string) error` | Like `File`, but sends `Content-Disposition: inline` |
| `NoContent` | `NoContent(code int) error` | Sends an empty body with the given status code |
| `Redirect` | `Redirect(code int, url string) error` | Redirects the request to `url` with the given status code |
| `Render` | `Render(code int, name string, data any) error` | Renders a registered template and sends a `text/html` response |

## Notes

- `Render` requires an `Echo#Renderer` to be registered first, e.g. `e.Renderer = &echo.TemplateRenderer{Template: tmpl}`, or a custom type implementing the `echo.Renderer` interface.
- Prefer `HTML`/`String` for static content and `Render` for templated/dynamic HTML.

## Related

- [Context (core)](./context.md)
- [Request Data](./request.md)
