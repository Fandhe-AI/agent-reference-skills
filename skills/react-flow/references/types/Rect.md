# Rect

Represents a rectangle in two-dimensional space with both dimensions and a position.

## 型定義

```typescript
type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `x` | `number` | Horizontal position coordinate (left edge) |
| `y` | `number` | Vertical position coordinate (top edge) |
| `width` | `number` | Horizontal dimension of the rectangle |
| `height` | `number` | Vertical dimension of the rectangle |

## 使用例

```tsx
import { ReactFlowInstance, Rect } from '@xyflow/react';

// getNodesBounds returns a Rect
const instance: ReactFlowInstance = useReactFlow();
const bounds: Rect = instance.getNodesBounds(['node-1', 'node-2']);

// fitBounds accepts a Rect
instance.fitBounds(bounds, { padding: 0.2 });
```

## 注意点

- ビューポート計算、ノードの境界管理、レイアウトアルゴリズムで内部的に使用される
- `x`, `y` は左上角の座標を表す

## 関連

- [XYPosition](./XYPosition.md)
- [CoordinateExtent](./CoordinateExtent.md)
- [ReactFlowInstance](./ReactFlowInstance.md)
