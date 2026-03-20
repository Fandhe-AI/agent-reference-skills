# EdgeChange

A discriminated union of all possible ways an edge can change. Used with the `onEdgesChange` callback to update flow state.

## 型定義

```typescript
type EdgeChange<EdgeType extends Edge = Edge> =
  | EdgeAddChange<EdgeType>
  | EdgeRemoveChange
  | EdgeReplaceChange<EdgeType>
  | EdgeSelectionChange;

type EdgeAddChange<EdgeType extends Edge = Edge> = {
  item: EdgeType;
  type: 'add';
  index?: number;
};

type EdgeRemoveChange = {
  id: string;
  type: 'remove';
};

type EdgeReplaceChange<EdgeType extends Edge = Edge> = {
  id: string;
  item: EdgeType;
  type: 'replace';
};

type EdgeSelectionChange = {
  id: string;
  type: 'select';
  selected: boolean;
};
```

## プロパティ

### EdgeAddChange (`type: "add"`)

| Name | Type | Description |
|------|------|-------------|
| `item` | `EdgeType` | The edge object being added |
| `type` | `"add"` | Change type discriminant |
| `index` | `number` | Position in the edges array to insert |

### EdgeRemoveChange (`type: "remove"`)

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | ID of the edge to remove |
| `type` | `"remove"` | Change type discriminant |

### EdgeReplaceChange (`type: "replace"`)

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | ID of the edge being replaced |
| `item` | `EdgeType` | The replacement edge object |
| `type` | `"replace"` | Change type discriminant |

### EdgeSelectionChange (`type: "select"`)

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | ID of the edge whose selection state changed |
| `type` | `"select"` | Change type discriminant |
| `selected` | `boolean` | New selection state |

## 使用例

```tsx
import { useCallback } from 'react';
import { ReactFlow, applyEdgeChanges, type Edge, type EdgeChange } from '@xyflow/react';

export default function Flow() {
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  return <ReactFlow edges={edges} onEdgesChange={onEdgesChange} />;
}
```

## 注意点

- `type` プロパティが判別子となる。`switch` 文や型ガードで安全にハンドリングできる
- `applyEdgeChanges` ユーティリティを使用することで、変更配列をエッジ配列に適用できる
- `NodeChange` と異なり、`EdgeChange` には `dimensions` や `position` 変更は含まれない

## 関連

- [./Edge.md](./Edge.md)
- [./NodeChange.md](./NodeChange.md)
