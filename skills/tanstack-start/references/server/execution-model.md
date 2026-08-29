---
source: https://tanstack.com/start/latest/docs/framework/react/guide/execution-model
---

# Execution Model

TanStack Start code is isomorphic by default: the same module runs on both server and client unless explicitly scoped. Route loaders, plain functions, and most app code execute in both environments during SSR and client-side navigation; a small set of APIs (`createServerFn`, `createServerOnlyFn`, `createClientOnlyFn`, `createIsomorphicFn`) give explicit control over which environment code runs in.

## Signature / Usage

```tsx
// ✅ This runs on BOTH server and client
function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

// ✅ Route loaders are ISOMORPHIC
export const Route = createFileRoute('/products')({
  loader: async () => {
    // This runs on server during SSR AND on client during navigation
    const response = await fetch('/api/products')
    return response.json()
  },
})
```

### RPC vs server-only utility

```tsx
import { createServerFn, createServerOnlyFn } from '@tanstack/react-start'

// RPC: Server execution, callable from client
const updateUser = createServerFn({ method: 'POST' })
  .validator((data: UserData) => data)
  .handler(async ({ data }) => {
    return await db.users.update(data)
  })

// Utility: Server-only, client crashes if called
const getEnvVar = createServerOnlyFn(() => process.env.DATABASE_URL)
```

### Client-only

```tsx
import { createClientOnlyFn } from '@tanstack/react-start'
import { ClientOnly } from '@tanstack/react-router'

const saveToStorage = createClientOnlyFn((key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
})

function Analytics() {
  return (
    <ClientOnly fallback={null}>
      <GoogleAnalyticsScript />
    </ClientOnly>
  )
}
```

### Environment-specific implementation

```tsx
import { createIsomorphicFn } from '@tanstack/react-start'

const getDeviceInfo = createIsomorphicFn()
  .server(() => ({ type: 'server', platform: process.platform }))
  .client(() => ({ type: 'client', userAgent: navigator.userAgent }))
```

### Detecting hydration

```tsx
import { useHydrated } from '@tanstack/react-router'

function TimeZoneDisplay() {
  const hydrated = useHydrated()
  const timeZone = hydrated
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : 'UTC'

  return <div>Your timezone: {timeZone}</div>
}
```

### Marking a whole file server-only or client-only

```ts
// src/lib/secrets.ts (filename can't be *.server.ts)
import '@tanstack/react-start/server-only'

export function getApiKey() {
  return process.env.API_KEY
}
```

```ts
// src/lib/storage.ts
import '@tanstack/react-start/client-only'

export function savePreferences(prefs: Record<string, string>) {
  localStorage.setItem('prefs', JSON.stringify(prefs))
}
```

## Notes

- `createServerFn` is an RPC pattern: server execution, but the client can call it (produces a network request). `createServerOnlyFn` / `createClientOnlyFn` throw if called from the wrong environment instead.
- Anti-pattern: reading `process.env.SECRET` at module scope leaks it to the client bundle and is `undefined` under Worker SSR runtimes; wrap the read in `createServerOnlyFn()`, or read it inside `.handler()` / a middleware `.server()` / a server-route handler.
- Anti-pattern: assuming a `loader` is server-only — loaders are isomorphic and run on the client during navigation too.
- Anti-pattern: rendering environment-dependent values (e.g. `new Date().toLocaleString()`) directly in a component body causes hydration mismatches; compute them in `useEffect` instead.
- `import '@tanstack/react-start/server-only'` / `client-only` mark an entire file as environment-restricted without requiring a `*.server.ts` filename convention.
- See `code-execution-patterns.md` for the condensed quick-start version of the same APIs, and `environment-functions.md` for the full `createIsomorphicFn` / `createServerOnlyFn` / `createClientOnlyFn` reference.

## Related

- [Code Execution Patterns](./code-execution-patterns.md)
- [Environment Functions](./environment-functions.md)
- [Import Protection](./import-protection.md)
- [Server Functions](./server-functions.md)
