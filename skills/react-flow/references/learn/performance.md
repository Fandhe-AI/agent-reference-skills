# Performance

Managing performance in React Flow can be challenging when working with large node counts or complex components. This page covers the key optimization strategies.

## 詳細説明

### 1. Memoize Components and Functions

Components passed as props (e.g., custom node types) should be defined with `React.memo` or declared outside the parent component to prevent re-creation on every render.

Use `useCallback` for event handler props, and `useMemo` for object/array props like `defaultEdgeOptions` or `snapGrid`.

### 2. Avoid Accessing the `nodes` Array Directly in Components

Accessing `nodes` or `edges` arrays from the store triggers a re-render on every drag, pan, or zoom operation — even if the data relevant to your component has not changed. Instead, store derived values (e.g., selected node IDs) separately and subscribe only to those.

### 3. Collapse Large Node Trees

For deeply nested structures, toggle the `hidden` property on child nodes instead of rendering all nodes at once.

### 4. Simplify Styling

Complex CSS (animations, shadows, gradients) significantly impacts rendering performance with large node counts.

## コード例

### Memoize a custom node component

```tsx
import { memo } from 'react';
import { type NodeProps } from '@xyflow/react';

const NodeComponent = memo(({ data }: NodeProps) => {
  return <div>{data.label}</div>;
});

export default NodeComponent;
```

### Memoize event handler props

```tsx
import { useCallback } from 'react';
import { ReactFlow } from '@xyflow/react';

const MyDiagram = () => {
  const onNodeClick = useCallback((event, node) => {
    console.log('Node clicked:', node);
  }, []);

  return <ReactFlow onNodeClick={onNodeClick} />;
};
```

### Inefficient: subscribing to the full nodes array

```tsx
// Causes re-renders on every drag/pan/zoom
const SelectedNodeIds = () => {
  const nodes = useStore((state) => state.nodes);
  const selectedNodeIds = nodes.filter((node) => node.selected).map((node) => node.id);

  return (
    <div>
      {selectedNodeIds.map((id) => (
        <div key={id}>{id}</div>
      ))}
    </div>
  );
};
```

### Optimized: subscribe to derived state only

```tsx
const SelectedNodeIds = () => {
  const selectedNodeIds = useStore((state) => state.selectedNodeIds);

  return (
    <div>
      {selectedNodeIds.map((id) => (
        <div key={id}>{id}</div>
      ))}
    </div>
  );
};
```

### Collapse nodes on click

```tsx
const handleNodeClick = (targetNode) => {
  if (targetNode.data.children) {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        targetNode.data.children.includes(node.id)
          ? { ...node, hidden: !node.hidden }
          : node,
      ),
    );
  }
};
```

## 注意点

- Define custom node/edge components outside the parent component or wrap with `React.memo` to prevent unnecessary re-renders
- Subscribing to the full `nodes` or `edges` array in a component will cause re-renders during all drag, pan, and zoom operations
- The `hidden` property is a lightweight alternative to removing nodes from the array; use it for collapsible subtrees
- Reduce CSS complexity (shadows, animations, gradients) when the node count is high

## 関連

- [state-management.md](./state-management.md)
- [devtools-and-debugging.md](./devtools-and-debugging.md)
