# EdgeMouseHandler

A callback type for handling mouse events on edges. Receives the mouse event and the edge that triggered it.

## 型定義

```typescript
type EdgeMouseHandler = (event: React.MouseEvent, edge: Edge) => void;
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `event` | `React.MouseEvent<Element, MouseEvent>` | The React mouse event that triggered the callback |
| `edge` | `Edge` | The edge object on which the mouse event occurred |

## 使用例

```tsx
import { ReactFlow, type EdgeMouseHandler } from '@xyflow/react';

const onEdgeClick: EdgeMouseHandler = (event, edge) => {
  console.log('Clicked edge:', edge.id);
  console.log('Source:', edge.source, '-> Target:', edge.target);
};

const onEdgeDoubleClick: EdgeMouseHandler = (event, edge) => {
  // e.g., open edge settings modal
};

export default function Flow() {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onEdgeClick={onEdgeClick}
      onEdgeDoubleClick={onEdgeDoubleClick}
    />
  );
}
```

## 注意点

- `ReactFlow` コンポーネントの `onEdgeClick`, `onEdgeDoubleClick`, `onEdgeContextMenu`, `onEdgeMouseEnter`, `onEdgeMouseLeave`, `onEdgeMouseMove` プロパティで使用される
- 戻り値は `void`

## 関連

- [./Edge.md](./Edge.md)
- [./NodeMouseHandler.md](./NodeMouseHandler.md)
