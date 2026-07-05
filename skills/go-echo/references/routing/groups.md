# Groups

Route grouping consolidates related endpoints under a shared path prefix and shared middleware. Groups can be nested to compose larger route trees, and inherit their parent's middleware in addition to their own.

## Signature / Usage

```go
func (e *Echo) Group(prefix string, m ...MiddlewareFunc) (g *Group)
func (g *Group) Group(prefix string, m ...MiddlewareFunc) (sg *Group)
```

```go
admin := e.Group("/admin", middleware.BasicAuth(authFn))
admin.GET("/metrics", metrics)  // -> /admin/metrics
admin.GET("/users", listUsers)  // -> /admin/users

// nested group
reports := admin.Group("/reports")
reports.GET("/daily", dailyReport) // -> /admin/reports/daily
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| prefix | string | Path prefix prepended to every route registered on the group |
| m | ...MiddlewareFunc | Middleware applied to every route in the group (and inherited by nested groups) |

## Notes

- `Group` exposes the same registration methods as `Echo` (`GET`, `POST`, `Any`, `Match`, `Add`, `Static`, `StaticFS`, `Use`, ...), scoped to the group's prefix.
- Nested groups inherit the parent group's middleware in addition to their own.
- `Use(middleware...)` adds middleware to a group after creation.

## Related

- [Route Registration](./route-registration.md)
- [HTTP Method Registration (Any / Match)](./any-match.md)
