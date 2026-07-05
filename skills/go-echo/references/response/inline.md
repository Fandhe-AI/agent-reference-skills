# Inline

Similar to `File()`, but includes a `Content-Disposition: inline` header with the given filename, so browsers render the file (e.g. images, PDFs) instead of downloading it.

## Signature / Usage

```go
Context#Inline(file, name string) error
```

```go
func(c *echo.Context) error {
	return c.Inline("<PATH_TO_YOUR_FILE>", "<INLINE_NAME>")
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| file | string | Path to the file to send |
| name | string | Filename presented to the client in the `Content-Disposition` header |

## Related

- [Attachment](./attachment.md)
- [File](./file.md)
