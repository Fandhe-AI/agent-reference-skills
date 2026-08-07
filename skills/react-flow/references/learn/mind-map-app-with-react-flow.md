# Build a Mind Map App with React Flow

A tutorial demonstrating how to build a fully functional mind map application with React Flow, covering custom nodes/edges, Zustand state management, and dynamic node creation.

## 詳細説明

The tutorial builds a mind map editor step by step:

- Project scaffolding with **Vite**
- A **Zustand** store (`createWithEqualityFn`) holding `nodes`, `edges`, and change handlers (`applyNodeChanges`)
- Custom `mindmap` node type with an editable label and a connection `Handle`
- Custom edge rendered with `BaseEdge` and `getStraightPath()`
- Dynamic child-node creation on drag-release using `onConnectStart` / `onConnectEnd`
- `NodeOrigin` used to control the anchor point of newly created nodes
- `ReactFlowProvider`, `Controls`, and `Panel` for the app shell

## コード例

```typescript
const useStore = createWithEqualityFn<RFState>((set, get) => ({
  nodes: [{
    id: 'root',
    type: 'mindmap',
    data: { label: 'React Flow Mind Map' },
    position: { x: 0, y: 0 },
  }],
  edges: [],
  onNodesChange: (changes) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },
}));
```

## 注意点

- State management relies on `useStore()` / `useStoreApi()` (Zustand) rather than React Flow's built-in `useNodesState` / `useEdgesState`, to share state across custom node/edge components
- New child nodes are created when a connection line is dropped on empty canvas (`onConnectEnd`), not when it is dropped on an existing node
- `NodeOrigin` affects where a node is positioned relative to its `position` coordinate — important for radial/tree-like mind map layouts

## 関連

- [custom-nodes.md](./custom-nodes.md)
- [custom-edges.md](./custom-edges.md)
- [state-management.md](./state-management.md)
