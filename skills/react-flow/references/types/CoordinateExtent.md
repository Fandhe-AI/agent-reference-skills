# CoordinateExtent

Represents a bounding box defined by two corner points: top-left and bottom-right. Used to constrain node movement or define viewport boundaries.

## 型定義

```typescript
type CoordinateExtent = [[number, number], [number, number]];
```

## 構造

| Element | Type | Description |
|---------|------|-------------|
| `[0]` | `[number, number]` | Top-left corner coordinates `[x, y]` |
| `[1]` | `[number, number]` | Bottom-right corner coordinates `[x, y]` |

## 使用例

```tsx
import { ReactFlow, CoordinateExtent } from '@xyflow/react';

// Restrict node dragging to a 1000x1000 area
const extent: CoordinateExtent = [[0, 0], [1000, 1000]];

<ReactFlow
  nodes={nodes}
  edges={edges}
  nodeExtent={extent}
/>
```

## 注意点

- デフォルト値は `[[-Infinity, -Infinity], [+Infinity, +Infinity]]`（制限なし）
- `nodeExtent` prop でノードの移動範囲を制限できる
- `translateExtent` prop でビューポートのパン範囲を制限できる

## 関連

- [Viewport](./Viewport.md)
- [Rect](./Rect.md)
