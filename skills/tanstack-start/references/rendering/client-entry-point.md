---
source: https://tanstack.com/start/latest/docs/framework/react/guide/client-entry-point
---

# Client Entry Point

Optional `src/client.tsx` file that hydrates the client-side app once the initial server-rendered document arrives, using the `StartClient` component. If omitted, TanStack Start provides a default.

## Signature / Usage

```tsx
// src/client.tsx
import { StartClient } from '@tanstack/react-start/client'
import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'

hydrateRoot(
  document,
  <StrictMode>
    <StartClient />
  </StrictMode>,
)
```

## Notes

- Can be wrapped with error boundaries around `<StartClient />` for graceful client-side error handling.
- Gives full control over client-side initialization (e.g. dev-only UI via `import.meta.env.DEV`) while still integrating with SSR.

## Related

- [Server Entry Point](./server-entry-point.md)
