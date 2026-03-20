# getStraightPath

Generates an SVG path string and label/offset coordinates for a straight-line edge.

## Signature

```typescript
getStraightPath(params: {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}): [path: string, labelX: number, labelY: number, offsetX: number, offsetY: number]
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `sourceX` | `number` | The x coordinate of the source handle |
| `sourceY` | `number` | The y coordinate of the source handle |
| `targetX` | `number` | The x coordinate of the target handle |
| `targetY` | `number` | The y coordinate of the target handle |

## Returns

A tuple `[path, labelX, labelY, offsetX, offsetY]`:

| Index | Name | Type | Description |
|-------|------|------|-------------|
| 0 | `path` | `string` | SVG path string for use in a `<path>` element |
| 1 | `labelX` | `number` | X position recommended for edge label placement (center of path) |
| 2 | `labelY` | `number` | Y position recommended for edge label placement (center of path) |
| 3 | `offsetX` | `number` | Absolute x difference between source and path midpoint |
| 4 | `offsetY` | `number` | Absolute y difference between source and path midpoint |

## 使用例

```tsx
import { getStraightPath, BaseEdge, type EdgeProps } from '@xyflow/react';

export function CustomStraightEdge({
  sourceX, sourceY, targetX, targetY,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return <BaseEdge path={edgePath} />;
}
```

```typescript
// Example computed values:
// getStraightPath({ sourceX: 0, sourceY: 20, targetX: 150, targetY: 100 })
// path    → "M 0,20L 150,100"
// labelX  → 75
// labelY  → 60
// offsetX → 75
// offsetY → 40
```

## 注意点

- タプル（固定長配列）を返すため、複数のエッジパスを同時に扱いやすい
- 4 つのパスジェネレータの中で最もシンプル。`sourcePosition` / `targetPosition` のパラメータはない

## 関連

- [getBezierPath.md](./getBezierPath.md)
- [getSimpleBezierPath.md](./getSimpleBezierPath.md)
- [getSmoothStepPath.md](./getSmoothStepPath.md)
