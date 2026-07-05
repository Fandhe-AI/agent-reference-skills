# Bind

`Context#Bind` parses request data from four HTTP request components — path parameters, query parameters, headers, and the request body — into a struct using field tags to declare each source.

## Signature / Usage

```go
Context#Bind(i any) error
```

```go
type User struct {
  ID string `query:"id"`
}

var user User
if err := c.Bind(&user); err != nil {
  return c.String(http.StatusBadRequest, "bad request")
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `query` | tag | Binds from a query parameter |
| `param` | tag | Binds from a path parameter |
| `header` | tag | Binds from a header value |
| `form` | tag | Binds from form data (query + body) |
| `json` | tag | Binds from the request body (`encoding/json`) |
| `xml` | tag | Binds from the request body (`encoding/xml`) |

## Notes

- `query`, `param`, `header`, and `form` fields require an explicit tag; `json` and `xml` fall back to the struct field name when the tag is omitted.
- When a field declares multiple sources, binding is applied in this order and later sources overwrite earlier ones: path parameters → query parameters (GET/DELETE only) → request body.
- Don't bind directly into business/domain structs — use a dedicated DTO to avoid unintended field exposure (mass-assignment risk).
- `Bind` uses `Echo#Binder` internally; the default implementation is `echo.DefaultBinder`.

## Related

- [DefaultBinder](./default-binder.md)
- [Custom Binder](./custom-binder.md)
- [BindUnmarshaler](./bind-unmarshaler.md)
- [Validator](./validator.md)
- [Request Data](./request-data.md)
