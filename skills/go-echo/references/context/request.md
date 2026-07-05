# Request Data

Methods and generic helper functions for reading path parameters, query strings, form values, and cookies off the incoming request.

## Signature / Usage

```go
id := c.Param("id")
q := c.QueryParam("q")
name := c.FormValue("name")

age, err := echo.QueryParam[int](c, "age")
page, err := echo.QueryParamOr[int](c, "page", 1)
```

## Options / Props

| Name | Signature | Description |
| --- | --- | --- |
| `Param` | `Param(name string) string` | Returns a registered path parameter by name, or `""` if absent |
| `ParamOr` | `ParamOr(name, defaultValue string) string` | Like `Param` but returns `defaultValue` when the parameter is absent |
| `PathParam[T]` | `func PathParam[T any](c *Context, name string, opts ...any) (T, error)` | Type-safe path parameter parsing; returns `ErrNonExistentKey` if missing, zero value + `nil` if present but empty |
| `PathParamOr[T]` | `func PathParamOr[T any](c *Context, name string, defaultValue T, opts ...any) (T, error)` | Like `PathParam[T]` but returns `defaultValue` when missing/empty |
| `QueryParam` | `QueryParam(name string) string` | Returns a single query string value |
| `QueryParamOr` | `QueryParamOr(name, defaultValue string) string` | Like `QueryParam` with a fallback default |
| `QueryParams` | `QueryParams() url.Values` | Returns all query parameters |
| `QueryString` | `QueryString() string` | Returns the raw, unparsed query string |
| `QueryParam[T]` | `func QueryParam[T any](c *Context, key string, opts ...any) (T, error)` | Type-safe single query parameter parsing (see Notes for empty-value behavior) |
| `QueryParamOr[T]` | `func QueryParamOr[T any](c *Context, key string, defaultValue T, opts ...any) (T, error)` | Type-safe query parameter with default |
| `QueryParams[T]` | `func QueryParams[T any](c *Context, key string, opts ...any) ([]T, error)` | Type-safe parsing of all values for a repeated query key |
| `QueryParamsOr[T]` | `func QueryParamsOr[T any](c *Context, key string, defaultValue []T, opts ...any) ([]T, error)` | Like `QueryParams[T]` with a default slice |
| `FormValue` | `FormValue(name string) string` | Returns a form field from URL or body |
| `FormValueOr` | `FormValueOr(name, defaultValue string) string` | Like `FormValue` with a fallback default |
| `FormValues` | `FormValues() (url.Values, error)` | Returns all form values |
| `FormValue[T]` | `func FormValue[T any](c *Context, key string, opts ...any) (T, error)` | Type-safe form value parsing |
| `FormValueOr[T]` | `func FormValueOr[T any](c *Context, key string, defaultValue T, opts ...any) (T, error)` | Type-safe form value with default |
| `FormFile` | `FormFile(name string) (*multipart.FileHeader, error)` | Returns an uploaded multipart file by field name |
| `MultipartForm` | `MultipartForm() (*multipart.Form, error)` | Returns the parsed multipart form |
| `Cookie` | `Cookie(name string) (*http.Cookie, error)` | Returns a single request cookie by name |
| `Cookies` | `Cookies() []*http.Cookie` | Returns all request cookies |
| `SetCookie` | `SetCookie(cookie *http.Cookie)` | Adds a `Set-Cookie` header to the response |

## Notes

- Path, query, header, and form struct fields require an explicit tag (`param`, `query`, `header`, `form`) when used with `c.Bind()`; only JSON/XML fall back to the struct field name. See [binding.md](./binding.md).
- Generic helpers (`QueryParam[T]`, `FormValue[T]`, `PathParam[T]`, ...) share consistent empty-value semantics: a missing key returns `(zero, ErrNonExistentKey)`; a present-but-empty value returns `(zero, nil)`; an unparsable value returns `(zero, BindingError)`.
- Generic helpers support `bool`, `string`, all numeric types, `time.Duration`, `time.Time` (via `echo.TimeOpts`/`echo.TimeLayout`), and any type implementing `echo.BindUnmarshaler`, `encoding.TextUnmarshaler`, or `json.Unmarshaler`.
- Setting a cookie requires at minimum `Name` and `Value`; `Path`, `Domain`, `Expires`, `Secure`, `HttpOnly` are optional `http.Cookie` fields.

## Related

- [Context (core)](./context.md)
- [Binding & Validation](./binding.md)
- [Response Helpers](./response.md)
