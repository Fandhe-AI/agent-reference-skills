# OnDelete

ノードまたはエッジが削除されたときに呼び出されるコールバック型。

## 型定義

```typescript
type OnDelete = (params: { nodes: Node[]; edges: Edge[] }) => void;
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `params.nodes` | `Node[]` | 削除されたノードの配列 |
| `params.edges` | `Edge[]` | 削除されたエッジの配列 |

## 使用例

```tsx
import { ReactFlow, type OnDelete } from '@xyflow/react';

export default function Flow() {
  const onDelete: OnDelete = ({ nodes, edges }) => {
    console.log('削除されたノード:', nodes.map((n) => n.id));
    console.log('削除されたエッジ:', edges.map((e) => e.id));
  };

  return <ReactFlow onDelete={onDelete} />;
}
```

## 注意点

- 削除が完了した後に呼び出される（削除前のフックには `OnBeforeDelete` を使用）
- ノードとエッジの両方が同一コールバックで通知される
- 削除された要素の外部状態の同期やログ記録に使用する

## 関連

- [OnBeforeDelete](./OnBeforeDelete.md)
- [OnNodesDelete](./OnNodesDelete.md)
- [OnEdgesDelete](./OnEdgesDelete.md)
