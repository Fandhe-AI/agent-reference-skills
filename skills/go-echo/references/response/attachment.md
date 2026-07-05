# Attachment

Similar to `File()`, but includes a `Content-Disposition: attachment` header with the given filename, prompting the browser to download the file.

## Signature / Usage

```go
Context#Attachment(file, name string) error
```

```go
func(c *echo.Context) error {
	return c.Attachment("<PATH_TO_YOUR_FILE>", "<ATTACHMENT_NAME>")
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| file | string | Path to the file to send |
| name | string | Filename presented to the client in the `Content-Disposition` header |

## Related

- [Inline](./inline.md)
- [File](./file.md)
