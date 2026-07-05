# Parallel Routes

Simultaneously or conditionally render one or more pages within the same layout — useful for highly dynamic sections like dashboards and feeds.

## Signature / Usage

```tsx filename="app/layout.tsx"
export default function Layout({
  children,
  team,
  analytics,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <>
      {children}
      {team}
      {analytics}
    </>
  )
}
```

## Options / Props

| Convention | Description |
|------|-------------|
| `@folder` (slot) | Named slot passed as a prop to the shared parent layout, e.g. `app/@team`, `app/@analytics`. Slots are not route segments and don't affect the URL. |
| `children` | Implicit slot that doesn't need a folder — `app/page.js` is equivalent to `app/@children/page.js`. |
| `default.js` | Fallback rendered for a slot on hard navigation when Next.js can't recover its active state; without it, a 404 is rendered. |

## Notes

- Slots are combined with the regular page component to form the final page for a route segment — you cannot have separate prerendered and dynamically rendered slots at the same segment level (if one is dynamic, all must be dynamic).
- Soft (client-side) navigation performs a partial render, keeping other slots' active subpages even if they don't match the current URL; hard navigation (full reload) renders `default.js` (or 404) for unmatched slots.
- `useSelectedLayoutSegment`/`useSelectedLayoutSegments` accept a `parallelRoutesKey` to read the active segment within a specific slot.
- Combine with [Intercepting Routes](./intercepting-routes.md) to build modals that support deep linking, refresh-safe context, and correct back/forward behavior; use a `default.js` returning `null` and a catch-all slot page (`@slot/[...catchAll]/page.js`) returning `null` to close the modal on navigation elsewhere.
- Each parallel route can stream independently, allowing independent `loading.js`/`error.js` states per slot.

## Related

- [default.js](./default.md)
- [Intercepting Routes](./intercepting-routes.md)
- [layout.js](./layout.md)
- [loading.js](./loading.md)
