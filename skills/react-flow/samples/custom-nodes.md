# Custom Nodes

独自の React コンポーネントをノードとして使用する。`nodeTypes` に登録し `ReactFlow` へ渡す。

```tsx
import { useCallback } from 'react';
import { Handle, Position, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// 1. カスタムノードコンポーネントを定義する
function TextUpdaterNode(props) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 4 }}>
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
        <input
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag"
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

// 2. nodeTypes はコンポーネント外で定義してメモ化する（毎レンダー再定義を防止）
const nodeTypes = {
  textUpdater: TextUpdaterNode,
};

const nodes = [
  {
    id: 'node-1',
    type: 'textUpdater',
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];

// 3. ReactFlow へ nodeTypes を渡す
export default function Flow() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes} fitView />
    </div>
  );
}
```

## Notes

- `nodeTypes` はコンポーネントの外側で定義するか `useMemo` でメモ化する。毎レンダーで再定義すると不要な再レンダリングが発生する
- input など操作可能な要素には `className="nodrag"` を付与しないと、操作時にノードがドラッグされてしまう
- 接続ポイントが必要なノードには `<Handle>` コンポーネントを追加する
- カスタムノードにはデフォルトスタイルがないため、自由にスタイリングできる
