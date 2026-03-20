# MiniMap

Renders a small overview map of the entire flow in a corner of the canvas. Optionally supports panning and zooming the main viewport by interacting with the minimap.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `PanelPosition` | `'bottom-right'` | Position of the minimap on the canvas |
| `nodeColor` | `string \| GetMiniMapNodeAttribute<Node>` | `'#e2e2e2'` | Fill color of nodes in the minimap; accepts a function `(node) => string` for dynamic coloring |
| `nodeStrokeColor` | `string \| GetMiniMapNodeAttribute<Node>` | `'transparent'` | Stroke color of nodes in the minimap |
| `nodeClassName` | `string \| GetMiniMapNodeAttribute<Node>` | `''` | CSS class applied to nodes in the minimap |
| `nodeBorderRadius` | `number` | `5` | Border radius of node rectangles in the minimap |
| `nodeStrokeWidth` | `number` | `2` | Stroke width of node rectangles in the minimap |
| `nodeComponent` | `ComponentType<MiniMapNodeProps>` | — | Custom SVG component for rendering minimap nodes |
| `bgColor` | `string` | — | Background fill color of the minimap |
| `maskColor` | `string` | `'rgba(240, 240, 240, 0.6)'` | Color of the mask that covers the non-visible viewport area |
| `maskStrokeColor` | `string` | `'transparent'` | Stroke color of the viewport rectangle mask |
| `maskStrokeWidth` | `number` | `1` | Stroke width of the viewport rectangle mask |
| `pannable` | `boolean` | `false` | Enable viewport panning by dragging inside the minimap |
| `zoomable` | `boolean` | `false` | Enable viewport zooming by scrolling inside the minimap |
| `inversePan` | `boolean` | — | Invert panning direction in the minimap |
| `zoomStep` | `number` | `10` | Zoom step size when zooming via the minimap |
| `offsetScale` | `number` | `5` | Padding offset around the flow in the minimap view |
| `ariaLabel` | `string \| null` | `'Mini Map'` | Accessibility label for the minimap element |
| `onClick` | `(event: MouseEvent, position: XYPosition) => void` | — | Callback when the minimap background is clicked |
| `onNodeClick` | `(event: MouseEvent, node: Node) => void` | — | Callback when a node in the minimap is clicked |

## 使用例

```tsx
import { ReactFlow, MiniMap } from '@xyflow/react';

export default function Flow() {
  return (
    <ReactFlow nodes={[]} edges={[]}>
      <MiniMap
        pannable
        zoomable
        nodeColor={(node) => {
          switch (node.type) {
            case 'input': return '#6ede87';
            case 'output': return '#6865A5';
            default: return '#ff0072';
          }
        }}
      />
    </ReactFlow>
  );
}
```

## 注意点

- `nodeComponent` must render SVG elements only (not HTML).
- `nodeColor`, `nodeStrokeColor`, and `nodeClassName` each accept a function `(node: Node) => string` for per-node dynamic styling.
- TypeScript users can import `MiniMapProps` for prop type definitions.
- `PanelPosition` values: `'top-left'`, `'top-center'`, `'top-right'`, `'bottom-left'`, `'bottom-center'`, `'bottom-right'`.

## 関連

- [./ReactFlow.md](./ReactFlow.md)
- [./Panel.md](./Panel.md)
