# XYPosition

Represents a two-dimensional coordinate position using x and y numeric values. All positions in React Flow are stored in this format.

## 型定義

```typescript
type XYPosition = {
  x: number;
  y: number;
};
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `x` | `number` | Horizontal coordinate position |
| `y` | `number` | Vertical coordinate position |

## 使用例

```tsx
import { XYPosition } from '@xyflow/react';

const position: XYPosition = { x: 100, y: 200 };

const initialNodes = [
  {
    id: '1',
    position,
    data: { label: 'Node 1' },
  },
];
```

## 注意点

- ノード位置、ビューポート座標、マウス位置など、あらゆる空間的な位置データにこの型が使用される
- フロー内部座標系の位置を表す（スクリーン座標ではない場合がある）

## 関連

- [Viewport](./Viewport.md)
- [Rect](./Rect.md)
- [ReactFlowInstance](./ReactFlowInstance.md)
