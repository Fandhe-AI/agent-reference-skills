# LineBasicMaterial

A material for rendering line primitives (`Line`, `LineSegments`, `LineLoop`).

## Signature / Usage

```js
const material = new THREE.LineBasicMaterial({ color: 0xffffff });
const line = new THREE.Line(geometry, material);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `color` | Color | `(1,1,1)` | Line color |
| `map` | Texture | `null` | Color map; modulates `color` |
| `fog` | boolean | `true` | Affected by fog |
| `linewidth` | number | `1` | Line thickness (SVGRenderer only; WebGL/WebGPU always 1px) |
| `linecap` | string | `'round'` | Line end style: `'butt'`, `'round'`, `'square'` (SVGRenderer only) |
| `linejoin` | string | `'round'` | Line joint style: `'round'`, `'bevel'`, `'miter'` (SVGRenderer only) |
| `isLineBasicMaterial` | boolean | `true` | Read-only type testing flag |

## Notes

- `linewidth` > 1 is **not** supported in WebGL or WebGPU renderers due to hardware limitations; lines always render as 1 pixel wide
- For wider lines, use the `Line2` addon (`examples/jsm/lines/Line2.js`) with `Line2NodeMaterial`
- Inherits all properties from [Material](./material.md)

## Related

- [Material](./material.md)
- [LineDashedMaterial](./line-dashed-material.md)
