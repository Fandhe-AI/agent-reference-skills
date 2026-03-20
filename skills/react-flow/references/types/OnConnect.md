# OnConnect

新しいコネクションが作成されたときに呼び出されるコールバック型。

## 型定義

```typescript
type OnConnect = (connection: Connection) => void;
```

`Connection` 型の定義:

```typescript
type Connection = {
  source: string;
  target: string;
  sourceHandle: string | null;
  targetHandle: string | null;
};
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `connection.source` | `string` | 接続元ノードの ID |
| `connection.target` | `string` | 接続先ノードの ID |
| `connection.sourceHandle` | `string \| null` | 接続元ハンドルの ID（null の場合はデフォルトハンドル） |
| `connection.targetHandle` | `string \| null` | 接続先ハンドルの ID（null の場合はデフォルトハンドル） |

## 使用例

```tsx
import { ReactFlow, addEdge, type OnConnect } from '@xyflow/react';
import { useCallback, useState } from 'react';

export default function Flow() {
  const [edges, setEdges] = useState([]);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return <ReactFlow onConnect={onConnect} />;
}
```

## 注意点

- `addEdge` ユーティリティと組み合わせて使うのが一般的なパターン
- `Connection` 型は `Edge` の最小表現であり、`addEdge` で完全な `Edge` オブジェクトに変換される
- ソースとターゲット間の接続バリデーションには `isValidConnection` prop を使用する

## 関連

- [OnConnectStart](./OnConnectStart.md)
- [OnConnectEnd](./OnConnectEnd.md)
