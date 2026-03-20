# isRouteErrorResponse

A TypeScript type-guard that returns `true` when the given error is an `ErrorResponse` produced by throwing a `Response` (4xx/5xx) from a route's `loader` or `action`.

## Signature

```typescript
function isRouteErrorResponse(error: any): error is ErrorResponse
```

## Usage

```typescript
import { isRouteErrorResponse } from "react-router";

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <p>{error.status}: {error.statusText}</p>
        <p>{error.data}</p>
      </>
    );
  }

  return (
    <p>{error instanceof Error ? error.message : "Unknown Error"}</p>
  );
}
```

## Notes

- Acts as a TypeScript type guard: inside the `if` block, `error` is narrowed to `ErrorResponse`
- `ErrorResponse` exposes `error.status` (number), `error.statusText` (string), and `error.data` (any)
- Useful for distinguishing HTTP error responses from unexpected JavaScript errors in `ErrorBoundary` components
- Available in **Framework Mode** and **Data Mode** only (not Declarative Mode)

## Related

- [data](./data.md)
- [redirect](./redirect.md)
