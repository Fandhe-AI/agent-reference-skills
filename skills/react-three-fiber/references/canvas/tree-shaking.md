---
source: https://r3f.docs.pmnd.rs/api/canvas#tree-shaking
---

# Tree-shaking

New with v8, the underlying reconciler no longer pulls in the THREE namespace automatically. This enables a granular catalogue which also enables tree-shaking via the `extend` API.

## Signature / Usage

```jsx
import { extend, createRoot } from '@react-three/fiber'
import { Mesh, BoxGeometry, MeshStandardMaterial } from 'three'

extend({ Mesh, BoxGeometry, MeshStandardMaterial })

createRoot(canvas).render(
  <>
    <mesh>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  </>,
)
```

There's an [official babel plugin](https://github.com/pmndrs/react-three-babel) which will do this for you automatically:

```jsx
// In:

import { createRoot } from '@react-three/fiber'

createRoot(canvasNode).render(
  <mesh>
    <boxGeometry />
    <meshStandardMaterial />
  </mesh>,
)

// Out:

import { createRoot, extend } from '@react-three/fiber'
import { Mesh as _Mesh, BoxGeometry as _BoxGeometry, MeshStandardMaterial as _MeshStandardMaterial } from 'three'

extend({
  Mesh: _Mesh,
  BoxGeometry: _BoxGeometry,
  MeshStandardMaterial: _MeshStandardMaterial,
})

createRoot(canvasNode).render(
  <mesh>
    <boxGeometry />
    <meshStandardMaterial />
  </mesh>,
)
```

## Related

- [createRoot](./create-root.md)
