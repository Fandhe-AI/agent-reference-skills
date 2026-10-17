---
source: https://r3f.docs.pmnd.rs/api/additional-exports
---

# createPortal

Creates a portal (it's a React feature for re-parenting): renders children into a given `THREE.Object3D` container with its own scene, raycaster and pointer.

## Signature / Usage

Declarations from `packages/fiber/src/core/portal.tsx` (tag v9.8.2):

```ts
export type InjectState = Partial<
  Omit<RootState, 'events'> & {
    events?: {
      enabled?: boolean
      priority?: number
      compute?: ComputeFunction
      connected?: any
    }
  }
>

export function createPortal(
  children: React.ReactNode,
  container: THREE.Object3D,
  state?: InjectState,
): React.JSX.Element
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| children | `React.ReactNode` | Content rendered inside the portal |
| container | `THREE.Object3D` | Target container; used as the portal's `scene` |
| state | `InjectState` | Optional overrides of root state (including `events` and `size`) |

## Notes

- Source behavior: the portal inherits the parent root state, then applies its own `scene` (the container), `raycaster`, `pointer` and `previousRoot`; `events`, `size` and `viewport` are merged with the overrides.
- 9.8.2: portal memory leaks fixed; the portal's root state is no longer held by the parent after the portal unmounts ([GitHub Release v9.8.2](https://github.com/pmndrs/react-three-fiber/releases/tag/v9.8.2)).
- 9.8.1: portal state is kept so `<Activity>` can preserve it (source comment: "Keep the store in state so Activity can preserve it").

## Related

- [flush-sync](./flush-sync.md)
