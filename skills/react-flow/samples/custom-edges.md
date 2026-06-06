# Custom Edges

`BaseEdge` とパスユーティリティを使って独自のエッジコンポーネントを定義し `edgeTypes` に登録する。

```tsx
import { BaseEdge, getStraightPath, ReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// 1. カスタムエッジコンポーネントを定義する
function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return <BaseEdge id={id} path={edgePath} />;
}

// 2. edgeTypes はコンポーネント外で定義する
const edgeTypes = {
  'custom-edge': CustomEdge,
};

const nodes = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: 'n2', position: { x: 200, y: 100 }, data: { label: 'Node 2' } },
];

const initialEdges = [
  {
    id: 'e1',
    source: 'n1',
    target: 'n2',
    type: 'custom-edge',
  },
];

// 3. ReactFlow へ edgeTypes を渡す
export default function Flow() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow nodes={nodes} edges={initialEdges} edgeTypes={edgeTypes} fitView />
    </div>
  );
}
```

## Notes

- `edgeTypes` もコンポーネント外で定義するか `useMemo` でメモ化する
- パスユーティリティには `getBezierPath` / `getSimpleBezierPath` / `getSmoothStepPath` / `getStraightPath` がある。それぞれ `[path, labelX, labelY, offsetX, offsetY]` を返す
- `<BaseEdge>` を使うことでホバー・選択などのインタラクションが自動的に処理される
- エッジパスは常に SVG ベース。HTML 要素はラベルとして `<EdgeLabelRenderer>` 経由でのみ配置できる
