# Validator

Echo has no built-in data validation. `Echo#Validator` registers a custom validator (typically wrapping a third-party library such as [go-playground/validator](https://github.com/go-playground/validator)), and `Context#Validate` invokes it on an already-bound struct.

## Signature / Usage

```go
type CustomValidator struct {
  validator *validator.Validate
}

func (cv *CustomValidator) Validate(i any) error {
  if err := cv.validator.Struct(i); err != nil {
    return echo.ErrBadRequest.Wrap(err)
  }
  return nil
}

type User struct {
  Name  string `json:"name" validate:"required"`
  Email string `json:"email" validate:"required,email"`
}

e.Validator = &CustomValidator{validator: validator.New()}
```

```go
func(c *echo.Context) error {
  u := new(User)
  if err := c.Bind(u); err != nil {
    return err
  }
  if err := c.Validate(u); err != nil {
    return err
  }
  return c.JSON(http.StatusOK, u)
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `Echo#Validator` | interface | Field on the `Echo` instance holding the registered validator implementation |
| `Validate(i any) error` | method | Interface method a custom validator must implement; called by `Context#Validate` |
| `Context#Validate(i any) error` | method | Invokes the registered `Echo#Validator` on the bound value |

## Notes

- Validation always runs after binding: bind the struct with `c.Bind()` first, then call `c.Validate()`.
- Without a registered `Echo#Validator`, `Context#Validate` returns an error since Echo does not validate by default.
- Wrapping validation errors with `echo.ErrBadRequest.Wrap(err)` produces a proper HTTP 400 response through Echo's error handling.

## Related

- [Bind](./bind.md)
- [../getting-started/customization.md](../getting-started/customization.md)
