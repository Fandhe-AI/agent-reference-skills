# useParams

`useParams` is a Client Component hook that reads a route's dynamic params filled in by the current URL.

## Signature / Usage

```tsx
'use client'

import { useParams } from 'next/navigation'

export default function ExampleClientComponent() {
  const params = useParams<{ tag: string; item: string }>()
  // Route -> /shop/[tag]/[item], URL -> /shop/shoes/nike-air-max-97
  // params -> { tag: 'shoes', item: 'nike-air-max-97' }
  return '...'
}
```

## Notes

- Takes no parameters.
- Returns an object where each property is an active dynamic segment; value is `string` or `string[]` depending on segment type (catch-all).
- Returns an empty object `{}` if the route has no dynamic parameters.
- In the Pages Router, returns `null` on initial render, then updates once the router is ready.
- Introduced in `v13.3.0`.

## Related

- [usePathname](./usePathname.md)
- [useSearchParams](./use-search-params.md)
