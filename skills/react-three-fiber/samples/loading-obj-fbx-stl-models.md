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

Adapted (not in the official tutorial): smooth shading by merging shared vertices.

```jsx
import { useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { STLLoader } from 'three/addons/loaders/STLLoader.js'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'

function Scene() {
  const geometry = useLoader(STLLoader, '/model.stl')
  const merged = useMemo(() => {
    const g = geometry.clone()
    g.deleteAttribute('normal')
    const m = BufferGeometryUtils.mergeVertices(g)
    m.computeVertexNormals()
    return m
  }, [geometry])
  return (
    <mesh geometry={merged}>
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}
```

## Notes

- `STLLoader` returns a `BufferGeometry`, not a scene or group, so attach it to your own `mesh` with a material.
- The official tutorial calls `geometry.computeVertexNormals()` (second STL snippet) but does not describe it as producing smooth shading. `STLLoader` returns a non-indexed geometry, so `computeVertexNormals()` alone yields per-face normals and the mesh still looks flat.
- The third snippet is adapted and not in the official tutorial. `mergeVertices` compares all attributes, so the per-face `normal` set by `STLLoader` must be removed first; it returns a new geometry, which is the one to pass to `mesh`. The processing runs in `useMemo` on a clone so the cached `useLoader` result is not mutated on every render.
- The official tutorial also shows `useFBX` from `@react-three/drei` (`const fbx = useFBX('/Poimandres.fbx')`); drei is a separate package that this skill does not cover.
- The loaders (`OBJLoader` / `FBXLoader` / `STLLoader`) are three.js classes; see the threejs skill (loaders-addons).
