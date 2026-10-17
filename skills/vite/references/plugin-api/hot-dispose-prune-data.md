---
source: https://vite.dev/guide/api-hmr#hot-dispose-cb
---

# hot.dispose / hot.prune / hot.data

Clean up side effects of an updated module (`dispose`), clean up when a module is no longer imported (`prune`), and persist state across HMR instances (`data`).

## Signature / Usage

```ts
readonly data: any
dispose(cb: (data: any) => void): void
prune(cb: (data: any) => void): void
```

```js
function setupSideEffect() {}

setupSideEffect()

if (import.meta.hot) {
  import.meta.hot.dispose((data) => {
    // cleanup side effect
  })
}
```

```js
function setupOrReuseSideEffect() {}

setupOrReuseSideEffect()

if (import.meta.hot) {
  import.meta.hot.prune((data) => {
    // cleanup side effect
  })
}
```

```js
// ok
import.meta.hot.data.someValue = 'hello'

// not supported
import.meta.hot.data = { someValue: 'hello' }
```

## Notes

- `hot.dispose`: for a self-accepting module, or one expected to be accepted by others, to clean up persistent side effects created by its updated copy.
- `hot.prune`: called when the module is no longer imported on the page. Use it when the source cleans up side effects itself on updates and only needs cleanup on removal. Vite currently uses this for `.css` imports.
- `hot.data`: one object per module path, persisted across successive instances of the same module during HMR. Mutations during module execution or through the `data` argument passed to `hot.dispose` are visible to the next instance.
- When a module is pruned, its `hot.dispose` and `hot.prune` callbacks receive the current data object; Vite clears the data afterwards. If imported again later, it receives a new empty data object.
- Re-assignment of `data` itself is not supported; mutate its properties instead so information added by other handlers is preserved.

## Related

- [hot.accept](./hot-accept.md)
