# BooleanOperationNode

A node that combines child shapes using a boolean set operation (union, subtract, intersect, or exclude).

## Signature / Usage

```ts
// Create boolean operations
const union    = figma.union([rect, ellipse], figma.currentPage);
const subtract = figma.subtract([rect, ellipse], figma.currentPage);
const intersect = figma.intersect([rect, ellipse], figma.currentPage);
const exclude  = figma.exclude([rect, ellipse], figma.currentPage);

// Inspect
console.log(union.booleanOperation); // 'UNION'
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `type` | `'BOOLEAN_OPERATION'` (readonly) | Node type identifier |
| `booleanOperation` | `'UNION' \| 'INTERSECT' \| 'SUBTRACT' \| 'EXCLUDE'` | Set operation type |
| `children` | `ReadonlyArray<SceneNode>` (readonly) | Shapes being combined |
| `expanded` | `boolean` | Expanded state in layers panel |
| `fills` | `ReadonlyArray<Paint>` | Fill paints on the result |
| `strokes` | `ReadonlyArray<Paint>` | Stroke paints |
| `effects` | `ReadonlyArray<Effect>` | Shadow/blur effects |

### Methods

| Name | Description |
|------|-------------|
| `clone()` | Duplicate the boolean operation node |

## Notes

- Like `GroupNode`, a boolean operation node auto-resizes to fit its children.
- Created via `figma.union()`, `figma.subtract()`, `figma.intersect()`, `figma.exclude()`.
- Use `figma.flatten()` to merge a boolean operation into a single `VectorNode`.

## Related

- [VectorNode](./node-vector.md)
- [GroupNode](./node-group.md)
