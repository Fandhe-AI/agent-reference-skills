# useRoutes

Hook version of `<Routes>` that uses objects instead of components. These objects have the same properties as the component props. The return value is either a valid React element to render the route tree, or `null` if nothing matched.

## Signature / Usage

```typescript
function useRoutes(
  routes: RouteObject[],
  locationArg?: Partial<Location> | string,
): React.ReactElement | null
```

```tsx
import { useRoutes } from "react-router";

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        { path: "messages", element: <DashboardMessages /> },
        { path: "tasks", element: <DashboardTasks /> },
      ],
    },
    { path: "team", element: <AboutPage /> },
  ]);

  return element;
}
```

## Options / Props

| Option | Type | Description |
|--------|------|-------------|
| `routes` | `RouteObject[]` | An array of `RouteObject`s that define the route hierarchy |
| `locationArg` | `Partial<Location> \| string` | Optional `Location` object or pathname string to use instead of the current `Location` |

## Notes

- Available in all modes: Framework, Data, and Declarative

## Related

- [useMatches](./useMatches.md) — read the currently matched routes
