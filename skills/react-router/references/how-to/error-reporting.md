# Error Reporting

Send errors to external monitoring services from both the server and the client. React Router provides dedicated hooks separate from `ErrorBoundary` for this purpose.

## Signature / Usage

**Server errors (Framework mode):**
1. Run `react-router reveal entry.server` to create `entry.server.tsx`
2. Export a `handleError` function

**Client errors (Framework mode):**
1. Run `react-router reveal entry.client` to create `entry.client.tsx`
2. Pass an `onError` callback to `HydratedRouter`

**Client errors (Data mode):**
Pass an `onError` callback to `RouterProvider`.

```tsx
// entry.server.tsx — server error reporting
import { type HandleErrorFunction } from "react-router";

export const handleError: HandleErrorFunction = (error, { request }) => {
  if (!request.signal.aborted) {
    myReportError(error);
    console.error(error);
  }
};
```

```tsx
// entry.client.tsx — client error reporting (Framework mode)
import { type ClientOnErrorFunction } from "react-router";

const onError: ClientOnErrorFunction = (
  error,
  { location, params, pattern, errorInfo },
) => {
  myReportError(error, location, errorInfo);
  console.error(error, errorInfo);
};

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter onError={onError} />
    </StrictMode>,
  );
});
```

```tsx
// Client error reporting (Data mode)
import { createBrowserRouter, type ClientOnErrorFunction } from "react-router";
import { RouterProvider } from "react-router/dom";

const onError: ClientOnErrorFunction = (
  error,
  { location, params, pattern, errorInfo },
) => {
  myReportError(error, location, errorInfo);
  console.error(error, errorInfo);
};

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} onError={onError} />;
}
```

## Notes

- Check `request.signal.aborted` on the server to avoid logging interrupted (cancelled) requests
- `handleError` is Framework mode only; `onError` works in both Framework and Data modes
- The `onError` callback's second argument includes `location`, `params`, `pattern`, and `errorInfo`

## Related

- [./error-boundary.md](./error-boundary.md)
