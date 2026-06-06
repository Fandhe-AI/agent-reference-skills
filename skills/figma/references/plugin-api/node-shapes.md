# Shape Nodes

Simple geometric shape nodes: `RectangleNode`, `EllipseNode`, `PolygonNode`, `StarNode`, `LineNode`. All inherit base scene node and geometry properties.

## Signature / Usage

```ts
const rect = figma.createRectangle();
rect.resize(200, 100);
rect.cornerRadius = 8;
rect.fills = [{ type: 'SOLID', color: { r: 0, g: 0.47, b: 1 } }];

const ellipse = figma.createEllipse();
ellipse.arcData = { startingAngle: 0, endingAngle: Math.PI, innerRadius: 0.5 };

const polygon = figma.createPolygon();
polygon.pointCount = 6; // hexagon

const star = figma.createStar();
star.pointCount = 5;
star.innerRadius = 0.4;
```

## Options / Props

### RectangleNode (`type: 'RECTANGLE'`)

| Name | Type | Description |
|------|------|-------------|
| `cornerRadius` | `number \| typeof figma.mixed` | Uniform corner radius |
| `topLeftRadius` / `topRightRadius` / `bottomLeftRadius` / `bottomRightRadius` | `number` | Per-corner radii |
| `cornerSmoothing` | `number` | Corner smoothing 0–1 |

### EllipseNode (`type: 'ELLIPSE'`)

| Name | Type | Description |
|------|------|-------------|
| `arcData` | `ArcData` | `{ startingAngle, endingAngle, innerRadius }` for pie/donut shapes |

### PolygonNode (`type: 'POLYGON'`)

| Name | Type | Description |
|------|------|-------------|
| `pointCount` | `number` | Number of polygon vertices (min 3; default 3 = triangle) |
| `cornerRadius` | `number` | Rounded corners |

### StarNode (`type: 'STAR'`)

| Name | Type | Description |
|------|------|-------------|
| `pointCount` | `number` | Number of star points |
| `innerRadius` | `number` | Inner radius ratio 0–1 |
| `cornerRadius` | `number` | Corner smoothing |

### LineNode (`type: 'LINE'`)

A line is a zero-height node; set `width` for length. Use `strokeCap` for endpoints.

| Name | Type | Description |
|------|------|-------------|
| `strokeCap` | `StrokeCap` | Endpoint style: `'NONE' \| 'ROUND' \| 'SQUARE' \| 'ARROW_LINES' \| 'ARROW_EQUILATERAL'` |

### Shared Geometry (all shapes)

| Name | Type | Description |
|------|------|-------------|
| `fills` | `ReadonlyArray<Paint>` | Fill paints |
| `strokes` | `ReadonlyArray<Paint>` | Stroke paints |
| `strokeWeight` | `number` | Stroke width |
| `strokeAlign` | `'INSIDE' \| 'OUTSIDE' \| 'CENTER'` | Stroke alignment |
| `effects` | `ReadonlyArray<Effect>` | Shadow/blur effects |
| `opacity` | `number` | 0–1 |
| `blendMode` | `BlendMode` | Blend mode |

## Notes

- All shapes support `clone()`, `resize()`, `rescale()`, `exportAsync()`, and plugin data methods.
- `outlineStroke()` on shapes with strokes returns a new `VectorNode`.

## Related

- [VectorNode](./node-vector.md)
- [data-types: Paint, Effect](./data-types.md)
- [node-properties](./node-properties.md)
