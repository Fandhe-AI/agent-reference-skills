# Link Component (`next/link`)

`<Link>` is a React component that extends the HTML `<a>` element to provide prefetching and client-side navigation between routes. It is the primary way to navigate between routes in Next.js.

## Signature / Usage

```tsx
import Link from 'next/link'

export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `href` | `string` or `object` | Yes | Path or URL to navigate to; object form supports `{ pathname, query }` |
| `replace` | `boolean` | - | Replace current history state instead of pushing. Default `false` |
| `scroll` | `boolean` | - | Controls scroll behavior on navigation. Default `true` (maintains/relocates scroll like browser back/forward) |
| `prefetch` | `boolean` or `null` | - | `"auto"`/`null` (default): full prefetch for static routes, partial (to nearest `loading.js` boundary) for dynamic routes. `true`: always full prefetch. `false`: never prefetch |
| `onNavigate` | `function` | - | Event handler called during client-side navigation only; receives event with `preventDefault()` to cancel |
| `transitionTypes` | `string[]` | - | Transition types passed to `React.addTransitionType` for use with `<ViewTransition>` |

`<a>` tag attributes such as `className` or `target="_blank"` can be added to `<Link>` as props and are passed to the underlying `<a>` element.

## Notes

- Prefetching only happens in production and triggers when the link enters the viewport or on hover; expired prefetch data is refetched on hover.
- `onNavigate` differs from `onClick`: it does not fire for modifier-key clicks (new tab), external URLs, or `download` links.
- Scroll behavior skips sticky/fixed and non-visible elements when locating the scroll target; use CSS `scroll-padding-top` to offset for sticky headers.
- When used behind a Proxy that rewrites routes, pass both the displayed `href` and use the underlying route for prefetching correctness.
- Since `v13.0.0`, `<Link>` no longer requires a child `<a>` tag (codemod available). Since `v10.0.0`, dynamic route `href`s are automatically resolved without an `as` prop.
- `transitionTypes` added in `v16.2.0`; `onNavigate` added in `v15.3.0`; `"auto"` alias added in `v15.4.0`.

## Related

- [Form Component](./form.md)
