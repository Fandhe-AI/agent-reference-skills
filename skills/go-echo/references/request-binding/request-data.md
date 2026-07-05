# Request Data

`echo.Context` exposes individual accessors for form values, query parameters, and path parameters, in addition to struct-based binding via `Context#Bind`.

## Signature / Usage

```go
name := c.FormValue("name")
age, err := echo.FormValue[int](c, "age")

name := c.QueryParam("name")
age, err := echo.QueryParam[int](c, "age")

name := c.Param("name") // from a route like /users/:name
id, err := echo.PathParam[int](c, "id")
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Context#FormValue(name string) string` | method | Reads a form field as a string |
| `echo.FormValue[T](c, name string) (T, error)` | generic func | Reads a form field and converts it to type `T` |
| `Context#QueryParam(name string) string` | method | Reads a query parameter as a string |
| `echo.QueryParam[T](c, name string) (T, error)` | generic func | Reads a query parameter and converts it to type `T` |
| `Context#Param(name string) string` | method | Reads a path parameter as a string |
| `echo.PathParam[T](c, name string) (T, error)` | generic func | Reads a path parameter and converts it to type `T` |

## Notes

- Custom types can implement `echo.BindUnmarshaler` so the generic accessors and struct binding know how to parse them.
- Use the generic `[T]` functions when a typed value (not a string) is needed without defining a full struct.

## Related

- [Bind](./bind.md)
- [BindUnmarshaler](./bind-unmarshaler.md)
- [Fluent Binder](./fluent-binder.md)
- [Validator](./validator.md)
