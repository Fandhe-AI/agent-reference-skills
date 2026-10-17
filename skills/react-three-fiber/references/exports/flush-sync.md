---
source: https://r3f.docs.pmnd.rs/api/additional-exports
---

# flushSync

Force React to flush any updates synchronously and immediately.

## Signature / Usage

Declaration and doc comment from `packages/fiber/src/core/reconciler.tsx` (tag v9.8.2):

```ts
/**
 * Force React to flush any updates inside the provided callback synchronously and immediately.
 * All the same caveats documented for react-dom's `flushSync` apply here (see https://react.dev/reference/react-dom/flushSync).
 * Nevertheless, sometimes one needs to render synchronously, for example to keep DOM and 3D changes in lock-step without
 * having to revert to a non-React solution. Note: this will only flush updates within the `Canvas` root.
 */
export function flushSync<R>(fn: () => R): R {
  // @ts-ignore - reconciler types are not maintained
  return reconciler.flushSyncFromReconciler(fn)
}
```

## Notes

- Only updates within the `Canvas` root are flushed (not react-dom updates).
- 9.8.0: the first `root.render()` mounts synchronously once the root is configured, "with the same caveats as `flushSync`" (canvas docs).

## Related

- [create-portal](./create-portal.md)
