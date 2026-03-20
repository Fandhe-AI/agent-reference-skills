# Uncontrolled Flow

In an uncontrolled flow, React Flow manages the internal state of nodes and edges rather than the developer maintaining it in component state.

## 詳細説明

React Flow supports two approaches:

| Approach | Props used | State owner |
|----------|-----------|-------------|
| **Controlled** | `nodes`, `edges` + change handlers | Developer |
| **Uncontrolled** | `defaultNodes`, `defaultEdges` | React Flow internally |

In an uncontrolled flow, `onNodesChange` / `onEdgesChange` handlers are not required. Use `defaultEdgeOptions` to configure edge behavior (such as animation) without needing `onConnect`.

### Updating Nodes and Edges Programmatically

Because nodes and edges are not in local component state, updates require the React Flow instance. The recommended approach is the `useReactFlow()` hook, which provides methods such as `addNodes()`, `setNodes()`, `addEdges()`, and `setEdges()`.

**Required**: Wrap the flow component with `ReactFlowProvider` to enable `useReactFlow()`.

## コード例

### Basic uncontrolled flow

```tsx
import { ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { defaultNodes } from './nodes';
import { defaultEdges } from './edges';

const edgeOptions = {
  animated: true,
  style: {
    stroke: 'white',
  },
};

const connectionLineStyle = { stroke: 'white' };

export default function Flow() {
  return (
    <ReactFlow
      defaultNodes={defaultNodes}
      defaultEdges={defaultEdges}
      defaultEdgeOptions={edgeOptions}
      fitView
      style={{
        backgroundColor: '#D3D2E5',
      }}
      connectionLineStyle={connectionLineStyle}
    />
  );
}
```

### Adding nodes dynamically with useReactFlow

```tsx
import { useCallback } from 'react';
import { ReactFlow, ReactFlowProvider, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { defaultNodes, defaultEdges } from './initialElements';

function AddNodeButton() {
  const { addNodes } = useReactFlow();

  const onClick = useCallback(() => {
    addNodes({
      id: String(Date.now()),
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: 'New Node' },
    });
  }, [addNodes]);

  return <button onClick={onClick}>Add Node</button>;
}

export default function Flow() {
  return (
    <ReactFlowProvider>
      <ReactFlow defaultNodes={defaultNodes} defaultEdges={defaultEdges} fitView>
        <AddNodeButton />
      </ReactFlow>
    </ReactFlowProvider>
  );
}
```

## 注意点

- Use `defaultNodes` / `defaultEdges` instead of `nodes` / `edges` for uncontrolled mode
- The `Flow` component must be wrapped in `ReactFlowProvider` when using `useReactFlow()`
- Direct state updates are not possible without the React Flow instance; use `useReactFlow()` methods
- `defaultEdgeOptions` applies settings to all new edges without requiring `onConnect`

## 関連

- [hooks-providers.md](./hooks-providers.md)
- [state-management.md](./state-management.md)
