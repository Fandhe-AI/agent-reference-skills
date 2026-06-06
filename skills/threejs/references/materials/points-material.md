# PointsMaterial

A material for rendering point clouds (`Points` objects).

## Signature / Usage

```js
const vertices = [];
for (let i = 0; i < 10000; i++) {
  vertices.push(
    THREE.MathUtils.randFloatSpread(2000),
    THREE.MathUtils.randFloatSpread(2000),
    THREE.MathUtils.randFloatSpread(2000),
  );
}
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
const material = new THREE.PointsMaterial({ color: 0x888888, size: 2 });
const points = new THREE.Points(geometry, material);
scene.add(points);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | Color | `(1,1,1)` | Point color |
| `size` | number | `1` | Point size in pixels; may be capped by GPU limits |
| `sizeAttenuation` | boolean | `true` | Scale size by camera depth (perspective only) |
| `map` | Texture | `null` | Color map; may include alpha channel |
| `alphaMap` | Texture | `null` | Grayscale opacity map |
| `fog` | boolean | `true` | Affected by fog |
| `isPointsMaterial` | boolean | `true` | Read-only type testing flag |

## Notes

- Point size may be clamped by the GPU's `gl.ALIASED_POINT_SIZE_RANGE`
- Inherits all properties from [Material](./material.md)

## Related

- [Material](./material.md)
- [PointsNodeMaterial](./node-materials.md)
