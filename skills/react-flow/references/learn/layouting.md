# Layouting

React Flow does not provide a built-in layouting solution. Instead, it supports integration with external libraries for positioning nodes. This page surveys the most viable options.

## 詳細説明

The four primary layouting libraries supported by React Flow are:

### Dagre
- Repository: https://github.com/dagrejs/dagre
- Best for tree-structured flows
- Minimal configuration, fast processing, supports dynamic node sizes
- **Limitation**: Has an open issue that prevents correct layout of sub-flows when nodes inside the sub-flow are connected to nodes outside it

### D3-Hierarchy
- Repository: https://github.com/d3/d3-hierarchy
- Requires a single root node architecture
- Assigns the same width and height to all nodes — not ideal for mixed node types

### D3-Force
- Repository: https://github.com/d3/d3-force
- Physics-based, iterative algorithm
- More configuration required than Dagre or D3-Hierarchy
- Performance impact on larger graphs; consider toggling layout computation on/off

### Elkjs
- Repository: https://github.com/kieler/elkjs
- Most configurable option; supports edge routing and sub-flow layouting
- Complex to configure and support

## コード例

No single canonical code example exists on this page. The recommended approach for a tree layout using Dagre:

```tsx
import dagre from 'dagre';
import { type Node, type Edge } from '@xyflow/react';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
    return newNode;
  });

  return { nodes: newNodes, edges };
};
```

## 注意点

- Dagre is recommended for tree structures; use Elkjs for sub-flow support or edge routing
- D3-Hierarchy assigns uniform node dimensions — avoid if node types vary significantly
- D3-Force is iterative and may need to be toggled off for performance on large graphs
- Elkjs complexity makes community support difficult; use only when advanced features are required
- **Honorable mentions**: `d3-flextree`, `entitree-flex` (variable-size nodes with Dagre/D3-Hierarchy), `Cola.js` (constraint-based)

### Comparison Table

| Library | Dynamic Sizes | Sub-flows | Edge Routing |
|---------|---------------|-----------|--------------|
| Dagre | Yes | Limited | No |
| D3-Hierarchy | No | No | No |
| D3-Force | Yes | No | No |
| Elkjs | Yes | Yes | Yes |

## 関連

- [sub-flows.md](./sub-flows.md)
