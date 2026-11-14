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
- Source: https://github.com/TanStack/router/blob/release-2026-11-08-0104/docs/start/framework/react/guide/environment-functions.md (tag `release-2026-11-08-0104`, `@tanstack/react-start` 1.169.5, fetched 2026-11-14)
- Adapted from the official docs: e2e fixture links in the troubleshooting text point to tag `release-2026-11-08-0104` instead of `main`, so they match the pinned snapshot.

### Troubleshooting

#### A loader works on refresh but throws during navigation

If a loader throws `createServerOnlyFn() functions can only be called on the server!` after clicking a link, check whether it calls a server-only helper directly. Route loaders also run in the browser during client navigation. `createServerOnlyFn` guards a local function, it does not send a request to the server.

Wrap the server work in `createServerFn` and call that function from the loader:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn, createServerOnlyFn } from '@tanstack/react-start'

const readOnlyOnServer = createServerOnlyFn(() => 'Read on the server')
const readThroughRpc = createServerFn().handler(() => readOnlyOnServer())

export const Route = createFileRoute('/example')({
  loader: () => readThroughRpc(),
})
```

The server function runs directly during SSR and makes a request to the server when called in the browser. Test both a direct page request and navigation from another route. A successful refresh alone does not exercise the browser loader.

The [execution-boundary tests](https://github.com/TanStack/router/blob/release-2026-11-08-0104/e2e/react-start/basic/tests/environment-functions.spec.ts) include the failing direct call and the working server-function version. See [Server Functions](./server-functions.md) for validation and middleware when the function accepts user input.

#### Browser code throws `window is not defined` on the server

This means browser-only code ran during server execution. Use the stack trace to find the first application or dependency module that reads `window`, `document`, or another browser API.

For a browser-only component, render it inside `ClientOnly` from `@tanstack/react-router` with a useful fallback. The Start compiler removes its children from the server bundle, which lets the bundler remove imports used only by those children. The [ClientOnly example](https://github.com/TanStack/router/blob/release-2026-11-08-0104/e2e/react-start/basic/src/routes/client-only.tsx) covers a component that reads `window` at module scope, and its [tests](https://github.com/TanStack/router/blob/release-2026-11-08-0104/e2e/react-start/basic/tests/client-only.spec.ts) check the server fallback and hydrated content.

A browser API used elsewhere, such as a route loader or server function, still needs the correct execution boundary. Move component side effects into an effect or event handler. For logic that needs different server and browser implementations, use `createIsomorphicFn` with both implementations. Wrapping a function in `createClientOnlyFn` does not defer its call until the browser, calling that wrapper on the server throws the client-only guard error instead.

If the stack points into build tooling or the error persists in a minimal app with the correct boundary, include that app and the installed Start and bundler versions in a [bug report](https://github.com/TanStack/router/issues/new/choose). A compiler or dependency bug needs a reproducible fix, not a blanket change to rendering mode.

## Related

- [Execution Model](./execution-model.md)
- [Code Execution Patterns](./code-execution-patterns.md)
- [Import Protection](./import-protection.md)
