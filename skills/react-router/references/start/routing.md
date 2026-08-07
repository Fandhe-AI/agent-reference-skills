# Routing

Routes are declared in `app/routes.ts`. Each route pairs a URL pattern with a route module file.

## Signature / Usage

```typescript
import { type RouteConfig, route, index, layout, prefix } from "@react-router/dev/routes";

export default [
  index("./home.tsx"),
  route("about", "./about.tsx"),
  route("teams/:teamId", "./team.tsx"),
] satisfies RouteConfig;
```

### `route(pattern, moduleFile, children?)`

Creates a route from a URL pattern and a module file.

### `index(moduleFile)`

An index route that renders at the parent's URL. Cannot have children.

### `layout(moduleFile, children)`

A layout route that nests children without adding a URL segment.

```typescript
layout("./auth/layout.tsx", [
  route("login", "./auth/login.tsx"),
  route("register", "./auth/register.tsx"),
])
```

### `prefix(pathPrefix, routes)`

Adds a URL prefix to a set of routes. Returns an array, so spread it (`...prefix(...)`).

```typescript
...prefix("projects", [
  index("./projects/home.tsx"),
  route(":id", "./projects/detail.tsx"),
])
```

### Dynamic segments

```typescript
route("teams/:teamId", "./team.tsx")
// accessible as params.teamId in loader/action
```

### Optional segments

```typescript
route(":lang?/categories", "./categories.tsx")
```

### Splat routes (catchall)

```typescript
route("files/*", "./files.tsx")
// params["*"] holds the remaining path
```

### Nesting

Child routes render inside the parent component's `<Outlet />`.

```typescript
route("dashboard", "./dashboard.tsx", [
  index("./home.tsx"),
  route("settings", "./settings.tsx"),
])
```

### File-based routing

```typescript
import { flatRoutes } from "@react-router/fs-routes";
export default [
  ...(await flatRoutes()),
] satisfies RouteConfig;
```

### Component routes (declarative, runtime-only)

```typescript
import { Routes, Route } from "react-router";

function Wizard() {
  return (
    <Routes>
      <Route index element={<StepOne />} />
      <Route path="step-2" element={<StepTwo />} />
    </Routes>
  );
}
```

## Notes

- Index routes cannot have children
- `prefix()` returns an array — spread it with `...prefix()`
- All routes nest inside `app/root.tsx`
- Component routes (`<Routes>`/`<Route>`) don't support data loading, actions, or code splitting — use route modules configured via `routes.ts` instead
- No breaking changes to the route config API (`route`/`index`/`layout`/`prefix`) between v7 and v8

## Related

- [modes](./modes.md)
- [route-module](./route-module.md)
- [data-loading](./data-loading.md)
- [navigating](./navigating.md)
