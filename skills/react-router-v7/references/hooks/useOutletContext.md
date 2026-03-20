# useOutletContext

Returns the context value passed via the `context` prop on the parent route's `<Outlet>`. Enables parent-to-child route state sharing without a separate context provider.

## Signature

```typescript
function useOutletContext<Context = unknown>(): Context
```

## Usage

**Parent route:**
```tsx
import { Outlet } from "react-router";

function Dashboard() {
  const [user, setUser] = useState(null);
  return <Outlet context={{ user, setUser }} />;
}
```

**Child route:**
```tsx
import { useOutletContext } from "react-router";

function DashboardMessages() {
  const { user } = useOutletContext<{ user: User }>();
  return <p>Hello, {user.name}</p>;
}
```

## Best practice — typed custom hook

Export a typed hook from the parent module to give consumers type safety:

```tsx
// dashboard.tsx
type ContextType = { user: User | null };

export function useDashboard() {
  return useOutletContext<ContextType>();
}

// dashboard/messages.tsx
import { useDashboard } from "../dashboard";
const { user } = useDashboard();
```

## Notes

- Available in all modes: Framework, Data, and Declarative

## Related

- [useMatches](./useMatches.md) — access route handle data across the hierarchy
- [useLoaderData](./useLoaderData.md) — loader-provided data for the current route
