# Node

A node in a React Flow graph. Contains all essential information React Flow requires to manage and render a node.

## 型定義

```typescript
type Node<
  NodeData extends Record<string, unknown> = Record<string, unknown>,
  NodeType extends string = string,
> = {
  id: string;
  position: XYPosition;
  data: NodeData;
  type?: NodeType;
  sourcePosition?: Position;
  targetPosition?: Position;
  hidden?: boolean;
  selected?: boolean;
  dragging?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;
  deletable?: boolean;
  dragHandle?: string;
  width?: number | null;
  height?: number | null;
  parentId?: string;
  zIndex?: number;
  extent?: CoordinateExtent | 'parent' | null;
  expandParent?: boolean;
  style?: CSSProperties;
  className?: string;
  ariaLabel?: string;
  focusable?: boolean;
  origin?: NodeOrigin;
  handles?: NodeHandle[];
};
```

## プロパティ

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique identifier for the node |
| `position` | `XYPosition` | Node's coordinates on the canvas |
| `data` | `NodeData` | Custom data passed to the node component |
| `type` | `string` | Node type key (must match a key in `nodeTypes`). Defaults to `"default"` |
| `sourcePosition` | `Position` | Position of the output handle (used by default/source/target node types) |
| `targetPosition` | `Position` | Position of the input handle (used by default/source/target node types) |
| `hidden` | `boolean` | When `true`, the node is not rendered |
| `selected` | `boolean` | Whether the node is currently selected |
| `dragging` | `boolean` | Whether the node is currently being dragged (read-only) |
| `draggable` | `boolean` | Whether the node can be dragged |
| `selectable` | `boolean` | Whether the node can be selected |
| `connectable` | `boolean` | Whether edges can be connected to this node |
| `deletable` | `boolean` | Whether the node can be deleted |
| `dragHandle` | `string` | CSS selector for the drag handle element within the node |
| `width` | `number \| null` | Computed width of the node (read-only; set via CSS) |
| `height` | `number \| null` | Computed height of the node (read-only; set via CSS) |
| `parentId` | `string` | ID of a parent node (for sub-flows / grouped nodes) |
| `zIndex` | `number` | Stacking order of the node |
| `extent` | `CoordinateExtent \| "parent" \| null` | Constrains how far the node can be moved |
| `expandParent` | `boolean` | When `true`, automatically expands the parent node when dragged to the edge |
| `style` | `CSSProperties` | Inline styles applied to the node wrapper |
| `className` | `string` | CSS class names applied to the node wrapper |
| `ariaLabel` | `string` | Accessible label for screen readers |
| `focusable` | `boolean` | Whether the node can receive keyboard focus |
| `origin` | `NodeOrigin` | The anchor point of the node relative to its position coordinates |
| `handles` | `NodeHandle[]` | Explicit handle definitions (required for SSR) |

## 使用例

```tsx
import { ReactFlow, type Node } from '@xyflow/react';

const initialNodes: Node[] = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1' },
    type: 'default',
  },
  {
    id: '2',
    position: { x: 200, y: 100 },
    data: { label: 'Node 2' },
    draggable: false,
    selectable: false,
  },
];

export default function Flow() {
  return <ReactFlow nodes={initialNodes} />;
}
```

## 注意点

- `width` と `height` は React Flow が内部的に計算する読み取り専用プロパティ。直接設定せず、`style` や `className` で CSS を使用してサイズを制御する
- `type` を省略した場合は `"default"` タイプ（入出力ハンドル付き）が使用される
- 組み込みタイプ: `"default"`, `"input"`, `"output"`, `"group"`
- SSR を使用する場合は `handles` プロパティで明示的にハンドル情報を提供する必要がある

## 関連

- [./NodeProps.md](./NodeProps.md)
- [./NodeTypes.md](./NodeTypes.md)
- [./NodeHandle.md](./NodeHandle.md)
- [./NodeOrigin.md](./NodeOrigin.md)
- [./InternalNode.md](./InternalNode.md)
- [./NodeChange.md](./NodeChange.md)
