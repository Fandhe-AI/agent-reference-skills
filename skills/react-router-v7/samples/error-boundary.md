# Error Boundary

Catch loader, action, and render errors with an `ErrorBoundary` export in a route module.

```tsx
// app/root.tsx — catches all unhandled errors
import { isRouteErrorResponse } from "react-router";
import type { Route } from "./+types/root";

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <main>
        <h1>{error.status} {error.statusText}</h1>
        <p>{error.data}</p>
      </main>
    );
  } else if (error instanceof Error) {
    return <p>{error.message}</p>;
  } else {
    return <h1>Unknown Error</h1>;
  }
}
```

```tsx
// Throw a typed 404 from a loader
import { data } from "react-router";
import type { Route } from "./+types/product";

export async function loader({ params }: Route.LoaderArgs) {
  const record = await fakeDb.getRecord(params.id);
  if (!record) throw data("Record Not Found", { status: 404 });
  return record;
}
```

## Notes

- Errors bubble up to the nearest ancestor route that exports `ErrorBoundary`
- `isRouteErrorResponse(error)` is `true` for errors thrown with `throw data()` or `throw redirect()`
- In production (Framework mode), server `Error` stack traces are sanitized before reaching the browser
- Data thrown via `throw data()` is NOT sanitized — avoid putting sensitive info there
