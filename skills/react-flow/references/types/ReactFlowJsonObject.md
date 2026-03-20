# ReactFlowJsonObject

A JSON-compatible representation of an entire React Flow diagram, including nodes, edges, and viewport state. Used for persistence and restoration.

## 型定義

```typescript
type ReactFlowJsonObject<
  NodeType extends Node = Node,
  EdgeType extends Edge = Edge
> = {
  nodes: NodeType[];
  edges: EdgeType[];
  viewport: Viewport;
};
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `nodes` | `NodeType[]` | All nodes in the flow |
| `edges` | `EdgeType[]` | All edges/connections in the flow |
| `viewport` | `Viewport` | Current viewport state (position and zoom) |

## 使用例

```tsx
import { useReactFlow, ReactFlowJsonObject } from '@xyflow/react';

function SaveButton() {
  const { toObject } = useReactFlow();

  const handleSave = () => {
    const flowObject: ReactFlowJsonObject = toObject();
    localStorage.setItem('flow', JSON.stringify(flowObject));
  };

  return <button onClick={handleSave}>Save Flow</button>;
}

// Restore from saved data
function RestoreFlow() {
  const saved = JSON.parse(localStorage.getItem('flow') || '{}') as ReactFlowJsonObject;

  return (
    <ReactFlow
      nodes={saved.nodes}
      edges={saved.edges}
      defaultViewport={saved.viewport}
    />
  );
}
```

## 注意点

- `ReactFlowInstance.toObject()` がこの型のオブジェクトを返す
- JSON にシリアライズ可能な構造なので、データベースへの永続化に適している
- 復元時は `defaultViewport` prop に `viewport` を渡す

## 関連

- [ReactFlowInstance](./ReactFlowInstance.md)
- [Viewport](./Viewport.md)
