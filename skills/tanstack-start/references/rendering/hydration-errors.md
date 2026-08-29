---
source: https://tanstack.com/start/latest/docs/framework/react/guide/hydration-errors
---

# Hydration Errors

Hydration errors occur when server-rendered HTML differs from what the client renders during hydration ("Mismatch: Server HTML differs from client render"). Common causes: `Intl` (locale/time zone), `Date.now()`, random IDs, responsive-only logic, feature flags, user prefs.

## Signature / Usage

```tsx
// Strategy 4 — Disable or limit SSR for the route
export const Route = createFileRoute('/unstable')({
  ssr: 'data-only', // or false
  component: () => <ExpensiveViz />,
})
```

## Notes

- Strategy 1: pick a deterministic locale/time zone on the server (cookie preferred, else `Accept-Language` header) and hydrate as initial state.
- Strategy 2: let the client tell the server its environment by setting a cookie (e.g. time zone) on first visit; server uses a sensible default (`UTC`) until then.
- Strategy 3: wrap inherently unstable UI in `<ClientOnly>` from `@tanstack/react-router` to avoid SSR entirely.
- Strategy 4: use Selective SSR (`ssr: false` / `'data-only'`) when server HTML cannot be stable for a route.
- Strategy 5 (last resort): React's `suppressHydrationWarning` for small, known-different nodes — use minimally.

## Related

- [Selective SSR](./selective-ssr.md)
- [Deferred Hydration](./deferred-hydration.md)
