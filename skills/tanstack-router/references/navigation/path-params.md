---
source: https://tanstack.com/router/latest/docs/framework/react/guide/path-params
---

# Path Params

Path params match a single URL segment (until the next `/`) via the `$name` prefix, and are exposed as a named variable in loaders, `beforeLoad`, and components.

## Signature / Usage

```tsx title="src/routes/posts.$postId.tsx"
export const Route = createFileRoute('/posts/$postId')({
  loader: async ({ params }) => fetchPost(params.postId),
  component: PostComponent,
})

function PostComponent() {
  const { postId } = Route.useParams()
  return <div>Post {postId}</div>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `params.parse` | `(raw) => T \| false` | Custom parse/validate function; return `false` to fall through to the next candidate route |
| `params.stringify` | `(parsed) => raw` | Inverse of `parse`, used when building URLs |
| `params.priority` | `number` | Higher values tried first among competing `params.parse` candidates (default `0`) |
| `pathParamsAllowedCharacters` (RouterOptions) | `string[]` | Extra URI characters (e.g. `@`) not escaped via `encodeURIComponent` |

## Notes

- Once parsed, a path param is available to all child routes.
- Outside of the owning route, use the global `useParams({ strict: false })` to access params ambiguously.
- Prefix/suffix syntax: `post-{$postId}` (prefix), `{$fileName}[.]txt` (suffix, file name is `{$fileName}.txt`), combinable with wildcards (`$`).
- Optional path params use `{-$paramName}`; value is `undefined` when absent. `/posts/{-$category}` matches both `/posts` and `/posts/tech`.
- Navigating with optional params: `params={{}}` inherits current value, `params={{ category: undefined }}` removes it, function-style `params={(prev) => ({...prev, category: undefined})}` updates while preserving others.
- Optional params combine with i18n locale-prefix routing patterns (`/{-$locale}/about`).
- `params.parse` runs during route planning, may run more than once, and must be deterministic/side-effect-free.
- `params.priority` only affects competing `params.parse` candidates; static routes still match before dynamic/optional/wildcard routes regardless of priority.
- Allowed extra characters in path params: `; : @ & = + $ ,` (default is `encodeURIComponent` escaping for everything else).

## Related

- [search-params.md](./search-params.md)
- [links.md](./links.md)
- [navigation.md](./navigation.md)
