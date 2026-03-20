# OnReconnect

A callback type invoked when an existing edge is reconnected to a different node or handle.

## 型定義

```typescript
type OnReconnect<EdgeType extends EdgeBase = EdgeBase> = (
  oldEdge: EdgeType,
  newConnection: Connection,
) => void;
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `oldEdge` | `EdgeType` | The existing edge being reconnected |
| `newConnection` | `Connection` | The new connection details (source, target, handles) |

## 使用例

```tsx
import { useCallback } from 'react';
import { ReactFlow, reconnectEdge, type Edge, type Connection } from '@xyflow/react';

export default function Flow() {
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) =>
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
    [],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onReconnect={onReconnect}
    />
  );
}
```

## 注意点

- エッジの再接続を有効にするには、`Edge.reconnectable` または `ReactFlow` の `edgesReconnectable` プロパティを `true` に設定する
- `reconnectEdge` ユーティリティを使用することで、エッジ配列への変更を簡単に適用できる
- ジェネリックパラメータ `EdgeType` でカスタムエッジ型を指定できる

## 関連

- [./Edge.md](./Edge.md)
- [./Connection.md](./Connection.md)
