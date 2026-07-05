# Match Types

The router supports three path-matching patterns with a fixed priority order, so more specific routes always win over more general ones regardless of registration order.

## Signature / Usage

```go
e.GET("/users/profile", profileHandler) // static
e.GET("/users/:id", getUser)            // param
e.GET("/static/*", serveFiles)          // wildcard
```

## Options / Props

| Pattern | Type | Example match |
| --- | --- | --- |
| `/users/profile` | Static | `/users/profile` |
| `/users/:id` | Param | `/users/42` |
| `/static/*` | Wildcard | `/static/css/app.css` |

## Notes

- Priority is static -> param -> wildcard, so `/users/profile` always wins over `/users/:id`, which wins over `/users/*`.
- The router is a radix tree with zero dynamic memory allocation, so this prioritization has no runtime lookup cost.

## Related

- [Path Parameters](./path-parameters.md)
- [Route Registration](./route-registration.md)
