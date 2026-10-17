---
source: https://r3f.docs.pmnd.rs/advanced/scaling-performance#re-using-geometries-and-materials
---

# Re-using geometries and materials

Each geometry and material means additional overhead for the GPU. Try to re-use resources if you know they will repeat.

## Signature / Usage

You could do this globally:

```jsx
const red = new THREE.MeshLambertMaterial({ color: "red" })
const sphere = new THREE.SphereGeometry(1, 28, 28)

function Scene() {
  return (
    <>
      <mesh geometry={sphere} material={red} />
      <mesh position={[1, 2, 3]} geometry={sphere} material={red} />
```

If you create a material or color in global space - outside of React Three Fiber's `Canvas` context - you should enable ColorManagement in three.js. This will allow certain conversions (for hexadecimal and CSS colors in sRGB) to be made automatically, producing correct colors in all cases.

```jsx
import * as THREE from 'three'

// r150
THREE.ColorManagement.enabled = true

// r139-r149
THREE.ColorManagement.legacyMode = false
```

### Caching with `useLoader`

Every resource that is loaded with useLoader is cached automatically. If you access a resource via useLoader with the same URL, throughout the component tree, then you will always refer to the same asset and thereby re-use it. This is especially useful if you run your GLTF assets through GLTFJSX because it links up geometries and materials and thereby creates re-usable models.

```jsx
function Shoe(props) {
  const { nodes, materials } = useLoader(GLTFLoader, "/shoe.glb")
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.shoe.geometry} material={materials.canvas} />
    </group>
  )
}

<Shoe position={[1, 2, 3]} />
<Shoe position={[4, 5, 6]} />
```

## Notes

- Geometry, material and ColorManagement class APIs belong to the threejs skill; `GLTFLoader` lives in threejs loaders-addons.

## Related

- [instancing](./instancing.md)
- [pitfalls-mounting-and-objects](./pitfalls-mounting-and-objects.md)
