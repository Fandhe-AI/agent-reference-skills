---
source: https://r3f.docs.pmnd.rs/api/additional-exports
---

# buildGraph

Collects nodes and materials from a `THREE.Object3D`.

## Signature / Usage

Declarations from `packages/fiber/src/core/utils.tsx` (tag v9.8.2):

```ts
export interface ObjectMap {
  nodes: { [name: string]: THREE.Object3D }
  materials: { [name: string]: THREE.Material }
  meshes: { [name: string]: THREE.Mesh }
}

export function buildGraph(object: THREE.Object3D): ObjectMap {
  const data: ObjectMap = { nodes: {}, materials: {}, meshes: {} }
  if (object) {
    object.traverse((obj: any) => {
      if (obj.name) data.nodes[obj.name] = obj
      if (obj.material && !data.materials[obj.material.name]) data.materials[obj.material.name] = obj.material
      if (obj.isMesh && !data.meshes[obj.name]) data.meshes[obj.name] = obj
    })
  }
  return data
}
```

## Notes

- Nodes and meshes are keyed by object `name`; materials by material `name` (first occurrence wins).
- The `useGraph` hook wraps it: `React.useMemo(() => buildGraph(object), [object])`.

## Related

- [apply-props](./apply-props.md)
