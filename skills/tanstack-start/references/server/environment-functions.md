---
source: https://tanstack.com/start/latest/docs/framework/react/guide/environment-functions
---

# Environment Functions

`createIsomorphicFn()`, `createServerOnlyFn()`, and `createClientOnlyFn()` let a single function definition behave differently — or be restricted — depending on whether it executes on the server or the client.

## Signature / Usage

### `createIsomorphicFn` — complete implementation

```tsx
import { createIsomorphicFn } from '@tanstack/react-start'

const getEnv = createIsomorphicFn()
  .server(() => 'server')
  .client(() => 'client')

const env = getEnv()
// On the server, it returns 'server'.
// On the client, it returns 'client'.
```

### Partial implementation

```tsx
const serverImplementationOnly = createIsomorphicFn().server(() => 'server')

const server = serverImplementationOnly()
// On the server, it returns 'server'.
// On the client, it is no-op (returns undefined)
```

```tsx
const clientImplementationOnly = createIsomorphicFn().client(() => 'client')

const client = clientImplementationOnly()
// On the server, it is no-op (returns undefined)
// On the client, it returns 'client'.
```

### No implementation

```tsx
const noImplementation = createIsomorphicFn()

const noop = noImplementation()
// On both client and server, it is no-op (returns undefined)
```

### `createServerOnlyFn` / `createClientOnlyFn`

```tsx
import { createServerOnlyFn } from '@tanstack/react-start'

const foo = createServerOnlyFn(() => 'bar')

foo() // On server: returns "bar"
// On client: throws "createServerOnlyFn() functions can only be called on the server!"
```

```tsx
import { createClientOnlyFn } from '@tanstack/react-start'

const foo = createClientOnlyFn(() => 'bar')

foo() // On client: returns "bar"
// On server: throws "createClientOnlyFn() functions can only be called on the client!"
```

## Options / Props

### Method chain (`createIsomorphicFn`)

| Method | Description |
|--------|-------------|
| `.server(fn)` | Implementation used when executed on the server |
| `.client(fn)` | Implementation used when executed on the client |

## Notes

- Unlike `createServerFn`, these are not RPC boundaries — no network request is made; the correct implementation is selected/eliminated at build time (tree-shaken), or is a same-process no-op if the other side's branch isn't implemented.
- `createServerOnlyFn` / `createClientOnlyFn` throw on the wrong environment rather than silently no-op-ing, making misuse fail loudly.
- The unused branch of `createIsomorphicFn`, and the entire body of `createServerOnlyFn` / `createClientOnlyFn`, are eliminated from the opposite bundle via tree shaking.

## Related

- [Execution Model](./execution-model.md)
- [Code Execution Patterns](./code-execution-patterns.md)
- [Import Protection](./import-protection.md)
