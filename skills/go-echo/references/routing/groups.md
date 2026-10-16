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
- Sub-group prefixes are concatenated with the parent's prefix without inserting a slash: a parent prefix of `/v1` and a sub-group prefix of `/admin` form `/v1/admin` (group.go doc comment, v5.4.0).
- v5.3.0 reverted to the v4 behavior where a Group registers implicit 404 (`/*`) routes for itself, so group middleware also runs when there is no exact route match (for example on unmatched paths). To opt out, create Echo with `echo.NewWithConfig(echo.Config{NoGroupAutoRegister404Routes: true})`; then make sure all your middlewares (for example CORS) still execute as expected.

## Related

- [Route Registration](./route-registration.md)
- [HTTP Method Registration (Any / Match)](./any-match.md)
