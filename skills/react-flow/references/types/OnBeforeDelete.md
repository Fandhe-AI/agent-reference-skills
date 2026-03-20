# OnBeforeDelete

削除前に呼び出されるコールバック型。削除を許可・拒否・フィルタリングできる非同期関数。

## 型定義

```typescript
type OnBeforeDelete = (params: {
  nodes: Node[];
  edges: Edge[];
}) => Promise<
  | boolean
  | {
      nodes: Node[];
      edges: Edge[];
    }
>;
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `params.nodes` | `Node[]` | 削除されようとしているノードの配列 |
| `params.edges` | `Edge[]` | 削除されようとしているエッジの配列 |

## 使用例

```tsx
import { ReactFlow, type OnBeforeDelete } from '@xyflow/react';

export default function Flow() {
  const onBeforeDelete: OnBeforeDelete = async ({ nodes, edges }) => {
    // 確認ダイアログを表示して削除を制御
    const confirmed = await confirm(
      `${nodes.length} ノードと ${edges.length} エッジを削除しますか？`
    );
    return confirmed;

    // 特定の要素だけ削除したい場合はオブジェクトを返す
    // return {
    //   nodes: nodes.filter((n) => n.type !== 'protected'),
    //   edges,
    // };
  };

  return <ReactFlow onBeforeDelete={onBeforeDelete} />;
}
```

## 注意点

- 非同期関数（`Promise` を返す）である必要がある
- `true` を返すと削除を許可、`false` を返すと削除を完全にキャンセル
- `{ nodes, edges }` オブジェクトを返すと、その配列に含まれる要素だけが削除される（選択的削除）
- 削除後のコールバックには `OnDelete` を使用する

## 関連

- [OnDelete](./OnDelete.md)
- [OnNodesDelete](./OnNodesDelete.md)
- [OnEdgesDelete](./OnEdgesDelete.md)
