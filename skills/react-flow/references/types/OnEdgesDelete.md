# OnEdgesDelete

エッジが削除されたときに呼び出されるコールバック型。

## 型定義

```typescript
type OnEdgesDelete = (edges: Edge[]) => void;
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `edges` | `Edge[]` | 削除されたエッジの配列 |

## 使用例

```tsx
import { ReactFlow, type OnEdgesDelete } from '@xyflow/react';

export default function Flow() {
  const onEdgesDelete: OnEdgesDelete = (edges) => {
    console.log('削除されたエッジ:', edges.map((e) => e.id));
    // 外部ストアや API を更新するなどの処理
  };

  return <ReactFlow onEdgesDelete={onEdgesDelete} />;
}
```

## 注意点

- 削除が完了した後に呼び出される
- 複数エッジが同時に削除された場合、全エッジをまとめた配列が一度に渡される
- 削除前に処理を行いたい場合は `OnBeforeDelete` を使用する
- ノードとエッジ両方の削除を一元管理したい場合は `OnDelete` を使用する

## 関連

- [OnDelete](./OnDelete.md)
- [OnNodesDelete](./OnNodesDelete.md)
- [OnBeforeDelete](./OnBeforeDelete.md)
- [OnEdgesChange](./OnEdgesChange.md)
