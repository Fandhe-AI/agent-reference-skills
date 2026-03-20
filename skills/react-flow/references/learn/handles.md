# Handles

Handles are connection points on nodes in React Flow. Built-in nodes include one source and one target handle by default. Custom nodes can be configured with any number of handles using the `<Handle />` component.

## 詳細説明

Handles are placed inside custom node components. Each handle has a `type` (`"source"` or `"target"`) and a `position` (`Position.Top`, `Position.Bottom`, `Position.Left`, `Position.Right`).

When using **multiple handles of the same type**, assign each a unique `id` to allow edges to target a specific handle via `sourceHandle` / `targetHandle` on the edge definition.

### Connection Mode

Set `connectionMode` to `Loose` on `<ReactFlow />` to allow handles to accept both incoming and outgoing connections without type restrictions (typeless handles).

### Dynamic Handles

When programmatically adding, removing, or repositioning handles, call the `useUpdateNodeInternals` hook to force React Flow to recalculate the node's internal state.

## コード例

```tsx
import { Handle, Position } from '@xyflow/react';

// Basic handles
export function CustomNode() {
  return (
    <div className="custom-node">
      <Handle type="target" position={Position.Top} />
      <div>Custom Node Content</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

// Multiple handles with unique IDs
export function MultiHandleNode() {
  return (
    <div className="react-flow__node-default">
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Right} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

// Connect edges to specific handles
const initialEdges = [
  { id: 'n1-n2', source: 'n1', sourceHandle: 'a', target: 'n2' },
  { id: 'n1-n3', source: 'n1', sourceHandle: 'b', target: 'n3' },
];

// Custom styled handle (e.g., wrapping a MUI icon)
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

export function IconHandleNode() {
  return (
    <div className="react-flow__node-default">
      <Handle
        position={Position.Right}
        type="source"
        style={{
          background: 'none',
          border: 'none',
          width: '1em',
          height: '1em',
        }}
      >
        <ArrowCircleRightIcon
          style={{
            pointerEvents: 'none',
            fontSize: '1em',
            left: 0,
            position: 'absolute',
          }}
        />
      </Handle>
      Custom Node
    </div>
  );
}
```

## 注意点

- 複数の同タイプの Handle には必ず一意の `id` を付与すること
- ハンドルを非表示にする場合は `visibility: hidden` または `opacity: 0` を使用すること。`display: none` を使うと React Flow が寸法を計算できなくなる
- 接続操作中、Handle には `connecting` および `valid` クラスが付与されるため、CSS でスタイリングに活用できる
- カスタムアイコンを Handle 内に配置する場合は、子要素に `pointer-events: none` を設定すること
- Handle の数や位置を動的に変更する場合は `useUpdateNodeInternals` フックを呼び出してノード内部を更新すること

## 関連

- [custom-nodes.md](./custom-nodes.md)
- [custom-edges.md](./custom-edges.md)
