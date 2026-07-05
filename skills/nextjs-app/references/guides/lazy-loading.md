# Lazy Loading

Defers loading of Client Components and imported libraries until they're needed, reducing the JavaScript required to render a route, via `next/dynamic` (a composite of `React.lazy()` + Suspense).

## Signature / Usage

```jsx filename="app/page.js"
'use client'

import dynamic from 'next/dynamic'

const ComponentA = dynamic(() => import('../components/A'))
const ComponentC = dynamic(() => import('../components/C'), { ssr: false })

export default function Page() {
  return (
    <div>
      <ComponentA />
      <ComponentC />
    </div>
  )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `dynamic(() => import(...))` | function | Lazily imports a Client (or Server) Component |
| `ssr` | `boolean` | `false` disables prerendering; only valid inside Client Components, not Server Components |
| `loading` | `() => ReactNode` | Custom fallback rendered while the dynamic import loads |
| magic comment `webpackIgnore` / `turbopackIgnore` | comment | Skips bundling a dynamic `import()`/`require()`; left as-is for runtime resolution |
| magic comment `turbopackOptional` | comment | Suppresses build errors for a possibly-missing module (Turbopack only); still throws at runtime if missing |

## Notes

- Server Components are automatically code-split; lazy loading via `next/dynamic` applies to Client Components.
- Dynamically importing a Server Component only lazy-loads its Client Component children, not the Server Component itself; `ssr: false` is not allowed inside Server Components (move it into a Client Component).
- External libraries can be loaded on demand with plain `await import('lib')` inside an event handler, without `next/dynamic`.
- Import a named export via `.then((mod) => mod.Hello)`.
- Magic comments only work with dynamic `import()`/`require()` expressions, not static `import` statements.

## Related

- [Third Party Libraries](./third-party-libraries.md)
- [Scripts](./scripts.md)
