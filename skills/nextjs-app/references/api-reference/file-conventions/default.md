# default.js

Renders a fallback within [Parallel Routes](./parallel-routes.md) when Next.js cannot recover a slot's active state after a full-page (hard) load.

## Signature / Usage

```tsx filename="app/@team/default.js"
import { notFound } from 'next/navigation'

export default function Default() {
  notFound()
}
```

```tsx filename="app/[artist]/@sidebar/default.js"
export default async function Default({
  params,
}: {
  params: Promise<{ artist: string }>
}) {
  const { artist } = await params
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `params` (optional) | `Promise<object>` | Resolves to [dynamic route parameters](./dynamic-routes.md) from the root segment down to the slot's subpages. |

## Notes

- `default.js` renders a fallback for a slot when Next.js can't recover the active state on hard navigation; `children` is an implicit slot and also needs a `default.js` or it 404s.
- Without a `default.js`, an error is returned for named slots (`@team`, `@analytics`, etc); returning `notFound()` reproduces the old 404 behavior.
- `params` is a promise — use `async`/`await` or React's `use()`. In v14 and earlier it was synchronous; sync access still works in v15 for backwards compatibility but is deprecated.

## Related

- [Parallel Routes](./parallel-routes.md)
- [Dynamic Segments](./dynamic-routes.md)
