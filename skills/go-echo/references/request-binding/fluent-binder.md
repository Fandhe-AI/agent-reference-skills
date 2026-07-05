# Fluent Binder

`echo.QueryParamsBinder` provides a type-safe, chainable API for binding query parameters directly into variables without declaring a struct.

## Signature / Usage

```go
var opts struct {
  IDs    []int64
  Active bool
}
length := int64(50)

err := echo.QueryParamsBinder(c).
  Int64("length", &length).
  Int64s("id", &opts.IDs).
  Bool("active", &opts.Active).
  BindError()
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Int64(name, *int64)` | method | Binds a single query parameter to an `int64` |
| `Int64s(name, *[]int64)` | method | Binds a repeated query parameter to a slice of `int64` |
| `Bool(name, *bool)` | method | Binds a single query parameter to a `bool` |
| `MustInt64` / `MustTypes` variants | method | Same as above but treat a missing/invalid parameter as an error immediately |
| `BindError()` | method | Terminates the chain and returns the first binding error, if any |

## Notes

- Useful when only a handful of query parameters need typed extraction and defining a full struct with tags is unnecessary.
- Chain calls are lazily evaluated; `BindError()` must be called to obtain the accumulated error.

## Related

- [Bind](./bind.md)
- [DefaultBinder](./default-binder.md)
- [Request Data](./request-data.md)
