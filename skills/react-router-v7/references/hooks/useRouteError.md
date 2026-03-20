# useRouteError

Returns the error thrown during a route's loader, action, or component render. Must be called inside a route module's `ErrorBoundary` component.

## Signature

```typescript
function useRouteError(): unknown
```

## Usage

```tsx
import { useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();
  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }
  return <div>Unknown error occurred</div>;
}
```

## Notes

- Return type is `unknown` — always check/narrow the type before accessing properties
- Catches errors from loaders, actions, and rendering errors within the route boundary
- Not available in Declarative mode

## Related

- [useAsyncError](./useAsyncError.md) — errors from `<Await>` rejected promises
- [useAsyncValue](./useAsyncValue.md) — resolved values from `<Await>`
