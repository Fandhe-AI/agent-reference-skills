# NodeMouseHandler

A callback type for handling mouse events on nodes. Receives the mouse event and the node that triggered it.

## 型定義

```typescript
type NodeMouseHandler = (event: React.MouseEvent, node: Node) => void;
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `event` | `React.MouseEvent<Element, MouseEvent>` | The React mouse event that triggered the callback |
| `node` | `Node` | The node object on which the mouse event occurred |

## 使用例

```tsx
import { ReactFlow, type NodeMouseHandler } from '@xyflow/react';

const onNodeClick: NodeMouseHandler = (event, node) => {
  console.log('Clicked node:', node.id, node.data);
};

const onNodeMouseEnter: NodeMouseHandler = (event, node) => {
  console.log('Mouse entered node:', node.id);
};

export default function Flow() {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodeClick={onNodeClick}
      onNodeMouseEnter={onNodeMouseEnter}
    />
  );
}
```

## 注意点

- `ReactFlow` コンポーネントの `onNodeClick`, `onNodeMouseEnter`, `onNodeMouseLeave`, `onNodeMouseMove`, `onNodeContextMenu`, `onNodeDoubleClick` プロパティで使用される
- 戻り値は `void`（副作用の実行を目的とする）

## 関連

- [./Node.md](./Node.md)
- [./EdgeMouseHandler.md](./EdgeMouseHandler.md)
