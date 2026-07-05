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
| `DisablePathUnescaping` | `bool` | Skip path parameter unescaping | `false` |
| `DirectoryListTemplate` | `string` | Custom HTML template for directory listings | Built-in template |

## Notes

- When applied under a non-root URL path, the middleware appends the URL path to the filesystem path by default; set `IgnoreBase: true` to disable this.
- Enable `HTML5: true` to serve single-page applications with client-side routing.
- Compatible with Go's `embed` package for bundled assets via `Filesystem`.

## Related

- [proxy](./util-proxy.md)
- [middleware-overview](./middleware-overview.md)
