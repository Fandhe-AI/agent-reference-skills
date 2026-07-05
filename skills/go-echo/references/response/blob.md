# Blob

Sends arbitrary data with a given content type and status code.

## Signature / Usage

```go
Context#Blob(code int, contentType string, b []byte) error
```

```go
func(c *echo.Context) error {
	data := []byte(`0306703,0035866,NO_ACTION,06/19/20060086003`)
	return c.Blob(http.StatusOK, "text/csv", data)
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| code | int | HTTP status code to send |
| contentType | string | MIME type of the payload, e.g. `text/csv` |
| b | []byte | Raw data to send |

## Related

- [Stream](./stream.md)
- [JSON](./json.md)
