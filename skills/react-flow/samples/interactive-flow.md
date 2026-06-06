# Interactive Flow

`onNodesChange` / `onEdgesChange` / `onConnect` を実装し、ドラッグ・接続・削除をインタラクティブに動作させる。

```tsx
import { useState, useCallback } from 'react';
import {
  ReactFlow,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
  Background,
  Controls,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' }, type: 'input' },
  { id: 'n2', position: { x: 100, y: 100 }, data: { label: 'Node 2' } },
];

const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((prev) => applyNodeChanges(changes, prev)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((prev) => applyEdgeChanges(changes, prev)),
    [],
  );

  const onConnect = useCallback(
    (params) => setEdges((prev) => addEdge(params, prev)),
    [],
  );

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
```

## Notes

- `applyNodeChanges` / `applyEdgeChanges` はドラッグ・選択・削除など各種変更を配列に適用するユーティリティ
- `addEdge` はハンドル間の接続を既存エッジ配列に追加する
- `useCallback` の依存配列を空にすることで不要な再生成を防止する
- `fitView` を付与すると初回レンダー時にすべてのノードが表示範囲に収まる
