# applyNodeChanges

Applies an array of node changes to an existing nodes array, returning a new updated array.

## Signature

```typescript
applyNodeChanges(
  changes: NodeChange<NodeType>[],
  nodes: NodeType[]
): NodeType[]
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `changes` | `NodeChange<NodeType>[]` | Array of changes to apply |
| `nodes` | `NodeType[]` | Array of nodes to apply the changes to |

## Returns

`NodeType[]` — An updated array of nodes after applying the specified changes.

## 使用例

```tsx
import { useState, useCallback } from 'react';
import { ReactFlow, applyNodeChanges, type NodeChange } from '@xyflow/react';

export default function Flow() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((oldNodes) => applyNodeChanges(changes, oldNodes));
    },
    [setNodes],
  );

  return (
    <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} />
  );
}
```

## 注意点

- `<ReactFlow />` コンポーネント上の各種インタラクション（ドラッグ、選択など）が `NodeChange` オブジェクトを生成する。このユーティリティはそれらを適用するための標準的な手段
- カスタム動作が不要な場合は、`useNodesState` フックが `useState` とこの関数を組み合わせた便利なラッパーを提供する

## 関連

- [applyEdgeChanges.md](./applyEdgeChanges.md)
