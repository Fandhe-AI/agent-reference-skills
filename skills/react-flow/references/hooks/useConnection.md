# useConnection

Returns the current connection state during an active connection interaction, or `null` for every property if no connection is in progress.

## Signature

```ts
useConnection(
  connectionSelector?: (connection: ConnectionState<InternalNode<NodeType>>) => SelectorReturn
): SelectorReturn | ConnectionState
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `connectionSelector` | `(connection: ConnectionState<InternalNode<NodeType>>) => SelectorReturn` | Optional selector to extract specific connection state data. Prevents unnecessary re-renders by subscribing only to the needed slice. |

## Returns

`SelectorReturn` or `ConnectionState` — When a connection interaction is active, returns connection state. Returns `null` for every property when no connection is active.

## 使用例

```tsx
import { useConnection } from '@xyflow/react';

export default function CustomHandle() {
  const connection = useConnection();

  return (
    <div>
      {connection
        ? `Incoming connection from ${connection.fromNode}`
        : 'No incoming connections'}
    </div>
  );
}
```

## 注意点

- `<ReactFlow>` または `<ReactFlowProvider>` の子コンポーネント内でのみ使用可能
- 接続インタラクションが非アクティブな場合、`null` 参照ではなく各プロパティが `null` になる
- ハンドルのカラー変化などの条件付き UI に利用するのが典型的なユースケース
- `connectionSelector` を活用することで不要な再レンダリングを防ぎパフォーマンスを向上できる

## 関連

- [useHandleConnections.md](./useHandleConnections.md)
- [useNodeConnections.md](./useNodeConnections.md)
