# Options

Options that control how nuqs updates the URL. They can be set at the adapter level, the hook / parser level, or the call level.

## Signature / Usage

Default behaviour:

- Client-only updates (no server requests): `shallow: true`
- Replaces the current history entry: `history: 'replace'`
- No scrolling: `scroll: false`
- Throttle rate adapted to the browser (50ms; Safari 120ms)

```tsx
// Hook level, via the parser builder pattern
const [state, setState] = useQueryState(
  'foo',
  parseAsString.withOptions({ history: 'push' })
)

// Call level (overrides hook / parser options)
setState('bar', { scroll: true })
```

Precedence (highest first):

1. **Call-level**: `setState('value', { history: 'push' })`
2. **Hook / parser-level**: `parseAsString.withOptions({ ... })`
3. **Adapter defaults**: `<NuqsAdapter defaultOptions={{...}}>`

### `history`

`'replace'`: squashes updates into a single history entry (like `git squash`).
`'push'`: adds a new history entry per update, so the Back button navigates state changes.

```tsx
useQueryState('foo', { history: 'push' })
```

### `shallow`

`true`: client-only update, no network request (equivalent to the Next.js router `shallow: true`). This is the default.
`false`: notifies the server (re-runs loaders / RSC).

```tsx
useQueryState('foo', { shallow: false })
```

Pair `shallow: false` with: `searchParams` page prop (Next.js app router), `getServerSideProps` (Next.js pages router), a `loader` function (Remix & React Router). It has no effect in a React SPA.

In React Router based frameworks, the stock `useSearchParams` does not reflect shallow-updated search params. Use `useOptimisticSearchParams`:

```tsx
// React Router v8
import { useOptimisticSearchParams } from 'nuqs/adapters/react-router/v8'
// React Router v7
import { useOptimisticSearchParams } from 'nuqs/adapters/react-router/v7'
// React Router v6 (EOL, removed in nuqs@3.0.0)
import { useOptimisticSearchParams } from 'nuqs/adapters/react-router/v6'

const searchParams = useOptimisticSearchParams()
// read-only, reactive to all URL changes
```

### `scroll`

`true`: scroll to the top of the page on update.
`false`: keep the scroll position.

```tsx
useQueryState('foo', { scroll: true })
```

### `limitUrlUpdates`

Rate-limits URL updates and server requests. The state returned by the hooks is always updated instantly.

Throttle (first update emitted immediately, then batched regularly):

```tsx
import { throttle } from 'nuqs'

useQueryState('foo', {
  shallow: false,
  limitUrlUpdates: throttle(1000)
  // or: { method: 'throttle', timeMs: 1000 }
})
```

Debounce (URL update delayed until changes stop; suited to search inputs and sliders):

```tsx
import { useQueryState, parseAsString, debounce } from 'nuqs'

const [search, setSearch] = useQueryState(
  'q',
  parseAsString.withDefault('').withOptions({ shallow: false })
)

<input
  value={search}
  onChange={(e) =>
    setSearch(e.target.value, {
      // Immediate update if resetting, otherwise debounce at 500ms
      limitUrlUpdates: e.target.value === '' ? undefined : debounce(500)
    })
  }
  onKeyPress={(e) => {
    if (e.key === 'Enter') {
      setSearch(e.target.value) // immediate update
    }
  }}
/>
```

Reset to the default rate limit:

```tsx
import { debounce, defaultRateLimit } from 'nuqs'

const [, setState] = useQueryState('foo', {
  limitUrlUpdates: debounce(1000)
})

// This state update isn't debounced
setState('bar', { limitUrlUpdates: defaultRateLimit })
```

### `clearOnDefault`

`true`: removes the key from the URL when the state equals the default value.
`false`: keeps the key in the URL even at the default value.

Comparison uses `===` reference equality. Custom parsers for non-primitive types should provide an `eq` function:

