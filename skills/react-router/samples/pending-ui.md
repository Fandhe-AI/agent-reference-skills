# Pending UI

Show loading indicators during navigation and form submission using `useNavigation` and `useFetcher`.

```tsx
// Global spinner in root layout
import { useNavigation, Outlet } from "react-router";

export default function Root() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <html>
      <body>
        {isNavigating && <div className="spinner" />}
        <Outlet />
      </body>
    </html>
  );
}
```

```tsx
// Optimistic UI with useFetcher (no navigation)
import { useFetcher } from "react-router";

function TaskItem({ task }) {
  const fetcher = useFetcher();
  const isComplete = fetcher.formData
    ? fetcher.formData.get("status") === "complete"
    : task.status === "complete";

  return (
    <fetcher.Form method="post" action={`/tasks/${task.id}`}>
      <button name="status" value={isComplete ? "incomplete" : "complete"}>
        {isComplete ? "Mark Incomplete" : "Mark Complete"}
      </button>
    </fetcher.Form>
  );
}
```

## Notes

- `navigation.state` is `'idle' | 'loading' | 'submitting'`
- `navigation.location` is set while navigating — use `Boolean(navigation.location)` for a global spinner
- `fetcher.formData` is available while submitting — read it for optimistic UI before the server responds
- `<NavLink>` provides `isPending` and `isActive` render props for per-link indicators
