---
source: https://r3f.docs.pmnd.rs/api/objects#piercing-into-nested-properties
---

# Piercing into nested properties

To reach into nested attributes (for instance `mesh.rotation.x`), use dash-case.

## Signature / Usage

```jsx
<mesh rotation-x={1} material-uniforms-resolution-value={[512, 512]} />
```

## Notes

- Piercing also applies to `attach` (for example `attach="attributes-position"`).
- The nested properties belong to three.js classes; see the threejs skill for the class APIs.

## Related

- [attach](./attach.md)
- [Shader material uniforms](./shader-material-uniforms.md)
