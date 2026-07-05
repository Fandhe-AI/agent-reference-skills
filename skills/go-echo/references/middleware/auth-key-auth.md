# KeyAuth

Authenticates requests using an API key extracted from a configurable source (header, query, form, or cookie).

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

e.Use(middleware.KeyAuth(func(c *echo.Context, key string, source middleware.ExtractorSource) (bool, error) {
  return key == "valid-key", nil
}))

// Custom lookup source
e.Use(middleware.KeyAuthWithConfig(middleware.KeyAuthConfig{
  KeyLookup: "query:api-key",
  Validator: func(c *echo.Context, key string, source middleware.ExtractorSource) (bool, error) {
    return key == "valid-key", nil
  },
}))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Function to skip middleware execution | `DefaultSkipper` |
| `KeyLookup` | `string` | Extraction pattern `<source>:<name>[:<prefix>]`. Sources: `header`, `query`, `form`, `cookie`. Multiple sources can be comma-separated | `"header:Authorization:Bearer "` |
| `AllowedCheckLimit` | `uint` | Maximum number of `KeyLookup` values to check | — |
| `Validator` | `KeyAuthValidator` | Key validation function (required) | — |
| `ErrorHandler` | `KeyAuthErrorHandler` | Custom error handling function | — |
| `ContinueOnIgnoredError` | `bool` | Continue the chain when `ErrorHandler` returns `nil` | `false` |

## Notes

- Missing keys return `400 Bad Request`; invalid keys return `401 Unauthorized`.
- `KeyLookup` supports combining multiple sources, e.g. `"header:Authorization,header:X-Api-Key"`.

## Related

- [basic-auth](./auth-basic-auth.md)
- [jwt](./auth-jwt.md)
- [rate-limiter](./util-rate-limiter.md)
