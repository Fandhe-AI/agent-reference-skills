# useHandleConnections

> **Deprecated**: `useNodeConnections()` に移行してください。

特定のハンドルまたはハンドルタイプへの接続の配列を返す。

## Signature

```ts
useHandleConnections(options: {
  type: 'source' | 'target';
  id?: string | null;
  nodeId?: string;
  onConnect?: (connections: Connection[]) => void;
  onDisconnect?: (connections: Connection[]) => void;
}): HandleConnection[]
```

## Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `'source' \| 'target'` | Yes | 監視するハンドルの種類 |
| `id` | `string \| null` | No | ハンドル ID（同一ノードに同種ハンドルが複数ある場合に必要） |
| `nodeId` | `string` | No | ノード ID（省略時は `NodeIdContext` から自動取得） |
| `onConnect` | `(connections: Connection[]) => void` | No | 接続確立時に呼ばれるコールバック |
| `onDisconnect` | `(connections: Connection[]) => void` | No | 接続削除時に呼ばれるコールバック |

## Returns

`HandleConnection[]` — 該当ハンドルへの接続の配列

## 使用例

```tsx
import { useHandleConnections } from '@xyflow/react';

export default function MyNode() {
  const connections = useHandleConnections({
    type: 'target',
    id: 'my-handle',
  });

  return (
    <div>There are currently {connections.length} incoming connections!</div>
  );
}
```

## 注意点

- **非推奨 (Deprecated)**: より高機能な `useNodeConnections()` を使用すること
- 接続が変化するたびにコンポーネントが再レンダリングされる
- 同種ハンドルが1つだけの場合は `id` の指定は不要

## 関連

- [useNodeConnections.md](./useNodeConnections.md)
- [useConnection.md](./useConnection.md)
