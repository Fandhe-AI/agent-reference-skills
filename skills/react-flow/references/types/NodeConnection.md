# NodeConnection

Extends the basic `Connection` type by adding an `edgeId` property that references the associated edge.

## 型定義

```typescript
interface NodeConnection {
  source: string;
  target: string;
  sourceHandle: string | null;
  targetHandle: string | null;
  edgeId: string;
}
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `source` | `string` | The id of the node this connection originates from |
| `target` | `string` | The id of the node this connection terminates at |
| `sourceHandle` | `string \| null` | The id of the handle on the source node where the connection begins (`null` if not specified) |
| `targetHandle` | `string \| null` | The id of the handle on the target node where the connection ends (`null` if not specified) |
| `edgeId` | `string` | The unique identifier for the edge associated with this connection |

## 注意点

- `NodeConnection` は `Connection` 型の拡張で、`edgeId` フィールドが追加されている
- `Connection` 型との違いは `edgeId` が含まれる点のみ
- ハンドルの `connections` プロパティ等でノードが持つ接続の一覧として使用される

## 関連

- [./Connection.md](./Connection.md)
- [./HandleConnection.md](./HandleConnection.md)
- [./Node.md](./Node.md)
