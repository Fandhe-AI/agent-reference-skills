# applyEdgeChanges

Applies an array of edge changes to an existing edges array, returning a new updated array.

## Signature

```typescript
applyEdgeChanges(
  changes: EdgeChange<EdgeType>[],
  edges: EdgeType[]
): EdgeType[]
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `changes` | `EdgeChange<EdgeType>[]` | Array of changes to apply |
| `edges` | `EdgeType[]` | Array of edges to apply the changes to |

## Returns

`EdgeType[]` — An updated array of edges after applying the specified changes.

## 使用例

```tsx
import { useState, useCallback } from 'react';
import { ReactFlow, applyEdgeChanges, type EdgeChange } from '@xyflow/react';

export default function Flow() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((oldEdges) => applyEdgeChanges(changes, oldEdges));
    },
    [setEdges],
  );

  return (
    <ReactFlow nodes={nodes} edges={edges} onEdgesChange={onEdgesChange} />
  );
}
```

## 注意点

- `<ReactFlow />` コンポーネント上の各種イベントが `EdgeChange` オブジェクトを生成する。このユーティリティはそれらの変更を適用するための標準的な手段
- カスタム動作が不要な場合は、`useEdgesState` フックが `useState` とこの関数を組み合わせた便利なラッパーを提供する

## 関連

- [applyNodeChanges.md](./applyNodeChanges.md)
- [addEdge.md](./addEdge.md)
