# Built-In Components

React Flow に付属する組み込みコンポーネント群。`<ReactFlow />` の子要素として配置する。

## 詳細説明

### MiniMap

フローグラフの鳥瞰図を表示するコンポーネント。大規模なフローのナビゲーションに有用。

- `nodeColor` 関数でノードごとの表示色をカスタマイズ可能
- API リファレンス: `/api-reference/components/minimap`

### Controls

ビューポート操作用のコントロールパネル。以下の操作ボタンを提供:

- ズームイン / ズームアウト
- ビューポートへのフィット
- ノードの移動・選択・編集のトグル

- API リファレンス: `/api-reference/components/controls`

### Background

フローグラフにグリッドパターンを追加し、ユーザーの方向感覚を維持するコンポーネント。

- 複数のパターンバリアント（`dots`、`lines`、`cross` 等）を選択可能
- GitHub でソースコードが公開されており、カスタム実装の参考にできる
- API リファレンス: `/api-reference/components/background`

### Panel

フローグラフ上に固定オーバーレイを追加するコンポーネント。タイトル、コントロール、その他 UI 要素に使用。

**position オプション:**

| 値 | 配置位置 |
|----|---------|
| `top-left` | 左上 |
| `top-center` | 上中央 |
| `top-right` | 右上 |
| `bottom-left` | 左下 |
| `bottom-center` | 下中央 |
| `bottom-right` | 右下 |
| `center-left` | 左中央 |
| `center-right` | 右中央 |

- API リファレンス: `/api-reference/components/panel`

## コード例

```tsx
import { ReactFlow, Background, Controls, MiniMap, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const nodes = [
  {
    id: '1',
    data: { label: 'Example Flow' },
    position: { x: 0, y: 0 },
  },
];

function Flow() {
  return (
    <ReactFlow nodes={nodes} fitView>
      {/* グリッドパターン背景 */}
      <Background variant="cross" />

      {/* ズーム・フィットコントロール */}
      <Controls />

      {/* 鳥瞰図ミニマップ */}
      <MiniMap />

      {/* 固定オーバーレイ（全ポジション例） */}
      <Panel position="top-left">top-left</Panel>
      <Panel position="top-center">top-center</Panel>
      <Panel position="top-right">top-right</Panel>
      <Panel position="bottom-left">bottom-left</Panel>
      <Panel position="bottom-center">bottom-center</Panel>
      <Panel position="bottom-right">bottom-right</Panel>
      <Panel position="center-left">center-left</Panel>
      <Panel position="center-right">center-right</Panel>
    </ReactFlow>
  );
}

export default Flow;
```

## 注意点

- すべての組み込みコンポーネントは `<ReactFlow />` の**子要素**として配置する必要がある
- `Background` の `variant` prop に指定できる値: `'dots'`、`'lines'`、`'cross'`
- `Panel` はビューポートのパン・ズームに関係なく画面の固定位置に表示される
- `Controls` はデフォルトで左下に配置されるが、`position` prop で変更可能
- より詳細なコンポーネント一覧は `/api-reference/components` を参照

## 関連

- [./the-viewport.md](./the-viewport.md)
- [./building-a-flow.md](./building-a-flow.md)
- [./terms-and-definitions.md](./terms-and-definitions.md)
