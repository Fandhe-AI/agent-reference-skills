# SelectionMode

Enum controlling how nodes are selected when drawing a selection rectangle — whether partial overlap or full containment is required.

## 型定義

```typescript
enum SelectionMode {
  Partial = 'partial',
  Full = 'full',
}
```

## 値一覧

| Value | Description |
|-------|-------------|
| `SelectionMode.Partial` | A node is selected when the selection rectangle overlaps any part of it |
| `SelectionMode.Full` | A node is selected only when the selection rectangle fully contains it |

## 使用例

```tsx
import { ReactFlow, SelectionMode } from '@xyflow/react';

<ReactFlow
  nodes={nodes}
  edges={edges}
  selectionMode={SelectionMode.Full}
/>
```

## 注意点

- デフォルトは `SelectionMode.Partial`（部分的な重なりで選択）
- `Full` モードはより厳密な選択が必要なシナリオ（例：密集したノードのダイアグラム）に適している
- `<ReactFlow />` コンポーネントの `selectionMode` prop に渡す

## 関連

- [SelectionDragHandler](./SelectionDragHandler.md)
