# Pending UI

Patterns for giving immediate feedback while a navigation or form submission is in progress.

## Signature / Usage

### useNavigation (global state)

```tsx
import { useNavigation } from "react-router";

export default function Root() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return (
    <html><body>
      {isNavigating && <GlobalSpinner />}
      <Outlet />
    </body></html>
  );
}
```

`navigation.state`: `'idle' | 'loading' | 'submitting'`. Navigation waits for loaders to complete before rendering the next page.

### NavLink (local link state)

```tsx
<NavLink to="/home">
  {({ isPending }) => <span>Home {isPending && <Spinner />}</span>}
</NavLink>
```

### useFetcher (independent form state)

```tsx
const fetcher = useFetcher();
<fetcher.Form method="post">
  <button>{fetcher.state !== "idle" ? "Submitting..." : "Submit"}</button>
</fetcher.Form>
```

### Standard Form (via useNavigation)

```tsx
const navigation = useNavigation();
<Form method="post" action="/projects/new">
  <button type="submit">
    {navigation.formAction === "/projects/new" ? "Submitting..." : "Submit"}
  </button>
</Form>
```

### Optimistic UI

```tsx
function Task({ task }) {
  const fetcher = useFetcher();
  let isComplete = task.status === "complete";
  if (fetcher.formData) {
    isComplete = fetcher.formData.get("status") === "complete";
  }
  return (
    <fetcher.Form method="post">
      <button name="status" value={isComplete ? "incomplete" : "complete"}>
        {isComplete ? "Mark Incomplete" : "Mark Complete"}
      </button>
    </fetcher.Form>
  );
}
```

## Options / Props

| Pattern | Hook/Component | Property |
| --- | --- | --- |
| Global spinner | `useNavigation` | `navigation.location` |
| Link indicator | `NavLink` | `isPending` |
| Form button (fetcher) | `useFetcher` | `fetcher.state` |
| Form button (global) | `useNavigation` | `navigation.formAction` |
| Optimistic UI | `useFetcher` | `fetcher.formData` |

## Notes

- Framework Mode only
- Prefer `useFetcher` for form submissions that need independent pending state
- No breaking changes to the pending-UI APIs between v7 and v8

## Related

- [modes](./modes.md)
- [actions](./actions.md)
- [navigating](./navigating.md)
- [data-loading](./data-loading.md)
