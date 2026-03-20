# Error Boundary

Error boundaries automatically catch errors thrown in loaders, actions, and components, rendering the nearest `ErrorBoundary` instead of a blank page.

**Available in:** Framework mode and Data mode.

## 実装方法

1. Export an `ErrorBoundary` function from a route module (Framework mode) or pass `ErrorBoundary` to a route object (Data mode)
2. Handle three cases: `isRouteErrorResponse`, `instanceof Error`, and unknown thrown values
3. Add nested `ErrorBoundary` exports to isolate errors within specific route subtrees
4. Use `throw data("Not Found", { status: 404 })` in loaders/actions for expected errors

## コード例

```tsx
// app/root.tsx (Framework mode)
import { isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/root";

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return <h1>{error.status} {error.statusText}</h1>;
  } else if (error instanceof Error) {
    return <p>{error.message}</p>;
  } else {
    return <h1>Unknown Error</h1>;
  }
}

// Throw a 404 from a loader
import { data } from "react-router";

export async function loader({ params }: Route.LoaderArgs) {
  const record = await fakeDb.getRecord(params.id);
  if (!record) throw data("Record Not Found", { status: 404 });
  return record;
}
```

## 注意点

- In production (Framework mode), server errors are sanitized before reaching the browser — stack traces are not exposed
- Data thrown via `throw data()` is NOT sanitized and will reach the client
- Errors bubble up to the nearest ancestor `ErrorBoundary` if the current route doesn't export one

## 関連

- [./error-reporting.md](./error-reporting.md)
- [./form-validation.md](./form-validation.md)
- [./status.md](./status.md)
