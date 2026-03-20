# EdgeToolbar

Renders a toolbar anchored to a specific position along an edge. Visible only when the edge is selected (unless `isVisible` is overridden). Does not scale with viewport zoom.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `edgeId` | `string` | — | ID of the edge this toolbar is attached to (required) |
| `x` | `number` | — | X position of the toolbar in flow coordinates |
| `y` | `number` | — | Y position of the toolbar in flow coordinates |
| `isVisible` | `boolean` | `false` | When `true`, the toolbar is visible even if the edge is not selected |
| `alignX` | `"left" \| "center" \| "right"` | `"center"` | Horizontal alignment relative to the provided `x` coordinate |
| `alignY` | `"center" \| "top" \| "bottom"` | `"center"` | Vertical alignment relative to the provided `y` coordinate |
| `...props` | `HTMLAttributes<HTMLDivElement>` | — | Standard HTML div element attributes |

## 使用例

```tsx
import { memo } from 'react';
import { BaseEdge, EdgeToolbar, getBezierPath, type EdgeProps } from '@xyflow/react';

function CustomEdge(props: EdgeProps) {
  const [edgePath, centerX, centerY] = getBezierPath(props);

  return (
    <>
      <BaseEdge id={props.id} path={edgePath} />
      <EdgeToolbar edgeId={props.id} x={centerX} y={centerY} isVisible>
        <button onClick={() => console.log('delete', props.id)}>Delete</button>
      </EdgeToolbar>
    </>
  );
}

export default memo(CustomEdge);
```

## 注意点

- The toolbar does **not** scale with viewport zoom, keeping content readable at any zoom level.
- By default the toolbar is hidden unless the edge is selected; use `isVisible={true}` to override this.
- When multiple edges are selected simultaneously, toolbars may overlap — consider hiding them via `isVisible` in that case.
- Use `getBezierPath` (or similar) to compute the `centerX` / `centerY` position for the toolbar.

## 関連

- [./BaseEdge.md](./BaseEdge.md)
- [./EdgeLabelRenderer.md](./EdgeLabelRenderer.md)
