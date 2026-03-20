# Panel

Positions content as an overlay above the flow canvas. Used internally by `<MiniMap />` and `<Controls />`. Accepts all standard HTML div attributes.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `PanelPosition` | `'top-left'` | Corner or edge where the panel is placed |
| `...props` | `DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>` | — | All standard HTML div attributes (`style`, `className`, `onClick`, etc.) |

## Available Positions

| Value | Description |
|-------|-------------|
| `'top-left'` | Top-left corner |
| `'top-center'` | Top edge, centered |
| `'top-right'` | Top-right corner |
| `'bottom-left'` | Bottom-left corner |
| `'bottom-center'` | Bottom edge, centered |
| `'bottom-right'` | Bottom-right corner |
| `'center-left'` | Left edge, centered vertically |
| `'center-right'` | Right edge, centered vertically |

## 使用例

```tsx
import { ReactFlow, Panel } from '@xyflow/react';

export default function Flow() {
  return (
    <ReactFlow nodes={[]} edges={[]}>
      <Panel position="top-left">
        <button onClick={() => console.log('action')}>Custom Action</button>
      </Panel>
      <Panel position="bottom-right" style={{ background: 'white', padding: 8 }}>
        Legend
      </Panel>
    </ReactFlow>
  );
}
```

## 注意点

- The `Panel` component renders in a div layer above the canvas, not inside the SVG.
- Child elements are rendered as normal HTML, so full CSS and interactivity is supported.
- TypeScript users can import `PanelProps` for prop type definitions.

## 関連

- [./Controls.md](./Controls.md)
- [./MiniMap.md](./MiniMap.md)
- [./ReactFlow.md](./ReactFlow.md)
