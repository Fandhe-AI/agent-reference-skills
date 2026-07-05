# mdx-components.js

Required file to use `@next/mdx` with the App Router; also used to customize MDX styles/components. Place at the project root (same level as `app`, or inside `src`).

## Signature / Usage

```tsx filename="mdx-components.tsx"
import type { MDXComponents } from 'mdx/types'

const components: MDXComponents = {}

export function useMDXComponents(): MDXComponents {
  return components
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `useMDXComponents` (required export) | `() => MDXComponents` | The single function the file must export; takes no arguments. |

## Notes

- Without this file, `@next/mdx` will not work with the App Router.
- Introduced in `v13.1.2`.

## Related

- [MDX guide](../../guides/mdx.md)
