# Sub Flows

`parentId` を使って子ノードを親ノード内に配置し、グループ化・階層構造を実現する。

```tsx
import { ReactFlow, type Node, type Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  // 親ノード（group タイプ）
  {
    id: 'A',
    type: 'group',
    data: { label: null },
    position: { x: 0, y: 0 },
    style: { width: 170, height: 140 },
  },
  // 子ノード — position は親の左上隅を原点とした相対座標
  {
    id: 'B',
    type: 'input',
    data: { label: 'child node 1' },
    position: { x: 10, y: 10 },
    parentId: 'A',
    extent: 'parent',
  },
  {
    id: 'C',
    data: { label: 'child node 2' },
    position: { x: 10, y: 70 },
    parentId: 'A',
    extent: 'parent',
  },
];

const initialEdges: Edge[] = [
  { id: 'e-b-c', source: 'B', target: 'C' },
];

// parented ノードに接続されたエッジをノードより前面に描画する
const defaultEdgeOptions = { zIndex: 1 };

export default function SubFlowExample() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow
        defaultNodes={initialNodes}
        defaultEdges={initialEdges}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
      />
    </div>
  );
}
```

## Notes

- 親ノードは `nodes` 配列において子ノードより前に定義しなければならない
- `parentId` は v11.11.0 より前では `parentNode` という名前だった
- `extent: 'parent'` を付けると子ノードが親の境界外にドラッグできなくなる
- `group` タイプはハンドルなしの便利な組み込みタイプ。どのノードタイプでも親として利用できる
