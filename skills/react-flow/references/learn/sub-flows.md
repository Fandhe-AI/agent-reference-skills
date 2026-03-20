# Sub Flows

A sub flow is a flow inside a node — it can be a separate flow or one connected to nodes outside its parent.

## 詳細説明

Sub flows allow nesting child nodes within a parent node, enabling grouping and hierarchical structures.

### Adding Child Nodes

Use the `parentId` option to designate a node as a child. Child node positions are relative to the parent — `{ x: 0, y: 0 }` is the parent's top-left corner.

The `extent: 'parent'` option restricts child node movement to within parent boundaries.

You can use any node type as a parent. The built-in `group` type is a convenience option that has no handles attached.

### Edge Z-Index Behavior

By default, edges render below nodes. However, edges connected to parented nodes render above nodes. This can be controlled with the `zIndex` option via `defaultEdgeOptions`.

## コード例

```tsx
import { ReactFlow, type Node, type Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: 'A',
    type: 'group',
    data: { label: null },
    position: { x: 0, y: 0 },
    style: { width: 170, height: 140 },
  },
  {
    id: 'B',
    type: 'input',
    data: { label: 'child node 1' },
    position: { x: 10, y: 10 },
    parentId: 'A',
    extent: 'parent',
  },
  {
    id: 'C',
    data: { label: 'child node 2' },
    position: { x: 10, y: 70 },
    parentId: 'A',
    extent: 'parent',
  },
];

const initialEdges: Edge[] = [
  { id: 'e-b-c', source: 'B', target: 'C' },
];

const defaultEdgeOptions = { zIndex: 1 };

export default function SubFlowExample() {
  return (
    <ReactFlow
      defaultNodes={initialNodes}
      defaultEdges={initialEdges}
      defaultEdgeOptions={defaultEdgeOptions}
      fitView
    />
  );
}
```

## 注意点

- Parent nodes **must appear before their children** in the `nodes` / `defaultNodes` array
- The `parentId` option was called `parentNode` in versions before 11.11.0
- When a parent node is moved, all child nodes move with it
- `extent: 'parent'` prevents children from being dragged outside the parent boundary
- The `group` node type is a convenience built-in with no handles; any node type can serve as a parent
- To control edge rendering order over parented nodes, set `zIndex` via `defaultEdgeOptions`

## 関連

- [layouting.md](./layouting.md)
