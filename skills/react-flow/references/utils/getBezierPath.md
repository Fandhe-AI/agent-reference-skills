# getBezierPath

Generates an SVG path string and label/offset coordinates for a cubic bezier edge.

## Signature

```typescript
getBezierPath(params: {
  sourceX: number;
  sourceY: number;
  sourcePosition?: Position;
  targetX: number;
  targetY: number;
  targetPosition?: Position;
  curvature?: number;
}): [path: string, labelX: number, labelY: number, offsetX: number, offsetY: number]
```

## Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sourceX` | `number` | — | The x coordinate of the source handle |
| `sourceY` | `number` | — | The y coordinate of the source handle |
| `sourcePosition` | `Position` | `Position.Bottom` | Where the source handle connects |
| `targetX` | `number` | — | The x coordinate of the target handle |
| `targetY` | `number` | — | The y coordinate of the target handle |
| `targetPosition` | `Position` | `Position.Top` | Where the target handle connects |
| `curvature` | `number` | `0.25` | Controls how curved the bezier edge appears |

## Returns

A tuple `[path, labelX, labelY, offsetX, offsetY]`:

| Index | Name | Type | Description |
|-------|------|------|-------------|
| 0 | `path` | `string` | SVG path string for use in a `<path>` element |
| 1 | `labelX` | `number` | X position recommended for edge label placement |
| 2 | `labelY` | `number` | Y position recommended for edge label placement |
| 3 | `offsetX` | `number` | Absolute difference between source x and path midpoint x |
| 4 | `offsetY` | `number` | Absolute difference between source y and path midpoint y |

## 使用例

```tsx
import { Position, getBezierPath, BaseEdge, type EdgeProps } from '@xyflow/react';

export function CustomBezierEdge({
  sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: 0.25,
  });

  return <BaseEdge path={edgePath} />;
}
```

## 注意点

- タプル（固定長配列）を返すため、複数のエッジパスを同時に扱いやすい
- カスタムエッジ実装において、組み込みの `BezierEdge` 以外の動作を実現するために使用する

## 関連

- [getSimpleBezierPath.md](./getSimpleBezierPath.md)
- [getSmoothStepPath.md](./getSmoothStepPath.md)
- [getStraightPath.md](./getStraightPath.md)
