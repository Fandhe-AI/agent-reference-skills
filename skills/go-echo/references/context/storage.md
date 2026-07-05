# Per-Request Storage & Custom Context

`Context` provides a simple key/value store scoped to the current request, used to pass data between middleware and handlers, plus a generic accessor for type-safe reads.

## Signature / Usage

```go
// middleware
c.Set("user", u)

// handler
u, err := echo.ContextGet[*User](c, "user")
if err != nil {
    return err
}
```

## Options / Props

| Name | Signature | Description |
| --- | --- | --- |
| `Set` | `Set(key string, val any)` | Saves a value in the context store |
| `Get` | `Get(key string) any` | Retrieves a value from the context store; returns untyped `nil` if the key does not exist (distinct from a stored typed nil, e.g. `[]byte(nil)`) |
| `ContextGet[T]` | `func ContextGet[T any](c *Context, key string) (T, error)` | Type-safe retrieval; returns `ErrNonExistentKey` if the key is missing, `ErrInvalidKeyType` if the stored value cannot be cast to `T` |

## Notes

- In Echo v5, `Context` is a concrete struct, not the interface it was in Echo v4. The v4 pattern of defining a custom struct that embeds `echo.Context` (adding methods like `Foo()`/`Bar()`) and wrapping it via middleware does not apply to this version.
- The supported way to attach request-scoped custom data is `c.Set(key, val)` / `c.Get(key)`, or `echo.ContextGet[T](c, key)` for a typed, error-checked read.
- Because `Context` instances are pooled and reset after each request, values stored via `Set` must not be relied upon outside the request's lifetime.

## Related

- [Context (core)](./context.md)
- [Request Data](./request.md)