```tsx
const dateParser = createParser({
  parse: (value: string) => new Date(value.slice(0, 10)),
  serialize: (date: Date) => date.toISOString().slice(0, 10),
  eq: (a: Date, b: Date) => a.getTime() === b.getTime()
})
```

### `startTransition`

Requires `shallow: false`. Wraps the server re-render (RSC) in a transition to get a loading state:

```tsx
const [isLoading, startTransition] = React.useTransition()
const [query, setQuery] = useQueryState(
  'query',
  parseAsString.withOptions({ startTransition, shallow: false })
)
```

### Adapter props: global defaults (`<NuqsAdapter>`, v2.5.0+)

```tsx
<NuqsAdapter
  defaultOptions={{
    history: 'push',
    shallow: false,
    scroll: true,
    clearOnDefault: false,
    limitUrlUpdates: throttle(250)
  }}
>
  {children}
</NuqsAdapter>
```

### Adapter props: `processUrlSearchParams` (v2.6.0+)

Middleware called after `URLSearchParams` are merged and before they are sent to the adapter for the URL update:

```tsx
<NuqsAdapter
  processUrlSearchParams={(search) => {
    search.sort() // modify in place, or return a copy
    return search
  }}
>
  {children}
</NuqsAdapter>
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `history` | `'replace' \| 'push'` | `'replace'` | `'replace'` squashes updates into one history entry, `'push'` adds a new entry per update |
| `shallow` | `boolean` | `true` | `true` updates the client only, `false` notifies the server (re-runs loaders / RSC) |
| `scroll` | `boolean` | `false` | `true` scrolls to the top of the page on update |
| `limitUrlUpdates` | `throttle(ms) \| debounce(ms) \| defaultRateLimit` | Browser-adapted throttle (50ms; Safari 120ms; older Safari 320ms) | Rate-limits URL updates and server requests. Hook state is always updated instantly |
| `clearOnDefault` | `boolean` | `true` (changed from `false` in v2.0.0) | `true` removes the key from the URL when the state equals the default |
| `startTransition` | `React.startTransition` function | — | Requires `shallow: false`. Wraps the server re-render in a transition |
| `defaultOptions` (adapter prop) | `object` | — | Global defaults for the options above (v2.5.0+) |
| `processUrlSearchParams` (adapter prop) | `(search: URLSearchParams) => URLSearchParams` | — | Middleware for merged search params before the URL update (v2.6.0+) |

## Notes

- Don't break the Back button: use `history: 'push'` only for navigation-like experiences (tabs, modals). Setting it globally via `defaultOptions` adds a history entry for every search param update across the app.
- `limitUrlUpdates`: values below 50ms are ignored. If multiple hooks set different throttle values in the same event loop tick, the highest value is used. `+Infinity` disables URL / server updates while hooks stay in sync with each other.
- Debounce only makes sense for server-side data fetching (RSC and loaders combined with `shallow: false`). For client-side fetching (e.g. TanStack Query), debounce the state returned by the hooks instead.
- `throttleMs` is deprecated since v2.5.0: replace `{ throttleMs: 100 }` with `{ limitUrlUpdates: throttle(100) }`.
- In nuqs v1, passing `startTransition` automatically set `shallow: false`. In v2+ it must be set explicitly.
- In React Router v7+ data routers, `navigate()` returns a Promise, so `isLoading` stays true until route loaders settle (requires React 19). In declarative routers, React Router v6 and Remix, `isLoading` only covers the URL update.
- Remix v2 is EOL: `nuqs/adapters/remix` will be removed in nuqs@3.0.0. React Router v6 is EOL: `nuqs/adapters/react-router/v6` (and the unpinned `nuqs/adapters/react-router`) will be removed in nuqs@3.0.0. Migrate to React Router v7 / v8.

## Related

- [useQueryState](../hooks/useQueryState.md)
- [useQueryStates](../hooks/useQueryStates.md)
