# The Server and Client Boundary

React Server Components split a component tree between server and client module graphs; the boundary determines where component code runs and whether it ships to the browser.

## Signature / Usage

```tsx filename="app/page.tsx"
import { Cart } from '@/app/ui/cart'
import { Modal } from '@/app/ui/modal'

// Page and Cart are Server Components. Modal is a Client Component
export default function Page() {
  return (
    <Modal title={<div>Your cart</div>}>
      <Cart />
    </Modal>
  )
}
```

```tsx filename="app/ui/modal.tsx"
'use client'

import { useState, type ReactNode } from 'react'

export function Modal({
  title,
  children,
}: {
  title: ReactNode
  children: ReactNode
}) {
  const [open, setOpen] = useState(true)
  if (!open) return null

  return (
    <div role="dialog">
      <header>
        {title}
        <button onClick={() => setOpen(false)}>Close</button>
      </header>
      {children}
    </div>
  )
}
```

## Options / Props

| | On the server | In the browser |
|---|---|---|
| Server Component | Yes | No |
| Client Component | Yes | Yes |

## Notes

- Source: https://nextjs.org/docs/app/guides/server-and-client-boundary (v16.4.2)

- Both Server and Client Components render on the server to produce HTML (build time with SSG, after build with ISR, or per request with SSR). "Server-rendered" describes how HTML was produced; "Server Component" describes where the code runs and whether it ships to the browser.
- On a direct visit a Client Component renders on the server and again in the browser during hydration. On a client-side navigation it renders in the browser from the RSC Payload.
- Server Components can read databases, filesystem, internal services, and secrets during render; props passed to Client Components are serialized and sent to the browser, so pass deliberately.
- To stream server data into a Client Component, start the request in a Server Component and pass the pending promise as a prop; read it with `use` behind a Suspense boundary.
- `'use client'` goes at the top of the file before any imports and marks a client entry point. Code crosses via imports (everything a Client Component imports joins the client bundle); data crosses via serializable props. Functions such as `onClick` cannot cross; a Server Function marked `'use server'` crosses as a reference. The TypeScript plugin allows function props named `action` or ending in `Action`.
- A rendered React element is serializable, so passing a Server Component as `children` or another prop lets it nest inside a Client Component without importing its code into the client graph. The component whose source contains the JSX is the owner; the component that contains it in the tree is the parent.
- Compound components with static members (`Menu.Item`) break when a Server Component imports a Client Component (client reference, member is `undefined`, "Element type is invalid"). Use named exports instead.
- `useState`, `useEffect`, and event handlers need browser code and cannot be used in Server Components. Native behavior (`<details>`, `<form action={serverFunction}>`, `<video controls>`) needs no Client Component.
- Put the directive on a wrapper Client Component to keep a shared component unchanged.

## Related

- [Rendering Philosophy](./rendering-philosophy.md)
- [Data Security](./data-security.md)
- [Server Actions](./server-actions.md)
- [Streaming](./streaming.md)
