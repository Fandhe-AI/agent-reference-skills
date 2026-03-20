# DeleteElements

Function type for removing nodes and edges from a React Flow graph. Automatically handles connected edges and child node cleanup.

## 型定義

```typescript
type DeleteElements = (payload: {
  nodes?: (Partial<Node> & { id: Node['id'] })[];
  edges?: (Partial<Edge> & { id: Edge['id'] })[];
}) => Promise<{
  deletedNodes: Node[];
  deletedEdges: Edge[];
}>;
```

## パラメータ

| Name | Type | Description |
|------|------|-------------|
| `payload.nodes` | `(Partial<Node> & { id: string })[]` | Nodes to delete. Only `id` is required |
| `payload.edges` | `(Partial<Edge> & { id: string })[]` | Edges to delete. Only `id` is required |

## 戻り値

| Name | Type | Description |
|------|------|-------------|
| `deletedNodes` | `Node[]` | Array of successfully deleted nodes |
| `deletedEdges` | `Edge[]` | Array of successfully deleted edges |

## 使用例

```tsx
import { useReactFlow } from '@xyflow/react';

function DeleteButton({ nodeId }: { nodeId: string }) {
  const { deleteElements } = useReactFlow();

  const handleDelete = async () => {
    const { deletedNodes, deletedEdges } = await deleteElements({
      nodes: [{ id: nodeId }],
    });
    console.log('Deleted:', deletedNodes, deletedEdges);
  };

  return <button onClick={handleDelete}>Delete Node</button>;
}
```

## 注意点

- ノードを削除すると、そのノードに接続されたエッジも自動的に削除される
- 子ノードも自動的に削除される
- 非同期関数（`Promise` を返す）
- `useReactFlow()` の `deleteElements` メソッドがこの型を実装している

## 関連

- [ReactFlowInstance](./ReactFlowInstance.md)
