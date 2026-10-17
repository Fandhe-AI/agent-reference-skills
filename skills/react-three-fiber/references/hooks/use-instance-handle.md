---
source: https://r3f.docs.pmnd.rs/api/additional-exports
---

# useInstanceHandle

Exposes react-internal local state from `instance.__r3f`.

## Signature / Usage

Docs table row (Additional Exports):

| export | usage |
| --- | --- |
| `useInstanceHandle` | Exposes react-internal local state from `instance.__r3f` |

Signature (from `packages/fiber/src/core/hooks.tsx`, tag v9.8.2):

```ts
export function useInstanceHandle<T>(ref: React.RefObject<T>): React.RefObject<Instance<T>> {
  const instance = React.useRef<Instance>(null!)
  React.useImperativeHandle(instance, () => (ref.current as unknown as Instance<T>['object']).__r3f!, [ref])
  return instance
}
```

## Notes

- Source doc comment: "this is an escape hatch to react-internal fields. Expect this to change significantly between versions."
- Takes a ref to a scene object and returns a ref to its `Instance` (the `__r3f` field). `Instance` is the reconciler type in `packages/fiber/src/core/reconciler.tsx`; its fields are not documented in the docs.
- Related source-only hook: `useStore()` returns the Canvas' Zustand store (`RootStore`), useful for transient updates; it is exported from the same file but is not listed in the docs hooks page.

## Related

- [useThree](./use-three.md)
