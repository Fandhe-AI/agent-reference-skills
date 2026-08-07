# Basic Routing

Define routes in `app/routes.ts` using `route`, `index`, `layout`, and `prefix` helpers.

```typescript
// app/routes.ts
import { type RouteConfig, route, index, layout, prefix } from "@react-router/dev/routes";

export default [
  index("./home.tsx"),
  route("about", "./about.tsx"),

  layout("./auth/layout.tsx", [
    route("login", "./auth/login.tsx"),
    route("register", "./auth/register.tsx"),
  ]),

  ...prefix("projects", [
    index("./projects/home.tsx"),
    route(":id", "./projects/detail.tsx"),
  ]),
] satisfies RouteConfig;
```

```tsx
// app/routes/projects/detail.tsx — child renders in parent's <Outlet />
import type { Route } from "./+types/detail";

export default function ProjectDetail({ params }: Route.ComponentProps) {
  return <h1>Project {params.id}</h1>;
}
```

## Notes

- `index` renders at the parent URL and cannot have children
- `layout` adds nesting without adding a URL segment
- `prefix` returns an array — spread with `...prefix(...)` 
- Child routes render through `<Outlet />` in the parent component
