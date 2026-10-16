---
source: https://r3f.docs.pmnd.rs/api/objects#disposal
---

# Disposal

Freeing resources is a manual chore in three.js, but React is aware of object lifecycles, so React Three Fiber attempts to free resources for you by calling `object.dispose()`, if present, on all unmounted objects.

## Signature / Usage

If you manage assets yourself, globally or in a cache, switch it off with `dispose={null}` on meshes, materials, etc., or on parent containers like groups; it is then valid for the entire tree.

```jsx
const globalGeometry = new THREE.BoxGeometry()
const globalMaterial = new THREE.MeshBasicMaterial()

function Mesh() {
  return (
    <group dispose={null}>
      <mesh geometry={globalGeometry} material={globalMaterial} />
```

## Notes

- `primitive` does not dispose of the object it carries; see the primitive page.
- `dispose()` on geometries, materials and textures is three.js API; see the threejs skill.

## Related

- [primitive](./primitive.md)
- [attach](./attach.md)
