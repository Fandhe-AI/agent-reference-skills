# SelectionDragHandler

Callback type for handling drag events when multiple selected nodes are moved together.

## 型定義

```typescript
type SelectionDragHandler<NodeType extends Node = Node> = (
  event: ReactMouseEvent,
  nodes: NodeType[],
) => void;
```

## パラメータ

| Name | Type | Description |
|------|------|-------------|
| `event` | `MouseEvent<Element, MouseEvent>` | The mouse/touch event that triggered the drag |
| `nodes` | `NodeType[]` | Array of all nodes being dragged in the selection |

## 使用例

```tsx
import { ReactFlow, SelectionDragHandler } from '@xyflow/react';

const handleSelectionDrag: SelectionDragHandler = (event, nodes) => {
  console.log(`Dragging ${nodes.length} nodes`);
  nodes.forEach((node) => {
    console.log(`Node ${node.id} at`, node.position);
  });
};

<ReactFlow
  nodes={nodes}
  edges={edges}
  onSelectionDrag={handleSelectionDrag}
  onSelectionDragStart={handleSelectionDrag}
  onSelectionDragStop={handleSelectionDrag}
/>
```

## 注意点

- `onSelectionDrag`、`onSelectionDragStart`、`onSelectionDragStop` の各 prop に渡す
- 単一ノードのドラッグではなく、複数ノードを選択して一緒にドラッグする場合にのみ発火する
- 戻り値は `void`（副作用のみ）

## 関連

- [SelectionMode](./SelectionMode.md)
