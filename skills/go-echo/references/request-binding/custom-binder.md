# Custom Binder

`Echo#Binder` can be replaced with a custom implementation to extend or override the default binding logic used by `Context#Bind`.

## Signature / Usage

```go
type CustomBinder struct{}

func (cb *CustomBinder) Bind(c *echo.Context, i any) error {
  db := new(echo.DefaultBinder)
  if err := db.Bind(c, i); err != echo.ErrUnsupportedMediaType {
    return err
  }
  // custom logic here
  return nil
}

e.Binder = &CustomBinder{}
```

## Notes

- Delegate to `echo.DefaultBinder` first and only add custom handling for cases the default binder does not cover (e.g. `echo.ErrUnsupportedMediaType`).
- Register the custom binder once on the `Echo` instance via `e.Binder`; it applies to every `Context#Bind` call.

## Related

- [Bind](./bind.md)
- [DefaultBinder](./default-binder.md)
- [../getting-started/customization.md](../getting-started/customization.md)
