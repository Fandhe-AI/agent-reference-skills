# JWT

JSON Web Token authentication middleware, distributed as a separate module (`echo-jwt`) rather than Echo core.

## Signature / Usage

```go
import echojwt "github.com/labstack/echo-jwt/v5"

// Basic usage
e.Use(echojwt.JWT([]byte("secret")))

// With custom configuration
e.Use(echojwt.WithConfig(echojwt.Config{
  SigningKey: []byte("secret"),
}))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `middleware.Skipper` | Function to skip middleware | — |
| `BeforeFunc` | `middleware.BeforeFunc` | Executed before middleware | — |
| `SuccessHandler` | `func(*echo.Context) error` | Handles valid tokens | — |
| `ErrorHandler` | `func(*echo.Context, error) error` | Handles validation failures | — |
| `ContinueOnIgnoredError` | `bool` | Continue chain when `ErrorHandler` returns `nil` | `false` |
| `ContextKey` | `string` | Key for storing user info in context | `"user"` |
| `SigningKey` | `any` | Key for token validation (one of `SigningKey`/`SigningKeys`/`KeyFunc` required) | — |
| `SigningKeys` | `map[string]any` | Key map keyed by JWT `kid` field | — |
| `SigningMethod` | `string` | Algorithm used for verification | `"HS256"` |
| `KeyFunc` | `jwt.Keyfunc` | Custom key provider for externally issued tokens | — |
| `TokenLookup` | `string` | Extraction pattern, e.g. `header:Authorization:Bearer` | `"header:Authorization"` |
| `TokenLookupFuncs` | `[]middleware.ValuesExtractor` | Custom token extractors | — |
| `ParseTokenFunc` | function | Parses the auth string into a token | Default JWT implementation |
| `NewClaimsFunc` | function | Claims factory defining token content structure | `jwt.MapClaims` |

## Notes

- Valid tokens set the user in context and call the next handler; invalid tokens return `401 Unauthorized`; missing/malformed `Authorization` headers return `400 Bad Request`.
- Requires the separate module `github.com/labstack/echo-jwt`.

## Related

- [basic-auth](./auth-basic-auth.md)
- [key-auth](./auth-key-auth.md)
