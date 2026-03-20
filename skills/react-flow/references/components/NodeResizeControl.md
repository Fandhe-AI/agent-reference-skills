# NodeResizeControl

A lower-level resizing control for custom nodes that gives full control over the resize handle appearance and behaviour. Use `<NodeResizer />` for the standard multi-direction resizer.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `nodeId` | `string` | — | ID of the node being resized (required) |
| `position` | `ControlLinePosition \| 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | — | Position of this control on the node |
| `variant` | `ResizeControlVariant` | `'handle'` | Visual variant of the control |
| `minWidth` | `number` | `10` | Minimum allowed width |
| `minHeight` | `number` | `10` | Minimum allowed height |
| `maxWidth` | `number` | `Number.MAX_VALUE` | Maximum allowed width |
| `maxHeight` | `number` | `Number.MAX_VALUE` | Maximum allowed height |
| `keepAspectRatio` | `boolean` | `false` | Maintain aspect ratio during resize |
| `autoScale` | `boolean` | `true` | Scale the control with viewport zoom |
| `resizeDirection` | `'horizontal' \| 'vertical'` | — | Constrain resize to a single axis; unrestricted if omitted |
| `shouldResize` | `(event: ResizeDragEvent, params: ResizeParamsWithDirection) => boolean` | — | Callback to conditionally prevent a resize |
| `onResizeStart` | `OnResizeStart` | — | Callback invoked when resizing begins |
| `onResize` | `OnResize` | — | Callback invoked on each resize step |
| `onResizeEnd` | `OnResizeEnd` | — | Callback invoked when resizing ends |
| `color` | `string` | — | Color of the resize handle |
| `className` | `string` | — | CSS class applied to the control |
| `style` | `CSSProperties` | — | Inline styles applied to the control |
| `children` | `ReactNode` | — | Custom content inside the control (e.g. an icon) |

## 使用例

```tsx
import { memo } from 'react';
import { Handle, Position, NodeResizeControl } from '@xyflow/react';
import { ArrowsPointingOutIcon } from '@heroicons/react/24/outline';

function ResizableNode({ data, id }: { data: any; id: string }) {
  return (
    <>
      <NodeResizeControl
        nodeId={id}
        minWidth={100}
        minHeight={50}
        position="bottom-right"
      >
        <ArrowsPointingOutIcon style={{ width: 12, height: 12 }} />
      </NodeResizeControl>
      <Handle type="target" position={Position.Left} />
      <div style={{ padding: 10 }}>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default memo(ResizableNode);
```

## 注意点

- Use this component when you need a single custom resize handle (e.g. only bottom-right corner).
- Use `<NodeResizer />` when you want the full set of resize handles in all directions.
- `shouldResize` returning `false` cancels the resize for that event.
- TypeScript users can import `ResizeControlProps` for prop type definitions.

## 関連

- [./NodeResizer.md](./NodeResizer.md)
- [./Handle.md](./Handle.md)
