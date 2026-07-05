# MDX

MDX is a superset of markdown that allows writing JSX directly in markdown files. Next.js supports local and remote MDX content, including in Server Components, via the `@next/mdx` package.

## Signature / Usage

```js filename="next.config.mjs"
import createMDX from '@next/mdx'

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
```

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
| `pageExtensions` | `string[]` | Add `md`/`mdx` so files with those extensions act as pages/routes |
| `createMDX({ extension })` | RegExp | Include `.md` files (default only compiles `.mdx`) |
| `createMDX({ options: { remarkPlugins, rehypePlugins } })` | array | Markdown/HTML transform plugins (e.g. `remark-gfm`) |
| `experimental.mdxRs` | `boolean \| object` | Enables the experimental Rust-based MDX compiler |

## Notes

- `mdx-components.tsx` at the project root is **required** for `@next/mdx` to work with the App Router.
- Render via file-based routing (`app/mdx-page/page.mdx`), static import (`import Welcome from '@/markdown/welcome.mdx'`), or dynamic import combined with `generateStaticParams`/`dynamicParams = false`.
- Global styles/components go in `mdx-components.tsx`; local overrides are passed as a `components` prop to the imported MDX component; shared layouts wrap MDX pages via a normal `layout.tsx`.
- `@next/mdx` does not support frontmatter by default — use `remark-frontmatter` + `remark-mdx-frontmatter`, `gray-matter`, or plain `export const metadata = {...}` inside the `.mdx` file.
- Turbopack requires plugin names as strings (with optional serializable options array) rather than imported functions, since options must be serializable.

## Related

- [JSON-LD](./json-ld.md)
