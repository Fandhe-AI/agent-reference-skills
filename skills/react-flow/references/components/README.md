# Components

| Name | Description | Path |
|------|-------------|------|
| Background | Renders a decorative background pattern (dots, lines, or cross grid) behind the flow canvas. Must be rendered as a child of `<ReactFlow />`. | [Background.md](./Background.md) |
| BaseEdge | The underlying SVG edge component used internally by all React Flow edge types. Use it inside custom edge components to get the invisible interaction area and label rendering for free. | [BaseEdge.md](./BaseEdge.md) |
| ControlButton | A button component for adding custom actions inside the `<Controls />` panel. Accepts all standard HTML button attributes. | [ControlButton.md](./ControlButton.md) |
| Controls | Renders a control panel with zoom in/out, fit-view, and viewport lock buttons. Must be rendered as a child of `<ReactFlow />`. | [Controls.md](./Controls.md) |
| EdgeLabelRenderer | A portal component that renders complex edge labels in a positioned `div` layer above the SVG canvas. Because edges are SVG-based, HTML elements (buttons, inputs, etc.) cannot be placed directly in an edge; this component provides an escape hatch. | [EdgeLabelRenderer.md](./EdgeLabelRenderer.md) |
| EdgeText | An SVG helper component for rendering text labels inside custom edges. Handles background rendering and padding automatically. | [EdgeText.md](./EdgeText.md) |
| EdgeToolbar | Renders a toolbar anchored to a specific position along an edge. Visible only when the edge is selected (unless `isVisible` is overridden). Does not scale with viewport zoom. | [EdgeToolbar.md](./EdgeToolbar.md) |
| Handle | A connection point rendered on a custom node that allows edges to be connected. Handles define where edges start (`source`) and end (`target`). | [Handle.md](./Handle.md) |
| MiniMap | Renders a small overview map of the entire flow in a corner of the canvas. Optionally supports panning and zooming the main viewport by interacting with the minimap. | [MiniMap.md](./MiniMap.md) |
| NodeResizeControl | A lower-level resizing control for custom nodes that gives full control over the resize handle appearance and behaviour. Use `<NodeResizer />` for the standard multi-direction resizer. | [NodeResizeControl.md](./NodeResizeControl.md) |
| NodeResizer | Renders draggable resize controls around a node to allow resizing in all directions. Must be placed inside a custom node component. | [NodeResizer.md](./NodeResizer.md) |
| NodeToolbar | Renders a toolbar attached to a node that appears above (or around) it. Visible only when the node is selected by default. Does not scale with viewport zoom. | [NodeToolbar.md](./NodeToolbar.md) |
| Panel | Positions content as an overlay above the flow canvas. Used internally by `<MiniMap />` and `<Controls />`. Accepts all standard HTML div attributes. | [Panel.md](./Panel.md) |
| ReactFlow | The main React Flow component that renders the interactive node-based graph. It wraps the viewport, nodes, edges, and all built-in UI elements. | [ReactFlow.md](./ReactFlow.md) |
| ReactFlowProvider | A React context provider that makes the React Flow store accessible to child components outside the `<ReactFlow />` component. Required when accessing flow state (via hooks) from components that are not rendered inside `<ReactFlow />`. | [ReactFlowProvider.md](./ReactFlowProvider.md) |
| ViewportPortal | Renders child elements inside the flow viewport coordinate system, making them move and scale along with the canvas when panning and zooming. | [ViewportPortal.md](./ViewportPortal.md) |
