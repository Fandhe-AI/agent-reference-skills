# ConnectionLineComponentProps

Props passed to a custom connection line component during edge creation (while the user drags from a handle).

## 型定義

```typescript
type ConnectionLineComponentProps = {
  connectionLineStyle?: CSSProperties;
  connectionLineType: ConnectionLineType;
  fromNode: InternalNode;
  fromHandle: Handle;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  fromPosition: Position;
  toPosition: Position;
  connectionStatus: 'valid' | 'invalid' | null;
  toNode: InternalNode | null;
  toHandle: Handle | null;
  pointer: XYPosition;
};
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `connectionLineStyle` | `CSSProperties` | Styles passed from the `connectionLineStyle` prop on `<ReactFlow />` |
| `connectionLineType` | `ConnectionLineType` | The line type (bezier, straight, step, etc.) |
| `fromNode` | `InternalNode` | The source node where the connection originates |
| `fromHandle` | `Handle` | The source handle where the connection begins |
| `fromX` | `number` | X coordinate of the connection origin |
| `fromY` | `number` | Y coordinate of the connection origin |
| `toX` | `number` | X coordinate of the current cursor position |
| `toY` | `number` | Y coordinate of the current cursor position |
| `fromPosition` | `Position` | Position side of the source handle (Top/Bottom/Left/Right) |
| `toPosition` | `Position` | Position side of the target handle |
| `connectionStatus` | `"valid" \| "invalid" \| null` | Validation state when hovering over a handle. `"valid"` or `"invalid"` when `isValidConnection` is set; otherwise `null` |
| `toNode` | `InternalNode \| null` | The target node being hovered (`null` if not over any node) |
| `toHandle` | `Handle \| null` | The target handle being hovered (`null` if not over a handle) |
| `pointer` | `XYPosition` | Current pointer/cursor position in canvas coordinates |

## 使用例

```tsx
import { type ConnectionLineComponentProps, getStraightPath } from '@xyflow/react';

export function CustomConnectionLine({
  fromX, fromY, toX, toY, connectionStatus,
}: ConnectionLineComponentProps) {
  const [edgePath] = getStraightPath({
    sourceX: fromX, sourceY: fromY,
    targetX: toX, targetY: toY,
  });

  return (
    <g>
      <path
        d={edgePath}
        fill="none"
        stroke={connectionStatus === 'valid' ? '#00ff00' : '#ff0000'}
        strokeWidth={2}
        strokeDasharray="5,5"
      />
    </g>
  );
}
```

## 注意点

- このプロパティ型は `ConnectionLineComponent` と組み合わせて使用する
- `connectionStatus` は `isValidConnection` コールバックが設定されている場合のみ `"valid"` / `"invalid"` になる

## 関連

- [./ConnectionLineComponent.md](./ConnectionLineComponent.md)
- [./ConnectionLineType.md](./ConnectionLineType.md)
- [./InternalNode.md](./InternalNode.md)
- [./IsValidConnection.md](./IsValidConnection.md)
