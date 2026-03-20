# TypeScript

React Flow is built with TypeScript and exports all necessary types for safely typing nodes, edges, callbacks, and hooks.

## 詳細説明

### Core Types

| Type | Description |
|------|-------------|
| `Node` | Base node type — generic over `TData` and `TType` |
| `Edge` | Base edge type — generic over `TData` and `TType` |
| `OnConnect` | Callback type for new connections |
| `OnNodesChange` | Callback type for node change events |
| `OnEdgesChange` | Callback type for edge change events |
| `OnNodeDrag` | Callback type for node drag events |
| `DefaultEdgeOptions` | Default options applied to all edges |
| `BuiltInNode` | Union of all built-in node types |
| `BuiltInEdge` | Union of all built-in edge types |

### Custom Node / Edge Types

Use `Node<TData, TType>` and `Edge<TData, TType>` generics to define custom types. When defining node data separately, use `type` aliases (not `interface`) due to TypeScript constraints.

### Type Guards

Use type guard functions to narrow union types safely when working with mixed node/edge types.

## コード例

### Basic typed flow

```tsx
import { useState, useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type OnConnect,
  type OnNodesChange,
  type OnEdgesChange,
} from '@xyflow/react';

const initialNodes: Node[] = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 5, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } },
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

function Flow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
    />
  );
}
```

### Custom node types

```tsx
import type { Node, NodeProps } from '@xyflow/react';

type NumberNode = Node<{ number: number }, 'number'>;

export default function NumberNode({ data }: NodeProps<NumberNode>) {
  return <div>A special number: {data.number}</div>;
}
```

### Custom edge type

```tsx
import { getStraightPath, BaseEdge, type EdgeProps, type Edge } from '@xyflow/react';

type CustomEdge = Edge<{ value: number }, 'custom'>;

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}: EdgeProps<CustomEdge>) {
  const [edgePath] = getStraightPath({ sourceX, sourceY, targetX, targetY });
  return <BaseEdge id={id} path={edgePath} />;
}
```

### Union types with built-in types

```tsx
import type { BuiltInNode, BuiltInEdge } from '@xyflow/react';

type NumberNode = Node<{ number: number }, 'number'>;
type TextNode = Node<{ text: string }, 'text'>;
type AppNode = BuiltInNode | NumberNode | TextNode;

type EditableEdge = Edge<{ value: number }, 'editable'>;
type AppEdge = BuiltInEdge | EditableEdge;
```

### Typed hooks and callbacks

```tsx
import { useReactFlow, useNodeConnections, useNodesData, type OnNodeDrag } from '@xyflow/react';

const { getNodes, getEdges } = useReactFlow<AppNode, AppEdge>();

const onNodeDrag: OnNodeDrag<AppNode> = useCallback((_, node) => {
  if (node.type === 'number') {
    console.log('drag event', node.data.number);
  }
}, []);
```

### Type guard

```tsx
function isNumberNode(node: AppNode): node is NumberNode {
  return node.type === 'number';
}

const numberNodes = nodes.filter(isNumberNode);
```

## 注意点

- When defining custom node data types separately, use `type` aliases — `interface` does not work due to TypeScript's structural typing constraints
- Pass the union `AppNode` / `AppEdge` types to `useReactFlow<AppNode, AppEdge>()` and callbacks to get correct type inference throughout
- `BuiltInNode` and `BuiltInEdge` cover the default node/edge types; include them in union types to preserve built-in functionality

## 関連

- [testing.md](./testing.md)
- [hooks-providers.md](./hooks-providers.md)
- [computing-flows.md](./computing-flows.md)
