# useFetchers

Returns an array of all in-flight `Fetcher` objects. Useful for components that did not create fetchers themselves but want to participate in optimistic UI.

## Signature

```typescript
function useFetchers(): (Fetcher & { key: string })[]
```

## Usage

```tsx
import { useFetchers } from "react-router";

function GlobalPendingIndicator() {
  const fetchers = useFetchers();
  const isLoading = fetchers.some(f => f.state !== "idle");
  return isLoading ? <Spinner /> : null;
}
```

## Notes

- Returns only **in-flight** (active) fetchers, not idle/completed ones
- Each entry includes a `key` string identifying the fetcher
- Commonly used to build optimistic UI in components that don't own the fetchers
- Not available in Declarative mode

## Related

- [useFetcher](./useFetcher.md) — create and manage individual fetchers
