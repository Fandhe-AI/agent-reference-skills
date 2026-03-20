# useAsyncValue

Returns the resolved value from the nearest `<Await>` ancestor component. Used inside components rendered as children of `<Await>`.

## Signature

```typescript
function useAsyncValue(): unknown
```

## Usage

```tsx
import { Await, useAsyncValue } from "react-router";

function ResolvedData() {
  const value = useAsyncValue();
  return <pre>{JSON.stringify(value, null, 2)}</pre>;
}

// In your route component:
<Await resolve={somePromise}>
  <ResolvedData />
</Await>
```

## Notes

- Must be called inside a component that is a descendant of `<Await>`
- Returns `unknown` — narrow the type before use
- The `<Await>` component must be wrapped in a `<Suspense>` boundary to handle the loading state
- Not available in Declarative mode

## Related

- [useAsyncError](./useAsyncError.md) — access rejection errors from `<Await>`
- [useLoaderData](./useLoaderData.md) — access route loader data
