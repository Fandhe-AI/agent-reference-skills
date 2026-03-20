# NodeProps

The props type for custom node components. Use this type when implementing custom nodes.

## 型定義

```typescript
type NodeProps<NodeType extends Node = Node> = {
  id: NodeType['id'];
  data: NodeType['data'];
  width: NodeType['width'];
  height: NodeType['height'];
  sourcePosition: NodeType['sourcePosition'];
  targetPosition: NodeType['targetPosition'];
  dragHandle: NodeType['dragHandle'];
  parentId: NodeType['parentId'];
  type: NodeType['type'];
  dragging: NodeType['dragging'];
  zIndex: NodeType['zIndex'];
  selectable: NodeType['selectable'];
  deletable: NodeType['deletable'];
  selected: NodeType['selected'];
  draggable: NodeType['draggable'];
  isConnectable: boolean;
  positionAbsoluteX: number;
  positionAbsoluteY: number;
};
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier for the node |
| `data` | `NodeData` | Custom data passed to the node |
| `width` | `number \| null` | Current rendered width |
| `height` | `number \| null` | Current rendered height |
| `sourcePosition` | `Position` | Position of the source handle |
| `targetPosition` | `Position` | Position of the target handle |
| `dragHandle` | `string` | CSS selector for the drag handle element |
| `parentId` | `string` | ID of the parent node (for sub-flows) |
| `type` | `string` | Node type as defined in `nodeTypes` |
| `dragging` | `boolean` | Whether the node is currently being dragged |
| `zIndex` | `number` | Stacking order |
| `selectable` | `boolean` | Whether the node can be selected |
| `deletable` | `boolean` | Whether the node can be deleted |
| `selected` | `boolean` | Whether the node is currently selected |
| `draggable` | `boolean` | Whether the node can be dragged |
| `isConnectable` | `boolean` | Whether edges can be connected to this node |
| `positionAbsoluteX` | `number` | Absolute X position in the canvas |
| `positionAbsoluteY` | `number` | Absolute Y position in the canvas |

## 使用例

```tsx
import { Handle, Position, type NodeProps } from '@xyflow/react';

type MyNodeData = {
  label: string;
  value: number;
};

type MyNode = Node<MyNodeData, 'myNode'>;

function MyCustomNode({ data, selected }: NodeProps<MyNode>) {
  return (
    <div style={{ border: selected ? '2px solid blue' : '1px solid gray' }}>
      <Handle type="target" position={Position.Top} />
      <div>{data.label}</div>
      <div>{data.value}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

// Register the custom node
const nodeTypes = { myNode: MyCustomNode };
```

## 注意点

- カスタムノードコンポーネントは `nodeTypes` オブジェクトに登録し、`ReactFlow` の `nodeTypes` プロパティに渡す
- `nodeTypes` はコンポーネント外で定義するか `useMemo` でメモ化する（再レンダリングによる不要な更新を防ぐため）
- ジェネリックパラメータ `NodeType` でカスタムデータ型を型安全に指定できる

## 関連

- [./Node.md](./Node.md)
- [./NodeTypes.md](./NodeTypes.md)
- [./InternalNode.md](./InternalNode.md)
