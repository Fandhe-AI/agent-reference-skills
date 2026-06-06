# useReactFlow Hook

`useReactFlow` でノード・エッジの操作とビューポート制御を行う。

```tsx
import { useCallback } from 'react';
import { useReactFlow, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// useReactFlow は ReactFlow または ReactFlowProvider の子コンポーネント内でのみ使用できる
function ControlPanel() {
  const { getNodes, fitView, setNodes, screenToFlowPosition } = useReactFlow();

  // すべてのノードが表示範囲に収まるようにビューポートをアニメーションしながら調整
  const handleFit = useCallback(() => {
    fitView({ padding: 0.2, duration: 400 });
  }, [fitView]);

  // クリック位置にノードを追加する
  const addNode = useCallback(
    (event: React.MouseEvent) => {
      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const id = `node-${Date.now()}`;
      setNodes((prev) => [
        ...prev,
        { id, position, data: { label: `Node ${prev.length + 1}` } },
      ]);
    },
    [setNodes, screenToFlowPosition],
  );

  return (
    <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 10 }}>
      <button onClick={handleFit}>
        Fit {getNodes().length} nodes
      </button>
      <button onClick={addNode}>Add Node at cursor</button>
    </div>
  );
}

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: '2', position: { x: 100, y: 100 }, data: { label: 'Node 2' } },
];

export default function App() {
  return (
    <ReactFlowProvider>
      <div style={{ height: '100%', width: '100%' }}>
        <ReactFlow defaultNodes={initialNodes} fitView />
        <ControlPanel />
      </div>
    </ReactFlowProvider>
  );
}
```

## Notes

- `<ReactFlow>` または `<ReactFlowProvider>` の子コンポーネント内でのみ使用できる
- `useReactFlow` は状態変化時に自動で再レンダリングしない。レンダリングが必要なら `useNodes` / `useEdges` を使う
- `screenToFlowPosition` はスクリーン座標（例: マウス座標）をフロー内座標に変換する
- `setNodes` はコールバック形式（`prev => [...]`）で使うと最新の状態を安全に参照できる
