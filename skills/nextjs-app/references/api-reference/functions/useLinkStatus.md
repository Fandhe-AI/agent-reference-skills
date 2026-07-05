# useLinkStatus

`useLinkStatus` tracks the pending navigation state of a `<Link>`, useful for subtle inline feedback (e.g. a shimmer) while navigation completes.

## Signature / Usage

```tsx
'use client'

import Link from 'next/link'
import { useLinkStatus } from 'next/link'

function Hint() {
  const { pending } = useLinkStatus()
  return <span aria-hidden className={pending ? 'is-pending' : ''} />
}

export default function Header() {
  return (
    <Link href="/dashboard" prefetch={false}>
      <span className="label">Dashboard</span> <Hint />
    </Link>
  )
}
```

## Options / Props

| Property | Type | Description |
| --- | --- | --- |
| `pending` | `boolean` | `true` before history updates, `false` after. |

## Notes

- Must be used within a descendant component of `<Link>`.
- Most useful when `prefetch={false}` is set on the `Link`; if the route was prefetched, the pending state is often skipped.
- When clicking multiple links in quick succession, only the last link's pending state is shown.
- Not supported in the Pages Router — always returns `{ pending: false }` there.
- Prefer route-level `loading.js` fallbacks and prefetching for instant transitions; use this hook only as a targeted patch for slow transitions.
- Inline indicators can cause layout shift — use a fixed-size, always-rendered element and toggle opacity/animation instead of conditionally rendering.
- Introduced in `v15.3.0`.

## Related

- [Link Component](https://nextjs.org/docs/app/api-reference/components/link)
- [loading.js](https://nextjs.org/docs/app/api-reference/file-conventions/loading)
