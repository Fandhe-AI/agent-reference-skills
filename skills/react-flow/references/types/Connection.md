# Connection

The minimal description of an edge between two nodes. Used during edge creation and as the basis for the `Edge` type.

## 型定義

```typescript
type Connection = {
  source: string;
  target: string;
  sourceHandle: string | null;
  targetHandle: string | null;
};
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `source` | `string` | The id of the node this connection originates from |
| `target` | `string` | The id of the node this connection terminates at |
| `sourceHandle` | `string \| null` | The id of the handle on the source node where the connection begins (`null` if not specified) |
| `targetHandle` | `string \| null` | The id of the handle on the target node where the connection ends (`null` if not specified) |

## 使用例

```tsx
import { useCallback } from 'react';
import { ReactFlow, addEdge, type Connection, type Edge } from '@xyflow/react';

export default function Flow() {
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) => addEdge(connection, eds)),
    [],
  );

  return <ReactFlow nodes={nodes} edges={edges} onConnect={onConnect} />;
}
```

## 注意点

- `addEdge()` ユーティリティを使用して `Connection` から `Edge` オブジェクトに変換できる
- `onConnect` コールバックで受け取る引数の型として使用する
- `NodeConnection` と `HandleConnection` はこの型を拡張して `edgeId` を追加している

## 関連

- [./NodeConnection.md](./NodeConnection.md)
- [./HandleConnection.md](./HandleConnection.md)
- [./ConnectionState.md](./ConnectionState.md)
- [./IsValidConnection.md](./IsValidConnection.md)
- [./OnConnect.md](./OnConnect.md)
