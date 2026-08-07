# Testing Handlers & Middleware

Echo handlers and middleware are plain Go functions, so they can be tested with the standard `net/http/httptest` package. Echo also ships an `echotest` helper package that reduces the request/context/recorder boilerplate.

## Signature / Usage

```go
import (
    "net/http/httptest"
    "net/http"
    "testing"

    "github.com/labstack/echo/v5"
)

func TestGetUser(t *testing.T) {
    e := echo.New()
    req := httptest.NewRequest(http.MethodGet, "/users/jon@labstack.com", nil)
    rec := httptest.NewRecorder()
    c := e.NewContext(req, rec)
    c.SetPathValue("email", "jon@labstack.com")

    if assert.NoError(t, GetUser(c)) {
        assert.Equal(t, http.StatusOK, rec.Code)
    }
}
```

```go
// Using echotest.ContextConfig to reduce boilerplate
cfg := echotest.ContextConfig{
    Method:     http.MethodGet,
    Target:     "/users/:email",
    PathValues: map[string]string{"email": "jon@labstack.com"},
}
c, rec := cfg.ToContextRecorder(t)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `echotest.ContextConfig.Method` | `string` | HTTP method to simulate |
| `echotest.ContextConfig.Target` | `string` | Request target/URL, including registered path parameters |
| `echotest.ContextConfig.JSONBody` | `any` | Value marshaled to JSON and set as the request body |
| `echotest.ContextConfig.MultipartForm` | struct | Configures multipart fields and files for file-upload tests |
| `echotest.ContextConfig.PathValues` | `map[string]string` | Sets URL path parameters directly, bypassing the router |
| `echotest.ContextConfig.Headers` | `http.Header` | Request headers to attach |
| `ContextConfig#ToContextRecorder(t)` | method | Returns a ready `*echo.Context` and `*httptest.ResponseRecorder` built from the config |
| `ContextConfig#ServeWithHandler(t, handler)` | method | Builds the context/recorder and invokes the handler in one call |

## Notes

- Query parameters are not a dedicated `ContextConfig` field; encode them into `Target` using `net/url.Values`.
- Middleware tests follow the same pattern: wrap a handler, invoke it through the middleware, and assert both the response and any values the middleware set on the context (e.g. via `c.Set`).
- The Echo repository's own middleware test files are a further source of examples for this pattern.

## Related

- [Context (core)](../context/context.md)
- [Per-Request Storage & Custom Context](../context/storage.md)
