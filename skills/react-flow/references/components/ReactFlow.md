# ReactFlow

The main React Flow component that renders the interactive node-based graph. It wraps the viewport, nodes, edges, and all built-in UI elements.

## Props

### Common Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `nodes` | `Node[]` | `[]` | Array of nodes for controlled flow |
| `edges` | `Edge[]` | `[]` | Array of edges for controlled flow |
| `defaultNodes` | `Node[]` | — | Initial nodes for uncontrolled flow |
| `defaultEdges` | `Edge[]` | — | Initial edges for uncontrolled flow |
| `nodeTypes` | `NodeTypes` | Built-in types | Custom node component mapping |
| `edgeTypes` | `EdgeTypes` | Built-in types | Custom edge component mapping |
| `width` | `number` | — | Sets fixed flow width |
| `height` | `number` | — | Sets fixed flow height |
| `nodeOrigin` | `NodeOrigin` | `[0, 0]` | Node placement origin point |
| `paneClickDistance` | `number` | `0` | Mouse movement threshold triggering click |
| `nodeClickDistance` | `number` | `0` | Node click distance threshold |
| `nodeDragThreshold` | `number` | `1` | Pixels required before drag triggers |
| `connectionDragThreshold` | `number` | `1` | Pixels before connection line appears |
| `colorMode` | `ColorMode` | `'light'` | Controls styling color scheme |
| `debug` | `boolean` | `false` | Logs debug info to console |
| `ariaLabelConfig` | `Partial<AriaLabelConfig>` | — | Customizable accessibility labels |
| `proOptions` | `ProOptions` | — | Pro subscription options |
| `autoPanOnNodeFocus` | `boolean` | `true` | Auto-pan viewport when nodes focused |

### Viewport Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `defaultViewport` | `Viewport` | `{x:0, y:0, zoom:1}` | Initial viewport position/zoom |
| `viewport` | `Viewport` | — | Controlled viewport state |
| `onViewportChange` | `(viewport: Viewport) => void` | — | Handler for viewport updates |
| `fitView` | `boolean` | — | Auto-fit all nodes initially |
| `fitViewOptions` | `FitViewOptionsBase` | — | Customize initial fit behavior |
| `minZoom` | `number` | `0.5` | Minimum zoom level |
| `maxZoom` | `number` | `2` | Maximum zoom level |
| `snapToGrid` | `boolean` | — | Enable grid snapping |
| `snapGrid` | `SnapGrid` | — | Grid snap configuration |
| `onlyRenderVisibleElements` | `boolean` | `false` | Render only viewport-visible items |
| `translateExtent` | `CoordinateExtent` | Infinite | Viewport boundary limits |
| `nodeExtent` | `CoordinateExtent` | — | Node placement boundary limits |
| `preventScrolling` | `boolean` | `true` | Block page scroll over flow |
| `attributionPosition` | `PanelPosition` | `'bottom-right'` | Attribution location |

### Edge Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `elevateEdgesOnSelect` | `boolean` | `false` | Raise z-index of selected edges |
| `defaultMarkerColor` | `string \| null` | `'#b1b1b7'` | Edge marker color |
| `defaultEdgeOptions` | `DefaultEdgeOptions` | — | Default settings for new edges |
| `reconnectRadius` | `number` | `10` | Connection trigger radius |
| `edgesReconnectable` | `boolean` | `true` | Allow edge source/target updates |

