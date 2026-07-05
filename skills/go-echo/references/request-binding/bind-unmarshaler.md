# BindUnmarshaler

`echo.BindUnmarshaler` is an interface a custom type can implement so that `Context#Bind` and related binder functions know how to parse it from a raw string value (path, query, form, or header).

## Signature / Usage

```go
type Timestamp time.Time

func (t *Timestamp) UnmarshalParam(src string) error {
  ts, err := time.Parse(time.RFC3339, src)
  if err != nil {
    return err
  }
  *t = Timestamp(ts)
  return nil
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `UnmarshalParam(src string) error` | method | Parses the raw string parameter value into the receiver type |

## Notes

- Implement this on custom types (e.g. domain-specific value types) used as fields in a struct bound via `Context#Bind`.
- Only applies to string-sourced values (path, query, form, header) — JSON/XML body fields use `encoding/json` and `encoding/xml` instead.

## Related

- [Bind](./bind.md)
- [Request Data](./request-data.md)
