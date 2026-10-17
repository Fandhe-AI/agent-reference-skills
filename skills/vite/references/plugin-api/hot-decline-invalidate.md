---
source: https://vite.dev/guide/api-hmr#hot-invalidate-message-string
---

# hot.decline / hot.invalidate

`hot.decline()` is a no-op kept for backward compatibility; `hot.invalidate(message?)` forces an update to propagate to importers.

## Signature / Usage

```ts
invalidate(message?: string): void
```

```js
import.meta.hot.accept((module) => {
  // You may use the new module instance to decide whether to invalidate.
  if (cannotHandleUpdate(module)) {
    import.meta.hot.invalidate()
  }
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| message | `string` (optional) | Context on why the invalidation happened; logged in both the browser console and the terminal. |

## Notes

- `hot.decline()` is currently a noop, there for backward compatibility; it could change if a new usage appears. To indicate that a module is not hot-updatable, use `hot.invalidate()`.
- `hot.invalidate()`: a self-accepting module that cannot handle an HMR update at runtime makes the HMR server invalidate the caller's importers, as if the caller were not self-accepting.
- Always call `import.meta.hot.accept` even if you plan to call `invalidate` immediately afterwards, or the HMR client will not listen for future changes. Recommended: call `invalidate` within the `accept` callback.
- `hot.decline` is not declared on `ViteHotContext` in the v8.3.4 `types/hot.d.ts`; the guide page documents it as a no-op.

## Related

- [hot.accept](./hot-accept.md)
