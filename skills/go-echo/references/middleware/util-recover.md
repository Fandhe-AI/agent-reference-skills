# Recover

Catches panics anywhere in the middleware chain, prints the stack trace, and forwards control to the centralized `HTTPErrorHandler`.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

e.Use(middleware.Recover())

// Custom configuration
e.Use(middleware.RecoverWithConfig(middleware.RecoverConfig{
  StackSize: 1 << 10, // 1 KB
}))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Function to skip middleware | `DefaultSkipper` |
| `StackSize` | `int` | Size of the stack to print | `4096` (4 KB) |
| `DisableStackAll` | `bool` | Disables formatting stack traces of all other goroutines after the current one | `false` |
| `DisablePrintStack` | `bool` | Disables printing the stack trace | `false` |

## Notes

- Should typically be registered early with `e.Use()` so it wraps as much of the chain as possible.

## Related

- [rate-limiter](./util-rate-limiter.md)
- [middleware-overview](./middleware-overview.md)
