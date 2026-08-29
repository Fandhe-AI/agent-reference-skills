---
source: https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr
---

# Selective SSR

Per-route control (static or dynamic) over whether `beforeLoad`/`loader` run on the server and whether the route component is server-rendered, for cases like browser-only APIs (`localStorage`, `canvas`).

## Signature / Usage

```tsx
// src/routes/posts/$postId.tsx
export const Route = createFileRoute('/posts/$postId')({
  ssr: 'data-only', // true (default) | false | 'data-only' | (ctx) => ssr value
  beforeLoad: () => {},
  loader: () => {},
  component: () => <div>Rendered on the client</div>,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ssr: true` | default | Runs `beforeLoad`/`loader` on the server, sends context/data to client, renders component on server. |
| `ssr: false` | — | Disables server execution of `beforeLoad`/`loader` and server rendering of the component. |
| `ssr: 'data-only'` | — | Runs `beforeLoad`/`loader` on the server but disables server rendering of the component. |
| `ssr: (ctx) => boolean \| 'data-only' \| undefined` | function | Decided at runtime; server-only, stripped from client bundle. Receives `params`/`search` as `{ status: 'success', value } \| { status: 'error', error }`. |
| `defaultSsr` (in `createStart`) | `boolean` | Changes the default when `ssr` is unset (default `true`). |

## Notes

- Child routes inherit the parent's `ssr` config; the inherited value can only become more restrictive (`true` → `data-only` → `false`), never less.
- For the first route with `ssr: false`/`'data-only'`, the server renders `pendingComponent` (or `defaultPendingComponent`) as fallback; on the client it stays visible for at least `minPendingMs`/`defaultPendingMinMs`.
- The root route's `<html>` shell must still be server-rendered; use `shellComponent` (wraps `component`/`errorComponent`/`notFoundComponent`) combined with `ssr: false` on the root component.
- Differs from [SPA Mode](./spa-mode.md): SPA mode disables SSR entirely and app-wide; Selective SSR configures per route, statically or dynamically.

## Related

- [SPA Mode](./spa-mode.md)
- [Hydration Errors](./hydration-errors.md)
