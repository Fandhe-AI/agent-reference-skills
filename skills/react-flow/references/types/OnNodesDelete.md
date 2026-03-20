# OnNodesDelete

ノードが削除されたときに呼び出されるコールバック型。

## 型定義

```typescript
type OnNodesDelete = (nodes: Node[]) => void;
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `nodes` | `Node[]` | 削除されたノードの配列 |

## 使用例

```tsx
import { ReactFlow, type OnNodesDelete } from '@xyflow/react';

export default function Flow() {
  const onNodesDelete: OnNodesDelete = (nodes) => {
    console.log('削除されたノード:', nodes.map((n) => n.id));
    // 外部ストアや API を更新するなどの処理
  };

  return <ReactFlow onNodesDelete={onNodesDelete} />;
}
```

## 注意点

- 削除が完了した後に呼び出される
- 複数ノードが同時に削除された場合、全ノードをまとめた配列が一度に渡される
- 削除前に処理を行いたい場合は `OnBeforeDelete` を使用する
- ノードとエッジ両方の削除を一元管理したい場合は `OnDelete` を使用する
- ノードを削除すると、そのノードに接続されたエッジも自動的に削除される

## 関連

- [OnDelete](./OnDelete.md)
- [OnEdgesDelete](./OnEdgesDelete.md)
- [OnBeforeDelete](./OnBeforeDelete.md)
- [OnNodesChange](./OnNodesChange.md)
