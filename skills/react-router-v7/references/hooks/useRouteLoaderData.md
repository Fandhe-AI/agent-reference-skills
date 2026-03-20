# useRouteLoaderData

Returns the loader data for any route in the hierarchy by its route ID. Useful for accessing data from parent or sibling routes.

## Signature

```typescript
function useRouteLoaderData<T = any>(
  routeId: string,
): SerializeFrom<T> | undefined
```

## Usage

```tsx
import { useRouteLoaderData } from "react-router";

function SomeComponent() {
  const { user } = useRouteLoaderData("root");
}
```

## Route ID mapping (file-based routing)

| Route file | Route ID |
|------------|----------|
| `app/root.tsx` | `"root"` |
| `app/routes/teams.tsx` | `"routes/teams"` |
| `app/routes/teams.$id.tsx` | `"routes/teams.$id"` |

Custom IDs can be assigned in `routes.ts`:

```tsx
route("/", "containers/app.tsx", { id: "app" })
// then:
useRouteLoaderData("app")
```

## Notes

- Returns `undefined` if the route ID is not found or has not loaded yet
- Not available in Declarative mode

## Related

- [useLoaderData](./useLoaderData.md) — access loader data for the current route only
- [useMatches](./useMatches.md) — access all matched routes and their data
