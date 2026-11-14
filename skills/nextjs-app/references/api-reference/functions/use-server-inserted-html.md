# useServerInsertedHTML

`useServerInsertedHTML` is a Client Component hook (`next/navigation`) that injects markup into the HTML document Next.js generates, from anywhere in the tree. App Router only; it does nothing in the Pages Router.

## Signature / Usage

```tsx
'use client'

import { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { StyleRegistry, createStyleRegistry } from 'styled-jsx'

export default function StyledJsxRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  const [registry] = useState(() => createStyleRegistry())

  useServerInsertedHTML(() => {
    const styles = registry.styles()
    registry.flush()
    return <>{styles}</>
  })

  return <StyleRegistry registry={registry}>{children}</StyleRegistry>
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `callback` | `() => React.ReactNode` | Returns the nodes to insert into the generated HTML document. The hook returns nothing. |

## Notes

- The hook exists for CSS-in-JS style registries, which collect the rules produced during a render and flush them into the document ahead of the markup that uses them.
- Next.js flushes the document in chunks as the tree suspends and resolves, and every registered callback runs on every flush (not once per render), on a direct navigation and during any prerender. Keep the callback free of side effects, and return only what was collected since the previous flush (e.g. `registry.flush()`); returning the same nodes every time yields one copy per flush.
- Content inserted before `<head>` is sent goes into `<head>`; anything inserted later goes into `<body>`. If something above a component suspends, that component's rules go into `<body>` as well. A `<style>` tag applies to the whole document wherever it ends up.
- On a client navigation the hook does nothing; the CSS-in-JS library injects rules in the browser itself.
- Prefer declaring inline scripts in Server Components (see the preventing-flash-before-hydration guide). A script returned from the hook is included in `<head>` only while nothing above it has suspended, so a tree change can silently move it into `<body>`. If you use the hook for a script, guard the callback with a `useRef` flag so it is inserted once. Neither a script returned from the hook nor an inline script in JSX runs on a client navigation. React warns in development about a script written in JSX; the hook skips it silently.
- Next.js does not add a nonce to a script you return, so a `script-src` policy that requires one blocks it.
- Source: https://nextjs.org/docs/app/api-reference/functions/use-server-inserted-html (v16.4.6, vercel/next.js tag `docs/01-app/03-api-reference/04-functions/use-server-inserted-html.mdx`; new in v16.4.6 relative to v16.4.2)

## Related

- [CSS-in-JS](../../guides/css-in-js.md)
- [Preventing Flash Before Hydration](../../guides/preventing-flash-before-hydration.md)
- [usePathname](./usePathname.md)
