# Server and Client Components

Use React Server and Client Components to render parts of an application on the server or the client.

## Signature / Usage

```tsx
// app/ui/counter.tsx — Client Component
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p>{count} likes</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

```tsx
// app/[id]/page.tsx — Server Component fetching data, passing props to a Client Component
import LikeButton from '@/app/ui/like-button'
import { getPost } from '@/lib/data'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)
  return <LikeButton likes={post.likes} />
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `"use client"` | directive | Declares a boundary between Server and Client module graphs; applies to a file's direct imports/renders, not to Server Components passed as children/props |
| `server-only` / `client-only` | npm packages | Optional guards causing a build-time error if server-only or client-only code is imported into the wrong environment |

## Notes

- Layouts and pages are Server Components by default; use Client Components for state, event handlers, lifecycle hooks, browser-only APIs, and custom hooks
- Props passed from Server to Client Components must be serializable; stream non-serializable data with React's `use` API instead
- React context is not supported in Server Components — wrap providers in a Client Component and render them as deep as possible in the tree
- Third-party client-only components must be wrapped in your own `"use client"` file before use inside a Server Component
- Only environment variables prefixed with `NEXT_PUBLIC_` are exposed to the client bundle

## Related

- [layouts-and-pages](./layouts-and-pages.md)
- [fetching-data](./fetching-data.md)
