# The Viewport

React Flow のパン・ズーム操作と viewport の制御方法。

## 詳細説明

React Flow の操作体系は "slippy maps"（地図アプリのスクロール）にインスパイアされている。

### デフォルトの操作

| 操作 | 方法 |
|------|------|
| パン | ポインタのドラッグ |
| ズーム | スクロール / ピンチ |
| 選択 | `Shift` + ポインタドラッグ |

### デザインツール風の操作（Figma / Sketch スタイル）

`panOnScroll`、`selectionOnDrag`、`panOnDrag` props を設定することで変更できる:

| 操作 | 方法 |
|------|------|
| パン | スクロール / 中クリック・右クリックドラッグ / `Space` + ポインタドラッグ |
| ズーム | ピンチ / `Cmd` + スクロール |
| 選択 | ポインタドラッグ |

### Viewport 設定 Props

| Prop | 型 | 説明 |
|------|----|------|
| `panOnScroll` | `boolean` | スクロールでパンを有効化 |
| `panOnDrag` | `boolean \| number[]` | ドラッグでパンを有効化（無効化する場合は `false`） |
| `selectionOnDrag` | `boolean` | ドラッグで選択を有効化 |
| `selectionMode` | `'partial' \| 'full'` | `'partial'` で部分的にかかるノードも選択対象にする |

## コード例

```tsx
import { useCallback } from 'react';
import {
  Background,
  ReactFlow,
  addEdge,
  useEdgesState,
  useNodesState,
  type OnConnect,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' }, type: 'input' },
  { id: 'n2', position: { x: 100, y: 100 }, data: { label: 'Node 2' } },
];

const initialEdges = [{ id: 'n1-n2', source: 'n1', target: 'n2' }];

// デフォルトのパン・ズーム（slippy map スタイル）
function DefaultFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
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

// デザインツール風のパン・ズーム（Figma スタイル）
function DesignToolFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
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
      panOnScroll={true}
      selectionOnDrag={true}
      panOnDrag={false}
      selectionMode="partial"
      fitView
    >
      <Background />
    </ReactFlow>
  );
}
```

## 注意点

- `selectionOnDrag={true}` と `panOnDrag={false}` を組み合わせることで、ドラッグ操作を選択専用にできる
- `selectionMode="partial"` を設定すると、選択ボックスに一部だけかかるノードも選択される（デフォルトは `'full'` で完全に囲まれたノードのみ）
- デザインツール風設定でも中クリック・右クリックドラッグでのパンは引き続き使用可能

## 関連

- [./adding-interactivity.md](./adding-interactivity.md)
- [./built-in-components.md](./built-in-components.md)
- [./terms-and-definitions.md](./terms-and-definitions.md)
