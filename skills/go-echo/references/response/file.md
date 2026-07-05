# File

Sends the contents of a file as the response. Sets the correct content type and handles caching automatically.

## Signature / Usage

```go
Context#File(file string) error
```

```go
func(c *echo.Context) error {
	return c.File("<PATH_TO_YOUR_FILE>")
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| file | string | Path to the file to send, resolved against `Echo#Filesystem` |

## Notes

- For registering a route that always serves one specific file (e.g. an index page or favicon), use `Echo#File(path, file string)` — see [Static Files](./static-files.md).

## Related

- [Attachment](./attachment.md)
- [Inline](./inline.md)
- [Static Files](./static-files.md)
