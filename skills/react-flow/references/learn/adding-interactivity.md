# Adding Interactivity

ノードのドラッグ、エッジの接続・削除などのインタラクティブ機能を追加する方法。

## 詳細説明

React Flow はデフォルトではビューポートの処理以外の内部状態更新を管理しない。ノード・エッジのインタラクティビティを有効にするには、以下のイベントハンドラを明示的に実装する必要がある:

| ハンドラ | 役割 |
|---------|------|
| `onNodesChange` | ノードの変更（移動・選択・削除）を状態に反映 |
| `onEdgesChange` | エッジの変更（選択・削除）を状態に反映 |
| `onConnect` | ハンドル間のドラッグで新しいエッジを作成 |

### ヘルパー関数

- `applyNodeChanges(changes, nodes)`: ノードの変更を現在の状態に適用
- `applyEdgeChanges(changes, edges)`: エッジの変更を現在の状態に適用
- `addEdge(params, edges)`: 新しい接続を edges 配列に追加

### 有効になる操作

インタラクティブハンドラを実装すると以下が可能になる:

- ノードと エッジの選択
- ノードのドラッグ移動
- ハンドルのドラッグによる接続作成
- `Shift` キーによる複数選択
- `Cmd` キーによる複数選択
- `Backspace` キーによる要素削除

## コード例

```tsx
import { useState, useCallback } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: 'n1',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1' },
    type: 'input',
  },
  {
    id: 'n2',
    position: { x: 100, y: 100 },
    data: { label: 'Node 2' },
  },
];

const initialEdges: Edge[] = [
  {
    id: 'n1-n2',
    source: 'n1',
    target: 'n2',
  },
];

export default function App() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
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

### useNodesState / useEdgesState を使う簡略パターン

```tsx
import { useCallback } from 'react';
import {
  ReactFlow,
  Background,
  addEdge,
  useEdgesState,
  useNodesState,
  type OnConnect,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
    >
      <Background />
    </ReactFlow>
  );
}
```

## 注意点

- `onNodesChange` と `onEdgesChange` を省略した場合、ノード・エッジの変更が状態に反映されずUIが更新されない
- `useNodesState` / `useEdgesState` は `useState` + `applyNodeChanges` / `applyEdgeChanges` のショートハンド
- `useCallback` の依存配列に注意。`setNodes`/`setEdges` は安定した参照のため依存配列に含めても問題ない
- `fitView` prop を使うと初期表示時にノード全体が収まるよう自動的にズームが調整される

## 関連

- [./building-a-flow.md](./building-a-flow.md)
- [./the-viewport.md](./the-viewport.md)
- [./terms-and-definitions.md](./terms-and-definitions.md)
