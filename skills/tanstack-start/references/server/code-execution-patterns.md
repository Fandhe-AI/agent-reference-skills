---
source: https://tanstack.com/start/latest/docs/framework/react/guide/code-execution-patterns
---

# Code Execution Patterns

A quick-start summary of the environment-control APIs (`createServerFn`, `createServerOnlyFn`, `createClientOnlyFn`, `createIsomorphicFn`) and the common implementation patterns / pitfalls around them. This page is the condensed companion to `execution-model.md`.

## Signature / Usage

```tsx
import {
  createServerFn,
  createServerOnlyFn,
  createClientOnlyFn,
  createIsomorphicFn,
} from '@tanstack/react-start'

// Server function (RPC call)
const getUsers = createServerFn().handler(async () => {
  return await db.users.findMany()
})

// Server-only utility (crashes on client)
const getSecret = createServerOnlyFn(() => process.env.API_SECRET)

// Client-only utility (crashes on server)
const saveToStorage = createClientOnlyFn((data: any) => {
  localStorage.setItem('data', JSON.stringify(data))
})

// Different implementations per environment
const logger = createIsomorphicFn()
  .server((msg) => console.log(`[SERVER]: ${msg}`))
  .client((msg) => console.log(`[CLIENT]: ${msg}`))
```

### Progressive enhancement

```tsx
function SearchForm() {
  const [query, setQuery] = useState('')

  return (
    <form action="/search" method="get">
      <input name="q" value={query} onChange={(e) => setQuery(e.target.value)} />
      <ClientOnly fallback={<button type="submit">Search</button>}>
        <SearchButton onSearch={() => search(query)} />
      </ClientOnly>
    </form>
  )
}
```

### Environment-aware storage

```tsx
const storage = createIsomorphicFn()
  .server((key: string) => {
    const fs = require('node:fs')
    return JSON.parse(fs.readFileSync('.cache', 'utf-8'))[key]
  })
  .client((key: string) => {
    return JSON.parse(localStorage.getItem(key) || 'null')
  })
```

## Notes

- Common problem: environment variable exposure — reading `process.env.SECRET_KEY` at module scope leaks it into the client bundle; wrap in `createServerOnlyFn()`.
- Common problem: incorrect loader assumptions — loaders run on both server and client, so server-only logic inside a `loader` must go through a server function instead.
- Common problem: hydration mismatches — non-deterministic values (dates, random) rendered directly cause server/client markup mismatches; compute them after mount (`useEffect`).
- This page overlaps heavily with `execution-model.md`; use `execution-model.md` for the fuller explanation (anti-patterns, security considerations, bundle analysis) and this page as the checklist form.

## Related

- [Execution Model](./execution-model.md)
- [Environment Functions](./environment-functions.md)
- [Import Protection](./import-protection.md)
