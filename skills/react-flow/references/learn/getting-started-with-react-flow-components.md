# Getting Started with React Flow UI

A tutorial that walks through building a calculator flow using **React Flow UI** — pre-built components based on shadcn/ui — with Vite, Tailwind CSS, and TypeScript.

## 詳細説明

The tutorial progresses through:

- Environment setup (Vite + Tailwind + React Flow UI component install)
- `BaseNode`, `BaseNodeHeader`, `BaseNodeHeaderTitle`, `BaseNodeContent` building blocks for custom nodes
- A custom "number" node with a dropdown menu and increment/decrement controls, updated via `updateNodeData()`
- A "sum" node that reads connected inputs with `getNodeConnections()` and recomputes the total in a `useEffect`
- Wiring everything together with `useNodesState` / `useEdgesState`, `nodeTypes`, `edgeTypes`, and an `onConnect` handler using `addEdge()`

## コード例

```tsx
<BaseNode>
  <BaseNodeHeader>
    <BaseNodeHeaderTitle>Base Node</BaseNodeHeaderTitle>
  </BaseNodeHeader>
  <BaseNodeContent>Content here</BaseNodeContent>
</BaseNode>
```

## 注意点

- React Flow UI components are additive on top of core React Flow hooks (`useReactFlow`, `useStore`, `Position`) — they do not replace them
- `getNodeConnections()` is used instead of manually filtering the `edges` array to find a node's connected inputs
- `updateNodeData()` (from `useReactFlow()`) is the recommended way to mutate a single node's `data` from within a custom node component

## 関連

- [built-in-components.md](./built-in-components.md)
- [custom-nodes.md](./custom-nodes.md)
- [hooks-providers.md](./hooks-providers.md)
