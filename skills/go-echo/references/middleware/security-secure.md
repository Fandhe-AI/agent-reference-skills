# Secure

Sets common security-related HTTP response headers to protect against XSS, content-type sniffing, clickjacking, insecure connections, and code injection.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

// Basic usage
e.Use(middleware.Secure())

// Custom configuration
e.Use(middleware.SecureWithConfig(middleware.SecureConfig{
  XSSProtection:         "",
  ContentTypeNosniff:    "",
  XFrameOptions:         "",
  HSTSMaxAge:            3600,
  ContentSecurityPolicy: "default-src 'self'",
}))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Function to skip middleware execution | `DefaultSkipper` |
| `XSSProtection` | `string` | `X-XSS-Protection` header value | `"1; mode=block"` |
| `ContentTypeNosniff` | `string` | `X-Content-Type-Options` header value | `"nosniff"` |
| `XFrameOptions` | `string` | `X-Frame-Options` value (`SAMEORIGIN`, `DENY`, `ALLOW-FROM uri`) | `"SAMEORIGIN"` |
| `HSTSMaxAge` | `int` | `Strict-Transport-Security` duration in seconds | `0` |
| `HSTSExcludeSubdomains` | `bool` | Excludes subdomains from HSTS policy | `false` |
| `ContentSecurityPolicy` | `string` | `Content-Security-Policy` header value | `""` |
| `CSPReportOnly` | `bool` | Uses report-only CSP header variant | `false` |
| `HSTSPreloadEnabled` | `bool` | Includes preload tag for HSTS preload list | `false` |
| `ReferrerPolicy` | `string` | `Referrer-Policy` header value | `""` |

## Notes

- Setting any protection option to an empty string disables that specific protection.

## Related

- [cors](./security-cors.md)
- [csrf](./security-csrf.md)
