# addEdge

Adds an edge (or connection) to an existing array of edges, with built-in duplicate prevention.

## Signature

```typescript
addEdge(
  edgeParams: EdgeType | Connection,
  edges: EdgeType[],
  options?: { getEdgeId?: GetEdgeId }
): EdgeType[]
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `edgeParams` | `EdgeType \| Connection` | Either an `Edge` or a `Connection` object to add |
| `edges` | `EdgeType[]` | Current array of all edges |
| `options.getEdgeId` | `GetEdgeId` | Custom function to generate edge IDs |

## Returns

`EdgeType[]` — A new array containing all existing edges plus the newly added edge.

## 使用例

```tsx
import { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  type Connection,
} from '@xyflow/react';

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((oldEdges) => addEdge(connection, oldEdges));
    },
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    />
  );
}
```

## 注意点

- 同じ `source` と `target`（および `sourceHandle` / `targetHandle` が設定されている場合はそれらも含む）を持つエッジが既に存在する場合、`id` が異なっていても新しいエッジは追加されない（重複防止）

## 関連

- [applyEdgeChanges.md](./applyEdgeChanges.md)
- [reconnectEdge.md](./reconnectEdge.md)
