---
source: https://r3f.docs.pmnd.rs/advanced/scaling-performance#instancing
---

# Instancing

Each mesh is a draw call, so be mindful of how many you employ: no more than 1000 as the very maximum, and optimally a few hundred or less. You can win performance back by reducing draw calls, for example by instancing repeating objects. This way you can have hundreds of thousands of objects in a single draw call.

## Signature / Usage

```jsx
function Instances({ count = 100000, temp = new THREE.Object3D() }) {
  const instancedMeshRef = useRef()
  useEffect(() => {
    // Set positions
    for (let i = 0; i < count; i++) {
      temp.position.set(Math.random(), Math.random(), Math.random())
      temp.updateMatrix()
      instancedMeshRef.current.setMatrixAt(i, temp.matrix)
    }
    // Update the instance
    instancedMeshRef.current.instanceMatrix.needsUpdate = true
  }, [])
  return (
    <instancedMesh ref={instancedMeshRef} args={[null, null, count]}>
      <boxGeometry />
      <meshPhongMaterial />
    </instancedMesh>
  )
}
```

## Notes

- The `<instancedMesh>` element wraps the three.js `InstancedMesh` class; its API (`setMatrixAt`, `instanceMatrix`, ...) belongs to the threejs skill.
- The docs point to the three.js InstancedMesh documentation for setup help.

## Related

- [reusing-geometries-materials](./reusing-geometries-materials.md)
- [level-of-detail](./level-of-detail.md)
