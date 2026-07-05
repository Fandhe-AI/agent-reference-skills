# template.js

Wraps a layout or page like `layout.js`, but is given a unique key per segment so child Client Components reset their state on navigation instead of persisting.

## Signature / Usage

```tsx filename="app/template.tsx"
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```

Conceptually: `<Layout><Template key={routeParam}>{children}</Template></Layout>`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `children` (required) | `React.ReactNode` | The segment content the template wraps. |

## Notes

- Useful to resynchronize `useEffect` on navigation, reset a Client Component's state (e.g. an input), or show a Suspense fallback on every navigation (layouts only show it on first load).
- In the component hierarchy, `template.js` renders between `layout.js` and `error.js` — it wraps `error.js`, `loading.js`, `not-found.js`, and `page.js`, but not the `layout.js` in the same segment.
- Is a Server Component by default.
- Remounts when its own segment level (including dynamic params) changes; navigation within deeper segments does not remount higher-level templates; search params do not trigger remounts.
- Introduced in `v13.0.0`.

## Related

- [layout.js](./layout.md)
- [error.js](./error.md)
- [loading.js](./loading.md)
