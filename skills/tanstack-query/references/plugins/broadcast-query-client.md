---
source: https://tanstack.com/query/latest/docs/framework/react/plugins/broadcastQueryClient
---

# broadcastQueryClient (Experimental)

Synchronizes a `QueryClient`'s state across browser tabs and windows via the BroadcastChannel API.

## Signature / Usage

```bash
npm install @tanstack/query-broadcast-client-experimental
```

```tsx
import { broadcastQueryClient } from '@tanstack/query-broadcast-client-experimental'

broadcastQueryClient({
  queryClient,
  broadcastChannel: 'my-app',
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `queryClient` | `QueryClient` | — | Instance to sync across tabs |
| `broadcastChannel` | string | `'tanstack-query'` | Custom channel name |
| `options` | object | — | BroadcastChannel API settings |
| `onBroadcastError` | function | — | Custom handler for serialization failures, receives event details (query hash, key) |

## Notes

- Experimental: breaking changes can happen in minor AND patch releases — pin to an exact patch version in production
- Data containing non-serializable values (`ReadableStream`, `File`, functions) is skipped from cross-tab sync; development builds warn in the console by default

## Related

- [persistQueryClient](./persist-query-client.md)
