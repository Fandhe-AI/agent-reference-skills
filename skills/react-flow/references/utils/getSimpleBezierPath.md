# getSimpleBezierPath

Generates an SVG path string and label/offset coordinates for a simple (quadratic) bezier edge.

## Signature

```typescript
getSimpleBezierPath(params: {
  sourceX: number;
  sourceY: number;
  sourcePosition?: Position;
  targetX: number;
  targetY: number;
  targetPosition?: Position;
}): [path: string, labelX: number, labelY: number, offsetX: number, offsetY: number]
```

## Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sourceX` | `number` | — | X coordinate of the source handle |
| `sourceY` | `number` | — | Y coordinate of the source handle |
| `sourcePosition` | `Position` | `Position.Bottom` | Attachment point on source node |
| `targetX` | `number` | — | X coordinate of the target handle |
| `targetY` | `number` | — | Y coordinate of the target handle |
| `targetPosition` | `Position` | `Position.Top` | Attachment point on target node |

## Returns

A tuple `[path, labelX, labelY, offsetX, offsetY]`:

| Index | Name | Type | Description |
|-------|------|------|-------------|
| 0 | `path` | `string` | SVG path string for use in a `<path>` element |
| 1 | `labelX` | `number` | X position recommended for edge label placement |
| 2 | `labelY` | `number` | Y position recommended for edge label placement |
| 3 | `offsetX` | `number` | Horizontal distance from source to path midpoint |
| 4 | `offsetY` | `number` | Vertical distance from source to path midpoint |

## 使用例

```tsx
import { Position, getSimpleBezierPath, BaseEdge, type EdgeProps } from '@xyflow/react';

export function CustomSimpleBezierEdge({
  sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition,
}: EdgeProps) {
  const [edgePath] = getSimpleBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return <BaseEdge path={edgePath} />;
}
```

## 注意点

- タプル（固定長配列）を返すため、複数のエッジパスを同時に扱いやすい
- `SimpleBezierEdge` コンポーネントが内部的に使用している関数
- `getBezierPath` と異なり、`curvature` パラメータがなくシンプルなベジェ曲線を生成する

## 関連

- [getBezierPath.md](./getBezierPath.md)
- [getSmoothStepPath.md](./getSmoothStepPath.md)
- [getStraightPath.md](./getStraightPath.md)
