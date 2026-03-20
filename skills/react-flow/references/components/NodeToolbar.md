# NodeToolbar

Renders a toolbar attached to a node that appears above (or around) it. Visible only when the node is selected by default. Does not scale with viewport zoom.

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `nodeId` | `string \| string[]` | — | Node ID(s) to attach the toolbar to; accepts an array for group toolbars |
| `isVisible` | `boolean` | — | When `true`, the toolbar is visible regardless of node selection state |
| `position` | `Position` | `Position.Top` | Where the toolbar appears relative to the node (`Top`, `Right`, `Bottom`, `Left`) |
| `offset` | `number` | `10` | Spacing (px) between the node and the toolbar |
| `align` | `Align` | `'center'` | Alignment of the toolbar relative to the node edge (`'start'`, `'center'`, `'end'`) |
| `...props` | `HTMLAttributes<HTMLDivElement>` | — | Standard HTML div attributes |

## 使用例

```tsx
import { memo } from 'react';
import { Handle, Position, NodeToolbar } from '@xyflow/react';

function CustomNode({ data }: { data: { label: string; toolbarVisible?: boolean } }) {
  return (
    <>
      <NodeToolbar isVisible={data.toolbarVisible} position={Position.Top}>
        <button>Delete</button>
        <button>Copy</button>
        <button>Expand</button>
      </NodeToolbar>

      <div style={{ padding: '10px 20px' }}>{data.label}</div>

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </>
  );
}

export default memo(CustomNode);
```

## 注意点

- The toolbar is **hidden by default** and only shown when the node is selected.
- When **multiple nodes are selected**, the toolbar automatically hides to avoid visual clutter.
- Set `isVisible={true}` to force the toolbar to always be visible regardless of selection.
- The toolbar does **not** scale with viewport zoom, keeping its content readable at any zoom level.
- Pass an array to `nodeId` to attach one toolbar to a group of nodes.

## 関連

- [./Handle.md](./Handle.md)
- [./NodeResizer.md](./NodeResizer.md)
- [./Panel.md](./Panel.md)
