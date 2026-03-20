# routes.ts

Required configuration file that maps URL patterns to route module files. The default export must satisfy `RouteConfig`.

## Signature / Usage

```typescript
import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./home.tsx"),
  route("about", "./about.tsx"),

  layout("./auth/layout.tsx", [
    route("login", "./auth/login.tsx"),
    route("register", "./auth/register.tsx"),
  ]),

  ...prefix("concerts", [
    index("./concerts/home.tsx"),
    route(":city", "./concerts/city.tsx"),
  ]),
] satisfies RouteConfig;
```

## Route Helper Functions

| Helper | Signature | Description |
|--------|-----------|-------------|
| `route` | `(pattern, moduleFile, children?)` | Route with a URL pattern |
| `index` | `(moduleFile)` | Index route rendered at the parent URL |
| `layout` | `(moduleFile, children)` | Layout route (adds nesting without a URL segment) |
| `prefix` | `(pathPrefix, routes)` | Adds a path prefix without introducing a parent route. Use with spread (`...prefix(...)`) |
| `relative` | `(directory)` | Returns helpers that resolve module paths relative to `directory` |

## Options / Props

### `route(pattern, moduleFile, children?)`

| Param | Type | Description |
|-------|------|-------------|
| `pattern` | `string` | URL pattern. Supports `:param`, `:param?`, `*` (splat) |
| `moduleFile` | `string` | Path to the route module file |
| `children` | `RouteConfig[]` | Optional nested routes |

### URL Pattern Syntax

| Pattern | Example | Matches |
|---------|---------|---------|
| Static | `"about"` | `/about` |
| Dynamic segment | `"teams/:teamId"` | `/teams/abc` |
| Optional segment | `":lang?/categories"` | `/en/categories` or `/categories` |
| Splat (catch-all) | `"files/*"` | `/files/a/b/c` |

## File-System Routing Alternative

```typescript
import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default flatRoutes() satisfies RouteConfig;
```

## Notes

- `index` routes cannot have children.
- `prefix` does not create a layout boundary — children are siblings that share a path prefix only.
- Children render through `<Outlet />` in the parent route module.
- Splat params are accessed via `params["*"]`.

## Related

- [root.tsx](./root-tsx.md)
- [react-router.config.ts](./react-router-config-ts.md)
