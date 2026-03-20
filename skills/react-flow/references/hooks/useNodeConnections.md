# useNodeConnections

特定のノードへの接続の配列を返す。ハンドルタイプや ID でフィルタリング可能。

## Signature

```ts
useNodeConnections(options?: {
  id?: string;
  handleType?: 'source' | 'target';
  handleId?: string;
  onConnect?: (connections: HandleConnection[]) => void;
  onDisconnect?: (connections: HandleConnection[]) => void;
}): NodeConnection[]
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | ノード ID（カスタムノードコンポーネント内では自動設定） |
| `handleType` | `'source' \| 'target'` | 監視するハンドルの種類 |
| `handleId` | `string` | 特定ハンドル ID でフィルタリング（同種ハンドルが複数ある場合に使用） |
| `onConnect` | `(connections: HandleConnection[]) => void` | 接続確立時のコールバック |
| `onDisconnect` | `(connections: HandleConnection[]) => void` | 接続削除時のコールバック |

## Returns

`NodeConnection[]` — 指定ノード・ハンドル設定に一致する接続の配列

## 使用例

```tsx
import { useNodeConnections } from '@xyflow/react';

export default function MyNode() {
  const connections = useNodeConnections({
    handleType: 'target',
    handleId: 'my-handle',
  });

  return (
    <div>Currently {connections.length} incoming connections!</div>
  );
}
```

## 注意点

- 接続が変化するたびに再レンダリングが発生する
- カスタムノードコンポーネント内で使用する場合、`id` は `NodeIdContext` から自動設定される
- 同種ハンドルが1つだけの場合は `handleId` の指定は不要
- `useHandleConnections` の後継フック

## 関連

- [useHandleConnections.md](./useHandleConnections.md)
- [useConnection.md](./useConnection.md)
- [useNodeId.md](./useNodeId.md)