### Interaction Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `nodesDraggable` | `boolean` | `true` | Global node drag enablement |
| `nodesConnectable` | `boolean` | `true` | Global connection enablement |
| `nodesFocusable` | `boolean` | `true` | Tab/Enter focus cycling |
| `edgesFocusable` | `boolean` | `true` | Edge focus cycling |
| `elementsSelectable` | `boolean` | `true` | Click-based selection |
| `autoPanOnConnect` | `boolean` | `true` | Auto-pan during connection creation |
| `autoPanOnNodeDrag` | `boolean` | `true` | Auto-pan during node drag |
| `autoPanSpeed` | `number` | `15` | Auto-pan speed |
| `panOnDrag` | `boolean \| number[]` | `true` | Click-drag panning; optionally restrict buttons |
| `selectionOnDrag` | `boolean` | `false` | Multi-select without modifier key |
| `selectionMode` | `SelectionMode` | `'full'` | Selection box behavior (`'partial'` or `'full'`) |
| `panOnScroll` | `boolean` | `false` | Scroll-based panning |
| `panOnScrollSpeed` | `number` | `0.5` | Scroll pan speed |
| `panOnScrollMode` | `PanOnScrollMode` | `'free'` | Scroll pan direction restriction |
| `zoomOnScroll` | `boolean` | `true` | Scroll-based zoom |
| `zoomOnPinch` | `boolean` | `true` | Touch pinch zoom |
| `zoomOnDoubleClick` | `boolean` | `true` | Double-click zoom |
| `selectNodesOnDrag` | `boolean` | `true` | Node selection during drag |
| `elevateNodesOnSelect` | `boolean` | `true` | Raise z-index of selected nodes |
| `connectOnClick` | `boolean` | `true` | Click-based connection creation |
| `connectionMode` | `ConnectionMode` | `'strict'` | Connection validation mode |
| `zIndexMode` | `ZIndexMode` | `'basic'` | Z-index calculation behavior |

### Connection Line Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `connectionLineStyle` | `CSSProperties` | — | Connection line styling |
| `connectionLineType` | `ConnectionLineType` | `Bezier` | Connection line path type |
| `connectionRadius` | `number` | `20` | Handle drop radius |
| `connectionLineComponent` | `ConnectionLineComponent` | — | Custom connection line component |
| `connectionLineContainerStyle` | `CSSProperties` | — | Container styling |

### Keyboard Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `deleteKeyCode` | `KeyCode \| null` | `'Backspace'` | Delete selection key |
| `selectionKeyCode` | `KeyCode \| null` | `'Shift'` | Selection box drawing key |
| `multiSelectionKeyCode` | `KeyCode \| null` | Platform-dependent | Multi-select modifier key |
| `zoomActivationKeyCode` | `KeyCode \| null` | Platform-dependent | Zoom activation key |
| `panActivationKeyCode` | `KeyCode \| null` | `'Space'` | Pan activation key |
| `disableKeyboardA11y` | `boolean` | `false` | Disable keyboard accessibility |

### Style Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `noPanClassName` | `string` | `'nopan'` | Class preventing panning |
| `noDragClassName` | `string` | `'nodrag'` | Class preventing dragging |
| `noWheelClassName` | `string` | `'nowheel'` | Class preventing wheel zoom |

### General Event Handlers

| Name | Type | Description |
|------|------|-------------|
| `onError` | `OnError` | Called when React Flow throws errors |
| `onInit` | `(instance: ReactFlowInstance) => void` | Fires when viewport initializes |
| `onDelete` | `OnDelete` | Called when nodes/edges deleted |
| `onBeforeDelete` | `OnBeforeDelete` | Pre-deletion handler; can abort/modify |

### Node Event Handlers

| Name | Type | Description |
|------|------|-------------|
| `onNodeClick` | `NodeMouseHandler` | Node click handler |
| `onNodeDoubleClick` | `NodeMouseHandler` | Node double-click handler |
| `onNodeDragStart` | `OnNodeDrag` | Drag initiation handler |
| `onNodeDrag` | `OnNodeDrag` | Active drag handler |
| `onNodeDragStop` | `OnNodeDrag` | Drag completion handler |
| `onNodeMouseEnter` | `NodeMouseHandler` | Mouse enter handler |
| `onNodeMouseMove` | `NodeMouseHandler` | Mouse move handler |
| `onNodeMouseLeave` | `NodeMouseHandler` | Mouse leave handler |
| `onNodeContextMenu` | `NodeMouseHandler` | Right-click handler |
| `onNodesDelete` | `OnNodesDelete` | Node deletion handler |
| `onNodesChange` | `OnNodesChange` | Controlled flow update handler |

### Edge Event Handlers

