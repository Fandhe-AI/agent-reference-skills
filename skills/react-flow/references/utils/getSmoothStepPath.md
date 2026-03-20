# getSmoothStepPath

Generates an SVG path string and label/offset coordinates for a smooth step (orthogonal with rounded corners) edge.

## Signature

```typescript
getSmoothStepPath(params: {
  sourceX: number;
  sourceY: number;
  sourcePosition?: Position;
  targetX: number;
  targetY: number;
  targetPosition?: Position;
  borderRadius?: number;
  centerX?: number;
  centerY?: number;
  offset?: number;
  stepPosition?: number;
}): [path: string, labelX: number, labelY: number, offsetX: number, offsetY: number]
```

## Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sourceX` | `number` | — | X coordinate of the source handle |
| `sourceY` | `number` | — | Y coordinate of the source handle |
| `sourcePosition` | `Position` | `Position.Bottom` | Source handle position orientation |
| `targetX` | `number` | — | X coordinate of the target handle |
| `targetY` | `number` | — | Y coordinate of the target handle |
| `targetPosition` | `Position` | `Position.Top` | Target handle position orientation |
| `borderRadius` | `number` | `5` | Corner rounding radius for path steps |
| `centerX` | `number` | — | Optional override for center X coordinate |
| `centerY` | `number` | — | Optional override for center Y coordinate |
| `offset` | `number` | `20` | Path offset distance from the node handle |
| `stepPosition` | `number` | `0.5` | Controls bend location: `0` = near source, `1` = near target, `0.5` = midpoint |

## Returns

A tuple `[path, labelX, labelY, offsetX, offsetY]`:

| Index | Name | Type | Description |
|-------|------|------|-------------|
| 0 | `path` | `string` | SVG path string for use in a `<path>` element |
| 1 | `labelX` | `number` | X position recommended for edge label placement (center of path) |
| 2 | `labelY` | `number` | Y position recommended for edge label placement (center of path) |
| 3 | `offsetX` | `number` | Absolute X difference between source and path midpoint |
| 4 | `offsetY` | `number` | Absolute Y difference between source and path midpoint |

## 使用例

```tsx
import { Position, getSmoothStepPath, BaseEdge, type EdgeProps } from '@xyflow/react';

export function CustomSmoothStepEdge({
  sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 10,
    offset: 20,
  });

  return <BaseEdge path={edgePath} />;
}
```

## 注意点

- タプル（固定長配列）を返すため、複数のエッジパスを同時に扱いやすい
- `borderRadius` を `0` にすると角が丸くならないシャープなステップエッジになる
- `stepPosition` で折れ曲がり位置を細かく制御できる（0〜1 の範囲）

## 関連

- [getBezierPath.md](./getBezierPath.md)
- [getSimpleBezierPath.md](./getSimpleBezierPath.md)
- [getStraightPath.md](./getStraightPath.md)
