# State Management

This guide demonstrates integrating React Flow with an external state management library (Zustand) to handle complex application state. The same principles apply to Redux, Recoil, and Jotai.

## 詳細説明

As applications grow, managing nodes and edges through component state or passing functions through node `data` fields becomes unwieldy. A centralized store enables cleaner architecture, keeps components clean, and scales well.

Zustand is lightweight and closely matches React Flow's internal architecture.

### Installation

```bash
npm install --save zustand
# or
pnpm add zustand
yarn add zustand
bun add zustand
```

## コード例

### Creating a Zustand store for React Flow

```typescript
import { create } from 'zustand';
import {
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from '@xyflow/react';

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  updateNodeColor: (nodeId: string, color: string) => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],

  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  onConnect: (connection) => {
    set({ edges: addEdge(connection, get().edges) });
  },

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),

  updateNodeColor: (nodeId: string, color: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          // Spread to create a new object so React Flow detects the change
          return { ...node, data: { ...node.data, color } };
        }
        return node;
      }),
    });
  },
}));

export default useStore;
```

### Consuming the store in a component

```tsx
import useStore from './store';

const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore();

<ReactFlow
  nodes={nodes}
  edges={edges}
  onNodesChange={onNodesChange}
  onEdgesChange={onEdgesChange}
  onConnect={onConnect}
/>;
```

### Color chooser custom node

```tsx
import useStore from './store';

function ColorChooserNode({ id, data }) {
  const updateNodeColor = useStore((s) => s.updateNodeColor);

  return (
    <div>
      <span>{data.label}</span>
      <input
        type="color"
        defaultValue={data.color}
        onChange={(evt) => updateNodeColor(id, evt.target.value)}
        className="nodrag"
      />
    </div>
  );
}
```

## 注意点

- Always spread node/edge objects when updating (`{ ...node, data: { ...node.data } }`) to create new references — React Flow requires new object references to detect changes
- The `nodrag` CSS class on interactive elements inside custom nodes prevents accidental drag-start during interaction
- Zustand selectors (e.g., `useStore((s) => s.updateNodeColor)`) allow components to subscribe only to the values they need, reducing unnecessary re-renders
- This pattern eliminates the need to pass functions through node `data` fields

## 関連

- [hooks-providers.md](./hooks-providers.md)
- [uncontrolled-flow.md](./uncontrolled-flow.md)
- [performance.md](./performance.md)
- [computing-flows.md](./computing-flows.md)
