# PanelPosition

Union type for positioning UI panels (MiniMap, Controls, etc.) within the React Flow viewport. Supports corner and center-edge positions.

## 型定義

```typescript
type PanelPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'center-left'
  | 'center-right';
```

## 値一覧

| Value | Description |
|-------|-------------|
| `'top-left'` | Top-left corner |
| `'top-center'` | Top edge, centered |
| `'top-right'` | Top-right corner |
| `'bottom-left'` | Bottom-left corner |
| `'bottom-center'` | Bottom edge, centered |
| `'bottom-right'` | Bottom-right corner |
| `'center-left'` | Left edge, vertically centered |
| `'center-right'` | Right edge, vertically centered |

## 使用例

```tsx
import { ReactFlow, MiniMap, Controls } from '@xyflow/react';

<ReactFlow nodes={nodes} edges={edges}>
  <MiniMap position="bottom-right" />
  <Controls position="top-left" />
</ReactFlow>
```

## 注意点

- `Position` enum がノードの辺（4方向のみ）を指定するのに対し、`PanelPosition` はコンテナ内の8箇所のうちのいずれかを指定できる
- `<Panel />`, `<MiniMap />`, `<Controls />` コンポーネントの `position` prop に使用する

## 関連

- [Position](./Position.md)
