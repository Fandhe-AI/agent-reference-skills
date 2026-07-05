# Rewrite

Rewrites URL paths according to defined rules, for backward compatibility or cleaner routing. Must be registered via `Echo#Pre()` to run before routing.

## Signature / Usage

```go
import "github.com/labstack/echo/v5/middleware"

e.Pre(middleware.Rewrite(map[string]string{
  "/old":              "/new",
  "/api/*":            "/$1",
  "/js/*":             "/public/javascripts/$1",
  "/users/*/orders/*": "/user/$1/order/$2",
}))
```

## Options / Props

| Name | Type | Description | Default |
|------|------|--------------|---------|
| `Skipper` | `Skipper` | Function determining middleware bypass conditions | `DefaultSkipper` |
| `Rules` | `map[string]string` | Simple path rewrite rules with `*` captures | required |
| `RegexRules` | `map[*regexp.Regexp]string` | Regex-based rules using capture groups | optional |

Advanced example combining both rule types:

```go
e.Pre(middleware.RewriteWithConfig(middleware.RewriteConfig{
  Rules: map[string]string{
    "^/v1/*": "/v2/$1",
  },
  RegexRules: map[*regexp.Regexp]string{
    regexp.MustCompile("^/foo/([0-9].*)"):  "/num/$1",
    regexp.MustCompile("^/bar/(.+?)/(.*)"): "/baz/$2/$1",
  },
}))
```

## Notes

- Captured segments are referenced with `$1`, `$2`, etc.
- Each `*` is non-greedy (internally converted to `(.*?)`); a trailing `*` matches the remaining path.
- Must be registered via `Echo#Pre()` so rewriting happens before the router matches the path.

## Related

- [request-id](./util-request-id.md)
- [secure](./security-secure.md)
- [middleware-overview](./middleware-overview.md)
