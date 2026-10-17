---
source: https://github.com/pmndrs/react-three-fiber/blob/v9.8.2/packages/fiber/src/core/index.tsx
---

# Other exports (getRootState / dispose / context / reconciler / unmountComponentAtNode)

Public exports listed in `packages/fiber/src/core/index.tsx` that are not in the docs' Additional Exports table.

## Signature / Usage

Export lines from `packages/fiber/src/core/index.tsx` (tag v9.8.2):

```ts
export { reconciler, flushSync } from './reconciler'
export { _roots, createRoot, unmountComponentAtNode } from './root'
export { context } from './store'
export { applyProps, getRootState, dispose, act, buildGraph } from './utils'
```

Declarations:

```ts
// core/utils.tsx
export function getRootState<T extends THREE.Object3D = THREE.Object3D>(obj: T) {
  return (obj as Instance<T>['object']).__r3f?.root.getState()
}

export interface Disposable {
  type?: string
  dispose?: () => void
}
export function dispose<T extends Disposable>(obj: T): void

// core/root.tsx
export function unmountComponentAtNode<TCanvas extends HTMLCanvasElement | OffscreenCanvas>(
  canvas: TCanvas,
  callback?: (canvas: TCanvas) => void,
): void

// core/store.ts
export const context = /* @__PURE__ */ React.createContext<RootStore>(null!)
```

## Options / Props

| Name | Description |
| --- | --- |
| getRootState | Returns the instance's root state (`__r3f?.root.getState()`) |
| dispose | Calls `dispose()` on an object and its properties (skips `type === 'Scene'`) |
| context | React context holding the root store |
| reconciler | The react-reconciler instance |
| unmountComponentAtNode | Unmounts the root registered for a canvas |
| _roots | Internal map of roots keyed by canvas |

## Notes

- `reconciler` and `_roots` are internal-leaning exports; the docs do not describe them.
- `unmountComponentAtNode` tears the root down asynchronously: it waits for a pending `root.ready`, then disposes. Teardown errors are logged as `[R3F] Error while unmounting root; teardown may be incomplete:`.
- Types exported alongside: `ObjectMap`, `Camera`, `Disposable`, `Act`, `GlobalRenderCallback`, `GlobalEffectType`, `ConstructorRepresentation`, `Catalogue`, `InjectState`, `ReconcilerRoot`, `RootState`, `RootStore`, among others (see the typescript category).

## Related

- [flush-sync](./flush-sync.md)
- [act](./act.md)
