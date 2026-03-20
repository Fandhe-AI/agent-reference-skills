# useLoaderData

Returns data from the closest route's `loader` or `clientLoader` function. Available in Framework and Data modes only.

## Signature

```typescript
function useLoaderData<T = any>(): SerializeFrom<T>
```

## Usage

```tsx
import { useLoaderData } from "react-router";

export async function loader() {
  return await fakeDb.invoices.findAll();
}

export default function Invoices() {
  let invoices = useLoaderData<typeof loader>();
  return <ul>{invoices.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}
```

## Notes

- Use `typeof loader` as the generic to get proper TypeScript typing
- Data is serialized via `SerializeFrom<T>` — functions and non-serializable values are stripped
- Must be used in a component rendered by a route that has an associated loader
- Not available in Declarative mode

## Related

- [useRouteLoaderData](./useRouteLoaderData.md) — access loader data from any route by ID
- [useActionData](./useActionData.md) — access action return values
