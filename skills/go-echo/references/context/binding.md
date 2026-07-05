# Binding & Validation

`c.Bind()` parses request data (path params, query params, headers, and body) into a Go struct. `c.Validate()` runs a registered validator over bound data. Standalone `Bind*` functions bind a single source only.

## Signature / Usage

```go
type CreateUser struct {
    ID   int    `param:"id"`
    Name string `json:"name"`
    Page int    `query:"page"`
}

func Create(c *echo.Context) error {
    u := new(CreateUser)
    if err := c.Bind(u); err != nil {
        return err
    }
    if err := c.Validate(u); err != nil {
        return err
    }
    return c.JSON(http.StatusCreated, u)
}
```

## Options / Props

| Name | Signature | Description |
| --- | --- | --- |
| `Bind` | `Bind(i any) error` | Binds path params, query params, and the request body into `i`; the body decoder is chosen from the `Content-Type` header (`application/json`, `application/xml`, `application/x-www-form-urlencoded`) |
| `Validate` | `Validate(i any) error` | Runs `i` through the validator registered on `Echo#Validator` |
| `BindBody` | `func BindBody(c *Context, target any) (err error)` | Binds only the request body; form binding follows the standard library's URL+body form parsing rules |
| `BindQueryParams` | `func BindQueryParams(c *Context, target any) error` | Binds only query parameters |
| `BindPathValues` | `func BindPathValues(c *Context, target any) error` | Binds only path parameter values |
| `BindHeaders` | `func BindHeaders(c *Context, target any) error` | Binds only HTTP headers |

### Struct tags

| Tag | Source |
| --- | --- |
| `param` | Path parameter |
| `query` | Query parameter |
| `header` | Header value |
| `form` | Form data |
| `json` | Request body (JSON) |
| `xml` | Request body (XML) |

## Notes

- `param`, `query`, `header`, and `form` fields require an explicit struct tag; `json`/`xml` fields fall back to the struct field name when untagged.
- Binding precedence when multiple sources supply the same field: path parameters, then query parameters (GET/DELETE only), then request body.
- Register a custom decoder via the `Echo#Binder` interface to override default binding logic.
- Avoid binding directly into business/domain structs; bind into a dedicated DTO to prevent unintended field assignment (mass-assignment risk).

## Related

- [Request Data](./request.md)
- [Context (core)](./context.md)
