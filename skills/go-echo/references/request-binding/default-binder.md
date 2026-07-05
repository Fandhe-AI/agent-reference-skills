# DefaultBinder

`echo.DefaultBinder` is the built-in `Echo#Binder` implementation used by `Context#Bind`. It also exposes standalone functions to bind a single source (body, query, path, or headers) without pulling in the other sources.

## Signature / Usage

```go
echo.BindBody(c, &payload)
echo.BindQueryParams(c, &payload)
echo.BindPathValues(c, &payload)
echo.BindHeaders(c, &payload)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `echo.BindBody` | `func(c *echo.Context, i any) error` | Binds only the request body (`json`/`xml` tags) |
| `echo.BindQueryParams` | `func(c *echo.Context, i any) error` | Binds only query parameters (`query` tags) |
| `echo.BindPathValues` | `func(c *echo.Context, i any) error` | Binds only path parameters (`param` tags) |
| `echo.BindHeaders` | `func(c *echo.Context, i any) error` | Binds only header values (`header` tags) |

## Notes

- Use these functions when you need to bind from a single source explicitly instead of the combined precedence order applied by `Context#Bind`.
- `echo.DefaultBinder` is assigned to `Echo#Binder` by default; a custom binder can wrap it to add or replace behavior.

## Related

- [Bind](./bind.md)
- [Custom Binder](./custom-binder.md)
- [Fluent Binder](./fluent-binder.md)
