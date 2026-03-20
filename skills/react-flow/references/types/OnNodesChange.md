# OnNodesChange

ノードへの変更（移動・選択・追加・削除など）が発生したときに呼び出されるコールバック型。

## 型定義

```typescript
type OnNodesChange<NodeType extends Node = Node> = (
  changes: NodeChange<NodeType>[],
) => void;
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `changes` | `NodeChange<NodeType>[]` | ノードへの変更を表すオブジェクトの配列 |

## 使用例

```tsx
import { ReactFlow, applyNodeChanges, type OnNodesChange } from '@xyflow/react';
import { useCallback, useState } from 'react';

export default function Flow() {
  const [nodes, setNodes] = useState([]);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  return <ReactFlow nodes={nodes} onNodesChange={onNodesChange} />;
}
```

## 注意点

- `applyNodeChanges` ユーティリティと組み合わせて使うのが標準パターン
- カスタムノード型を使う場合はジェネリクスで指定する: `OnNodesChange<CustomNodeType>`
- `useNodesState` フックを使うと `onNodesChange` ハンドラが自動的にセットアップされる
- ノード位置の変更（ドラッグ）も `NodeChange` として通知される

## 関連

- [OnEdgesChange](./OnEdgesChange.md)
- [OnNodesDelete](./OnNodesDelete.md)
