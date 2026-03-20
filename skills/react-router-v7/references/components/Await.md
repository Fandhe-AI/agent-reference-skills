# Await

Renders a deferred (unawaited) Promise returned from a loader, providing automatic error handling. Must be wrapped in a `<React.Suspense>` boundary to show a loading fallback.

## Props

| Name | Type | Description |
|------|------|-------------|
| `resolve` | `Promise<Resolve>` | The Promise to resolve. Typically an unawaited value from `useLoaderData()`. |
| `children` | `ReactNode \| (resolvedValue: Resolve) => ReactNode` | Content to render when resolved. Accepts a render function that receives the resolved value, or a React element that calls `useAsyncValue()`. |
| `errorElement` | `ReactNode` | Rendered when the Promise rejects. Use `useAsyncError()` inside it for the rejection value. |

## 使用例

```tsx
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

## 注意点

- **Must** be wrapped in `<React.Suspense>` — the Suspense boundary provides the fallback UI while the Promise is pending.
- Unawaited loader Promises enable streaming (data arrives after initial HTML). Awaited Promises block navigation until resolved.
- If `errorElement` is omitted, a rejected Promise bubbles to the nearest route-level `ErrorBoundary` (accessible via `useRouteError()`).
- Available in Framework and Data modes; **not** available in Declarative mode.

## 関連

- [Outlet.md](./Outlet.md)
