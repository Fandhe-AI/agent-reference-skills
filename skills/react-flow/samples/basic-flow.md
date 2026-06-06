# Basic Flow

静的なノードとエッジを定義し、ReactFlow コンポーネントで描画する最小構成。

```tsx
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
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

const initialEdges = [
  {
    id: 'n1-n2',
    source: 'n1',
    target: 'n2',
    type: 'step',
    label: 'connects with',
  },
];

export default function App() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
```

## Notes

- `@xyflow/react/dist/style.css` のインポートは必須。省略すると正しく表示されない
- 親コンテナに明示的な `height` と `width` が必要。React Flow はこれらの値を使用する
- この段階では静的なフロー。ドラッグ・接続などのインタラクティビティは別途実装が必要
- ノード `id` は一意でなければならない
