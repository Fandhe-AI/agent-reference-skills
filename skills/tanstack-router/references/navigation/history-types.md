---
source: https://tanstack.com/router/latest/docs/framework/react/guide/history-types
---

# History Types

TanStack Router relies on a `history` abstraction from `@tanstack/history`. A browser history instance is created automatically unless you supply your own via the `Router`'s `history` option.

## Signature / Usage

```ts
import { createMemoryHistory, createRouter } from '@tanstack/react-router'

const memoryHistory = createMemoryHistory({
  initialEntries: ['/'],
})

const router = createRouter({ routeTree, history: memoryHistory })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `createBrowserHistory()` | function | Default history type; uses the browser History API |
| `createHashHistory()` | function | Tracks history via a URL hash, for servers without SPA rewrite support |
| `createMemoryHistory({ initialEntries })` | function | Keeps history in memory; useful outside browsers or to avoid URL interaction |

## Notes

- For server-side rendering, see the SSR guide's automatic server history handling.

## Related

- [navigation.md](./navigation.md)
- [scroll-restoration.md](./scroll-restoration.md)
