# Static Routes (Overview)

Beyond dynamic handlers, `Echo`/`Group` can register routes that serve files directly from a filesystem (`Static`, `StaticFS`) or a single file (`File`), instead of invoking a handler function.

## Signature / Usage

```go
func (e *Echo) Static(pathPrefix, fsRoot string, middleware ...MiddlewareFunc) RouteInfo
func (e *Echo) StaticFS(pathPrefix string, filesystem fs.FS, middleware ...MiddlewareFunc) RouteInfo
func (e *Echo) File(path, file string, middleware ...MiddlewareFunc) RouteInfo
```

```go
e := echo.New()
e.Static("/static", "assets") // /static/js/main.js -> assets/js/main.js
```

## Notes

- These registrations participate in the same radix-tree routing and match-type priority as regular routes (see [Match Types](./match-types.md)).
- Since v5.4.0, paths with `.`, `..` or empty segments return 404, and non-default escaping in file names needs `Config.EnablePathUnescapingStaticFiles`; see [Static Files](../response/static-files.md).
- Full options, embedded-filesystem usage (`StaticFS` with `echo.MustSubFS`), and the `Echo#Filesystem` default are documented in [Static Files](../response/static-files.md).

## Related

- [Static Files](../response/static-files.md)
- [Match Types](./match-types.md)
- [Groups](./groups.md)
