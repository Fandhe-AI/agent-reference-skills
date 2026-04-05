# Combine Middleware

Utility functions for composing multiple middleware with logical conditions: `some` (OR), `every` (AND), `except` (NOT).

## Signature / Usage

```ts
import { some, every, except } from 'hono/combine'

// Run the first middleware that succeeds (OR)
app.use('/api/*', some(bearerAuth({ token }), myRateLimit({ limit: 100 })))

// Run all middleware; stop if any fails (AND)
app.use('/api/*', every(bearerAuth({ token }), myRateLimit({ limit: 100 })))

// Skip middleware for matching paths
app.use('/api/*', except('/api/public/*', bearerAuth({ token })))
```

## Functions

| Function | Behavior |
|----------|----------|
| `some(...middleware)` | Runs middleware in order; stops after the first one that does not throw |
| `every(...middleware)` | Runs all middleware; stops and throws if any one fails |
| `except(condition, ...middleware)` | Applies middleware to all requests except those matching the condition |

## Options / Props for `except`

| Name | Type | Description |
|------|------|-------------|
| `condition` | `string \| string[] \| (c) => boolean` | Path pattern(s) or function. Middleware is skipped when condition matches. |

## Notes

- `some` and `every` can be nested together for complex conditional access control.
- `except` path patterns support wildcards (e.g. `'/api/public/*'`).

## Related

- [Basic Auth](./basic-auth.md)
- [Bearer Auth](./bearer-auth.md)
- [IP Restriction](./ip-restriction.md)
