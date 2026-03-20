# useOnSelectionChange

React Flow グラフ内のノード・エッジの選択変化を監視するコールバックを登録する。

## Signature

```ts
useOnSelectionChange<NodeType extends Node = Node, EdgeType extends Edge = Edge>(
  options: {
    onChange: OnSelectionChangeFunc<NodeType, EdgeType>;
  }
): void
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `onChange` | `OnSelectionChangeFunc<NodeType, EdgeType>` | 選択変化時に呼ばれるハンドラー。`{ nodes, edges }` を受け取る |

## Returns

`void`

## 使用例

```tsx
import { useCallback, useState } from 'react';
import { useOnSelectionChange } from '@xyflow/react';

function SelectionDisplay() {
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [selectedEdges, setSelectedEdges] = useState<string[]>([]);

  const onChange = useCallback(({ nodes, edges }) => {
    setSelectedNodes(nodes.map((node) => node.id));
    setSelectedEdges(edges.map((edge) => edge.id));
  }, []);

  useOnSelectionChange({ onChange });

  return (
    <div>
      <p>Selected nodes: {selectedNodes.join(', ')}</p>
      <p>Selected edges: {selectedEdges.join(', ')}</p>
    </div>
  );
}
```

## 注意点

- **`onChange` は必ず `useCallback` などでメモ化すること**。メモ化しないとフックが正しく動作しない
- `<ReactFlowProvider>` または `<ReactFlow>` の子コンポーネント内でのみ使用可能
- ノードとエッジのどちらの選択が変化した場合でもコールバックが呼ばれる

## 関連

- [useReactFlow.md](./useReactFlow.md)
- [useNodes.md](./useNodes.md)
- [useEdges.md](./useEdges.md)
