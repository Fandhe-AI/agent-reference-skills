# SnapGrid

A two-element tuple defining the horizontal and vertical grid spacing for node snapping.

## 型定義

```typescript
type SnapGrid = [number, number];
```

## 構造

| Element | Type | Description |
|---------|------|-------------|
| `[0]` | `number` | Horizontal grid size in pixels |
| `[1]` | `number` | Vertical grid size in pixels |

## 使用例

```tsx
import { ReactFlow, SnapGrid } from '@xyflow/react';

const snapGrid: SnapGrid = [20, 20];

<ReactFlow
  nodes={nodes}
  edges={edges}
  snapToGrid={true}
  snapGrid={snapGrid}
/>
```

## 注意点

- `snapToGrid` prop を `true` にした場合のみ有効になる
- ノードはドラッグ時に最も近いグリッド交点に自動的にスナップされる
- 水平・垂直のグリッド間隔を個別に設定できる

## 関連

- [XYPosition](./XYPosition.md)
