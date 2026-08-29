---
source: https://tanstack.com/start/latest/docs/framework/react/guide/selective-ssr
---

# Selective SSR (per-route ssr option)

Disable server-side loader execution and server rendering for a single route that depends on browser-only APIs.

```tsx
// src/routes/canvas-editor.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/canvas-editor')({
  ssr: false, // true (default) | false | 'data-only' | (ctx) => ssr value
  component: CanvasEditor,
})

function CanvasEditor() {
  // safe to use `window`, `localStorage`, `canvas` here — never runs on the server
  return <canvas ref={setupCanvas} />
}
```

```tsx
// src/routes/dashboard.tsx
export const Route = createFileRoute('/dashboard')({
  ssr: 'data-only', // loader runs on the server, component renders on the client only
  loader: () => fetchDashboardData(),
  component: Dashboard,
})
```

## Notes

- `ssr: true` (default) runs `beforeLoad`/`loader` on the server and server-renders the component; `ssr: false` disables both; `ssr: 'data-only'` runs data loading on the server but renders the component client-only.
- Child routes inherit the parent's `ssr` config and can only become more restrictive (`true` → `data-only` → `false`), never less.
- When the first route in the tree sets `ssr: false`/`'data-only'`, the server renders `pendingComponent` as a fallback instead.
