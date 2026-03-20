# NodeResizer

Renders draggable resize controls around a node to allow resizing in all directions. Must be placed inside a custom node component.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `nodeId` | `string` | — | ID of the node being resized; inferred from context if omitted |
| `isVisible` | `boolean` | `true` | Whether the resize controls are visible |
| `minWidth` | `number` | `10` | Minimum allowed width |
| `minHeight` | `number` | `10` | Minimum allowed height |
| `maxWidth` | `number` | `Number.MAX_VALUE` | Maximum allowed width |
| `maxHeight` | `number` | `Number.MAX_VALUE` | Maximum allowed height |
| `keepAspectRatio` | `boolean` | `false` | Maintain aspect ratio during resize |
| `autoScale` | `boolean` | `true` | Scale the controls with viewport zoom |
| `color` | `string` | — | Color of the resize handles |
| `handleClassName` | `string` | — | CSS class applied to handle elements |
| `handleStyle` | `CSSProperties` | — | Inline styles applied to handle elements |
| `lineClassName` | `string` | — | CSS class applied to resize line elements |
| `lineStyle` | `CSSProperties` | — | Inline styles applied to resize line elements |
| `shouldResize` | `(event: ResizeDragEvent, params: ResizeParamsWithDirection) => boolean` | — | Callback to conditionally prevent a resize |
| `onResizeStart` | `OnResizeStart` | — | Callback invoked when resizing begins |
| `onResize` | `OnResize` | — | Callback invoked on each resize step |
| `onResizeEnd` | `OnResizeEnd` | — | Callback invoked when resizing ends |

## 使用例

```tsx
import { memo } from 'react';
import { Handle, Position, NodeResizer } from '@xyflow/react';

function ResizableNode({ data }: { data: { label: string } }) {
  return (
    <>
      <NodeResizer minWidth={100} minHeight={30} />
      <Handle type="target" position={Position.Left} />
      <div style={{ padding: 10 }}>{data.label}</div>
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default memo(ResizableNode);
```

## 注意点

- Place `<NodeResizer />` as the **first** child inside the node component so it renders behind other content.
- The node must have `style={{ width, height }}` or an explicit size for resizing to work properly.
- Use `<NodeResizeControl />` for a single custom resize handle instead of the full set.
- TypeScript users can import `NodeResizerProps` for prop type definitions.

## 関連

- [./NodeResizeControl.md](./NodeResizeControl.md)
- [./Handle.md](./Handle.md)
