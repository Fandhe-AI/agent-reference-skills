# Index Query Param (`?index`)

The `?index` query parameter disambiguates form submissions between a parent route and its index route when both match the same URL path.

**Availability**: Framework Mode and Data Mode. Not available in Declarative Mode.

## 詳細説明

When multiple routes in a hierarchy match the same URL, navigations call **all matching loaders**, but form submissions call **only one action**. The `?index` param explicitly targets the index route's action rather than the parent route's action.

**Example route structure:**
```typescript
import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  route("projects", "./pages/projects.tsx", [
    index("./pages/projects/index.tsx"),
    route(":id", "./pages/projects/project.tsx"),
  ]),
] satisfies RouteConfig;
```

Both `projects.tsx` (parent) and `projects/index.tsx` (index) match `/projects`.

## コード例

**Explicit targeting:**
```tsx
<Form method="post" action="/projects" />        // → parent route action
<Form method="post" action="/projects?index" />  // → index route action
```

**Automatic handling** — when `<Form>` has no `action` prop, React Router appends `?index` automatically based on the current route context:
```tsx
// Rendered inside projects/index.tsx
function ProjectsIndex() {
  return <Form method="post" />;  // auto-submits to /projects?index
}

// Rendered inside projects.tsx
function ProjectsLayout() {
  return <Form method="post" />;  // auto-submits to /projects
}
```

**With `useSubmit` and `useFetcher`:**
```tsx
const submit = useSubmit();
submit({}, { action: "/projects?index" });

const fetcher = useFetcher();
fetcher.submit({}, { action: "/projects?index" });
<fetcher.Form action="/projects?index" />;
```

## 注意点

- In most cases `?index` is appended automatically — explicit use is only needed when you manually set an `action` prop and want to target the index route
- The param is essential in nested route architectures where the parent layout and index route share the exact same URL

## 関連

- [Form vs. Fetcher](./form-vs-fetcher.md)
