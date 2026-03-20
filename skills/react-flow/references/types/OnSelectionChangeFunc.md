# OnSelectionChangeFunc

ノードまたはエッジの選択状態が変化したときに呼び出されるコールバック型。

## 型定義

```typescript
type OnSelectionChangeFunc = (params: {
  nodes: Node[];
  edges: Edge[];
}) => void;
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `params.nodes` | `Node[]` | 現在選択されているノードの配列 |
| `params.edges` | `Edge[]` | 現在選択されているエッジの配列 |

## 使用例

```tsx
import { ReactFlow, type OnSelectionChangeFunc } from '@xyflow/react';

export default function Flow() {
  const onSelectionChange: OnSelectionChangeFunc = ({ nodes, edges }) => {
    console.log('選択中のノード:', nodes.map((n) => n.id));
    console.log('選択中のエッジ:', edges.map((e) => e.id));
  };

  return <ReactFlow onSelectionChange={onSelectionChange} />;
}
```

`useOnSelectionChange` フックでの使用:

```tsx
import { useOnSelectionChange } from '@xyflow/react';

function SelectionLogger() {
  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      console.log('選択変更:', { nodes, edges });
    },
  });

  return null;
}
```

## 注意点

- 選択が解除された場合、`nodes` と `edges` は空の配列になる
- `<ReactFlow />` の `onSelectionChange` prop としても、`useOnSelectionChange` フックの `onChange` としても使用できる
- 選択状態の変化ごとに呼び出されるため、高頻度で更新が発生する場合はメモ化を検討する

## 関連

- [OnNodesChange](./OnNodesChange.md)
- [OnEdgesChange](./OnEdgesChange.md)
