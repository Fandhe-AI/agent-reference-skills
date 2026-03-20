# HandleConnection

Extends the base `Connection` type with an `edgeId` field. Represents a connection that is associated with a specific edge.

## 型定義

```typescript
interface HandleConnection extends Connection {
  edgeId: string;
}

// Effectively:
interface HandleConnection {
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
| `sourceHandle` | `string \| null` | The id of the handle on the source node (`null` if not specified) |
| `targetHandle` | `string \| null` | The id of the handle on the target node (`null` if not specified) |
| `edgeId` | `string` | The unique identifier of the edge associated with this connection |

## 注意点

- `Connection` 型と `NodeConnection` 型のどちらも同様に `edgeId` を追加している。`HandleConnection` はハンドルのコンテキストで使用される
- `useNodeConnections` フックや `Handle` コンポーネントのコールバックで使用される

## 関連

- [./Connection.md](./Connection.md)
- [./NodeConnection.md](./NodeConnection.md)
