# LineDashedMaterial

A material for rendering dashed lines. Extends `LineBasicMaterial` with dash/gap pattern controls.

## Signature / Usage

```js
const material = new THREE.LineDashedMaterial({
  color: 0xffffff,
  dashSize: 3,
  gapSize: 1,
  scale: 1,
});
const line = new THREE.Line(geometry, material);
// Required: compute line distances for dashing
line.computeLineDistances();
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `dashSize` | number | `3` | Size of each dash |
| `gapSize` | number | `1` | Size of each gap between dashes |
| `scale` | number | `1` | Scale factor for the dashed pattern |
| `isLineDashedMaterial` | boolean | `true` | Read-only type testing flag |

Inherits all `LineBasicMaterial` properties (`color`, `map`, `fog`, `linewidth`, etc.).

## Notes

- You **must** call `line.computeLineDistances()` after setting geometry for dashes to appear correctly
- `linewidth` > 1 is not supported in WebGL/WebGPU (see [LineBasicMaterial](./line-basic-material.md))
- Inherits from [LineBasicMaterial](./line-basic-material.md) → [Material](./material.md)

## Related

- [LineBasicMaterial](./line-basic-material.md)
- [Material](./material.md)
