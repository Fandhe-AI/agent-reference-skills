# Static

Serves static files from a configured root directory, with SPA and directory-listing support.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

e.Use(middleware.Static("/static")) // requests to /js/main.js -> static/js/main.js

// Custom configuration
e.Use(middleware.StaticWithConfig(middleware.StaticConfig{
  Root:   "static",
  Browse: true,
}))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Function to bypass middleware | `DefaultSkipper` |
| `Root` | `string` | Directory for static content, relative to `Filesystem` (required) | — |
| `Filesystem` | `fs.FS` | Filesystem access provider | `echo.Filesystem` |
| `Index` | `string` | Default file for directory requests | `"index.html"` |
| `HTML5` | `bool` | Forward unmatched requests to root, for SPA client-side routing | `false` |
| `Browse` | `bool` | Allow directory listing | `false` |
| `IgnoreBase` | `bool` | Prevent URL path duplication in filesystem paths | `false` |
| `EnablePathUnescaping` | `bool` | Unescapes the request path (or the wildcard param `*` on a wildcard route) before the file is looked up; also decodes encoded slashes | `false` |
| `DisablePathUnescaping` | `bool` | Deprecated: this field is ignored, use `EnablePathUnescaping` instead; will be removed in a future version. Previously the zero value (false) enabled unescaping, the unsafe default | `false` |
| `DirectoryListTemplate` | `string` | Custom HTML template for directory listings | Built-in template |

## Notes

- When applied under a non-root URL path, the middleware appends the URL path to the filesystem path by default; set `IgnoreBase: true` to disable this.
- Enable `HTML5: true` to serve single-page applications with client-side routing.
- Compatible with Go's `embed` package for bundled assets via `Filesystem`.
- Security in v5.4.0: files are resolved from the same form of the path that the router matched. File names requested with non-default escaping (such as `%2C`, `%40`, or lowercase hex) need `EnablePathUnescaping`. Paths containing `.`, `..`, or empty segments (for example `/assets//app.js`) return 404, but HTML5 mode still serves the index. Enabling path unescaping decodes encoded slashes too, so do not combine it with route-based access control for subdirectories.
- In v5.4.0, HTML5 mode serves the index for a router-level 404. A matched route's own 404 passes through.
- Caution: `e.Use(middleware.Static(...))` runs before route and group middleware, so route guards do not protect the files it serves. Keep protected files outside its root, or serve them with `Echo#Static` behind the guard.

## Related

- [proxy](./util-proxy.md)
- [middleware-overview](./middleware-overview.md)
