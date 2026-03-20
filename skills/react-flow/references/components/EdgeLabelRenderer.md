# EdgeLabelRenderer

A portal component that renders complex edge labels in a positioned `div` layer above the SVG canvas. Because edges are SVG-based, HTML elements (buttons, inputs, etc.) cannot be placed directly in an edge; this component provides an escape hatch.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | HTML content to render inside the label portal |

## 使用例

```tsx
import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from '@xyflow/react';

export function CustomEdge({ id, data, ...props }: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath(props);

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            background: '#ffcc00',
            padding: 10,
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 700,
            // Enable pointer events for interactive elements
            pointerEvents: 'all',
          }}
          // Prevent the pane from panning when interacting with the label
          className="nodrag nopan"
        >
          {data.label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
```

## 注意点

- The portal **disables pointer events by default**. Set `pointerEvents: 'all'` on the child element to enable interaction.
- Add the `nopan` CSS class to interactive child elements to prevent the canvas from panning when the user interacts with them.
- Add the `nodrag` CSS class to prevent unintended drag behaviour.
- Typically paired with `getBezierPath()` (or similar path utilities) to get the `labelX` / `labelY` coordinates.
- For simple text labels, consider using `<EdgeText />` instead.

## 関連

- [./BaseEdge.md](./BaseEdge.md)
- [./EdgeText.md](./EdgeText.md)
- [./EdgeToolbar.md](./EdgeToolbar.md)
