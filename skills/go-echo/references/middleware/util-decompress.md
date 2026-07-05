# Decompress

Automatically decompresses HTTP request bodies when `Content-Encoding: gzip` is set.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

e.Use(middleware.Decompress())

// Custom configuration
e.Use(middleware.DecompressWithConfig(middleware.DecompressConfig{
  Skipper: middleware.DefaultSkipper,
}))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Function defining when to bypass middleware | `DefaultSkipper` |
| `GzipDecompressPool` | `Decompressor` | `sync.Pool` for creating/storing gzip readers | `&DefaultGzipDecompressPool{}` |
| `MaxDecompressedSize` | `int64` | Maximum allowed decompressed body size in bytes; returns `413` if exceeded (prevents zip-bomb attacks) | `104857600` (100 MB) |

## Notes

- Decompressed bodies are held in memory until garbage collection.
- Set `MaxDecompressedSize` to `-1` to disable the limit (not recommended).

## Related

- [gzip](./util-gzip.md)
- [csrf](./security-csrf.md)