| Name | Type | Description |
|------|------|-------------|
| `onEdgeClick` | `(event: MouseEvent, edge: Edge) => void` | Edge click handler |
| `onEdgeDoubleClick` | `EdgeMouseHandler` | Edge double-click handler |
| `onEdgeMouseEnter` | `EdgeMouseHandler` | Mouse enter handler |
| `onEdgeMouseMove` | `EdgeMouseHandler` | Mouse move handler |
| `onEdgeMouseLeave` | `EdgeMouseHandler` | Mouse leave handler |
| `onEdgeContextMenu` | `EdgeMouseHandler` | Right-click handler |
| `onReconnect` | `OnReconnect` | Edge reconnection handler |
| `onReconnectStart` | `(event: MouseEvent, edge: Edge, type: string) => void` | Reconnection start handler |
| `onReconnectEnd` | `(event: MouseEvent, edge: Edge, type: string, state: ReconnectState) => void` | Reconnection end handler |
| `onEdgesDelete` | `OnEdgesDelete` | Edge deletion handler |
| `onEdgesChange` | `OnEdgesChange` | Controlled flow update handler |

### Connection Event Handlers

| Name | Type | Description |
|------|------|-------------|
| `onConnect` | `OnConnect` | New connection completion handler |
| `onConnectStart` | `OnConnectStart` | Connection drag initiation |
| `onConnectEnd` | `OnConnectEnd` | Connection drag completion |
| `onClickConnectStart` | `OnConnectStart` | Click-to-connect initiation |
| `onClickConnectEnd` | `OnConnectEnd` | Click-to-connect completion |
| `isValidConnection` | `IsValidConnection` | Connection validation callback |

### Pane Event Handlers

| Name | Type | Description |
|------|------|-------------|
| `onMove` | `OnMove` | Pan/zoom in progress |
| `onMoveStart` | `OnMove` | Pan/zoom initiation |
| `onMoveEnd` | `OnMove` | Pan/zoom completion |
| `onPaneClick` | `(event: MouseEvent) => void` | Pane click handler |
| `onPaneContextMenu` | `(event: MouseEvent) => void` | Pane right-click handler |
| `onPaneScroll` | `(event?: WheelEvent) => void` | Pane scroll handler |
| `onPaneMouseMove` | `(event: MouseEvent) => void` | Pane mouse move handler |
| `onPaneMouseEnter` | `(event: MouseEvent) => void` | Pane mouse enter handler |
| `onPaneMouseLeave` | `(event: MouseEvent) => void` | Pane mouse leave handler |

### Selection Event Handlers

| Name | Type | Description |
|------|------|-------------|
| `onSelectionChange` | `OnSelectionChangeFunc` | Selection group change handler |
| `onSelectionDragStart` | `SelectionDragHandler` | Selection box drag start |
| `onSelectionDrag` | `SelectionDragHandler` | Selection box drag in progress |
| `onSelectionDragStop` | `SelectionDragHandler` | Selection box drag completion |
| `onSelectionStart` | `(event: MouseEvent) => void` | Selection initiation handler |
| `onSelectionEnd` | `(event: MouseEvent) => void` | Selection completion handler |
| `onSelectionContextMenu` | `(event: MouseEvent, nodes: Node[]) => void` | Selection right-click handler |

## 使用例

```tsx
import { useCallback } from 'react';
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      />
    </div>
  );
}
```

## 注意点

- Event handlers (`onNodesChange`, `onConnect` etc.) must be defined outside the component or wrapped with `useCallback`. Failing to do so can cause an infinite re-render loop.
- Pass `null` to keyboard props (e.g. `deleteKeyCode={null}`) to disable specific shortcuts.
- Individual node/edge properties override the corresponding global props set on `<ReactFlow />`.
- The `<ReactFlow />` container must have an explicit width and height (e.g. via CSS or inline styles).
- Props are exported as the `ReactFlowProps` type for TypeScript users.

## 関連

- [./ReactFlowProvider.md](./ReactFlowProvider.md)
- [./Background.md](./Background.md)
- [./Controls.md](./Controls.md)
- [./MiniMap.md](./MiniMap.md)
- [./Panel.md](./Panel.md)
