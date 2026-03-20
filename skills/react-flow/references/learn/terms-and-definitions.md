# Terms and Definitions

React Flow の基本用語と概念の定義。フローグラフはノード（要素）とエッジ（接続）で構成される。

## 詳細説明

### Nodes

フローグラフの個別要素。デフォルトのノードタイプも提供されるが、カスタムノードによる拡張が React Flow の核心。インタラクティブなフォーム、データビジュアライゼーション、複数の接続ポイントを持つノードを設計できる。

### Handles

エッジが接続するアタッチメントポイント（他ライブラリでは "ports" とも呼ばれる）。デフォルトではノードの辺に灰色の円として表示される。内部的には `div` 要素であり、自由に配置・スタイリングでき、1ノードに複数配置可能。

### Edges

ノード間の接続。`source` と `target` の両ノード定義が必要。SVG パスとして実装されており CSS スタイリングが可能。

**組み込みエッジタイプ:**

| Type | 説明 |
|------|------|
| `default` | ベジエ曲線 |
| `smoothstep` | 滑らかなステップ |
| `step` | 直角ステップ |
| `straight` | 直線 |

### Selection

- 単一選択: クリック
- 複数選択: `Meta/Control` + クリック（`multiSelectionKeyCode` prop で変更可）
- ボックス選択: `Shift` + ドラッグ（`selectionKeyCode` prop で変更可）
- 選択された要素は z-index が上昇し視覚的に強調される

### Connection Line

ハンドルをドラッグして新しいエッジを作成する際に表示されるプレースホルダーエッジ。通常エッジと同じ4種類の組み込みタイプをサポートし、完全にカスタマイズ可能。設定は `<ReactFlow />` の connection-line props で行う。

### Viewport

React Flow インスタンス全体を包むコンテナ。各ノードは viewport 内の `x`、`y` 座標を持つ。viewport 自体も `x`、`y`、`zoom` 値を持ち、ユーザーのパン・ズーム操作に応じて変化する。

## コード例

```tsx
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const nodes = [
  {
    id: 'n1',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1' },
    type: 'input', // 'input' | 'output' | 'default'
  },
];

const edges = [
  {
    id: 'e1',
    source: 'n1',
    target: 'n2',
    type: 'default', // 'default' | 'smoothstep' | 'step' | 'straight'
  },
];

export default function App() {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
```

## 注意点

- Handle は `div` 要素として実装されているため CSS で自由にカスタマイズ可能
- Selection のキーボードショートカット（`multiSelectionKeyCode`、`selectionKeyCode`）は props で変更できる
- Connection Line は実際のエッジが作成される前の一時的なビジュアル要素
- Viewport の座標は `x`、`y`（パン位置）と `zoom`（倍率）の3値で表現される

## 関連

- [./building-a-flow.md](./building-a-flow.md)
- [./adding-interactivity.md](./adding-interactivity.md)
- [./the-viewport.md](./the-viewport.md)
- [./built-in-components.md](./built-in-components.md)
