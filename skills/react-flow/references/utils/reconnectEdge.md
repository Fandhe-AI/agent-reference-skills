# reconnectEdge

Updates an existing edge's connection endpoints, returning a new edges array with the reconnected edge.

## Signature

```typescript
reconnectEdge(
  oldEdge: EdgeType,
  newConnection: Connection,
  edges: EdgeType[],
  options?: {
    shouldReplaceId?: boolean;
    getEdgeId?: GetEdgeId;
  }
): EdgeType[]
```

## Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `oldEdge` | `EdgeType` | — | The edge to update |
| `newConnection` | `Connection` | — | The new connection parameters |
| `newConnection.source` | `string` | — | Node ID where the connection originates |
| `newConnection.target` | `string` | — | Node ID where the connection terminates |
| `newConnection.sourceHandle` | `string \| null` | — | Handle ID on the source node (if applicable) |
| `newConnection.targetHandle` | `string \| null` | — | Handle ID on the target node (if applicable) |
| `edges` | `EdgeType[]` | — | Current edges array |
| `options.shouldReplaceId` | `boolean` | `true` | Whether to replace the old edge ID with a new generated ID |
| `options.getEdgeId` | `GetEdgeId` | — | Custom function for generating the new edge ID |

## Returns

`EdgeType[]` — An updated edges array with the reconnected edge's connection properties applied.

## 使用例

```tsx
import { useCallback } from 'react';
import {
  ReactFlow,
  reconnectEdge,
  useNodesState,
  useEdgesState,
  type Edge,
  type Connection,
} from '@xyflow/react';

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) =>
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
    [],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onReconnect={onReconnect}
    />
  );
}
```

## 注意点

- 対象エッジを ID で検索し、接続プロパティを更新する
- `shouldReplaceId: false` を指定すると元の edge ID が保持される

## 関連

- [addEdge.md](./addEdge.md)
- [applyEdgeChanges.md](./applyEdgeChanges.md)
