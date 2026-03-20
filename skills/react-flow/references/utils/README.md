# Utils

React Flow utility functions for managing nodes, edges, paths, and type guards.

| Name | Description | Path |
|------|-------------|------|
| `addEdge` | Adds an edge/connection to an edges array with duplicate prevention | [./addEdge.md](./addEdge.md) |
| `applyEdgeChanges` | Applies an array of edge changes to an edges array | [./applyEdgeChanges.md](./applyEdgeChanges.md) |
| `applyNodeChanges` | Applies an array of node changes to a nodes array | [./applyNodeChanges.md](./applyNodeChanges.md) |
| `getBezierPath` | Generates SVG path + label coords for a cubic bezier edge | [./getBezierPath.md](./getBezierPath.md) |
| `getConnectedEdges` | Returns edges connected to any of the given nodes | [./getConnectedEdges.md](./getConnectedEdges.md) |
| `getIncomers` | Returns all predecessor nodes (sources) for a given node | [./getIncomers.md](./getIncomers.md) |
| `getNodesBounds` | Returns the bounding box that encloses all given nodes | [./getNodesBounds.md](./getNodesBounds.md) |
| `getOutgoers` | Returns all successor nodes (targets) for a given node | [./getOutgoers.md](./getOutgoers.md) |
| `getSimpleBezierPath` | Generates SVG path + label coords for a simple bezier edge | [./getSimpleBezierPath.md](./getSimpleBezierPath.md) |
| `getSmoothStepPath` | Generates SVG path + label coords for a smooth step edge | [./getSmoothStepPath.md](./getSmoothStepPath.md) |
| `getStraightPath` | Generates SVG path + label coords for a straight-line edge | [./getStraightPath.md](./getStraightPath.md) |
| `getViewportForBounds` | Calculates a viewport transform to fit a bounding box | [./getViewportForBounds.md](./getViewportForBounds.md) |
| `isEdge` | Type guard: checks if a value is a valid Edge | [./isEdge.md](./isEdge.md) |
| `isNode` | Type guard: checks if a value is a valid Node | [./isNode.md](./isNode.md) |
| `reconnectEdge` | Updates an existing edge's connection endpoints | [./reconnectEdge.md](./reconnectEdge.md) |
