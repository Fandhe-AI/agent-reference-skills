# ReactFlowProvider

A React context provider that makes the React Flow store accessible to child components outside the `<ReactFlow />` component. Required when accessing flow state (via hooks) from components that are not rendered inside `<ReactFlow />`.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Child components wrapped by the provider |
| `initialNodes` | `Node[]` | — | Initial nodes used to initialize the flow (not dynamic) |
| `initialEdges` | `Edge[]` | — | Initial edges used to initialize the flow (not dynamic) |
| `defaultNodes` | `Node[]` | — | Alias for `initialNodes`; used to initialize the flow (not dynamic) |
| `defaultEdges` | `Edge[]` | — | Alias for `initialEdges`; used to initialize the flow (not dynamic) |
| `initialWidth` | `number` | — | Initial width; required for `fitView` to work on the server |
| `initialHeight` | `number` | — | Initial height; required for `fitView` to work on the server |
| `fitView` | `boolean` | — | Auto-zoom and pan to fit all initially provided nodes |
| `initialFitViewOptions` | `FitViewOptionsBase<NodeType>` | — | Customization options for the initial fitView behavior |
| `initialMinZoom` | `number` | — | Starting minimum zoom level |
| `initialMaxZoom` | `number` | — | Starting maximum zoom level |
| `nodeOrigin` | `NodeOrigin` | `[0, 0]` | The origin of the node used when placing it or looking up its x/y position |
| `nodeExtent` | `CoordinateExtent` | — | Constrains node placement within specified boundaries |
| `zIndexMode` | `ZIndexMode` | — | Controls z-index layering behavior |

## 使用例

```tsx
import { ReactFlow, ReactFlowProvider, useNodes } from '@xyflow/react';

export default function Flow() {
  return (
    <ReactFlowProvider>
      <ReactFlow nodes={[]} edges={[]} />
      <Sidebar />
    </ReactFlowProvider>
  );
}

function Sidebar() {
  // useNodes is accessible here because Sidebar is inside ReactFlowProvider
  const nodes = useNodes();
  return (
    <aside>
      {nodes.map((node) => (
        <div key={node.id}>
          Node {node.id} — x: {node.position.x.toFixed(2)}, y:{' '}
          {node.position.y.toFixed(2)}
        </div>
      ))}
    </aside>
  );
}
```

## 注意点

- When using a router, place `<ReactFlowProvider />` **outside** of your router component so the flow state persists across route changes.
- When rendering multiple flows on the same page, each flow must be wrapped in its own `<ReactFlowProvider />`.
- `<ReactFlow />` itself implicitly includes a provider; `<ReactFlowProvider />` is only needed when you need to access the store from sibling or ancestor components.

## 関連

- [./ReactFlow.md](./ReactFlow.md)
