# Hooks and Providers

React Flow provides hooks and a context provider (`ReactFlowProvider`) to manage flow state and access internal methods from anywhere in the component tree.

## 詳細説明

### ReactFlowProvider

`ReactFlowProvider` is a context provider that gives access to the flow's internal state — nodes, edges, viewport — from outside the `ReactFlow` component.

**When to use:**
- Many React Flow hooks depend on it
- You need to access flow state from outside the `ReactFlow` component
- Working with multiple flows on one page
- Using client-side routing

### useReactFlow Hook

The `useReactFlow` hook grants access to the `ReactFlowInstance` and its methods, enabling programmatic manipulation of nodes, edges, and the viewport. Must be used inside a `ReactFlowProvider`.

## コード例

### ReactFlowProvider with external Sidebar

```tsx
import React, { useCallback } from 'react';
import {
  Background,
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  type OnConnect,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Sidebar from './Sidebar';

const initialNodes = [
  { id: 'provider-1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: 'provider-2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: 'provider-3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: 'provider-4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
];

const initialEdges = [
  { id: 'provider-e1-2', source: 'provider-1', target: 'provider-2', animated: true },
  { id: 'provider-e1-3', source: 'provider-1', target: 'provider-3' },
];

const ProviderFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    [],
  );

  return (
    <div className="providerflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        <Sidebar nodes={nodes} setNodes={setNodes} />
      </ReactFlowProvider>
    </div>
  );
};

export default ProviderFlow;
```

### useReactFlow inside the provider

```tsx
import React, { useCallback } from 'react';
import {
  Background,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';

import Buttons from './Buttons'; // uses useReactFlow internally

const initialNodes = [
  { id: '1', type: 'input', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
  { id: '3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: '4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
];

const ProviderFlow = () => {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    [],
  );

  return (
    <ReactFlowProvider>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Buttons />
        <Background />
      </ReactFlow>
    </ReactFlowProvider>
  );
};

export default ProviderFlow;
```

## 注意点

- `useReactFlow` must be called within a component that is a descendant of `ReactFlowProvider`
- The `ReactFlow` component itself renders a `ReactFlowProvider` internally, so hooks used inside the flow canvas do not require an extra provider
- When accessing flow state from outside the `ReactFlow` component, an explicit `ReactFlowProvider` wrapper is required

## 関連

- [uncontrolled-flow.md](./uncontrolled-flow.md)
- [state-management.md](./state-management.md)
