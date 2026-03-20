# ViewportPortal

Renders child elements inside the flow viewport coordinate system, making them move and scale along with the canvas when panning and zooming.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Content to render within the viewport coordinate space |

## 使用例

```tsx
import { ReactFlow, ViewportPortal } from '@xyflow/react';

export default function Flow() {
  return (
    <ReactFlow nodes={[]} edges={[]}>
      <ViewportPortal>
        {/* This div is positioned at flow coordinates (100, 100) */}
        <div
          style={{
            position: 'absolute',
            transform: 'translate(100px, 100px)',
          }}
        >
          I move and zoom with the canvas
        </div>
      </ViewportPortal>
    </ReactFlow>
  );
}
```

## 注意点

- Child elements share the **same coordinate system as nodes and edges**, so `transform: translate(x, y)` uses flow-space units.
- Unlike `<Panel />`, content rendered via `ViewportPortal` **is affected by pan and zoom** operations.
- Use `position: 'absolute'` on child elements so coordinates are relative to the viewport origin.
- Suitable for custom annotations, watermarks, or decorative elements that should track the canvas.

## 関連

- [./Panel.md](./Panel.md)
- [./EdgeLabelRenderer.md](./EdgeLabelRenderer.md)
- [./ReactFlow.md](./ReactFlow.md)
