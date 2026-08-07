# useOffline

`useOffline` is a Client Component hook that returns a boolean indicating whether the app is currently offline, for connectivity-aware UI.

## Signature / Usage

```tsx
'use client'

import { useOffline } from 'next/offline'

export function OfflineStatus() {
  const isOffline = useOffline()
  return <div>{isOffline ? 'Offline' : 'Online'}</div>
}
```

## Options / Props

| Return value | Meaning |
| --- | --- |
| `true` | The app is offline — a network request failed, or the browser fired an `offline` event. |
| `false` | The app is online, or rendering on the server. Also the initial value before hydration completes. |

## Notes

- Experimental — not recommended for production.
- Without `experimental.useOffline` enabled in `next.config.js`, this hook always returns `false`.
- Enabling `experimental.useOffline` turns on offline connectivity detection and automatic retry of blocked navigation, prefetch, and Server Action requests, and exposes this hook.
- Useful inside `loading.tsx` to explain why dynamic content is blocked while offline; retried automatically once connectivity is restored.
- Introduced in `v16.x.0`.

## Related

- [useOffline guide](../../guides/offline-support.md)
- [loading.js](../file-conventions/loading.md)
