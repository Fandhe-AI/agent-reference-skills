# Handle

A connection point rendered on a custom node that allows edges to be connected. Handles define where edges start (`source`) and end (`target`).

## Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'source' \| 'target'` | `'source'` | Whether this handle initiates or terminates a connection |
| `position` | `Position` | `Position.Top` | Placement of the handle relative to the node (`Top`, `Right`, `Bottom`, `Left`) |
| `id` | `string \| null` | — | Handle identifier; required when a node has multiple handles of the same type |
| `isConnectable` | `boolean` | `true` | Whether connections can be made to/from this handle |
| `isConnectableStart` | `boolean` | `true` | Whether a connection can be initiated from this handle |
| `isConnectableEnd` | `boolean` | `true` | Whether a connection can end on this handle |
| `isValidConnection` | `IsValidConnection` | — | Validation callback called when a connection is dragged onto this handle |
| `onConnect` | `OnConnect` | — | Callback called when a connection is made via this handle |
| `...props` | `Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'id'>` | — | Standard HTML div attributes (except `id`) |

## 使用例

```tsx
import { Handle, Position, type NodeProps } from '@xyflow/react';

export function CustomNode({ data }: NodeProps) {
  return (
    <div style={{ padding: '10px 20px' }}>
      <Handle type="target" position={Position.Left} />
      {data.label}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
```

### 複数ハンドルの例

```tsx
<Handle type="source" position={Position.Right} id="a" />
<Handle type="source" position={Position.Right} id="b" style={{ top: '75%' }} />
```

## 注意点

- When a node has multiple handles of the same `type`, each must have a unique `id`.
- For horizontal flows, source handles typically use `Position.Right` and target handles `Position.Left`.
- The `isValidConnection` callback on `<Handle />` works the same as on `<ReactFlow />`, but for performance it is recommended to use the `isValidConnection` prop on the main `<ReactFlow />` component instead.
- TypeScript users can import `HandleProps` for prop type definitions.

## 関連

- [./ReactFlow.md](./ReactFlow.md)
- [./NodeResizer.md](./NodeResizer.md)
- [./NodeToolbar.md](./NodeToolbar.md)
