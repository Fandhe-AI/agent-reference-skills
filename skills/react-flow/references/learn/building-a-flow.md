# Building a Flow

ノードとエッジを定義し、静的なフローグラフを構築する基本手順。

## 詳細説明

React Flow のフローは3つの主要要素で構成される:

- **Nodes**: 個別の要素。固有の `id` と `position` が必須
- **Edges**: ノード間の接続。`id`、`source`、`target` が必須
- **Viewport**: 表示領域のキャンバス

### インストール

```bash
npm install @xyflow/react
```

### ノードオブジェクトの構造

| プロパティ | 型 | 必須 | 説明 |
|----------|-----|------|------|
| `id` | `string` | Yes | 一意の識別子 |
| `position` | `{ x: number, y: number }` | Yes | viewport 内の座標 |
| `data` | `object` | Yes | ノードに渡すデータ（`label` 等） |
| `type` | `string` | No | ノードタイプ（`'input'`、`'output'`、`'default'`） |

### エッジオブジェクトの構造

| プロパティ | 型 | 必須 | 説明 |
|----------|-----|------|------|
| `id` | `string` | Yes | 一意の識別子 |
| `source` | `string` | Yes | 接続元ノードの `id` |
| `target` | `string` | Yes | 接続先ノードの `id` |
| `type` | `string` | No | エッジタイプ（`'step'`、`'smoothstep'` 等） |
| `label` | `string` | No | エッジに表示するラベル |

## コード例

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

## 注意点

- `@xyflow/react/dist/style.css` の import は必須（これがないと正しく表示されない）
- 親コンテナには明示的な `height` と `width` が必要（React Flow はこれらの値を使用する）
- この段階では静的なフロー。ドラッグや接続などのインタラクティビティは別途実装が必要
- 各ノードの `id` は一意でなければならない

## 関連

- [./terms-and-definitions.md](./terms-and-definitions.md)
- [./adding-interactivity.md](./adding-interactivity.md)
- [./built-in-components.md](./built-in-components.md)
