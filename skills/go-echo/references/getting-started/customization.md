# Customization

The `Echo` instance exposes several fields that let you replace default behaviors (logging, validation, binding, serialization, rendering, error handling, IP resolution) with custom implementations.

## Signature / Usage

```go
e := echo.New()
e.Logger = slog.New(slog.NewJSONHandler(os.Stdout, nil))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Echo#Logger` | `*slog.Logger` | Structured logger; default emits JSON to `os.Stdout`. Accepts any `slog` handler |
| `Echo#Validator` | interface | Registers a validator for request payload validation |
| `Echo#Binder` | interface | Registers a custom binder for binding request payloads |
| `Echo#JSONSerializer` | interface | Registers a custom JSON serializer (see `json.go`) |
| `Echo#Renderer` | interface | Registers a renderer for template rendering |
| `Echo#HTTPErrorHandler` | `func` | Registers a custom HTTP error handler |
| `Echo#OnAddRoute` | callback | Invoked whenever a new route is added to the router |
| `Echo#IPExtractor` | `func` | Controls how the real client IP address is resolved |
| `Echo#SchemeExtractor` / `Config.SchemeExtractor` | `SchemeExtractor` | (v5.4.0) Strategy for determining the request scheme (`http` or `https`), important behind proxies or load balancers that terminate TLS. Used by `Context#Scheme` and by the HTTPS redirect, Secure and Proxy middlewares. If not set, forwarding headers such as `X-Forwarded-Proto` are trusted only from loopback, link-local and private network addresses and unix sockets |
| `Config.EnablePathUnescapingStaticFiles` | `bool` | (v5.3.0) Enables path parameter (`*`) unescaping for `Echo.Static`, `Echo.StaticFS`, `Group.Static`, `Group.StaticFS`. Default `false` (safe): encoded slashes (`%2f`) are not decoded, preventing ACL bypass of route guards. Set to `true` only when serving files whose names contain URL-encoded characters and you do not rely on route-based ACL guards |
| `Config.NoGroupAutoRegister404Routes` | `bool` | (v5.3.0) When `true`, `echo.Group` does NOT automatically register 404 routes when middlewares are registered on the group. Make sure all your middlewares (for example CORS) still execute as expected |

## Notes

- Each customization point is independent; only override what you need, defaults apply otherwise.
- `IPExtractor` matters when Echo runs behind proxies/load balancers, for correct client IP resolution.

## Related

- [Quickstart](./quickstart.md)
- [Installation](./installation.md)
