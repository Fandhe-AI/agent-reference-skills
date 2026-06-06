# VectorNode

The most general shape node. Defines geometry through a network of vertices and segments (`vectorNetwork`) or simplified paths (`vectorPaths`).

## Signature / Usage

```ts
const vector = figma.createVector();

// Set geometry via vectorNetwork
await vector.setVectorNetworkAsync({
  vertices: [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 50, y: 100 }],
  segments: [
    { start: 0, end: 1 },
    { start: 1, end: 2 },
    { start: 2, end: 0 },
  ],
  regions: [{ loops: [[0, 1, 2]], windingRule: 'NONZERO' }],
});

// Outline strokes to a new VectorNode
const outlined = vector.outlineStroke();
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `type` | `'VECTOR'` (readonly) | Node type identifier |
| `vectorNetwork` | `VectorNetwork` (readonly) | Complete vertex/segment/region representation |
| `vectorPaths` | `VectorPaths` (readonly) | Simplified SVG-path representation |
| `handleMirroring` | `HandleMirroring \| typeof figma.mixed` | Mirror mode for bezier handles |
| `fills` | `ReadonlyArray<Paint>` | Fill paints |
| `strokes` | `ReadonlyArray<Paint>` | Stroke paints |
| `strokeWeight` | `number` | Stroke width |

### Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `clone()` | `() => VectorNode` | Duplicate under current page |
| `setVectorNetworkAsync()` | `(network: VectorNetwork) => Promise<void>` | Update the vector network |
| `outlineStroke()` | `() => VectorNode \| null` | Convert stroke to a new VectorNode; `null` if no strokes |

## Notes

- Position and size auto-adjust to fit the vertices; reading `x`/`y` after setting may return different values.
- `vectorPaths` is simpler but lossy — prefer `vectorNetwork` for full fidelity.
- Under `documentAccess: "dynamic-page"`, `vectorNetwork` is read-only synchronously; use `setVectorNetworkAsync()` to write.

## Related

- [BooleanOperationNode](./node-boolean-operation.md)
- [data-types: VectorNetwork](./data-types.md)
- [node-properties](./node-properties.md)
