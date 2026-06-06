# ShadowMaterial

A transparent material that can receive shadows while remaining invisible for everything else. Used to project shadows onto a transparent plane.

## Signature / Usage

```js
const geometry = new THREE.PlaneGeometry(2000, 2000);
geometry.rotateX(-Math.PI / 2);
const material = new THREE.ShadowMaterial();
material.opacity = 0.2;
const plane = new THREE.Mesh(geometry, material);
plane.position.y = -200;
plane.receiveShadow = true;
scene.add(plane);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | Color | `(0,0,0)` | Shadow color |
| `fog` | boolean | `true` | Affected by fog |
| `transparent` | boolean | `true` | Always transparent (overridden from `Material`) |
| `isShadowMaterial` | boolean | `true` | Read-only type testing flag |

## Notes

- `transparent` defaults to `true` (overrides base `Material` default of `false`)
- Use `opacity` (inherited from `Material`) to control shadow darkness
- The mesh must have `receiveShadow = true`
- Inherits all properties from [Material](./material.md)

## Related

- [Material](./material.md)
- [MeshBasicMaterial](./mesh-basic-material.md)
