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

## Notes

- Each customization point is independent; only override what you need, defaults apply otherwise.
- `IPExtractor` matters when Echo runs behind proxies/load balancers, for correct client IP resolution.

## Related

- [Quickstart](./quickstart.md)
- [Installation](./installation.md)
