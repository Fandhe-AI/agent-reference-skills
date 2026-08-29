---
source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions
---

# Environment Functions (createServerOnlyFn / createIsomorphicFn)

Restrict a function to one execution environment, or give it a different implementation per environment, without creating an RPC boundary.

```tsx
// src/utils/env.ts
import { createServerOnlyFn, createIsomorphicFn } from '@tanstack/react-start'

// Throws if accidentally called on the client
export const readSecretConfig = createServerOnlyFn(() => process.env.API_SECRET)

// Runs different code depending on where it's called from
export const getPlatform = createIsomorphicFn()
  .server(() => 'server')
  .client(() => 'client')
```

```tsx
// src/routes/index.tsx
import { getPlatform, readSecretConfig } from '../utils/env'

export function Widget() {
  const platform = getPlatform() // 'server' during SSR, 'client' after hydration
  return <div>Rendered from: {platform}</div>
}
```

## Notes

- Unlike `createServerFn()`, these never make a network request — the correct branch is selected/tree-shaken at build time, so calling the wrong side of a partial `createIsomorphicFn()` is a same-process no-op (returns `undefined`).
- `createServerOnlyFn()` / `createClientOnlyFn()` throw loudly on the wrong environment instead of no-op-ing, which is safer for secrets like `readSecretConfig` above.
- Use these for env-gated helpers and small platform branches; use `createServerFn()` (see `server-function-crud.md`) whenever server-only business logic needs to be callable from client components.
