# use client

Declares an entry point for components to be rendered on the client side. Used for interactive UI requiring client-side JavaScript capabilities such as state, event handling, and browser APIs. This is a React feature.

## Signature / Usage

```tsx filename="app/components/counter.tsx"
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

Add `'use client'` at the top of the file, before any imports, to mark the client/server boundary. Components exported from this file (and any modules it imports) are entry points to the client.

## Notes

- Not every file containing Client Components needs the directive — only the files whose components should be usable directly within Server Components.
- Props passed to Client Components must be [serializable](https://react.dev/reference/rsc/use-client#serializable-types) (e.g. functions passed directly as props are not serializable).
- Client Components can be nested inside Server Components for composition: Server Components handle static content/data fetching, Client Components handle interactivity.

## Related

- [use server](./use-server.md)
