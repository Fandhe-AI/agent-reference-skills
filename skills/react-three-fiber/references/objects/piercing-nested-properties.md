---
source: https://r3f.docs.pmnd.rs/api/objects#piercing-into-nested-properties
---

# Piercing into nested properties

To reach into nested attributes (for instance `mesh.rotation.x`), use dash-case.

## Signature / Usage

```jsx
<mesh rotation-x={1} material-uniforms-resolution-value={[512, 512]} />
```

Adapted (not in the official docs):

```jsx
import * as THREE from 'three'

<mesh rotation-x={1}>
  <shaderMaterial uniforms={{ resolution: { value: new THREE.Vector2() } }} uniforms-resolution-value={[512, 512]} />
</mesh>
```

## Notes

- The official one-liner assumes the mesh's material already has `uniforms.resolution` (e.g. a ShaderMaterial passed via the `material` prop); with the default MeshBasicMaterial the nested target does not exist and applyProps cannot resolve it (see apply-props.md).
- Piercing also applies to `attach` (for example `attach="attributes-position"`).
- The nested properties belong to three.js classes; see the threejs skill for the class APIs.

## Related

- [attach](./attach.md)
- [Shader material uniforms](./shader-material-uniforms.md)
