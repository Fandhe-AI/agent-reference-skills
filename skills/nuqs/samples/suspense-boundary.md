# Suspense Boundary

Fix the Next.js "Missing Suspense boundary with useSearchParams" error when a page renders components that use `useQueryState`.

Quick fix: add `'use client'` to `page.tsx` and wrap the client component in `<Suspense>`.

```tsx
'use client'

export default function Page() {
  return (
    <Suspense>
      <Client />
    </Suspense>
  )
}

function Client() {
  const [foo, setFoo] = useQueryState('foo')
  // ...
}
```

Recommended approach: keep `page.tsx` a server component, move the nuqs hooks into a separate client file, and wrap it in `<Suspense>`.

```tsx
// app/page.tsx (server component, no 'use client')
import { Suspense } from 'react'
import { Client } from './client'

export default function Page() {
  return (
    <Suspense>
      <Client />
    </Suspense>
  )
}
```

```tsx
// app/client.tsx
'use client'

import { useQueryState } from 'nuqs'

export function Client() {
  const [foo, setFoo] = useQueryState('foo')
  // ...
}
```

## Notes

- The Next.js error message is `Missing Suspense boundary with useSearchParams` (see nextjs.org/docs/messages/missing-suspense-with-csr-bailout).
- The `'use client'` page is the immediate fix; the split server/client layout gives better UX by pre-rendering the outer shell and keeping client code low in the tree.
- The split-file example is the documented recommended steps (server `page.tsx`, separate client file, `<Suspense>` boundary) expressed as code; the official page shows the quick-fix snippet only.
- Source: https://nuqs.dev/docs/troubleshooting (nuqs v2.10.2).
