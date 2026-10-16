---
source: https://r3f.docs.pmnd.rs/api/hooks#usegraph
---

# useGraph

Convenience hook which creates a memoized, named object/material collection from any `Object3D`.

## Signature / Usage

```jsx
import { useLoader, useGraph } from '@react-three/fiber'

function Model(url) {
  const scene = useLoader(OBJLoader, url)
  const { nodes, materials } = useGraph(scene)
  return <mesh geometry={nodes.robot.geometry} material={materials.metal} />
}
```

Signature (from `packages/fiber/src/core/hooks.tsx`, tag v9.8.2):

```ts
export function useGraph(object: THREE.Object3D): ObjectMap {
  return React.useMemo(() => buildGraph(object), [object])
}
```

## Notes

- The result is memoized on `object` and produced by `buildGraph` (exported from `@react-three/fiber`).
- `Object3D` is a three.js class documented in the threejs skill.

## Related

- [useLoader](./use-loader.md)
