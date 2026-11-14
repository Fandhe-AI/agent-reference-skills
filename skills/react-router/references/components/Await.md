# Await

Renders a deferred (unawaited) Promise returned from a loader, providing automatic error handling. Must be wrapped in a `<React.Suspense>` boundary to show a loading fallback. Available in Framework and Data modes; not available in Declarative mode.

## Signature / Usage

```tsx
function Await<Resolve>(
  props: AwaitProps<Resolve> | AwaitPromiseProps<Resolve>,
)

import { Await, useLoaderData } from "react-router";

export async function loader() {
  const reviews = getReviews(); // not awaited — returns a Promise
  const book = await getBook();
  return { book, reviews };
}

export default function Book() {
  const { book, reviews } = useLoaderData();
  return (
    <React.Suspense fallback={<p>Loading reviews…</p>}>
      <Await
        resolve={reviews}
        errorElement={<p>Could not load reviews.</p>}
      >
        {(resolvedReviews) => <Reviews items={resolvedReviews} />}
      </Await>
    </React.Suspense>
  );
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `resolve` | `Promise<Resolve>` | The Promise to resolve. Typically an unawaited value from `useLoaderData()`. |
| `children` | `ReactNode \| (resolvedValue: Resolve) => ReactNode` | Content to render when resolved. Accepts a render function that receives the resolved value, or a React element that calls `useAsyncValue()`. |
| `errorElement` | `ReactNode` | Rendered when the Promise rejects. Use `useAsyncError()` inside it for the rejection value. |
| `unstable_promise` | `Promise<Resolve>` | Experimental (8.5.1). A promise (or value) to read using React's `use()` API in client components. Accepts promise-like values without modifying the source promise. Pass exactly one of `unstable_promise` or `resolve`. |

## Notes

- **Must** be wrapped in `<React.Suspense>` — the Suspense boundary provides the fallback UI while the Promise is pending.
- Unawaited loader Promises enable streaming (data arrives after initial HTML). Awaited Promises block navigation until resolved.
- If `errorElement` is omitted, a rejected Promise bubbles to the nearest route-level `ErrorBoundary` (accessible via `useRouteError()`).
- Available in Framework and Data modes; **not** available in Declarative mode.
- `unstable_promise` (8.5.1, experimental, may change in minor or patch releases) opts into React's `use()` implementation instead of `resolve`. With it, `errorElement` handles only promise rejections, while errors thrown by children bubble to the nearest React error boundary. In React Server Components, `resolve` already has this error-handling behavior
- Both props accept promise-like values without modifying the source promise and treat a falsy `errorElement` as absent (the rejection propagates); pass an empty fragment to handle a rejection without rendering any content
- Source: https://reactrouter.com/api/components/Await (docs/api/components/Await.md at tag react-router@8.5.1: https://github.com/remix-run/react-router/blob/react-router@8.5.1/docs/api/components/Await.md)

## Related

- [Outlet](./Outlet.md)
