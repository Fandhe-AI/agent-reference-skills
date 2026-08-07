# useRevalidator

Returns a `revalidate` function and the current revalidation state, allowing you to manually re-run all active loaders outside of normal mutation flows.

## Signature / Usage

```typescript
function useRevalidator(): {
  revalidate: () => Promise<void>;
  state: DataRouter["state"]["revalidation"];
}
```

```tsx
import { useRevalidator } from "react-router";

function WindowFocusRevalidator() {
  const { revalidate, state } = useRevalidator();

  useWindowFocus(() => {
    revalidate();
  });

  return <div hidden={state === "idle"}>Refreshing...</div>;
}
```

## Notes

- `state` is `DataRouter["state"]["revalidation"]`, typically `"idle" | "loading"`
- Page data is automatically revalidated after actions — use this hook only for special cases such as polling or window focus events
- For user-triggered mutations prefer `<Form>`, `useSubmit`, or `useFetcher` instead
- Not available in Declarative mode

## Related

- [useFetcher](./useFetcher.md) — submit/load without navigation
- [useNavigation](./useNavigation.md) — navigation-level loading state
