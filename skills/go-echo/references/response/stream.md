# Stream

Sends an arbitrary data stream with a given content type, `io.Reader`, and status code.

## Signature / Usage

```go
Context#Stream(code int, contentType string, r io.Reader) error
```

```go
func(c *echo.Context) error {
	f, err := os.Open("<PATH_TO_IMAGE>")
	if err != nil {
		return err
	}
	defer f.Close()
	return c.Stream(http.StatusOK, "image/png", f)
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| code | int | HTTP status code to send |
| contentType | string | MIME type of the stream, e.g. `image/png` |
| r | io.Reader | Source to copy into the response body |

## Related

- [Blob](./blob.md)
- [File](./file.md)
