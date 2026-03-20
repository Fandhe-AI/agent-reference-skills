# NodeChange

A discriminated union of all possible ways a node can change. Used with the `onNodesChange` callback to update flow state.

## 型定義

```typescript
type NodeChange<NodeType extends Node = Node> =
  | NodeDimensionChange
  | NodePositionChange
  | NodeSelectionChange
  | NodeRemoveChange
  | NodeAddChange<NodeType>
  | NodeReplaceChange<NodeType>;

type NodeDimensionChange = {
  id: string;
  type: 'dimensions';
  dimensions?: Dimensions;
  resizing?: boolean;
  setAttributes?: boolean | 'width' | 'height';
};

type NodePositionChange = {
  id: string;
  type: 'position';
  position?: XYPosition;
  positionAbsolute?: XYPosition;
  dragging?: boolean;
};

type NodeSelectionChange = {
  id: string;
  type: 'select';
  selected: boolean;
};

type NodeRemoveChange = {
  id: string;
  type: 'remove';
};

type NodeAddChange<NodeType extends Node = Node> = {
  item: NodeType;
  type: 'add';
  index?: number;
};

type NodeReplaceChange<NodeType extends Node = Node> = {
  id: string;
  item: NodeType;
  type: 'replace';
};
```

## プロパティ

### NodeDimensionChange (`type: "dimensions"`)

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | ID of the node whose dimensions changed |
| `type` | `"dimensions"` | Change type discriminant |
| `dimensions` | `Dimensions` | New width and height values |
| `resizing` | `boolean` | Whether the node is actively being resized |
| `setAttributes` | `boolean \| "width" \| "height"` | Which dimension attributes to update |

### NodePositionChange (`type: "position"`)

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | ID of the moved node |
| `type` | `"position"` | Change type discriminant |
| `position` | `XYPosition` | New position relative to parent |
| `positionAbsolute` | `XYPosition` | New absolute position in the viewport |
| `dragging` | `boolean` | Whether the node is currently being dragged |

### NodeSelectionChange (`type: "select"`)

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | ID of the node whose selection state changed |
| `type` | `"select"` | Change type discriminant |
| `selected` | `boolean` | New selection state |

### NodeRemoveChange (`type: "remove"`)

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | ID of the node to remove |
| `type` | `"remove"` | Change type discriminant |

### NodeAddChange (`type: "add"`)

| Name | Type | Description |
|------|------|-------------|
| `item` | `NodeType` | The node object being added |
| `type` | `"add"` | Change type discriminant |
| `index` | `number` | Position in the nodes array to insert |

### NodeReplaceChange (`type: "replace"`)

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | ID of the node to replace |
| `item` | `NodeType` | The replacement node object |
| `type` | `"replace"` | Change type discriminant |

## 使用例

```tsx
import { useCallback } from 'react';
import { ReactFlow, applyNodeChanges, type Node, type NodeChange } from '@xyflow/react';

export default function Flow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  return <ReactFlow nodes={nodes} onNodesChange={onNodesChange} />;
}
```

## 注意点

- `type` プロパティが各バリアントの判別子となる。`switch` 文や型ガードで安全に処理できる
- `applyNodeChanges` ユーティリティを使用することで、変更配列をノード配列に適用できる
- `onNodesChange` コールバックには変更の配列が渡される

## 関連

- [./Node.md](./Node.md)
