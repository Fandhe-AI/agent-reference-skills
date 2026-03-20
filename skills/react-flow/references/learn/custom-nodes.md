# Custom Nodes

Custom nodes are a fundamental feature of React Flow that enable developers to create flexible, interactive node-based UI components. React Flow wraps custom node components with interactive functionality and automatically injects essential props (node ID, position, data), while handling selection, dragging, and handle connections.

## 詳細説明

Custom nodes are simply React components. The framework injects the node's ID, position, data, selection state, and more as props. To use a custom node, you must define a `nodeTypes` mapping object and pass it to the `<ReactFlow />` component.

The `nodeTypes` object **must be defined outside the component** (or memoized with `useMemo`) to prevent unnecessary re-renders on every render cycle.

## コード例

```tsx
import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';

// 1. Define the custom node component
export function TextUpdaterNode(props) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

// 2. Define nodeTypes outside the component to avoid re-renders
const nodeTypes = {
  textUpdater: TextUpdaterNode,
};

// 3. Pass nodeTypes to ReactFlow
export function Flow() {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      fitView
    />
  );
}

// 4. Reference the custom type in node data
const nodes = [
  {
    id: 'node-1',
    type: 'textUpdater',
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];
```

## 注意点

- `nodeTypes` オブジェクトはコンポーネントの外側で定義するか `useMemo` でメモ化すること。毎レンダーで再定義すると不要な再レンダリングが発生する
- インタラクティブな要素（input など）には `className="nodrag"` を付与しないと、操作時にノードがドラッグされてしまう
- カスタムノードにはデフォルトスタイルがないため、自由にスタイリングできる
- 接続ポイントが必要な場合は `<Handle />` コンポーネントを別途追加する必要がある（handles.md 参照）
- TypeScript での型設定については公式の TypeScript ガイドを参照

## 関連

- [handles.md](./handles.md)
- [custom-edges.md](./custom-edges.md)
- [utility-classes.md](./utility-classes.md)
