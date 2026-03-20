# SSR / SSG Configuration

Server-side rendering (SSR) is supported since React Flow 12, enabling static HTML diagram generation, use in non-JavaScript environments, and dynamic Open Graph image generation.

## 詳細説明

React Flow measures DOM elements on the client to calculate node dimensions and edge positions. For SSR/SSG, you must provide these values explicitly so rendering can occur without a browser.

### Required Configuration for SSR

| Requirement | Explanation |
|-------------|-------------|
| **Node dimensions** | Provide `width` + `height` (static) or `initialWidth` + `initialHeight` (dynamic) on each node |
| **Handle positions** | Provide explicit `handles` array on each node for correct edge rendering |
| **FitView** | Provide `width` and `height` props on `<ReactFlow />` for server-side viewport calculation |

`initialWidth` / `initialHeight` apply only during the initial render; the client-side measurement replaces them after hydration.

## コード例

### Nodes with static dimensions and explicit handles

```tsx
import { Position, type Node } from '@xyflow/react';

const nodes: Node[] = [
  {
    id: '1',
    type: 'default',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1' },
    width: 100,
    height: 50,
    handles: [
      {
        type: 'target',
        position: Position.Top,
        x: 100 / 2,
        y: 0,
      },
      {
        type: 'source',
        position: Position.Bottom,
        x: 100 / 2,
        y: 50,
      },
    ],
  },
];
```

### FitView with container dimensions

```tsx
<ReactFlow nodes={nodes} edges={edges} fitView width={1000} height={500} />
```

### ReactFlowProvider with initial values

```tsx
<ReactFlowProvider
  initialNodes={nodes}
  initialEdges={edges}
  initialWidth={1000}
  initialHeight={500}
  fitView
>
  <App />
</ReactFlowProvider>
```

### Static HTML generation with `renderToStaticMarkup`

```tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ReactFlow, Background } from '@xyflow/react';

function toHTML({
  nodes,
  edges,
  width,
  height,
}: {
  nodes: Node[];
  edges: Edge[];
  width: number;
  height: number;
}) {
  const html = renderToStaticMarkup(
    React.createElement(
      ReactFlow,
      {
        nodes,
        edges,
        width,
        height,
        minZoom: 0.2,
        fitView: true,
      },
      React.createElement(Background, null),
    ),
  );

  return html;
}
```

## 注意点

- SSR support requires React Flow 12 or later
- Use `width` + `height` for known static dimensions; use `initialWidth` + `initialHeight` when dimensions vary or are unknown at build time
- `initialWidth` / `initialHeight` (with the `initial-` prefix) apply only to the first render — client-side measurement takes over after hydration
- Provide explicit `handles` arrays to ensure edges render correctly on the server
- Pass `width` and `height` to `<ReactFlow />` (or `ReactFlowProvider`) to enable server-side `fitView` calculation

## 関連

- [computing-flows.md](./computing-flows.md)
- [devtools-and-debugging.md](./devtools-and-debugging.md)
