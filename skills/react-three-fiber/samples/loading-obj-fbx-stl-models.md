---
source: https://r3f.docs.pmnd.rs/tutorials/loading-models
---

# Loading OBJ, FBX and STL Models

Load OBJ, FBX, and STL models by passing the matching three.js loader to `useLoader`.

```jsx
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { useLoader } from '@react-three/fiber'

function Scene() {
  const obj = useLoader(OBJLoader, '/Poimandres.obj')
  return <primitive object={obj} />
}
```

```jsx
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'

function Scene() {
  const fbx = useLoader(FBXLoader, '/Poimandres.fbx')
  return <primitive object={fbx} />
}
```

```jsx
import { useLoader } from '@react-three/fiber'
import { STLLoader } from 'three/addons/loaders/STLLoader.js'

function Scene() {
  const geometry = useLoader(STLLoader, '/model.stl')
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}
```

Computing vertex normals for STL (see Notes for smooth shading):

```jsx
function Scene() {
  const geometry = useLoader(STLLoader, '/model.stl')
  geometry.computeVertexNormals()
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}
```

## Notes

- `STLLoader` returns a `BufferGeometry`, not a scene or group, so attach it to your own `mesh` with a material.
- The official tutorial calls `geometry.computeVertexNormals()` (second STL snippet) but does not describe it as producing smooth shading. `STLLoader` returns a non-indexed geometry, so `computeVertexNormals()` alone yields per-face normals and the mesh still looks flat. For smooth shading, first share vertices with `BufferGeometryUtils.mergeVertices(geometry)` (from `three/examples/jsm/utils/BufferGeometryUtils.js`), then call `computeVertexNormals()`. This merge step is not in the official tutorial.
- The official tutorial also shows `useFBX` from `@react-three/drei` (`const fbx = useFBX('/Poimandres.fbx')`); drei is a separate package that this skill does not cover.
- The loaders (`OBJLoader` / `FBXLoader` / `STLLoader`) are three.js classes; see the threejs skill (loaders-addons).
