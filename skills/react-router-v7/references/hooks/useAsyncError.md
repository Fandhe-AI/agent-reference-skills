# useAsyncError

Returns the rejection value from the nearest `<Await>` component. Used inside the `errorElement` of an `<Await>` to render error UI.

## Signature

```typescript
function useAsyncError(): unknown
```

## Usage

```tsx
import { Await, useAsyncError } from "react-router";

function AsyncErrorUI() {
  const error = useAsyncError();
  return <p>Something went wrong: {String(error)}</p>;
}

<Await
  resolve={promiseThatMightReject}
  errorElement={<AsyncErrorUI />}
/>
```

## Notes

- Must be used inside the `errorElement` prop of an `<Await>` component
- Returns `unknown` — narrow the type before accessing properties
- Not available in Declarative mode

## Related

- [useAsyncValue](./useAsyncValue.md) — resolved value from `<Await>`
- [useRouteError](./useRouteError.md) — error from route loaders/actions
