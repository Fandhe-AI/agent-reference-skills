# Gzip

Compresses the HTTP response body using the gzip compression scheme.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

e.Use(middleware.Gzip())

// Custom configuration
e.Use(middleware.GzipWithConfig(middleware.GzipConfig{
  Level: 5,
}))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Determines which requests bypass compression | `DefaultSkipper` |
| `Level` | `int` | Compression level | `-1` |
| `MinLength` | `int` | Response size threshold below which compression is skipped | `0` |

## Notes

- Compressing a short response can increase transmitted data due to gzip format overhead; tune `MinLength` accordingly.
- Use `Skipper` to exclude routes (e.g. metrics endpoints) that shouldn't be compressed.

## Related

- [decompress](./util-decompress.md)
